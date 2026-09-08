#!/usr/bin/env node
/**
 * ar-dagre-layout - Directed Acyclic Graph layout CLI using @dagrejs/dagre.
 * 
 * Supports automatic scaling and fitting into a target PowerPoint canvas area (e.g. inches).
 * 
 * Input (file or stdin): JSON with:
 * {
 *   "direction": "LR" | "TB" (default: "LR"),
 *   "nodeSep": 50,
 *   "rankSep": 80,
 *   "fit": { "x": 0.8, "y": 1.7, "width": 11.7, "height": 4.8 }, // optional target bounding box (inches)
 *   "nodes": [{ "id": "A", "width": 180, "height": 60, "label": "Client" }],
 *   "edges": [{ "from": "A", "to": "B", "label": "SYN" }]
 * }
 * 
 * Output: JSON with computed coordinates (both center x/y and top-left left/top for PptxGenJS):
 * {
 *   "width": 11.7,
 *   "height": 4.8,
 *   "nodes": [{ "id": "A", "x": 2.1, "y": 3.4, "left": 1.2, "top": 3.1, "width": 1.8, "height": 0.6, ... }],
 *   "edges": [{ "from": "A", "to": "B", "points": [{ "x": 3.0, "y": 3.4 }, ...] }]
 * }
 */
import fs from 'node:fs';
import dagre from '@dagrejs/dagre';

function readInput() {
  const args = process.argv.slice(2);
  let filePath = null;
  let cliFit = null;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--fit' && args[i + 1]) {
      const parts = args[i + 1].split(',').map(Number);
      if (parts.length === 4 && parts.every((n) => !isNaN(n))) {
        cliFit = { x: parts[0], y: parts[1], width: parts[2], height: parts[3] };
      }
      i++;
    } else if (!args[i].startsWith('-')) {
      filePath = args[i];
    }
  }

  const raw = filePath ? fs.readFileSync(filePath, 'utf8') : fs.readFileSync(0, 'utf8');
  return { input: JSON.parse(raw), cliFit };
}

const round3 = (n) => Math.round(n * 1000) / 1000;

try {
  const { input, cliFit } = readInput();
  const fit = cliFit || input.fit || null;

  const g = new dagre.graphlib.Graph();
  g.setGraph({
    rankdir: input.direction || 'LR',
    nodesep: input.nodeSep ?? 50,
    ranksep: input.rankSep ?? 80,
    marginx: input.marginX ?? 20,
    marginy: input.marginY ?? 20,
  });
  g.setDefaultEdgeLabel(() => ({}));

  for (const node of input.nodes || []) {
    g.setNode(node.id, {
      width: node.width || 120,
      height: node.height || 50,
      label: node.label || node.id,
      ...node,
    });
  }

  for (const edge of input.edges || []) {
    g.setEdge(edge.from, edge.to, {
      label: edge.label || '',
      ...edge,
    });
  }

  dagre.layout(g);

  let rawNodes = g.nodes().map((id) => {
    const n = g.node(id);
    return {
      id,
      x: n.x,
      y: n.y,
      width: n.width,
      height: n.height,
      ...n,
    };
  });

  let rawEdges = g.edges().map((e) => {
    const edgeData = g.edge(e);
    return {
      from: e.v,
      to: e.w,
      points: edgeData.points || [],
      ...edgeData,
    };
  });

  const graphMeta = g.graph();
  let outputWidth = graphMeta.width || 0;
  let outputHeight = graphMeta.height || 0;

  if (fit && rawNodes.length > 0) {
    let minX = Infinity, maxX = -Infinity;
    let minY = Infinity, maxY = -Infinity;

    for (const n of rawNodes) {
      minX = Math.min(minX, n.x - n.width / 2);
      maxX = Math.max(maxX, n.x + n.width / 2);
      minY = Math.min(minY, n.y - n.height / 2);
      maxY = Math.max(maxY, n.y + n.height / 2);
    }
    for (const e of rawEdges) {
      for (const p of e.points) {
        minX = Math.min(minX, p.x);
        maxX = Math.max(maxX, p.x);
        minY = Math.min(minY, p.y);
        maxY = Math.max(maxY, p.y);
      }
    }

    const rawW = Math.max(maxX - minX, 1);
    const rawH = Math.max(maxY - minY, 1);
    const scale = Math.min(fit.width / rawW, fit.height / rawH);

    const scaledW = rawW * scale;
    const scaledH = rawH * scale;
    const offsetX = fit.x + (fit.width - scaledW) / 2 - minX * scale;
    const offsetY = fit.y + (fit.height - scaledH) / 2 - minY * scale;

    rawNodes = rawNodes.map((n) => {
      const scaledWNode = round3(n.width * scale);
      const scaledHNode = round3(n.height * scale);
      const centerX = round3(n.x * scale + offsetX);
      const centerY = round3(n.y * scale + offsetY);
      return {
        ...n,
        x: centerX,
        y: centerY,
        left: round3(centerX - scaledWNode / 2),
        top: round3(centerY - scaledHNode / 2),
        width: scaledWNode,
        height: scaledHNode,
      };
    });

    rawEdges = rawEdges.map((e) => ({
      ...e,
      points: (e.points || []).map((p) => ({
        x: round3(p.x * scale + offsetX),
        y: round3(p.y * scale + offsetY),
      })),
    }));

    outputWidth = round3(scaledW);
    outputHeight = round3(scaledH);
  } else {
    rawNodes = rawNodes.map((n) => ({
      ...n,
      left: round3(n.x - n.width / 2),
      top: round3(n.y - n.height / 2),
    }));
  }

  const output = {
    width: outputWidth,
    height: outputHeight,
    nodes: rawNodes,
    edges: rawEdges,
    ...(fit ? { fit: { ...fit, targetBounds: { width: outputWidth, height: outputHeight } } } : {}),
  };

  process.stdout.write(JSON.stringify(output, null, 2) + '\n');
} catch (error) {
  process.stderr.write(`ar-dagre-layout error: ${error instanceof Error ? error.message : String(error)}\n`);
  process.exit(1);
}

#!/usr/bin/env node
/**
 * ar-elk-layout - Layered & Port-Aware Graph Layout CLI using ELK.js.
 * 
 * Supports automatic scaling and fitting into a target PowerPoint canvas area (e.g. inches).
 * 
 * Input (file or stdin): JSON matching ELK JSON schema, with optional "fit":
 * {
 *   "id": "root",
 *   "fit": { "x": 0.8, "y": 1.7, "width": 11.7, "height": 4.8 }, // optional target bounding box (inches)
 *   "layoutOptions": {
 *     "elk.algorithm": "layered",
 *     "elk.direction": "RIGHT",
 *     "elk.spacing.nodeNode": 40
 *   },
 *   "children": [
 *     { "id": "n1", "width": 120, "height": 60, "labels": [{ "text": "Sender" }] },
 *     { "id": "n2", "width": 140, "height": 60, "labels": [{ "text": "Receiver" }] }
 *   ],
 *   "edges": [
 *     { "id": "e1", "sources": ["n1"], "targets": ["n2"] }
 *   ]
 * }
 * 
 * Output: JSON with resolved x, y, width, height for all children and bend points for edges.
 */
import fs from 'node:fs';
import ELK from 'elkjs';

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

function scalePoint(p, scale, offsetX, offsetY) {
  if (!p) return p;
  return {
    x: round3(p.x * scale + offsetX),
    y: round3(p.y * scale + offsetY),
  };
}

async function main() {
  try {
    const { input, cliFit } = readInput();
    const fit = cliFit || input.fit || null;
    const elk = new ELK();

    const layouted = await elk.layout(input);

    if (fit && layouted.children && layouted.children.length > 0) {
      const rawW = Math.max(layouted.width || 1, 1);
      const rawH = Math.max(layouted.height || 1, 1);
      const scale = Math.min(fit.width / rawW, fit.height / rawH);

      const scaledW = rawW * scale;
      const scaledH = rawH * scale;
      const offsetX = fit.x + (fit.width - scaledW) / 2;
      const offsetY = fit.y + (fit.height - scaledH) / 2;

      layouted.children = layouted.children.map((child) => ({
        ...child,
        x: round3(child.x * scale + offsetX),
        y: round3(child.y * scale + offsetY),
        width: round3(child.width * scale),
        height: round3(child.height * scale),
      }));

      if (Array.isArray(layouted.edges)) {
        layouted.edges = layouted.edges.map((edge) => {
          if (!Array.isArray(edge.sections)) return edge;
          return {
            ...edge,
            sections: edge.sections.map((sec) => ({
              ...sec,
              startPoint: scalePoint(sec.startPoint, scale, offsetX, offsetY),
              endPoint: scalePoint(sec.endPoint, scale, offsetX, offsetY),
              bendPoints: Array.isArray(sec.bendPoints)
                ? sec.bendPoints.map((bp) => scalePoint(bp, scale, offsetX, offsetY))
                : undefined,
            })),
          };
        });
      }

      layouted.width = round3(scaledW);
      layouted.height = round3(scaledH);
      layouted.fit = { ...fit, targetBounds: { width: layouted.width, height: layouted.height } };
    }

    process.stdout.write(JSON.stringify(layouted, null, 2) + '\n');
  } catch (error) {
    process.stderr.write(`ar-elk-layout error: ${error instanceof Error ? error.message : String(error)}\n`);
    process.exit(1);
  }
}

main();

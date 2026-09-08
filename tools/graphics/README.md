# Optional Workstation Graphics Toolchain

This directory provides optional CLI layout utilities for AI agents authoring diagrams and technical presentations.

## Architecture & Zero-Runtime Principle

- **Isolated Toolchain**: This folder has its own `package.json` and committed `package-lock.json`. It is **NOT** a dependency of `packages/kernel` or `@initforge/agent-rules`.
- **Unix Pipeline Pattern**: Agents do not `import` or `require` layout libraries inside PptxGenJS scripts. They pipe declarative graph JSON into the CLI and receive computed coordinates:
  ```
  semantic-graph.json ──> [ar-dagre-layout --fit 0.8,1.7,11.7,4.8] ──> layout.json { nodes: [left, top, width, height] } ──> PptxGenJS native shapes
  ```
- **Portability**: Once linked via `npm link`, the executables `ar-dagre-layout`, `ar-elk-layout`, and `ar-vega-svg` are globally available on the workstation PATH and runnable from any project directory.

## Tools Included

| CLI Command | Underlying Engine | Auto-Fit Support | Best Used For |
| :--- | :--- | :---: | :--- |
| `ar-dagre-layout` | `@dagrejs/dagre` | `--fit <x,y,w,h>` | Directed flows, sequential pipelines, sequence architectures (Left-to-Right). Computes `left` and `top` directly for PptxGenJS. |
| `ar-elk-layout` | `elkjs` | `--fit <x,y,w,h>` | Complex layered network topologies, nested graphs, port-aware hardware blocks. |
| `ar-vega-svg` | `vega-lite` + `vega` | N/A (SVG output) | Complex quantitative visualizations exported to SVG when native PPTX charts are insufficient. |

## Workstation Setup (One-time)

```bash
cd tools/graphics
npm ci
npm link
```

## PptxGenJS Integration Example

```js
import { execFileSync } from 'node:child_process';

const graphSpec = {
  direction: 'LR',
  fit: { x: 0.8, y: 1.7, width: 11.7, height: 4.8 }, // target box in slide inches
  nodes: [
    { id: 'client', width: 120, height: 60, label: 'Email Client' },
    { id: 'server', width: 120, height: 60, label: 'Mail Server' }
  ],
  edges: [
    { from: 'client', to: 'server', label: 'TCP Handshake' }
  ]
};

// Execute globally available layout CLI synchronously
const stdout = execFileSync('ar-dagre-layout', ['-'], {
  input: JSON.stringify(graphSpec),
  encoding: 'utf8'
});
const layout = JSON.parse(stdout);

// Draw computed native shapes directly in PptxGenJS (coordinates are already scaled to target slide inches)
for (const node of layout.nodes) {
  slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: node.left,
    y: node.top,
    w: node.width,
    h: node.height,
    fill: { color: 'FBF9F4' },
    line: { color: '24587B', width: 1.5 }
  });
  slide.addText(node.label, {
    x: node.left,
    y: node.top,
    w: node.width,
    h: node.height,
    align: 'center',
    valign: 'middle',
    fontSize: 14,
    bold: true
  });
}
```

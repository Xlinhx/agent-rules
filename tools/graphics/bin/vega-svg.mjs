#!/usr/bin/env node
/**
 * ar-vega-svg - Compile declarative Vega-Lite / Vega JSON specifications to SVG.
 * 
 * Input (file or stdin): Vega-Lite specification JSON.
 * Output: SVG string printed to stdout.
 * 
 * Usage:
 *   node bin/vega-svg.mjs chart.vl.json > chart.svg
 *   cat chart.vl.json | node bin/vega-svg.mjs > chart.svg
 */
import fs from 'node:fs';
import * as vega from 'vega';
import * as vegaLite from 'vega-lite';

function readInput() {
  const arg = process.argv[2];
  if (arg && arg !== '-') {
    return fs.readFileSync(arg, 'utf8');
  }
  return fs.readFileSync(0, 'utf8');
}

async function main() {
  try {
    const raw = readInput();
    const spec = JSON.parse(raw);

    // If it's a Vega-Lite spec, compile to Vega spec first
    const isVegaLite = spec.$schema?.includes('vega-lite') || spec.mark !== undefined || spec.encoding !== undefined;
    const vegaSpec = isVegaLite ? vegaLite.compile(spec).spec : spec;

    const runtime = vega.parse(vegaSpec);
    const view = new vega.View(runtime, { renderer: 'none' });
    const svg = await view.toSVG();

    process.stdout.write(svg + '\n');
  } catch (error) {
    process.stderr.write(`ar-vega-svg error: ${error instanceof Error ? error.message : String(error)}\n`);
    process.exit(1);
  }
}

main();

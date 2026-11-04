// Serializes rendered markup for a snapshot: one element per line, one
// attribute per line, so a change shows up as a small diff. Comments and
// whitespace-only text are dropped.

const INDENT = "  ";

const escapeText = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;");

const escapeAttribute = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/"/g, "&quot;");

// Path data has newlines and trailing spaces, which editors strip.
const collapseWhitespace = (value: string) => value.replace(/\s+/g, " ").trim();

// Coordinates come out with up to 17 significant digits
// (`69.44444444444444`). Two decimals is far below a pixel, keeps snapshots
// small, and keeps the d3 versions that round paths (d3-path 3.1 rounds to 3
// decimals) from changing every snapshot.
const roundNumbers = (value: string) =>
  value.replace(/-?\d+\.\d{3,}(e-?\d+)?/g, (number) =>
    String(Number(Number(number).toFixed(2)) || 0),
  );

const formatAttribute = (value: string) =>
  escapeAttribute(roundNumbers(collapseWhitespace(value)));

const serializeNode = (node: Node, depth: number): string[] => {
  const pad = INDENT.repeat(depth);

  if (node.nodeType === Node.TEXT_NODE) {
    const text = node.textContent?.trim();
    return text ? [`${pad}${escapeText(text)}`] : [];
  }
  if (node.nodeType !== Node.ELEMENT_NODE) {
    return [];
  }

  const element = node as Element;
  // `localName` keeps SVG's case (`clipPath`, `linearGradient`).
  const tag = element.localName;
  const attributes = Array.from(element.attributes).map(
    ({ name, value }) => `${pad}${INDENT}${name}="${formatAttribute(value)}"`,
  );
  const children = Array.from(element.childNodes).flatMap((child) =>
    serializeNode(child, depth + 1),
  );

  const open = attributes.length
    ? [`${pad}<${tag}`, ...attributes, `${pad}${children.length ? ">" : "/>"}`]
    : [`${pad}<${tag}${children.length ? ">" : " />"}`];
  return children.length ? [...open, ...children, `${pad}</${tag}>`] : open;
};

// Ids from lodash's `uniqueId` (`victory-container-12`, `victory-clip-3`,
// `tooltip-7`) count up across every story rendered in the page, so they
// depend on which stories ran before. Renumber them from 0 in the order they
// appear, per prefix, keeping references (`url(#victory-clip-0)`,
// `aria-labelledby`) consistent.
const GENERATED_ID = /\b(victory-container|victory-clip|tooltip)-(\d+)/g;

const normalizeIds = (markup: string) => {
  const ids = new Map<string, string>();
  const counts = new Map<string, number>();
  return markup.replace(GENERATED_ID, (id, prefix: string) => {
    let normalized = ids.get(id);
    if (normalized === undefined) {
      const count = counts.get(prefix) ?? 0;
      counts.set(prefix, count + 1);
      normalized = `${prefix}-${count}`;
      ids.set(id, normalized);
    }
    return normalized;
  });
};

export const serialize = (container: Element) =>
  normalizeIds(
    Array.from(container.childNodes)
      .flatMap((child) => serializeNode(child, 0))
      .join("\n") + "\n",
  );

"use client";
import katex from "katex";

interface Props {
  tex: string;
  block?: boolean;
}

export function Math({ tex, block = false }: Props) {
  const html = katex.renderToString(tex, {
    throwOnError: false,
    displayMode: block,
  });
  return block
    ? <div className="katex-block" dangerouslySetInnerHTML={{ __html: html }} />
    : <span dangerouslySetInnerHTML={{ __html: html }} />;
}

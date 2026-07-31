"use client";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

// Kept as its own module (rather than inline in ProjectMarkdown) so
// react-syntax-highlighter and its style table are only ever pulled into
// the bundle behind a dynamic import — this is one of the heaviest
// dependencies in the project and most project descriptions never even
// render a fenced code block.
export default function CodeBlock({
  code,
  language,
}: {
  code: string;
  language?: string;
}) {
  return (
    <SyntaxHighlighter
      language={language || "text"}
      style={oneDark}
      customStyle={{
        margin: 0,
        padding: "1rem",
        background: "#0f0f0f",
        fontSize: "0.8rem",
        lineHeight: 1.6,
      }}
      wrapLongLines
    >
      {code}
    </SyntaxHighlighter>
  );
}

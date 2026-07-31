"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import dynamic from "next/dynamic";
import MermaidDiagram from "./MermaidDiagram";

// react-syntax-highlighter (Prism build) is one of the heaviest packages in
// this project. Pulling it — and its style table — into the eagerly-loaded
// route chunk was adding real, measurable delay before the detail page
// became interactive, even though most project descriptions don't contain
// a single fenced code block. CodeBlock bundles the highlighter with the
// style it needs and is fetched only once a code block actually needs to
// render, client-side only (no SSR benefit for syntax highlighting).
const CodeBlock = dynamic(() => import("./CodeBlock"), {
  ssr: false,
  loading: () => (
    <div className="h-24 animate-pulse rounded-lg bg-white/[0.03]" />
  ),
});

// Renders a project's freeform `description` field as real markdown —
// headings, lists, tables, links, inline code, fenced code blocks with
// syntax highlighting, and ```mermaid fenced blocks as rendered diagrams.
export default function ProjectMarkdown({ content }: { content: string }) {
  return (
    <div className="project-markdown text-sm leading-relaxed text-foreground/80">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h3 className="mt-6 mb-2 font-mono text-base font-semibold text-foreground first:mt-0">
              {children}
            </h3>
          ),
          h2: ({ children }) => (
            <h3 className="mt-6 mb-2 font-mono text-sm font-semibold tracking-wide text-foreground first:mt-0">
              {children}
            </h3>
          ),
          h3: ({ children }) => (
            <h4 className="mt-5 mb-2 font-mono text-sm font-semibold text-foreground/90 first:mt-0">
              {children}
            </h4>
          ),
          p: ({ children }) => (
            <p className="mb-3 leading-relaxed last:mb-0">{children}</p>
          ),
          ul: ({ children }) => (
            <ul className="mb-3 ml-5 list-disc space-y-1.5 marker:text-accent/60">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="mb-3 ml-5 list-decimal space-y-1.5 marker:text-accent/60">
              {children}
            </ol>
          ),
          li: ({ children }) => <li className="pl-1">{children}</li>,
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline decoration-accent/30 underline-offset-2 transition-colors hover:decoration-accent"
            >
              {children}
            </a>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-foreground">{children}</strong>
          ),
          em: ({ children }) => <em className="text-foreground/90">{children}</em>,
          blockquote: ({ children }) => (
            <blockquote className="my-3 border-l-2 border-accent/40 pl-4 text-foreground/60 italic">
              {children}
            </blockquote>
          ),
          hr: () => <hr className="my-6 border-white/6" />,
          table: ({ children }) => (
            <div className="my-4 overflow-x-auto rounded border border-white/6">
              <table className="w-full border-collapse font-mono text-xs">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-white/[0.04] text-muted">{children}</thead>
          ),
          th: ({ children }) => (
            <th className="border-b border-white/6 px-3 py-2 text-left tracking-wider">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border-b border-white/[0.03] px-3 py-2 text-foreground/70">
              {children}
            </td>
          ),
          code(props) {
            const { children, className, ...rest } = props;
            const match = /language-(\w+)/.exec(className || "");
            const isInline = !match && !String(children).includes("\n");
            const lang = match?.[1];

            if (isInline) {
              return (
                <code
                  className="rounded bg-white/8 px-1.5 py-0.5 font-mono text-[0.85em] text-accent"
                  {...rest}
                >
                  {children}
                </code>
              );
            }

            const codeString = String(children).replace(/\n$/, "");

            if (lang === "mermaid") {
              return <MermaidDiagram chart={codeString} />;
            }

            return (
              <div className="my-4 overflow-hidden rounded-lg border border-white/6">
                {lang && (
                  <div className="border-b border-white/6 bg-white/[0.03] px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-muted">
                    {lang}
                  </div>
                )}
                <CodeBlock code={codeString} language={lang} />
              </div>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

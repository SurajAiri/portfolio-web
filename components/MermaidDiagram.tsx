"use client";

import { useEffect, useId, useRef, useState } from "react";

export default function MermaidDiagram({ chart }: { chart: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const rawId = useId();
  const id = `mermaid-${rawId.replace(/[:]/g, "")}`;
  const [error, setError] = useState<string | null>(null);
  const [svg, setSvg] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function render() {
      try {
        const mermaid = (await import("mermaid")).default;

        mermaid.initialize({
          startOnLoad: false,
          theme: "dark",
          themeVariables: {
            background: "#0a0a0a",
            primaryColor: "#0f0f0f",
            primaryTextColor: "#ededed",
            primaryBorderColor: "#22c55e",
            lineColor: "#71717a",
            secondaryColor: "#141414",
            tertiaryColor: "#0f0f0f",
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: "13px",
          },
          securityLevel: "strict",
        });

        const { svg: renderedSvg } = await mermaid.render(id, chart);
        if (!cancelled) {
          setSvg(renderedSvg);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to render diagram");
        }
      }
    }

    render();
    return () => {
      cancelled = true;
    };
  }, [chart, id]);

  if (error) {
    return (
      <div className="my-4 rounded border border-red-500/20 bg-red-500/5 px-4 py-3 font-mono text-xs text-red-400/80">
        Diagram failed to render: {error}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className="mermaid-wrapper my-6 overflow-x-auto rounded-lg border border-white/6 bg-card/60 p-4"
      dangerouslySetInnerHTML={svg ? { __html: svg } : undefined}
    >
      {!svg && (
        <div className="flex items-center justify-center py-8 font-mono text-xs text-muted">
          Rendering diagram…
        </div>
      )}
    </div>
  );
}

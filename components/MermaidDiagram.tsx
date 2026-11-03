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
            background: "#0b1411",
            primaryColor: "#101b17",
            primaryTextColor: "#e9f0ec",
            primaryBorderColor: "#4fd9a0",
            lineColor: "#7f9088",
            secondaryColor: "#15241f",
            tertiaryColor: "#101b17",
            fontFamily: "var(--font-instrument), system-ui, sans-serif",
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
      <div className="my-4 rounded border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-400/80">
        Diagram failed to render: {error}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className="mermaid-wrapper my-6 overflow-x-auto rounded-lg border border-border bg-card p-4"
      dangerouslySetInnerHTML={svg ? { __html: svg } : undefined}
    >
      {!svg && (
        <div className="flex items-center justify-center py-8 text-sm text-muted">
          Rendering diagram…
        </div>
      )}
    </div>
  );
}

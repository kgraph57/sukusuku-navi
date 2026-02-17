import type { MDXComponents } from "mdx/types";
import { QaBubble } from "@/components/article/qa-block";

function extractSpeaker(
  text: string,
): { speaker: string; message: string } | null {
  const match = text.match(/^\*\*(.+?)\*\*[「『](.+)[」』]$/);
  if (match) {
    return { speaker: match[1], message: match[2] };
  }

  const matchSimple = text.match(/^\*\*(.+?)\*\*(.+)$/);
  if (matchSimple) {
    return { speaker: matchSimple[1], message: matchSimple[2] };
  }

  return null;
}

function isKeyPointsBlockquote(children: React.ReactNode): boolean {
  if (!children) return false;
  const text = getTextContent(children);
  return text.includes("今号のポイント") || text.includes("ポイント");
}

function getTextContent(node: React.ReactNode): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (!node) return "";
  if (Array.isArray(node)) return node.map(getTextContent).join("");
  if (typeof node === "object" && "props" in node) {
    const element = node as { props: { children?: React.ReactNode } };
    return getTextContent(element.props.children);
  }
  return "";
}

export function createMdxComponents(): MDXComponents {
  return {
    h1: (props) => (
      <h1
        className="mb-6 mt-10 font-heading text-2xl font-bold text-foreground sm:text-3xl"
        {...props}
      />
    ),
    h2: (props) => (
      <h2
        className="mb-4 mt-8 font-heading text-xl font-bold text-foreground sm:text-2xl"
        {...props}
      />
    ),
    h3: (props) => (
      <h3
        className="mb-3 mt-6 font-heading text-lg font-bold text-foreground"
        {...props}
      />
    ),
    p: (props) => {
      const text = getTextContent(props.children);

      const qaMatch = extractSpeaker(text);
      if (qaMatch) {
        return (
          <div className="my-3">
            <QaBubble speaker={qaMatch.speaker}>
              <span
                dangerouslySetInnerHTML={{
                  __html: qaMatch.message
                    .replace(
                      /\*\*(.+?)\*\*/g,
                      '<strong class="font-bold">$1</strong>',
                    )
                    .replace(
                      /\[(\d+)\]/g,
                      '<sup class="text-xs text-teal-600">[$1]</sup>',
                    ),
                }}
              />
            </QaBubble>
          </div>
        );
      }

      return (
        <p
          className="my-3 text-sm leading-relaxed text-foreground sm:text-base"
          {...props}
        />
      );
    },
    strong: (props) => (
      <strong className="font-bold text-foreground" {...props} />
    ),
    em: (props) => <em className="italic text-muted" {...props} />,
    blockquote: (props) => {
      const isKeyPoints = isKeyPointsBlockquote(props.children);

      if (isKeyPoints) {
        return (
          <div className="my-6 rounded-xl border-2 border-teal-200 bg-teal-50/50 p-5">
            <div className="prose-sm text-foreground [&>p]:my-1 [&>p]:text-sm [&_strong]:font-bold [&_strong]:text-teal-800 [&_ol]:mt-2 [&_ol]:space-y-1 [&_ol]:text-sm [&_li]:text-sm">
              {props.children}
            </div>
          </div>
        );
      }

      return (
        <blockquote className="my-6 rounded-lg border-l-4 border-teal-300 bg-teal-50/30 py-3 pl-4 pr-3 text-sm leading-relaxed text-foreground [&>p]:my-1 [&_strong]:font-bold [&_strong]:text-teal-800 [&_ul]:mt-2 [&_ul]:space-y-1 [&_li]:text-sm">
          {props.children}
        </blockquote>
      );
    },
    ul: (props) => (
      <ul
        className="my-4 space-y-2 pl-5 text-sm leading-relaxed text-foreground [&>li]:list-disc"
        {...props}
      />
    ),
    ol: (props) => (
      <ol
        className="my-4 space-y-2 pl-5 text-sm leading-relaxed text-foreground [&>li]:list-decimal"
        {...props}
      />
    ),
    li: (props) => <li className="pl-1" {...props} />,
    hr: () => <hr className="my-8 border-border" />,
    a: (props) => (
      <a
        className="text-teal-600 underline underline-offset-2 hover:text-teal-700"
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      />
    ),
    table: (props) => (
      <div className="my-6 overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-sm" {...props} />
      </div>
    ),
    th: (props) => (
      <th
        className="border-b border-border bg-teal-50 px-4 py-2 text-left font-medium text-foreground"
        {...props}
      />
    ),
    td: (props) => (
      <td className="border-b border-border px-4 py-2 text-muted" {...props} />
    ),
    sup: (props) => <sup className="text-xs text-teal-600" {...props} />,
  };
}

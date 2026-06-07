"use client";

import {
  siVercel, siN8n, siZapier, siMake, siAircall, siCursor,
} from "simple-icons";
import Image from "next/image";

const appleFont =
  "-apple-system, 'SF Pro Display', BlinkMacSystemFont, 'Helvetica Neue', sans-serif";

type Tool =
  | { name: string; type: "svg"; path: string; color: string }
  | { name: string; type: "img"; src: string; size?: number }
  | { name: string; type: "text"; color: string };

const tools: Tool[] = [
  { name: "Claude",     type: "img",  src: "/claude-icon-logo.png" },
  { name: "Google",     type: "img",  src: "/Google_Favicon_2025.svg.png", size: 36 },
  { name: "ChatGPT",    type: "img",  src: "/ChatGPT-Logo.png", size: 52 },
  { name: "Cursor",     type: "svg",  path: siCursor.path,   color: "#000000" },
  { name: "Vercel",     type: "svg",  path: siVercel.path,   color: `#${siVercel.hex}` },
  { name: "Salesforce", type: "img",  src: "/new-salesforce-logo-blue-png-large-size.png" },
  { name: "Airtable",   type: "img",  src: "/airtable-icon.webp", size: 36 },
  { name: "n8n",        type: "svg",  path: siN8n.path,      color: `#${siN8n.hex}` },
  { name: "Make",       type: "svg",  path: siMake.path,     color: `#${siMake.hex}` },
  { name: "Zapier",     type: "svg",  path: siZapier.path,   color: `#${siZapier.hex}` },
  { name: "Aircall",    type: "svg",  path: siAircall.path,  color: `#${siAircall.hex}` },
  { name: "Outlook",    type: "img",  src: "/Microsoft_Outlook_Icon_(2025–present).svg.png", size: 32 },
  { name: "Gong",       type: "img",  src: "/_solution_logo_12072022_43587053.png", size: 36 },
  { name: "HubSpot",    type: "img",  src: "/hubspot.png", size: 36 },
];

const COLS = 7;

export function ToolsSection({ maxWidth: _ }: { maxWidth: string }) {
  const total = tools.length;

  return (
    <div style={{ width: "100%", marginTop: "2rem" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        <h2 style={{
          fontFamily: appleFont,
          fontWeight: 700,
          fontSize: "clamp(1.3rem, 2vw, 1.75rem)",
          letterSpacing: "-0.03em",
          lineHeight: 1.08,
          color: "#1d1d1f",
        }}>
          Unser Werkzeugkasten.
        </h2>

        {/* Grid container */}
        <div style={{
          border: "1px solid #e5e5ea",
          borderRadius: "20px",
          overflow: "hidden",
          display: "grid",
          gridTemplateColumns: `repeat(${COLS}, 1fr)`,
        }}>
          {tools.map((tool, i) => {
            const isLastCol = (i + 1) % COLS === 0;
            const isLastRow = i >= total - (total % COLS || COLS);
            return (
              <div
                key={tool.name}
                title={tool.name}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100px",
                  borderRight: isLastCol ? "none" : "1px solid #e5e5ea",
                  borderBottom: isLastRow ? "none" : "1px solid #e5e5ea",
                  transition: "background 0.15s ease",
                  cursor: "default",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#f5f5f7")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "transparent")}
              >
                {tool.type === "img" && (
                  <Image
                    src={tool.src}
                    alt={tool.name}
                    width={tool.size ?? 32}
                    height={tool.size ?? 32}
                    style={{ objectFit: "contain", width: tool.size ?? 32, height: tool.size ?? 32 }}
                  />
                )}
                {tool.type === "svg" && (
                  <svg viewBox="0 0 24 24" width="32" height="32" fill={tool.color} xmlns="http://www.w3.org/2000/svg">
                    <path d={tool.path} />
                  </svg>
                )}
                {tool.type === "text" && (
                  <span style={{
                    fontFamily: appleFont,
                    fontWeight: 700,
                    fontSize: "0.68rem",
                    color: tool.color,
                    letterSpacing: "-0.02em",
                    textAlign: "center",
                    lineHeight: 1.2,
                  }}>
                    {tool.name}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FlowLogo } from "@/components/FlowLogo";
import { ToolsSection } from "@/components/ToolsSection";
import { ChatWidget } from "@/components/ChatWidget";

const appleFont =
  "-apple-system, 'SF Pro Display', BlinkMacSystemFont, 'Helvetica Neue', sans-serif";

const services: Record<string, { headline: string; description: string }> = {
  "Prozessanalyse & Automatisierungs-Audit": {
    headline: "Verstehe deine Prozesse. Finde den größten Hebel.",
    description: "Wir analysieren deine bestehenden Abläufe, identifizieren Engpässe und zeigen transparent auf, wo Automatisierung den größten ROI schafft.",
  },
  "KI-gestützte Automatisierung": {
    headline: "Intelligente Workflows, die für dich arbeiten.",
    description: "Wir entwickeln maßgeschneiderte Automatisierungen, die wiederkehrende Aufgaben übernehmen, damit dein Team sich auf das Wesentliche konzentriert.",
  },
  "Vertrieb, Marketing & Backoffice": {
    headline: "Mehr Output. Weniger Aufwand.",
    description: "Wir verbinden deine Systeme für Lead-Management, Kundenkommunikation und Reporting und reduzieren manuellen Aufwand dauerhaft.",
  },
  "Integration bestehender Systeme": {
    headline: "Deine Tools. Nahtlos verbunden.",
    description: "Wir sorgen dafür, dass deine bestehenden Anwendungen automatisch miteinander kommunizieren und keine doppelte Dateneingabe mehr nötig ist.",
  },
  "Schulung & Begleitung": {
    headline: "Dein Team ist bereit. Wir sorgen dafür.",
    description: "Wir begleiten die Einführung neuer Prozesse und schulen dein Team, damit neue Lösungen langfristig erfolgreich genutzt werden.",
  },
};

const serviceKeys = Object.keys(services);

const MAX_W = "900px";

export default function Home() {
  const router = useRouter();
  const [selected, setSelected] = useState<Set<string>>(new Set());

  function toggle(label: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(label) ? next.delete(label) : next.add(label);
      return next;
    });
  }

  const activeCards = serviceKeys.filter((k) => selected.has(k));

  return (
    <>
      {/* Nav */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0,
        display: "flex", alignItems: "center",
        justifyContent: "center",
        background: "rgba(255,255,255,0.85)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        zIndex: 50,
      }}>
        <div style={{
          width: "100%", maxWidth: MAX_W,
          display: "flex", alignItems: "center",
          padding: "1.1rem 2.5rem",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
            <FlowLogo size={46} />
            <span style={{
              fontFamily: appleFont,
              fontWeight: 600,
              fontSize: "1.4rem",
              letterSpacing: "-0.03em",
              color: "#1d1d1f",
            }}>
              Flowhaus
            </span>
          </div>
        </div>
      </nav>

      {/* Page */}
      <div
        className="min-h-screen flex flex-col justify-center"
        style={{
          fontFamily: appleFont,
          background: "#ffffff",
          paddingTop: "7rem",
          paddingBottom: "2rem",
        }}
      >
        {/* Centered column, left-aligned content */}
        <div style={{
          width: "100%",
          maxWidth: MAX_W,
          margin: "0 auto",
          padding: "0 2.5rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "2.5rem",
        }}>

          <h1 style={{
            fontWeight: 700,
            fontSize: "clamp(2rem, 4.5vw, 4rem)",
            letterSpacing: "-0.03em",
            lineHeight: 1.08,
            color: "#1d1d1f",
            textAlign: "left",
            maxWidth: "18ch",
          }}>
            Wo siehst du das größte Potenzial in deinem Unternehmen?
          </h1>

          <p style={{
            fontSize: "1.75rem",
            fontWeight: 500,
            color: "#6e6e73",
            letterSpacing: "-0.02em",
            marginTop: "-1rem",
          }}>
            Du kannst mehrere auswählen. Und dann lass uns gerne sprechen.
          </p>

          {/* Buttons */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", maxWidth: "600px" }}>
            {serviceKeys.map((label) => (
              <ServiceButton key={label} label={label} selected={selected} toggle={toggle} />
            ))}
          </div>

          {/* Info cards */}
          {activeCards.length > 0 && (
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", width: "100%" }}>
              {activeCards.map((key) => {
                const card = services[key];
                return (
                  <div
                    key={key}
                    style={{
                      background: "#f5f5f7",
                      borderRadius: "20px",
                      padding: "2rem",
                      flex: "1 1 260px",
                      maxWidth: "380px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "1rem",
                      animation: "fadeSlideUp 0.3s ease",
                    }}
                  >
                    <span style={{
                      alignSelf: "flex-start",
                      fontFamily: appleFont,
                      fontSize: "0.78rem",
                      fontWeight: 500,
                      color: "#0071e3",
                      background: "#e8f1fb",
                      borderRadius: "980px",
                      padding: "0.3rem 0.85rem",
                      letterSpacing: "-0.01em",
                      whiteSpace: "nowrap",
                    }}>
                      {key}
                    </span>
                    <h2 style={{
                      fontSize: "clamp(1.15rem, 1.8vw, 1.5rem)",
                      fontWeight: 700,
                      letterSpacing: "-0.03em",
                      lineHeight: 1.15,
                      color: "#1d1d1f",
                    }}>
                      {card.headline}
                    </h2>
                    <p style={{ fontSize: "1rem", color: "#6e6e73", lineHeight: 1.65 }}>
                      {card.description}
                    </p>
                  </div>
                );
              })}
            </div>
          )}

          {/* Situation prompt */}
          <ChatWidget />

          {/* CTA */}
          <button
            onClick={() => {
              const params = selected.size > 0
                ? `?services=${encodeURIComponent(Array.from(selected).join("||"))}`
                : "";
              router.push(`/kennenlernen${params}`);
            }}
            style={{
              fontFamily: appleFont,
              fontSize: "1.05rem",
              fontWeight: 600,
              color: "#fff",
              background: "#0071e3",
              border: "none",
              outline: "none",
              borderRadius: "980px",
              letterSpacing: "-0.01em",
              padding: "0.9rem 2.2rem",
              cursor: "pointer",
              transition: "opacity 0.15s",
              alignSelf: "flex-start",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Kennenlernen vereinbaren&ensp;›
          </button>

          <ToolsSection maxWidth={MAX_W} />
        </div>
      </div>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid #e5e5ea", background: "#ffffff" }}>
        <div style={{
          maxWidth: MAX_W, margin: "0 auto",
          padding: "3.5rem 2.5rem",
          display: "flex", flexDirection: "column", gap: "1.5rem",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
            <FlowLogo size={46} />
            <span style={{
              fontFamily: appleFont,
              fontWeight: 600,
              fontSize: "1.4rem",
              letterSpacing: "-0.03em",
              color: "#1d1d1f",
            }}>
              Flowhaus
            </span>
          </div>
          <p style={{
            fontFamily: appleFont,
            fontSize: "1rem",
            color: "#6e6e73",
            lineHeight: 1.6,
            maxWidth: "50ch",
          }}>
            B2B Digitalberatung & Automatisierungslösungen für nachhaltige Unternehmensentwicklung.
          </p>
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            paddingTop: "1rem",
            borderTop: "1px solid #e5e5ea",
          }}>
            <p style={{ fontFamily: appleFont, fontSize: "0.875rem", color: "#6e6e73" }}>
              © 2026 Flowhaus GmbH. Alle Rechte vorbehalten.
            </p>
            <Link href="/impressum" style={{
              fontFamily: appleFont,
              fontSize: "0.875rem",
              color: "#6e6e73",
              textDecoration: "none",
            }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#1d1d1f")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#6e6e73")}
            >
              Impressum
            </Link>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}

function ServiceButton({ label, selected, toggle }: {
  label: string;
  selected: Set<string>;
  toggle: (l: string) => void;
}) {
  const isSelected = selected.has(label);
  return (
    <button
      onClick={() => toggle(label)}
      className="transition-all duration-200 cursor-pointer"
      style={{
        position: "relative",
        fontFamily: appleFont,
        fontWeight: 500,
        fontSize: "1.05rem",
        letterSpacing: "-0.01em",
        color: isSelected ? "#ffffff" : "#0071e3",
        background: isSelected ? "#0071e3" : "#e8f1fb",
        border: "none",
        borderRadius: "980px",
        padding: "0.8rem 1.6rem",
        paddingLeft: isSelected ? "2.6rem" : "1.6rem",
        outline: "none",
        whiteSpace: "nowrap",
        transition: "all 0.2s ease",
      }}
    >
      {isSelected && (
        <span style={{
          position: "absolute",
          left: "0.75rem",
          top: "50%",
          transform: "translateY(-50%)",
          width: "18px",
          height: "18px",
          borderRadius: "50%",
          background: "rgba(255,255,255,0.25)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "0.65rem",
          color: "#ffffff",
          lineHeight: 1,
          flexShrink: 0,
        }}>
          ✓
        </span>
      )}
      {label}
    </button>
  );
}

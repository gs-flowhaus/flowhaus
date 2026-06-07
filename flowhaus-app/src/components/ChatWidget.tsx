"use client";

import React from "react";
import { ArrowUp } from "lucide-react";

const appleFont =
  "-apple-system, 'SF Pro Display', BlinkMacSystemFont, 'Helvetica Neue', sans-serif";

export function ChatWidget() {
  const [value, setValue] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);
  const [situation, setSituation] = React.useState("");
  const [pressed, setPressed] = React.useState(false);

  const handleSubmit = () => {
    if (!value.trim()) return;
    setSituation(value.trim());
    setSubmitted(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div style={{ width: "100%" }}>
      {!submitted ? (
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "0.85rem",
          background: "#f5f5f7",
          borderRadius: "980px",
          padding: "0.6rem 0.6rem 0.6rem 1.5rem",
        }}>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Oder beschreib kurz wo konkret du Potenzial siehst, dass du angehen willst."
            style={{
              flex: 1,
              background: "none",
              border: "none",
              outline: "none",
              fontFamily: appleFont,
              fontSize: "1.05rem",
              fontWeight: 400,
              color: "#1d1d1f",
              letterSpacing: "-0.01em",
              minWidth: 0,
            }}
          />
          <button
            onClick={handleSubmit}
            disabled={!value.trim()}
            onMouseDown={() => value.trim() && setPressed(true)}
            onMouseUp={() => setPressed(false)}
            onMouseLeave={() => setPressed(false)}
            style={{
              flexShrink: 0,
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              background: value.trim() ? "#0071e3" : "#e8f1fb",
              border: "none",
              cursor: value.trim() ? "pointer" : "default",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background 0.15s",
            }}
          >
            <ArrowUp size={18} strokeWidth={2.8} color={value.trim() ? "#ffffff" : "#0071e3"} />
          </button>
        </div>
      ) : (
        <div
          style={{
            background: "#f5f5f7",
            borderRadius: "20px",
            padding: "1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.6rem",
            animation: "fadeSlideUp 0.25s ease",
            fontFamily: appleFont,
          }}
        >
          <p style={{ fontSize: "0.82rem", color: "#b0b0b5", letterSpacing: "-0.01em" }}>
            Deine Situation
          </p>
          <p style={{
            fontSize: "1rem",
            color: "#1d1d1f",
            lineHeight: 1.6,
            letterSpacing: "-0.01em",
          }}>
            &ldquo;{situation}&rdquo;
          </p>
          <p style={{ fontSize: "0.92rem", color: "#6e6e73", letterSpacing: "-0.01em", marginTop: "0.25rem" }}>
            Danke. Lass uns das gemeinsam anschauen.
          </p>
        </div>
      )}
    </div>
  );
}

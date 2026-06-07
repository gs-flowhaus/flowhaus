"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const appleFont =
  "-apple-system, 'SF Pro Display', BlinkMacSystemFont, 'Helvetica Neue', sans-serif";

const flowSteps = [
  {
    question: "Wo liegt in eurem Unternehmen aktuell die größte Herausforderung?",
    subtitle: "Mehrfachauswahl möglich",
    multi: true,
    options: [
      "Keine Klarheit über KI-Potenziale",
      "Fehlende Prozesse & Strukturen",
      "Zu wenig Zeit & Ressourcen",
      "Kein skalierbares Wachstum",
    ],
  },
  {
    question: "Wie groß ist euer Team?",
    subtitle: null,
    multi: false,
    options: ["1–10 Personen", "11–50 Personen", "51–200 Personen", "200+ Personen"],
  },
  {
    question: "Wie vertraut seid ihr mit KI & Automatisierung?",
    subtitle: null,
    multi: false,
    options: [
      "Noch ganz am Anfang",
      "Haben erste Tools ausprobiert",
      "Nutzen bereits einzelne Lösungen",
      "Suchen nach systematischer Skalierung",
    ],
  },
];

// Step -1 = pre-step (selected services from main page)
// Steps 0–2 = flow questions
// Step 3 = contact
// Step 4 = done
const ALL_SERVICES = [
  "Prozessanalyse & Automatisierungs-Audit",
  "KI-gestützte Automatisierung",
  "Vertrieb, Marketing & Backoffice",
  "Integration bestehender Systeme",
  "Schulung & Begleitung",
];

const CONTACT_STEP = flowSteps.length;
const DONE_STEP = flowSteps.length + 1;

function KennenlernenInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const raw = searchParams.get("services");
  const preSelected: string[] = raw ? raw.split("||").filter(Boolean) : [];
  const hasPreStep = preSelected.length > 0;

  const [step, setStep] = useState(hasPreStep ? -1 : 0);
  const [serviceSelection, setServiceSelection] = useState<Set<string>>(new Set(preSelected));
  const [answers, setAnswers] = useState<Record<number, Set<string>>>({});
  const [contact, setContact] = useState({ name: "", company: "", email: "" });
  const [animKey, setAnimKey] = useState(0);

  function advance() {
    setAnimKey((k) => k + 1);
    setStep((s) => s + 1);
  }

  function goBack() {
    if (step === (hasPreStep ? -1 : 0)) {
      router.back();
    } else {
      setAnimKey((k) => k + 1);
      setStep((s) => s - 1);
    }
  }

  function toggleOption(option: string) {
    setAnswers((prev) => {
      const current = new Set(prev[step] ?? []);
      const isMulti = flowSteps[step]?.multi;
      if (isMulti) {
        current.has(option) ? current.delete(option) : current.add(option);
        return { ...prev, [step]: current };
      } else {
        return { ...prev, [step]: new Set([option]) };
      }
    });
    if (!flowSteps[step]?.multi) {
      setTimeout(() => {
        setAnimKey((k) => k + 1);
        setStep((s) => s + 1);
      }, 160);
    }
  }

  function submitContact(e: React.FormEvent) {
    e.preventDefault();
    setAnimKey((k) => k + 1);
    setStep(DONE_STEP);
  }

  const currentAnswers = answers[step] ?? new Set<string>();
  const hasAnswer = currentAnswers.size > 0;

  // Progress: pre-step counts as 0%, flow steps = 1–3, contact = 4
  const totalDots = flowSteps.length + 1;
  const currentDot = step < 0 ? 0 : Math.min(step, totalDots - 1);
  const progressPct = step < 0
    ? 0
    : step >= CONTACT_STEP
      ? 100
      : ((step + 1) / flowSteps.length) * 85;

  const stepLabel = step < 0
    ? "Deine Auswahl"
    : step < CONTACT_STEP
      ? `Schritt ${step + 1} von ${flowSteps.length}`
      : "Fast geschafft";

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ fontFamily: appleFont, background: "#ffffff" }}
    >
      {/* Top bar */}
      {step < DONE_STEP && (
        <div style={{ padding: "2rem 2.5rem 0", maxWidth: "720px", width: "100%", margin: "0 auto" }}>
          <div className="flex items-center justify-between" style={{ marginBottom: "0.6rem" }}>
            <span style={{ fontSize: "0.88rem", color: "#6e6e73", letterSpacing: "-0.01em" }}>
              {stepLabel}
            </span>
            <button
              onClick={goBack}
              style={{
                background: "none", border: "none", cursor: "pointer",
                color: "#6e6e73", fontSize: "0.88rem", fontFamily: appleFont, padding: 0,
              }}
            >
              ← Zurück
            </button>
          </div>
          <div style={{ height: "4px", background: "#e5e5ea", borderRadius: "980px", overflow: "hidden" }}>
            <div
              style={{
                height: "100%",
                width: step < 0 ? "4px" : `${progressPct}%`,
                background: "#0071e3",
                borderRadius: "980px",
                transition: "width 0.4s ease",
              }}
            />
          </div>
        </div>
      )}

      {/* Content */}
      <div
        className="flex flex-col flex-1 items-center justify-center px-6 py-12"
        style={{ maxWidth: "720px", width: "100%", margin: "0 auto" }}
      >

        {/* ── Pre-step: confirm + extend service selection ── */}
        {step === -1 && (
          <div key="pre" className="w-full flex flex-col gap-8" style={{ animation: "fadeSlideUp 0.28s ease" }}>
            <div className="flex flex-col gap-2">
              <h1 style={{
                fontWeight: 700,
                fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
                letterSpacing: "-0.03em",
                lineHeight: 1.12,
                color: "#1d1d1f",
              }}>
                Schön, dass du da bist.
              </h1>
              <p style={{ color: "#6e6e73", fontSize: "1.05rem", lineHeight: 1.55 }}>
                Passe deine Auswahl noch an, falls du möchtest.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              {ALL_SERVICES.map((service) => {
                const isSelected = serviceSelection.has(service);
                return (
                  <button
                    key={service}
                    onClick={() => {
                      setServiceSelection((prev) => {
                        const next = new Set(prev);
                        next.has(service) ? next.delete(service) : next.add(service);
                        return next;
                      });
                    }}
                    className="cursor-pointer transition-all duration-150 text-left"
                    style={{
                      fontFamily: appleFont,
                      display: "flex",
                      alignItems: "center",
                      gap: "0.85rem",
                      padding: "1rem 1.25rem",
                      background: isSelected ? "#0071e3" : "#f5f5f7",
                      border: "1.5px solid",
                      borderColor: isSelected ? "#0071e3" : "transparent",
                      borderRadius: "14px",
                      outline: "none",
                      width: "100%",
                    }}
                  >
                    <span style={{
                      width: "22px", height: "22px", borderRadius: "50%",
                      background: isSelected ? "rgba(255,255,255,0.25)" : "#e0e0e5",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0,
                      fontSize: "0.7rem",
                      color: isSelected ? "#fff" : "transparent",
                      transition: "all 0.15s",
                    }}>
                      ✓
                    </span>
                    <span style={{
                      fontSize: "1rem",
                      color: isSelected ? "#ffffff" : "#1d1d1f",
                      letterSpacing: "-0.01em",
                    }}>
                      {service}
                    </span>
                  </button>
                );
              })}
            </div>
            <button
              onClick={advance}
              style={{
                fontFamily: appleFont,
                alignSelf: "flex-start",
                fontSize: "1.05rem",
                fontWeight: 600,
                color: "#fff",
                background: "#0071e3",
                border: "none",
                borderRadius: "980px",
                padding: "0.9rem 2.2rem",
                cursor: "pointer",
                letterSpacing: "-0.01em",
              }}
            >
              Weiter&ensp;→
            </button>
          </div>
        )}

        {/* ── Question steps ── */}
        {step >= 0 && step < CONTACT_STEP && (
          <div key={animKey} className="w-full flex flex-col gap-8" style={{ animation: "fadeSlideUp 0.28s ease" }}>
            <div className="flex flex-col gap-2">
              <h1 style={{
                fontWeight: 700,
                fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
                letterSpacing: "-0.03em",
                lineHeight: 1.12,
                color: "#1d1d1f",
                textAlign: "center",
              }}>
                {flowSteps[step].question}
              </h1>
              {flowSteps[step].subtitle && (
                <p style={{ textAlign: "center", color: "#6e6e73", fontSize: "1rem", letterSpacing: "-0.01em" }}>
                  {flowSteps[step].subtitle}
                </p>
              )}
            </div>
            <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              {flowSteps[step].options.map((opt) => {
                const isSelected = currentAnswers.has(opt);
                return (
                  <button
                    key={opt}
                    onClick={() => toggleOption(opt)}
                    className="cursor-pointer transition-all duration-150 text-left"
                    style={{
                      fontFamily: appleFont,
                      fontSize: "1.05rem",
                      fontWeight: 400,
                      letterSpacing: "-0.01em",
                      color: isSelected ? "#ffffff" : "#1d1d1f",
                      background: isSelected ? "#0071e3" : "#f5f5f7",
                      border: "1.5px solid",
                      borderColor: isSelected ? "#0071e3" : "transparent",
                      borderRadius: "16px",
                      padding: "1.4rem 1.4rem",
                      outline: "none",
                      lineHeight: 1.35,
                    }}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
            {flowSteps[step].multi && (
              <button
                onClick={advance}
                disabled={!hasAnswer}
                style={{
                  fontFamily: appleFont,
                  alignSelf: "center",
                  fontSize: "1.05rem",
                  fontWeight: 600,
                  color: "#fff",
                  background: hasAnswer ? "#0071e3" : "#b0c9ef",
                  border: "none",
                  borderRadius: "980px",
                  padding: "0.9rem 2.2rem",
                  cursor: hasAnswer ? "pointer" : "not-allowed",
                  transition: "background 0.2s",
                  letterSpacing: "-0.01em",
                }}
              >
                Weiter&ensp;→
              </button>
            )}
          </div>
        )}

        {/* ── Contact step ── */}
        {step === CONTACT_STEP && (
          <div key="contact" className="w-full flex flex-col gap-6" style={{ animation: "fadeSlideUp 0.28s ease", maxWidth: "440px" }}>
            <div className="flex flex-col gap-2">
              <h1 style={{
                fontWeight: 700,
                fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
                letterSpacing: "-0.03em",
                lineHeight: 1.12,
                color: "#1d1d1f",
              }}>
                Fast geschafft.
              </h1>
              <p style={{ color: "#6e6e73", fontSize: "1rem", lineHeight: 1.55 }}>
                Wir melden uns innerhalb von 24 Stunden bei dir.
              </p>
            </div>
            <form onSubmit={submitContact} className="flex flex-col gap-3">
              {[
                { key: "name", placeholder: "Dein Name", type: "text" },
                { key: "company", placeholder: "Unternehmen", type: "text" },
                { key: "email", placeholder: "E-Mail-Adresse", type: "email" },
              ].map(({ key, placeholder, type }) => (
                <input
                  key={key}
                  type={type}
                  placeholder={placeholder}
                  required
                  value={contact[key as keyof typeof contact]}
                  onChange={(e) => setContact((c) => ({ ...c, [key]: e.target.value }))}
                  style={{
                    fontFamily: appleFont,
                    fontSize: "1.05rem",
                    padding: "1rem 1.2rem",
                    borderRadius: "14px",
                    border: "1.5px solid #e0e0e5",
                    outline: "none",
                    color: "#1d1d1f",
                    background: "#fafafa",
                    letterSpacing: "-0.01em",
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "#0071e3")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "#e0e0e5")}
                />
              ))}
              <button
                type="submit"
                style={{
                  marginTop: "0.25rem",
                  fontFamily: appleFont,
                  fontSize: "1.05rem",
                  fontWeight: 600,
                  color: "#fff",
                  background: "#0071e3",
                  border: "none",
                  borderRadius: "980px",
                  padding: "0.95rem 1.5rem",
                  cursor: "pointer",
                  letterSpacing: "-0.01em",
                  transition: "opacity 0.15s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                Kennenlernen vereinbaren
              </button>
            </form>
          </div>
        )}

        {/* ── Done ── */}
        {step === DONE_STEP && (
          <div key="done" className="flex flex-col items-center text-center gap-6" style={{ animation: "fadeSlideUp 0.3s ease", maxWidth: "420px" }}>
            <div style={{
              width: "60px", height: "60px", borderRadius: "50%",
              background: "#0071e3", display: "flex",
              alignItems: "center", justifyContent: "center",
              fontSize: "1.6rem", color: "#fff",
            }}>
              ✓
            </div>
            <h1 style={{ fontWeight: 700, fontSize: "clamp(1.8rem, 4vw, 2.5rem)", letterSpacing: "-0.03em", color: "#1d1d1f" }}>
              Wir melden uns bald.
            </h1>
            <p style={{ color: "#6e6e73", fontSize: "1.05rem", lineHeight: 1.65 }}>
              Danke, {contact.name}. Wir schauen uns deine Angaben an und melden uns innerhalb von 24 Stunden persönlich bei dir.
            </p>
            <button
              onClick={() => router.push("/")}
              style={{
                marginTop: "0.5rem", fontFamily: appleFont, fontSize: "1rem",
                fontWeight: 400, color: "#0071e3", background: "none",
                border: "none", cursor: "pointer", letterSpacing: "-0.01em", padding: 0,
              }}
            >
              ← Zurück zur Startseite
            </button>
          </div>
        )}
      </div>

      {step < DONE_STEP && (
        <div style={{ textAlign: "center", padding: "1.5rem", color: "#b0b0b5", fontSize: "0.82rem" }}>
          Flowhaus
        </div>
      )}

      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

export default function Kennenlernen() {
  return (
    <Suspense>
      <KennenlernenInner />
    </Suspense>
  );
}

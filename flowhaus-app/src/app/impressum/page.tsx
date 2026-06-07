import Link from "next/link";
import { FlowLogo } from "@/components/FlowLogo";

const appleFont =
  "-apple-system, 'SF Pro Display', BlinkMacSystemFont, 'Helvetica Neue', sans-serif";

const MAX_W = "900px";

export default function Impressum() {
  return (
    <div style={{ fontFamily: appleFont, background: "#ffffff", minHeight: "100vh" }}>

      {/* Nav */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        background: "rgba(255,255,255,0.85)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        zIndex: 50,
      }}>
        <div style={{ width: "100%", maxWidth: MAX_W, display: "flex", alignItems: "center", padding: "1.1rem 2.5rem" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.65rem", textDecoration: "none" }}>
            <FlowLogo size={46} />
            <span style={{ fontWeight: 600, fontSize: "1.4rem", letterSpacing: "-0.03em", color: "#1d1d1f" }}>
              Flowhaus
            </span>
          </Link>
        </div>
      </nav>

      {/* Content */}
      <div style={{ maxWidth: MAX_W, margin: "0 auto", padding: "8rem 2.5rem 5rem" }}>
        <h1 style={{
          fontWeight: 700,
          fontSize: "clamp(2rem, 4vw, 3rem)",
          letterSpacing: "-0.03em",
          color: "#1d1d1f",
          marginBottom: "3rem",
        }}>
          Impressum
        </h1>

        <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>

          <Section title="Angaben gemäß § 5 TMG">
            <p>Flowhaus GmbH</p>
            <p>Musterstraße 1</p>
            <p>10115 Berlin</p>
          </Section>

          <Section title="Kontakt">
            <p>E-Mail: <a href="mailto:gsteinhaus@flowhaus.tech" style={{ color: "#0071e3", textDecoration: "none" }}>gsteinhaus@flowhaus.tech</a></p>
          </Section>

          <Section title="Vertreten durch">
            <p>Gerald Steinhaus, Geschäftsführer</p>
          </Section>

          <Section title="Registereintrag">
            <p>Eintragung im Handelsregister.</p>
            <p>Registergericht: Amtsgericht Berlin-Charlottenburg</p>
            <p>Registernummer: [HRB XXXXX]</p>
          </Section>

          <Section title="Umsatzsteuer-ID">
            <p>Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz:</p>
            <p>[DE XXXXXXXXX]</p>
          </Section>

          <Section title="Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV">
            <p>Gerald Steinhaus</p>
            <p>Musterstraße 1</p>
            <p>10115 Berlin</p>
          </Section>

          <Section title="Haftungsausschluss">
            <p>Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen.</p>
          </Section>

          <Section title="Urheberrecht">
            <p>Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.</p>
          </Section>

        </div>
      </div>

      {/* Footer */}
      <footer style={{
        borderTop: "1px solid #e5e5ea",
        padding: "2.5rem 0",
      }}>
        <div style={{ maxWidth: MAX_W, margin: "0 auto", padding: "0 2.5rem" }}>
          <p style={{ fontSize: "0.875rem", color: "#6e6e73" }}>
            © 2026 Flowhaus GmbH. Alle Rechte vorbehalten.
          </p>
        </div>
      </footer>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      <h2 style={{
        fontWeight: 600,
        fontSize: "1.1rem",
        letterSpacing: "-0.02em",
        color: "#1d1d1f",
        marginBottom: "0.25rem",
      }}>
        {title}
      </h2>
      <div style={{ fontSize: "1rem", color: "#6e6e73", lineHeight: 1.7, display: "flex", flexDirection: "column", gap: "0.1rem" }}>
        {children}
      </div>
    </div>
  );
}

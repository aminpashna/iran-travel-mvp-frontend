import { t } from "../i18n";

type Props = {
  title: string;
  data: unknown;
};

export default function JsonPreview({ title, data }: Props) {
  return (
    <section
      style={{
        padding: "20px",
        borderRadius: "20px",
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        minWidth: 0,
      }}
    >
      <div style={{ marginBottom: "12px" }}>
        <div
          style={{
            display: "inline-block",
            padding: "6px 10px",
            borderRadius: "999px",
            background: "rgba(124, 58, 237, 0.18)",
            fontSize: "12px",
          }}
        >
          {t("debug_view")}
        </div>
        <h2 style={{ marginTop: "12px", marginBottom: 0 }}>{title}</h2>
      </div>

      <pre
        style={{
          direction: "ltr",
          textAlign: "left",
          unicodeBidi: "plaintext",
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
          overflowWrap: "anywhere",
          background: "rgba(0,0,0,0.28)",
          padding: "16px",
          borderRadius: "16px",
          overflowX: "auto",
          overflowY: "auto",
          maxHeight: "700px",
          fontSize: "13px",
          lineHeight: 1.6,
          fontFamily:
            "Consolas, Monaco, 'Courier New', monospace",
        }}
      >
        {JSON.stringify(data, null, 2)}
      </pre>
    </section>
  );
}
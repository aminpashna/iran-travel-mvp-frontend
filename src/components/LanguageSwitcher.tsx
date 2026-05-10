import { getLang, setLang, t } from "../i18n";

export default function LanguageSwitcher() {
  const lang = getLang();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        gap: "8px",
        marginBottom: "20px",
      }}
    >
      <span>{t("language")}</span>

      <button
        type="button"
        onClick={() => setLang("en")}
        style={buttonStyle(lang === "en")}
      >
        EN
      </button>

      <button
        type="button"
        onClick={() => setLang("fa")}
        style={buttonStyle(lang === "fa")}
      >
        فارسی
      </button>
    </div>
  );
}

function buttonStyle(active: boolean): React.CSSProperties {
  return {
    padding: "8px 12px",
    borderRadius: "999px",
    border: "1px solid rgba(255,255,255,0.12)",
    background: active ? "rgba(124, 58, 237, 0.9)" : "rgba(255,255,255,0.06)",
    color: "#fff",
    cursor: "pointer",
  };
}
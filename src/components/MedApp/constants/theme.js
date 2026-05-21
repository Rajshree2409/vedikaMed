// Color Theme Configuration
export const theme = {
  green: "#0f9d8a",
  greenDark: "#0b7668",
  greenLight: "#e7f7f4",
  greenGradient: "linear-gradient(135deg, #0f9d8a 0%, #0b7668 100%)",
  navy: "#0f172a",
  gray: "#f8fafc",
  grayLight: "#f1f5f9",
  grayBorder: "#e2e8f0",
  grayText: "#64748b",
  grayTextLight: "#94a3b8",
  white: "#ffffff",
  red: "#ef4444",
  redLight: "#fef2f2",
  blue: "#2563eb",
  blueLight: "#eff6ff",
  yellow: "#f59e0b",
  yellowLight: "#fefce8",
  purple: "#8b5cf6",
  purpleLight: "#faf5ff",
  shadow: {
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  },
};

// Global Style Objects
export const style = {
  app: {
    fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
    width: "100%",
    minHeight: "100vh",
    background: "radial-gradient(circle at top left, rgba(15,157,138,0.08), transparent 22%), linear-gradient(180deg, #f8fafc 0%, #eef3f8 100%)",
    display: "flex",
    flexDirection: "column",
    position: "relative",
    overflowX: "hidden",
  },
  screen: {
    background: "transparent",
    minHeight: "100vh",
    paddingBottom: 110,
  },
  card: {
    background: theme.white,
    borderRadius: 16,
    boxShadow: theme.shadow.md,
    border: `1px solid ${theme.grayBorder}`,
    transition: "all 0.2s ease-in-out",
  },
  cardHover: {
    background: theme.white,
    borderRadius: 16,
    boxShadow: theme.shadow.lg,
    border: `1px solid ${theme.grayBorder}`,
    transform: "translateY(-2px)",
    transition: "all 0.2s ease-in-out",
  },
};

// Layout Grid Configuration
export const layout = {
  content: {
    width: "min(1440px, calc(100% - clamp(24px, 4vw, 56px)))",
    margin: "0 auto",
  },
  narrowContent: {
    width: "min(760px, calc(100% - 32px))",
    margin: "0 auto",
  },
  sectionGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(min(160px, 100%), 1fr))",
    gap: 16,
    marginBottom: 24,
  },
  heroGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(min(280px, 100%), 1fr))",
    gap: 24,
    marginBottom: 24,
  },
  shortcutGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(min(160px, 100%), 1fr))",
    gap: 16,
  },
  featureGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(min(260px, 100%), 1fr))",
    gap: 24,
  },
  productGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(min(260px, 100%), 1fr))",
    gap: 16,
    padding: "12px 0 120px",
  },
};

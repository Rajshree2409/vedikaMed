import React, { useEffect, useState } from "react";

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

export const useViewport = () => {
  const [width, setWidth] = useState(() => (typeof window === "undefined" ? 1280 : window.innerWidth));

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return {
    width,
    isPhone: width < 640,
    isCompact: width < 960,
    isTablet: width >= 640 && width < 1024,
  };
};

export const Icon = ({ name, size = 20, color = theme.navy }) => {
  const icons = {
    home: (
      <svg width={size} height={size} fill="none" viewBox="0 0 24 24">
        <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" stroke={color} strokeWidth={2} strokeLinejoin="round" />
        <path d="M9 21V12h6v9" stroke={color} strokeWidth={2} strokeLinejoin="round" />
      </svg>
    ),
    search: (
      <svg width={size} height={size} fill="none" viewBox="0 0 24 24">
        <circle cx="11" cy="11" r="7" stroke={color} strokeWidth={2} />
        <path d="M16.5 16.5L21 21" stroke={color} strokeWidth={2} strokeLinecap="round" />
      </svg>
    ),
    orders: (
      <svg width={size} height={size} fill="none" viewBox="0 0 24 24">
        <rect x="3" y="3" width="18" height="18" rx="2" stroke={color} strokeWidth={2} />
        <path d="M7 8h10M7 12h10M7 16h6" stroke={color} strokeWidth={2} strokeLinecap="round" />
      </svg>
    ),
    wallet: (
      <svg width={size} height={size} fill="none" viewBox="0 0 24 24">
        <rect x="2" y="5" width="20" height="15" rx="2" stroke={color} strokeWidth={2} />
        <path d="M16 12a1 1 0 100 2 1 1 0 000-2z" fill={color} />
        <path d="M2 9h20" stroke={color} strokeWidth={2} />
      </svg>
    ),
    chat: (
      <svg width={size} height={size} fill="none" viewBox="0 0 24 24">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z" stroke={color} strokeWidth={2} strokeLinejoin="round" />
      </svg>
    ),
    cart: (
      <svg width={size} height={size} fill="none" viewBox="0 0 24 24">
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" stroke={color} strokeWidth={2} strokeLinejoin="round" />
        <path d="M3 6h18M16 10a4 4 0 01-8 0" stroke={color} strokeWidth={2} strokeLinecap="round" />
      </svg>
    ),
    menu: (
      <svg width={size} height={size} fill="none" viewBox="0 0 24 24">
        <path d="M3 6h18M3 12h18M3 18h18" stroke={color} strokeWidth={2} strokeLinecap="round" />
      </svg>
    ),
    back: (
      <svg width={size} height={size} fill="none" viewBox="0 0 24 24">
        <path d="M19 12H5M12 19l-7-7 7-7" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    settings: (
      <svg width={size} height={size} fill="none" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="3" stroke={color} strokeWidth={2} />
        <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" stroke={color} strokeWidth={2} />
      </svg>
    ),
    chevronRight: (
      <svg width={size} height={size} fill="none" viewBox="0 0 24 24">
        <path d="M9 18l6-6-6-6" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    edit: (
      <svg width={size} height={size} fill="none" viewBox="0 0 24 24">
        <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    location: (
      <svg width={size} height={size} fill="none" viewBox="0 0 24 24">
        <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z" stroke={color} strokeWidth={2} />
        <circle cx="12" cy="10" r="3" stroke={color} strokeWidth={2} />
      </svg>
    ),
    phone: (
      <svg width={size} height={size} fill="none" viewBox="0 0 24 24">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.7A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" stroke={color} strokeWidth={2} />
      </svg>
    ),
    mail: (
      <svg width={size} height={size} fill="none" viewBox="0 0 24 24">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke={color} strokeWidth={2} />
        <path d="M22 6l-10 7L2 6" stroke={color} strokeWidth={2} />
      </svg>
    ),
    logout: (
      <svg width={size} height={size} fill="none" viewBox="0 0 24 24">
        <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    user: (
      <svg width={size} height={size} fill="none" viewBox="0 0 24 24">
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke={color} strokeWidth={2} strokeLinecap="round" />
        <circle cx="12" cy="7" r="4" stroke={color} strokeWidth={2} />
      </svg>
    ),
    send: (
      <svg width={size} height={size} fill="none" viewBox="0 0 24 24">
        <line x1="22" y1="2" x2="11" y2="13" stroke={color} strokeWidth={2} />
        <polygon points="22,2 15,22 11,13 2,9" stroke={color} strokeWidth={2} fill="none" />
      </svg>
    ),
    close: (
      <svg width={size} height={size} fill="none" viewBox="0 0 24 24">
        <line x1="18" y1="6" x2="6" y2="18" stroke={color} strokeWidth={2} strokeLinecap="round" />
        <line x1="6" y1="6" x2="18" y2="18" stroke={color} strokeWidth={2} strokeLinecap="round" />
      </svg>
    ),
    bell: (
      <svg width={size} height={size} fill="none" viewBox="0 0 24 24">
        <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    share: (
      <svg width={size} height={size} fill="none" viewBox="0 0 24 24">
        <circle cx="18" cy="5" r="3" stroke={color} strokeWidth={2} />
        <circle cx="6" cy="12" r="3" stroke={color} strokeWidth={2} />
        <circle cx="18" cy="19" r="3" stroke={color} strokeWidth={2} />
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" stroke={color} strokeWidth={2} />
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" stroke={color} strokeWidth={2} />
      </svg>
    ),
    info: (
      <svg width={size} height={size} fill="none" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" stroke={color} strokeWidth={2} />
        <line x1="12" y1="8" x2="12" y2="12" stroke={color} strokeWidth={2} strokeLinecap="round" />
        <line x1="12" y1="16" x2="12.01" y2="16" stroke={color} strokeWidth={2} strokeLinecap="round" />
      </svg>
    ),
    shield: (
      <svg width={size} height={size} fill="none" viewBox="0 0 24 24">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke={color} strokeWidth={2} strokeLinejoin="round" />
      </svg>
    ),
    exit: (
      <svg width={size} height={size} fill="none" viewBox="0 0 24 24">
        <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" stroke={color} strokeWidth={2} strokeLinecap="round" />
        <polyline points="16 17 21 12 16 7" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        <line x1="21" y1="12" x2="9" y2="12" stroke={color} strokeWidth={2} strokeLinecap="round" />
      </svg>
    ),
    grid: (
      <svg width={size} height={size} fill="none" viewBox="0 0 24 24">
        <rect x="3" y="3" width="7" height="7" stroke={color} strokeWidth={2} />
        <rect x="14" y="3" width="7" height="7" stroke={color} strokeWidth={2} />
        <rect x="14" y="14" width="7" height="7" stroke={color} strokeWidth={2} />
        <rect x="3" y="14" width="7" height="7" stroke={color} strokeWidth={2} />
      </svg>
    ),
    bookmark: (
      <svg width={size} height={size} fill="none" viewBox="0 0 24 24">
        <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" stroke={color} strokeWidth={2} strokeLinejoin="round" />
      </svg>
    ),
  };
  return icons[name] || null;
};

export const BottomNav = ({ active, setActive }) => {
  const tabs = [
    { key: "home", label: "Home" },
    { key: "search", label: "Search" },
    { key: "orders", label: "My Order" },
    { key: "wallet", label: "Wallet" },
    { key: "chat", label: "Chat" },
  ];
  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        background: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(20px)",
        borderTop: `1px solid ${theme.grayBorder}`,
        boxShadow: "0 -4px 20px rgba(0, 0, 0, 0.08)",
        zIndex: 100,
      }}
    >
      <div
        style={{
          ...layout.content,
          display: "grid",
          gridTemplateColumns: `repeat(${tabs.length}, minmax(0, 1fr))`,
          padding: "12px 0 calc(16px + env(safe-area-inset-bottom))",
        }}
      >
        {tabs.map((t) => {
          const isActive = active === t.key;
          return (
            <button
              key={t.key}
              onClick={() => setActive(t.key)}
              style={{
                padding: "8px 0 6px",
                background: "none",
                border: "none",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 6,
                minWidth: 0,
                borderRadius: 12,
                transition: "all 0.2s ease-in-out",
                position: "relative",
                ":hover": {
                  background: "rgba(15, 157, 138, 0.05)",
                },
              }}
            >
              {isActive && (
                <div
                  style={{
                    position: "absolute",
                    top: -2,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 32,
                    height: 3,
                    background: theme.green,
                    borderRadius: 2,
                  }}
                />
              )}
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: isActive ? theme.greenLight : "transparent",
                  transition: "all 0.2s ease-in-out",
                }}
              >
                <Icon
                  name={t.key}
                  size={24}
                  color={isActive ? theme.green : theme.grayText}
                />
              </div>
              <span
                style={{
                  fontSize: 11,
                  color: isActive ? theme.green : theme.grayText,
                  fontWeight: isActive ? 700 : 500,
                  lineHeight: 1.1,
                  whiteSpace: "nowrap",
                  transition: "color 0.2s ease-in-out",
                }}
              >
                {t.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export const CategoryCard = ({ imgSrc, label, fallback, onClick }) => {
  const [imgFailed, setImgFailed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: theme.white,
        borderRadius: 20,
        padding: "16px 16px 14px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
        width: "100%",
        minWidth: 0,
        boxShadow: isHovered ? theme.shadow.lg : theme.shadow.md,
        cursor: onClick ? "pointer" : "default",
        border: `1px solid ${isHovered ? theme.greenLight : theme.grayBorder}`,
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        transform: isHovered ? "translateY(-4px)" : "translateY(0)",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "clamp(110px, 14vw, 160px)",
          borderRadius: 16,
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
          fontSize: 40,
          position: "relative",
        }}
      >
        {!imgFailed ? (
          <img
            src={imgSrc}
            alt={label}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform 0.3s ease",
              transform: isHovered ? "scale(1.05)" : "scale(1)",
            }}
            onError={() => setImgFailed(true)}
          />
        ) : (
          fallback
        )}
        {isHovered && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "linear-gradient(135deg, rgba(15,157,138,0.1) 0%, rgba(11,118,104,0.1) 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon name="chevronRight" size={24} color={theme.green} />
          </div>
        )}
      </div>
      <span
        style={{
          fontSize: 15,
          color: isHovered ? theme.green : theme.navy,
          textAlign: "center",
          fontWeight: 600,
          lineHeight: 1.3,
          transition: "color 0.2s ease",
        }}
      >
        {label}
      </span>
    </div>
  );
};

export const SectionTitle = ({ children }) => (
  <div style={{ fontWeight: 800, fontSize: "clamp(20px, 2vw, 22px)", color: "#111", marginBottom: 14, letterSpacing: -0.3 }}>
    {children}
  </div>
);

export const ForYouItem = ({ svgIcon, label, bg, fallbackEmoji }) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, cursor: "pointer", padding: "10px 8px", minWidth: 0 }}>
    <div
      style={{
        width: "clamp(64px, 14vw, 74px)",
        height: "clamp(64px, 14vw, 74px)",
        borderRadius: "50%",
        background: bg || "#e8f5e9",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 10px 24px rgba(15,23,42,0.12)",
        overflow: "hidden",
      }}
    >
      {svgIcon || <span style={{ fontSize: "clamp(24px, 5vw, 28px)" }}>{fallbackEmoji}</span>}
    </div>
    <span style={{ fontSize: 14, color: "#222", textAlign: "center", fontWeight: 600, maxWidth: 120, lineHeight: 1.35 }}>{label}</span>
  </div>
);

export const SurfaceCard = ({ children, style: cardStyle = {}, hover = false }) => (
  <div
    style={{
      background: theme.white,
      borderRadius: 20,
      border: `1px solid ${theme.grayBorder}`,
      boxShadow: hover ? theme.shadow.lg : theme.shadow.md,
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      ":hover": hover ? {
        transform: "translateY(-4px)",
        boxShadow: theme.shadow.xl,
      } : {},
      ...cardStyle,
    }}
  >
    {children}
  </div>
);

export const HeroStat = ({ value, label }) => (
  <div
    style={{
      background: "rgba(255,255,255,0.72)",
      border: "1px solid rgba(255,255,255,0.55)",
      borderRadius: 18,
      padding: "14px 16px",
      minWidth: 130,
    }}
  >
    <div style={{ fontSize: 24, fontWeight: 800, color: theme.navy }}>{value}</div>
    <div style={{ fontSize: 12, color: theme.grayText, marginTop: 4 }}>{label}</div>
  </div>
);

export const CollectionPanel = ({ eyebrow, title, description, children }) => (
  <SurfaceCard style={{ padding: 24 }}>
    <div style={{ marginBottom: 18 }}>
      <div
        style={{
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: 1.2,
          textTransform: "uppercase",
          color: theme.green,
        }}
      >
        {eyebrow}
      </div>
      <div style={{ fontSize: 22, fontWeight: 800, color: theme.navy, marginTop: 6 }}>{title}</div>
      <div style={{ fontSize: 14, color: theme.grayText, marginTop: 6, maxWidth: 560 }}>{description}</div>
    </div>
    <div style={layout.sectionGrid}>{children}</div>
  </SurfaceCard>
);

export const ServiceCard = ({ icon, title, description, actionLabel }) => (
  <SurfaceCard style={{ padding: 24, display: "flex", flexDirection: "column", gap: 14 }}>
    <div
      style={{
        width: 56,
        height: 56,
        borderRadius: 18,
        background: theme.greenLight,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {icon}
    </div>
    <div style={{ fontSize: 18, fontWeight: 800, color: theme.navy }}>{title}</div>
    <div style={{ fontSize: 14, lineHeight: 1.6, color: theme.grayText, flex: 1 }}>{description}</div>
    <div style={{ fontSize: 13, fontWeight: 700, color: theme.green }}>{actionLabel}</div>
  </SurfaceCard>
);

export const EmptyFeatureCard = ({ icon, title, description, actionLabel }) => (
  <SurfaceCard style={{ padding: 24, minHeight: 220, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
    <div>
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: 18,
          background: theme.gray,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 16,
        }}
      >
        {icon}
      </div>
      <div style={{ fontSize: 20, fontWeight: 800, color: theme.navy, marginBottom: 10 }}>{title}</div>
      <div style={{ fontSize: 14, color: theme.grayText, lineHeight: 1.6 }}>{description}</div>
    </div>
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 999,
        padding: "10px 16px",
        background: theme.greenLight,
        color: theme.greenDark,
        fontSize: 13,
        fontWeight: 700,
        width: "fit-content",
      }}
    >
      {actionLabel}
    </div>
  </SurfaceCard>
);

export const Sidebar = ({ open, onClose, setCurrentPage, session }) => {
  const menuItems = [
    { icon: "user", label: "My Accounts", page: "profile" },
    { icon: "grid", label: "Retailer Registration", page: "retailer" },
    { icon: "grid", label: "B2B Dashboard", page: null },
    { icon: "wallet", label: "Wallet", page: "wallet" },
    { icon: "bookmark", label: "Order History", page: "orders" },
    { icon: "share", label: "Share", page: null },
    { icon: "bell", label: "Notification", badge: "new 0", page: null },
    { icon: "info", label: "About us", page: "about" },
    { icon: "shield", label: "Privacy Policy", page: "privacy" },
    { icon: "info", label: "Contact us", page: "contact" },
    { icon: "exit", label: "Exit", page: session?.userId ? "logout" : "login" },
  ];

  const sidebarPhone = session?.mobileNumber || session?.phoneNumber || "Guest";

  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 200,
          background: "rgba(0,0,0,0.45)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 0.28s ease",
        }}
      />
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "min(320px, 86vw)",
          height: "100vh",
          background: "#fff",
          zIndex: 300,
          transform: open ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.28s cubic-bezier(.4,0,.2,1)",
          boxShadow: open ? "6px 0 24px rgba(0,0,0,0.18)" : "none",
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
        }}
      >
        <div
          style={{
            background: theme.green,
            padding: "44px 20px 22px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
          }}
        >
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: "50%",
              background: "#1e40af",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "3px solid rgba(255,255,255,0.5)",
            }}
          >
            <Icon name="user" size={38} color="#fff" />
          </div>
          <span style={{ color: "#fff", fontSize: 15, fontWeight: 600, letterSpacing: 0.3 }}>{sidebarPhone}</span>
        </div>
        <div style={{ flex: 1 }}>
          {menuItems.map((item, i) => (
            <button
              key={i}
              onClick={() => {
                if (item.page) {
                  setCurrentPage(item.page);
                }
                onClose();
              }}
              style={{
                width: "100%",
                background: "none",
                border: "none",
                borderBottom: "1px solid #f3f4f6",
                padding: "15px 20px",
                display: "flex",
                alignItems: "center",
                gap: 14,
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              <Icon name={item.icon} size={20} color="#444" />
              <span style={{ flex: 1, fontSize: 14, color: "#222", fontWeight: 500 }}>{item.label}</span>
              {item.badge && (
                <span
                  style={{
                    background: theme.green,
                    color: "#fff",
                    borderRadius: 10,
                    fontSize: 10,
                    padding: "2px 8px",
                    fontWeight: 700,
                  }}
                >
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export const PageHeader = ({ title, onBack, uppercase = false }) => (
  <div
    style={{
      background: "#fff",
      borderBottom: "1px solid #e5e7eb",
      position: "sticky",
      top: 0,
      zIndex: 10,
    }}
  >
    <div style={{ ...layout.content, padding: "15px 0", display: "flex", alignItems: "center", gap: 14 }}>
      <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", padding: 2 }}>
        <Icon name="back" size={22} color="#222" />
      </button>
      <span
        style={{
          fontWeight: 800,
          fontSize: "clamp(17px, 2vw, 18px)",
          color: "#111",
          letterSpacing: uppercase ? 0.8 : 0,
          textTransform: uppercase ? "uppercase" : "none",
          minWidth: 0,
        }}
      >
        {title}
      </span>
    </div>
  </div>
);

export const StarRating = ({ count }) => (
  <div style={{ display: "flex", gap: 2 }}>
    {[1, 2, 3, 4, 5].map((i) => (
      <svg key={i} width={14} height={14} viewBox="0 0 24 24">
        <polygon
          points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
          fill={i <= count ? "#f59e0b" : "#e5e7eb"}
          stroke={i <= count ? "#f59e0b" : "#d1d5db"}
          strokeWidth="1"
        />
      </svg>
    ))}
  </div>
);

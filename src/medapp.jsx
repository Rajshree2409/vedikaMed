import { useState } from "react";

const theme = {
  green: "#0f9d8a",
  greenDark: "#0b7668",
  greenLight: "#e7f7f4",
  navy: "#0f172a",
  gray: "#f8fafc",
  grayBorder: "#e2e8f0",
  grayText: "#64748b",
  white: "#ffffff",
  red: "#ef4444",
  blue: "#2563eb",
};

const style = {
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
};

const layout = {
  content: {
    width: "min(1440px, calc(100% - 40px))",
    margin: "0 auto",
  },
  sectionGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: 16,
    marginBottom: 24,
  },
  heroGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: 24,
    marginBottom: 24,
  },
  shortcutGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: 16,
  },
  featureGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: 24,
  },
  productGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: 16,
    padding: "12px 0 120px",
  },
};

// Icons
const Icon = ({ name, size = 20, color = theme.navy }) => {
  const icons = {
    home: (
      <svg width={size} height={size} fill="none" viewBox="0 0 24 24">
        <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" stroke={color} strokeWidth={2} strokeLinejoin="round"/>
        <path d="M9 21V12h6v9" stroke={color} strokeWidth={2} strokeLinejoin="round"/>
      </svg>
    ),
    search: (
      <svg width={size} height={size} fill="none" viewBox="0 0 24 24">
        <circle cx="11" cy="11" r="7" stroke={color} strokeWidth={2}/>
        <path d="M16.5 16.5L21 21" stroke={color} strokeWidth={2} strokeLinecap="round"/>
      </svg>
    ),
    orders: (
      <svg width={size} height={size} fill="none" viewBox="0 0 24 24">
        <rect x="3" y="3" width="18" height="18" rx="2" stroke={color} strokeWidth={2}/>
        <path d="M7 8h10M7 12h10M7 16h6" stroke={color} strokeWidth={2} strokeLinecap="round"/>
      </svg>
    ),
    wallet: (
      <svg width={size} height={size} fill="none" viewBox="0 0 24 24">
        <rect x="2" y="5" width="20" height="15" rx="2" stroke={color} strokeWidth={2}/>
        <path d="M16 12a1 1 0 100 2 1 1 0 000-2z" fill={color}/>
        <path d="M2 9h20" stroke={color} strokeWidth={2}/>
      </svg>
    ),
    chat: (
      <svg width={size} height={size} fill="none" viewBox="0 0 24 24">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z" stroke={color} strokeWidth={2} strokeLinejoin="round"/>
      </svg>
    ),
    cart: (
      <svg width={size} height={size} fill="none" viewBox="0 0 24 24">
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" stroke={color} strokeWidth={2} strokeLinejoin="round"/>
        <path d="M3 6h18M16 10a4 4 0 01-8 0" stroke={color} strokeWidth={2} strokeLinecap="round"/>
      </svg>
    ),
    menu: (
      <svg width={size} height={size} fill="none" viewBox="0 0 24 24">
        <path d="M3 6h18M3 12h18M3 18h18" stroke={color} strokeWidth={2} strokeLinecap="round"/>
      </svg>
    ),
    back: (
      <svg width={size} height={size} fill="none" viewBox="0 0 24 24">
        <path d="M19 12H5M12 19l-7-7 7-7" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    settings: (
      <svg width={size} height={size} fill="none" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="3" stroke={color} strokeWidth={2}/>
        <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" stroke={color} strokeWidth={2}/>
      </svg>
    ),
    chevronRight: (
      <svg width={size} height={size} fill="none" viewBox="0 0 24 24">
        <path d="M9 18l6-6-6-6" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    edit: (
      <svg width={size} height={size} fill="none" viewBox="0 0 24 24">
        <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    location: (
      <svg width={size} height={size} fill="none" viewBox="0 0 24 24">
        <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z" stroke={color} strokeWidth={2}/>
        <circle cx="12" cy="10" r="3" stroke={color} strokeWidth={2}/>
      </svg>
    ),
    phone: (
      <svg width={size} height={size} fill="none" viewBox="0 0 24 24">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.7A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" stroke={color} strokeWidth={2}/>
      </svg>
    ),
    mail: (
      <svg width={size} height={size} fill="none" viewBox="0 0 24 24">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke={color} strokeWidth={2}/>
        <path d="M22 6l-10 7L2 6" stroke={color} strokeWidth={2}/>
      </svg>
    ),
    logout: (
      <svg width={size} height={size} fill="none" viewBox="0 0 24 24">
        <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    user: (
      <svg width={size} height={size} fill="none" viewBox="0 0 24 24">
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke={color} strokeWidth={2} strokeLinecap="round"/>
        <circle cx="12" cy="7" r="4" stroke={color} strokeWidth={2}/>
      </svg>
    ),
    send: (
      <svg width={size} height={size} fill="none" viewBox="0 0 24 24">
        <line x1="22" y1="2" x2="11" y2="13" stroke={color} strokeWidth={2}/>
        <polygon points="22,2 15,22 11,13 2,9" stroke={color} strokeWidth={2} fill="none"/>
      </svg>
    ),
    close: (
      <svg width={size} height={size} fill="none" viewBox="0 0 24 24">
        <line x1="18" y1="6" x2="6" y2="18" stroke={color} strokeWidth={2} strokeLinecap="round"/>
        <line x1="6" y1="6" x2="18" y2="18" stroke={color} strokeWidth={2} strokeLinecap="round"/>
      </svg>
    ),
    bell: (
      <svg width={size} height={size} fill="none" viewBox="0 0 24 24">
        <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    share: (
      <svg width={size} height={size} fill="none" viewBox="0 0 24 24">
        <circle cx="18" cy="5" r="3" stroke={color} strokeWidth={2}/>
        <circle cx="6" cy="12" r="3" stroke={color} strokeWidth={2}/>
        <circle cx="18" cy="19" r="3" stroke={color} strokeWidth={2}/>
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" stroke={color} strokeWidth={2}/>
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" stroke={color} strokeWidth={2}/>
      </svg>
    ),
    info: (
      <svg width={size} height={size} fill="none" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" stroke={color} strokeWidth={2}/>
        <line x1="12" y1="8" x2="12" y2="12" stroke={color} strokeWidth={2} strokeLinecap="round"/>
        <line x1="12" y1="16" x2="12.01" y2="16" stroke={color} strokeWidth={2} strokeLinecap="round"/>
      </svg>
    ),
    shield: (
      <svg width={size} height={size} fill="none" viewBox="0 0 24 24">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke={color} strokeWidth={2} strokeLinejoin="round"/>
      </svg>
    ),
    exit: (
      <svg width={size} height={size} fill="none" viewBox="0 0 24 24">
        <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" stroke={color} strokeWidth={2} strokeLinecap="round"/>
        <polyline points="16 17 21 12 16 7" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="21" y1="12" x2="9" y2="12" stroke={color} strokeWidth={2} strokeLinecap="round"/>
      </svg>
    ),
    grid: (
      <svg width={size} height={size} fill="none" viewBox="0 0 24 24">
        <rect x="3" y="3" width="7" height="7" stroke={color} strokeWidth={2}/>
        <rect x="14" y="3" width="7" height="7" stroke={color} strokeWidth={2}/>
        <rect x="14" y="14" width="7" height="7" stroke={color} strokeWidth={2}/>
        <rect x="3" y="14" width="7" height="7" stroke={color} strokeWidth={2}/>
      </svg>
    ),
    bookmark: (
      <svg width={size} height={size} fill="none" viewBox="0 0 24 24">
        <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" stroke={color} strokeWidth={2} strokeLinejoin="round"/>
      </svg>
    ),
  };
  return icons[name] || null;
};

// Bottom Nav
const BottomNav = ({ active, setActive }) => {
  const tabs = [
    { key: "home", label: "Home" },
    { key: "search", label: "Search" },
    { key: "orders", label: "My Order" },
    { key: "wallet", label: "Wallet" },
    { key: "chat", label: "Chat" },
  ];
  return (
    <div style={{
      position: "fixed",
      bottom: 0,
      left: 0,
      right: 0,
      background: "rgba(55, 65, 81, 0.94)",
      backdropFilter: "blur(14px)",
      borderTop: "1px solid rgba(255,255,255,0.08)",
      zIndex: 100,
    }}>
      <div style={{
        ...layout.content,
        display: "grid",
        gridTemplateColumns: `repeat(${tabs.length}, minmax(0, 1fr))`,
        padding: "10px 0 12px",
      }}>
        {tabs.map(t => (
          <button key={t.key} onClick={() => setActive(t.key)} style={{
            padding: "10px 0 8px", background: "none", border: "none",
            cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 5,
          }}>
            <Icon name={t.key} size={24} color={active === t.key ? "#ffffff" : "#cbd5e1"} />
            <span style={{ fontSize: 11, color: active === t.key ? "#ffffff" : "#cbd5e1", fontWeight: active === t.key ? 700 : 500 }}>
              {t.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

// Medicine image card (matches screenshot style)
const CategoryCard = ({ imgSrc, label, fallback, onClick }) => {
  const [imgFailed, setImgFailed] = useState(false);
  return (
    <div onClick={onClick} style={{
      background: "#fff",
      borderRadius: 18,
      padding: "14px 14px 12px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 10,
      width: "100%",
      minWidth: 0,
      boxShadow: "0 10px 24px rgba(15,23,42,0.08)",
      cursor: "pointer",
      border: "1px solid #eef2f7",
    }}>
      <div style={{
        width: "100%", height: "clamp(100px, 12vw, 148px)",
        borderRadius: 14,
        overflow: "hidden",
        display: "flex", alignItems: "center", justifyContent: "center",
        background: "#f8fafc",
        fontSize: 36,
      }}>
        {!imgFailed
          ? <img
              src={imgSrc}
              alt={label}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              onError={() => setImgFailed(true)}
            />
          : fallback}
      </div>
      <span style={{ fontSize: 14, color: "#222", textAlign: "center", fontWeight: 600, lineHeight: 1.3 }}>{label}</span>
    </div>
  );
};

const SectionTitle = ({ children }) => (
  <div style={{ fontWeight: 800, fontSize: 22, color: "#111", marginBottom: 14, letterSpacing: -0.3 }}>{children}</div>
);

// For You shortcut button — uses illustrated SVG icons like the screenshot
const ForYouItem = ({ svgIcon, label, bg, fallbackEmoji }) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, cursor: "pointer", padding: "10px 8px" }}>
    <div style={{
      width: 74, height: 74, borderRadius: "50%",
      background: bg || "#e8f5e9",
      display: "flex", alignItems: "center", justifyContent: "center",
      boxShadow: "0 10px 24px rgba(15,23,42,0.12)",
      overflow: "hidden",
    }}>
      {svgIcon || <span style={{ fontSize: 28 }}>{fallbackEmoji}</span>}
    </div>
    <span style={{ fontSize: 14, color: "#222", textAlign: "center", fontWeight: 600, maxWidth: 120, lineHeight: 1.35 }}>{label}</span>
  </div>
);

const SurfaceCard = ({ children, style: cardStyle = {} }) => (
  <div
    style={{
      background: theme.white,
      borderRadius: 24,
      border: `1px solid ${theme.grayBorder}`,
      boxShadow: "0 20px 45px rgba(15, 23, 42, 0.08)",
      ...cardStyle,
    }}
  >
    {children}
  </div>
);

const HeroStat = ({ value, label }) => (
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

const CollectionPanel = ({ eyebrow, title, description, children }) => (
  <SurfaceCard style={{ padding: 24 }}>
    <div style={{ marginBottom: 18 }}>
      <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1.2, textTransform: "uppercase", color: theme.green }}>
        {eyebrow}
      </div>
      <div style={{ fontSize: 22, fontWeight: 800, color: theme.navy, marginTop: 6 }}>{title}</div>
      <div style={{ fontSize: 14, color: theme.grayText, marginTop: 6, maxWidth: 560 }}>{description}</div>
    </div>
    <div style={layout.sectionGrid}>{children}</div>
  </SurfaceCard>
);

const ServiceCard = ({ icon, title, description, actionLabel }) => (
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

const EmptyFeatureCard = ({ icon, title, description, actionLabel }) => (
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

// Home Screen
const HomeScreen = ({ setSidebarOpen, setCurrentPage }) => (
  <div style={{ ...style.screen, overflowY: "auto" }}>
    {/* Header */}
    <div style={{
      background: "#fff",
      boxShadow: "0 1px 3px rgba(0,0,0,0.07)",
      position: "sticky", top: 0, zIndex: 10,
    }}>
      <div style={{ ...layout.content, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, padding: "18px 0 16px" }}>
      <button
        onClick={() => setSidebarOpen(true)}
        style={{ background: "none", border: "none", cursor: "pointer", padding: 2, display: "flex", alignItems: "center" }}
      >
        <Icon name="menu" size={28} color="#222" />
      </button>
      <span style={{ color: theme.green, fontWeight: 800, fontSize: 26, letterSpacing: -0.5, flex: 1 }}>
        Software House 👋
      </span>
      <div style={{ position: "relative", cursor: "pointer" }}>
        {/* Cart icon SVG */}
        <svg width={34} height={34} fill="none" viewBox="0 0 24 24">
          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" stroke="#222" strokeWidth={1.8} strokeLinejoin="round"/>
          <path d="M3 6h18" stroke="#222" strokeWidth={1.8} strokeLinecap="round"/>
          <path d="M16 10a4 4 0 01-8 0" stroke="#222" strokeWidth={1.8} strokeLinecap="round"/>
        </svg>
        <span style={{
          position: "absolute", top: -5, right: -5,
          background: theme.red, color: "#fff",
          borderRadius: "50%", fontSize: 10, width: 18, height: 18,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontWeight: 700, border: "1.5px solid #fff",
        }}>0</span>
      </div>
      </div>
    </div>

    <div style={{ ...layout.content, padding: "24px 0 0" }}>
      {/* Search bar */}
      <div style={{
        background: "#fff", borderRadius: 16, padding: "18px 22px",
        display: "flex", alignItems: "center", gap: 10,
        boxShadow: "0 10px 24px rgba(15,23,42,0.08)",
        marginBottom: 24, border: "1px solid #ececec",
      }}>
        <Icon name="search" size={20} color="#94a3b8" />
        <span style={{ color: "#94a3b8", fontSize: 18 }}>Search from 5000+ products</span>
      </div>

      {/* ── Medicine ── */}
      <SectionTitle>Medicine</SectionTitle>
      <div style={layout.sectionGrid}>
        <CategoryCard
          onClick={() => setCurrentPage("products:Capsules")}
          imgSrc="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/2019-01-11_Oral_contraceptive_pills_in_blister_packs.jpg/320px-2019-01-11_Oral_contraceptive_pills_in_blister_packs.jpg"
          label="Capsules"
          fallback={
            <svg viewBox="0 0 80 72" width="80" height="72">
              <rect x="15" y="28" width="50" height="18" rx="9" fill="#f5c842"/>
              <rect x="15" y="28" width="25" height="18" rx="9" fill="#e6a800"/>
              <text x="28" y="41" fontSize="9" fill="#fff" fontWeight="bold">L U</text>
              <rect x="15" y="50" width="50" height="18" rx="9" fill="#f5c842"/>
              <rect x="15" y="50" width="25" height="18" rx="9" fill="#e6a800"/>
              <text x="24" y="63" fontSize="9" fill="#fff" fontWeight="bold">D 0 3</text>
            </svg>
          }
        />
        <CategoryCard
          onClick={() => setCurrentPage("products:capsule")}
          imgSrc="https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Herbal_supplements.jpg/320px-Herbal_supplements.jpg"
          label="capsule"
          fallback={
            <svg viewBox="0 0 80 72" width="80" height="72">
              {[{x:30,y:10,r:0},{x:50,y:18,r:30},{x:20,y:30,r:-20},{x:45,y:35,r:45},{x:32,y:50,r:10},{x:55,y:48,r:-30}].map((c,i)=>(
                <g key={i} transform={`translate(${c.x},${c.y}) rotate(${c.r})`}>
                  <rect x="-10" y="-5" width="20" height="10" rx="5" fill="#7ac942"/>
                  <rect x="-10" y="-5" width="10" height="10" rx="5" fill="#5ba832"/>
                </g>
              ))}
            </svg>
          }
        />
        <CategoryCard
          onClick={() => setCurrentPage("products:Medicine")}
          imgSrc="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/%E7%BA%A2%E7%BB%BF%E8%83%B6%E5%9B%8A.jpg/320px-%E7%BA%A2%E7%BB%BF%E8%83%B6%E5%9B%8A.jpg"
          label="Medicine"
          fallback={
            <svg viewBox="0 0 80 72" width="80" height="72">
              <g transform="translate(40,36) rotate(-30)">
                <rect x="-22" y="-10" width="44" height="20" rx="10" fill="#e05c5c"/>
                <rect x="-22" y="-10" width="22" height="20" rx="10" fill="#f5e0c0"/>
              </g>
            </svg>
          }
        />
        <CategoryCard
          onClick={() => setCurrentPage("products:Injection")}
          imgSrc="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Syringe_2.jpg/320px-Syringe_2.jpg"
          label="Injection"
          fallback={
            <svg viewBox="0 0 80 72" width="80" height="72">
              <rect x="34" y="8" width="12" height="42" rx="4" fill="#c084fc"/>
              <rect x="36" y="10" width="8" height="38" rx="3" fill="#e9d5ff"/>
              <rect x="30" y="48" width="20" height="8" rx="2" fill="#7c3aed"/>
              <rect x="38" y="56" width="4" height="10" rx="1" fill="#6d28d9"/>
            </svg>
          }
        />
      </div>

      {/* ── OTC ── */}
      <SectionTitle>OTC</SectionTitle>
      <div style={layout.sectionGrid}>
        <CategoryCard
          imgSrc="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Spices_of_Kerala.jpg/320px-Spices_of_Kerala.jpg"
          label="Ayurveda Prod..."
          fallback={
            <svg viewBox="0 0 80 72" width="80" height="72">
              <ellipse cx="40" cy="52" rx="22" ry="14" fill="#c8a96e"/>
              <ellipse cx="40" cy="48" rx="18" ry="10" fill="#8B6914"/>
              <path d="M30 20 Q40 5 50 20 Q45 35 40 42 Q35 35 30 20z" fill="#4ade80"/>
              <path d="M22 28 Q32 15 42 28" fill="#22c55e" opacity="0.7"/>
              <path d="M38 28 Q48 15 58 28" fill="#16a34a" opacity="0.7"/>
            </svg>
          }
        />
        <CategoryCard
          imgSrc="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Pills.jpg/320px-Pills.jpg"
          label="OTC Medicine 2"
          fallback={
            <svg viewBox="0 0 80 72" width="80" height="72">
              <ellipse cx="40" cy="44" rx="20" ry="14" fill="#d4d4d4" opacity="0.4"/>
              {[{x:28,y:28,c:"#e05c5c"},{x:42,y:22,c:"#f5c842"},{x:55,y:30,c:"#4ade80"},{x:34,y:42,c:"#60a5fa"},{x:50,y:44,c:"#f97316"},{x:24,y:40,c:"#c084fc"}].map((p,i)=>(
                <circle key={i} cx={p.x} cy={p.y} r="7" fill={p.c}/>
              ))}
            </svg>
          }
        />
        <CategoryCard
          imgSrc="https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Bandage_roll.jpg/320px-Bandage_roll.jpg"
          label="BANDAGE"
          fallback={
            <svg viewBox="0 0 80 72" width="80" height="72">
              <ellipse cx="40" cy="46" rx="24" ry="12" fill="#e5e7eb"/>
              <ellipse cx="40" cy="40" rx="22" ry="10" fill="#f9fafb" stroke="#d1d5db" strokeWidth="1"/>
              <ellipse cx="40" cy="34" rx="20" ry="8" fill="#fff" stroke="#d1d5db" strokeWidth="1"/>
              <ellipse cx="40" cy="28" rx="16" ry="7" fill="#f3f4f6" stroke="#e5e7eb" strokeWidth="1"/>
              <rect x="30" y="16" width="20" height="12" rx="3" fill="#f9fafb" stroke="#d1d5db" strokeWidth="1"/>
            </svg>
          }
        />
      </div>

      {/* ── Baby Care ── */}
      <SectionTitle>Baby Care</SectionTitle>
      <div style={layout.sectionGrid}>
        <CategoryCard
          imgSrc="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Baby_formula_-_Similac_-_cropped.jpg/320px-Baby_formula_-_Similac_-_cropped.jpg"
          label="Baby Formula"
          fallback={
            <svg viewBox="0 0 80 72" width="80" height="72">
              <rect x="22" y="16" width="36" height="48" rx="6" fill="#1d4ed8"/>
              <rect x="26" y="20" width="28" height="36" rx="4" fill="#3b82f6"/>
              <rect x="28" y="56" width="24" height="8" rx="3" fill="#1e40af"/>
              <ellipse cx="40" cy="16" rx="12" ry="4" fill="#93c5fd"/>
              <text x="34" y="40" fontSize="8" fill="#fff" fontWeight="bold">S</text>
            </svg>
          }
        />
        <CategoryCard
          imgSrc="https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Baby_Products.jpg/320px-Baby_Products.jpg"
          label="Baby Care"
          fallback={<span style={{fontSize:34}}>🧴</span>}
        />
      </div>
    </div>

    {/* Divider line like screenshot */}
    <div style={{ height: 10, background: "#e2e8f0", margin: "10px 0 0" }} />

    {/* ── For You ── */}
    <div style={{ ...layout.content, padding: "24px 0 0" }}>
      <SectionTitle>For You</SectionTitle>
      <div style={{
        background: "#fff", borderRadius: 20, padding: "24px",
        boxShadow: "0 10px 24px rgba(15,23,42,0.08)", marginBottom: 24,
      }}>
        {/* B2B Shopping — blue circle with two-people icon */}
        <ForYouItem
          label="B2B Shopping"
          bg="#1e3a8a"
          svgIcon={
            <svg width={38} height={38} viewBox="0 0 64 64" fill="none">
              <circle cx="22" cy="22" r="11" fill="#60a5fa"/>
              <circle cx="42" cy="22" r="11" fill="#34d399"/>
              <path d="M6 56c0-9 7-16 16-16h20c9 0 16 7 16 16" fill="#93c5fd" opacity="0.7"/>
              <path d="M26 40c2-1 4-1.5 6-1.5s4 .5 6 1.5" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
              <path d="M29 32l3 6 3-6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          }
        />
        {/* SalesMan App — blue headset person */}
        <ForYouItem
          label="SalesMan App"
          bg="#0ea5e9"
          svgIcon={
            <svg width={38} height={38} viewBox="0 0 64 64" fill="none">
              <circle cx="32" cy="20" r="12" fill="#bfdbfe"/>
              <circle cx="32" cy="20" r="6" fill="#93c5fd"/>
              <rect x="20" y="32" width="24" height="18" rx="8" fill="#3b82f6"/>
              <path d="M14 26a6 6 0 016-6v12a6 6 0 01-6-6z" fill="#1d4ed8"/>
              <path d="M50 26a6 6 0 00-6-6v12a6 6 0 006-6z" fill="#1d4ed8"/>
              <rect x="29" y="44" width="6" height="6" rx="3" fill="#fff" opacity="0.6"/>
            </svg>
          }
        />
        {/* Doctor Appointment — white bg with doctor SVG */}
        <ForYouItem
          label="Doctor Appointment"
          bg="#f0fdf4"
          svgIcon={
            <svg width={38} height={38} viewBox="0 0 64 64" fill="none">
              <circle cx="32" cy="16" r="12" fill="#fef3c7"/>
              <circle cx="32" cy="16" r="7" fill="#fde68a"/>
              <rect x="16" y="28" width="32" height="28" rx="8" fill="#fff"/>
              <rect x="20" y="28" width="24" height="28" rx="6" fill="#dcfce7"/>
              <rect x="29" y="34" width="6" height="14" rx="3" fill="#16a34a"/>
              <rect x="23" y="38" width="18" height="6" rx="3" fill="#16a34a"/>
              <path d="M24 12 Q32 4 40 12" stroke="#d97706" strokeWidth="2" fill="none"/>
            </svg>
          }
        />
      </div>

      {/* ── Lab Test ── */}
      <div style={layout.featureGrid}>
        <div>
          <SectionTitle>Lab Test</SectionTitle>
          <div style={{
            background: "#fff", borderRadius: 20, height: 180,
            marginBottom: 16, boxShadow: "0 10px 24px rgba(15,23,42,0.08)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#ccc", fontSize: 14,
          }}>
            {/* empty like screenshot */}
          </div>
        </div>

        <div>
          <SectionTitle>Doctor Appoinment</SectionTitle>
          <div style={{
            background: "#fff", borderRadius: 20, height: 180,
            marginBottom: 16, boxShadow: "0 10px 24px rgba(15,23,42,0.08)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#ccc", fontSize: 14,
          }}>
            {/* empty like screenshot */}
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Sidebar / Drawer — slides in from the LEFT edge of the phone
const ProfessionalHomeScreen = ({ setSidebarOpen, setCurrentPage }) => (
  <div style={{ ...style.screen, overflowY: "auto" }}>
    <div
      style={{
        background: "rgba(255,255,255,0.92)",
        backdropFilter: "blur(10px)",
        boxShadow: "0 1px 3px rgba(0,0,0,0.07)",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
    >
      <div
        style={{
          ...layout.content,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          padding: "18px 0 16px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <button
            onClick={() => setSidebarOpen(true)}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 2, display: "flex", alignItems: "center" }}
          >
            <Icon name="menu" size={28} color={theme.navy} />
          </button>
          <div>
            <div style={{ color: theme.green, fontWeight: 800, fontSize: 24, letterSpacing: -0.5 }}>
              Software House
            </div>
            <div style={{ fontSize: 12, color: theme.grayText, marginTop: 2 }}>
              B2B pharma ordering and fulfillment workspace
            </div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, color: theme.grayText, fontSize: 13 }}>
            <Icon name="shield" size={18} color={theme.green} />
            Secure ordering
          </div>
          <div style={{ position: "relative", cursor: "pointer" }}>
            <Icon name="cart" size={30} color={theme.navy} />
            <span
              style={{
                position: "absolute",
                top: -6,
                right: -6,
                background: theme.red,
                color: "#fff",
                borderRadius: "50%",
                fontSize: 10,
                width: 18,
                height: 18,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                border: "1.5px solid #fff",
              }}
            >
              0
            </span>
          </div>
        </div>
      </div>
    </div>

    <div style={{ ...layout.content, padding: "28px 0 48px" }}>
      <div style={layout.heroGrid}>
        <SurfaceCard
          style={{
            padding: 32,
            background:
              "linear-gradient(135deg, rgba(15,157,138,0.16) 0%, rgba(37,99,235,0.10) 100%)",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              borderRadius: 999,
              background: "rgba(255,255,255,0.72)",
              padding: "8px 14px",
              color: theme.greenDark,
              fontSize: 12,
              fontWeight: 700,
              marginBottom: 18,
            }}
          >
            <Icon name="orders" size={16} color={theme.greenDark} />
            Vedika Commerce Dashboard
          </div>
          <div style={{ fontSize: 38, lineHeight: 1.1, fontWeight: 800, color: theme.navy, maxWidth: 680 }}>
            Order medicines, OTC products, and partner supplies from one professional workspace.
          </div>
          <div style={{ fontSize: 16, lineHeight: 1.7, color: "#334155", marginTop: 14, maxWidth: 700 }}>
            Manage high-frequency pharmacy orders, retailer registration, and support channels in a cleaner desktop-first experience built for everyday operations.
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 22 }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 999,
                padding: "12px 18px",
                background: theme.green,
                color: "#fff",
                fontSize: 14,
                fontWeight: 700,
              }}
            >
              Browse product catalog
            </div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 999,
                padding: "12px 18px",
                background: "#ffffff",
                color: theme.navy,
                fontSize: 14,
                fontWeight: 700,
                border: `1px solid ${theme.grayBorder}`,
              }}
            >
              Retailer onboarding
            </div>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 24 }}>
            <HeroStat value="5000+" label="Available products" />
            <HeroStat value="24/7" label="Support readiness" />
            <HeroStat value="100%" label="Centralized order flow" />
          </div>
        </SurfaceCard>

        <SurfaceCard style={{ padding: 28 }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1.2, textTransform: "uppercase", color: theme.green }}>
            Operations Snapshot
          </div>
          <div style={{ fontSize: 26, fontWeight: 800, color: theme.navy, marginTop: 8 }}>
            Keep sales, support, and supply in one view.
          </div>
          <div style={{ fontSize: 14, color: theme.grayText, lineHeight: 1.7, marginTop: 10 }}>
            Use the dashboard to jump between ordering, wallet, retailer onboarding, and customer support without switching tools.
          </div>

          <div style={{ display: "grid", gap: 14, marginTop: 24 }}>
            {[
              { icon: "wallet", title: "Wallet Status", value: "Rs 0.00 available" },
              { icon: "user", title: "Retailer Access", value: "Registration and account actions ready" },
              { icon: "phone", title: "Support Line", value: "Fast contact options for order help" },
            ].map((item) => (
              <div
                key={item.title}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  padding: "14px 16px",
                  borderRadius: 18,
                  background: theme.gray,
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 14,
                    background: theme.white,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: `1px solid ${theme.grayBorder}`,
                  }}
                >
                  <Icon name={item.icon} size={20} color={theme.greenDark} />
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: theme.navy }}>{item.title}</div>
                  <div style={{ fontSize: 13, color: theme.grayText, marginTop: 4 }}>{item.value}</div>
                </div>
              </div>
            ))}
          </div>
        </SurfaceCard>
      </div>

      <SurfaceCard style={{ padding: "18px 22px", marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Icon name="search" size={20} color={theme.grayText} />
          <div>
            <div style={{ color: theme.navy, fontSize: 16, fontWeight: 700 }}>
              Search medicines, OTC, and business services
            </div>
            <div style={{ color: theme.grayText, fontSize: 13, marginTop: 3 }}>
              Search across 5000+ products, doctor services, lab support, and partner tools
            </div>
          </div>
        </div>
      </SurfaceCard>

      <div style={{ display: "grid", gap: 24 }}>
        <CollectionPanel
          eyebrow="Catalog"
          title="Medicine"
          description="Prescription-ready categories for fast ordering across daily operational demand."
        >
          <CategoryCard
            onClick={() => setCurrentPage("products:Capsules")}
            imgSrc="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/2019-01-11_Oral_contraceptive_pills_in_blister_packs.jpg/320px-2019-01-11_Oral_contraceptive_pills_in_blister_packs.jpg"
            label="Capsules"
            fallback={
              <svg viewBox="0 0 80 72" width="80" height="72">
                <rect x="15" y="28" width="50" height="18" rx="9" fill="#f5c842"/>
                <rect x="15" y="28" width="25" height="18" rx="9" fill="#e6a800"/>
                <text x="28" y="41" fontSize="9" fill="#fff" fontWeight="bold">L U</text>
                <rect x="15" y="50" width="50" height="18" rx="9" fill="#f5c842"/>
                <rect x="15" y="50" width="25" height="18" rx="9" fill="#e6a800"/>
                <text x="24" y="63" fontSize="9" fill="#fff" fontWeight="bold">D 0 3</text>
              </svg>
            }
          />
          <CategoryCard
            onClick={() => setCurrentPage("products:capsule")}
            imgSrc="https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Herbal_supplements.jpg/320px-Herbal_supplements.jpg"
            label="capsule"
            fallback={
              <svg viewBox="0 0 80 72" width="80" height="72">
                {[{x:30,y:10,r:0},{x:50,y:18,r:30},{x:20,y:30,r:-20},{x:45,y:35,r:45},{x:32,y:50,r:10},{x:55,y:48,r:-30}].map((c,i)=>(
                  <g key={i} transform={`translate(${c.x},${c.y}) rotate(${c.r})`}>
                    <rect x="-10" y="-5" width="20" height="10" rx="5" fill="#7ac942"/>
                    <rect x="-10" y="-5" width="10" height="10" rx="5" fill="#5ba832"/>
                  </g>
                ))}
              </svg>
            }
          />
          <CategoryCard
            onClick={() => setCurrentPage("products:Medicine")}
            imgSrc="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/%E7%BA%A2%E7%BB%BF%E8%83%B6%E5%9B%8A.jpg/320px-%E7%BA%A2%E7%BB%BF%E8%83%B6%E5%9B%8A.jpg"
            label="Medicine"
            fallback={
              <svg viewBox="0 0 80 72" width="80" height="72">
                <g transform="translate(40,36) rotate(-30)">
                  <rect x="-22" y="-10" width="44" height="20" rx="10" fill="#e05c5c"/>
                  <rect x="-22" y="-10" width="22" height="20" rx="10" fill="#f5e0c0"/>
                </g>
              </svg>
            }
          />
          <CategoryCard
            onClick={() => setCurrentPage("products:Injection")}
            imgSrc="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Syringe_2.jpg/320px-Syringe_2.jpg"
            label="Injection"
            fallback={
              <svg viewBox="0 0 80 72" width="80" height="72">
                <rect x="34" y="8" width="12" height="42" rx="4" fill="#c084fc"/>
                <rect x="36" y="10" width="8" height="38" rx="3" fill="#e9d5ff"/>
                <rect x="30" y="48" width="20" height="8" rx="2" fill="#7c3aed"/>
                <rect x="38" y="56" width="4" height="10" rx="1" fill="#6d28d9"/>
              </svg>
            }
          />
        </CollectionPanel>

        <CollectionPanel
          eyebrow="Wellness"
          title="OTC"
          description="Front-counter essentials including ayurveda, bandages, and non-prescription care."
        >
          <CategoryCard
            imgSrc="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Spices_of_Kerala.jpg/320px-Spices_of_Kerala.jpg"
            label="Ayurveda Prod..."
            fallback={
              <svg viewBox="0 0 80 72" width="80" height="72">
                <ellipse cx="40" cy="52" rx="22" ry="14" fill="#c8a96e"/>
                <ellipse cx="40" cy="48" rx="18" ry="10" fill="#8B6914"/>
                <path d="M30 20 Q40 5 50 20 Q45 35 40 42 Q35 35 30 20z" fill="#4ade80"/>
                <path d="M22 28 Q32 15 42 28" fill="#22c55e" opacity="0.7"/>
                <path d="M38 28 Q48 15 58 28" fill="#16a34a" opacity="0.7"/>
              </svg>
            }
          />
          <CategoryCard
            imgSrc="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Pills.jpg/320px-Pills.jpg"
            label="OTC Medicine 2"
            fallback={
              <svg viewBox="0 0 80 72" width="80" height="72">
                <ellipse cx="40" cy="44" rx="20" ry="14" fill="#d4d4d4" opacity="0.4"/>
                {[{x:28,y:28,c:"#e05c5c"},{x:42,y:22,c:"#f5c842"},{x:55,y:30,c:"#4ade80"},{x:34,y:42,c:"#60a5fa"},{x:50,y:44,c:"#f97316"},{x:24,y:40,c:"#c084fc"}].map((p,i)=>(
                  <circle key={i} cx={p.x} cy={p.y} r="7" fill={p.c}/>
                ))}
              </svg>
            }
          />
          <CategoryCard
            imgSrc="https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Bandage_roll.jpg/320px-Bandage_roll.jpg"
            label="BANDAGE"
            fallback={
              <svg viewBox="0 0 80 72" width="80" height="72">
                <ellipse cx="40" cy="46" rx="24" ry="12" fill="#e5e7eb"/>
                <ellipse cx="40" cy="40" rx="22" ry="10" fill="#f9fafb" stroke="#d1d5db" strokeWidth="1"/>
                <ellipse cx="40" cy="34" rx="20" ry="8" fill="#fff" stroke="#d1d5db" strokeWidth="1"/>
                <ellipse cx="40" cy="28" rx="16" ry="7" fill="#f3f4f6" stroke="#e5e7eb" strokeWidth="1"/>
                <rect x="30" y="16" width="20" height="12" rx="3" fill="#f9fafb" stroke="#d1d5db" strokeWidth="1"/>
              </svg>
            }
          />
        </CollectionPanel>

        <CollectionPanel
          eyebrow="Family Care"
          title="Baby Care"
          description="Professional access to nutrition and recurring family-care products."
        >
          <CategoryCard
            imgSrc="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Baby_formula_-_Similac_-_cropped.jpg/320px-Baby_formula_-_Similac_-_cropped.jpg"
            label="Baby Formula"
            fallback={
              <svg viewBox="0 0 80 72" width="80" height="72">
                <rect x="22" y="16" width="36" height="48" rx="6" fill="#1d4ed8"/>
                <rect x="26" y="20" width="28" height="36" rx="4" fill="#3b82f6"/>
                <rect x="28" y="56" width="24" height="8" rx="3" fill="#1e40af"/>
                <ellipse cx="40" cy="16" rx="12" ry="4" fill="#93c5fd"/>
                <text x="34" y="40" fontSize="8" fill="#fff" fontWeight="bold">S</text>
              </svg>
            }
          />
          <CategoryCard
            imgSrc="https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Baby_Products.jpg/320px-Baby_Products.jpg"
            label="Baby Care"
            fallback={<span style={{ fontSize: 34 }}>BC</span>}
          />
        </CollectionPanel>

        <div>
          <SectionTitle>Business Services</SectionTitle>
          <div style={layout.shortcutGrid}>
            <ServiceCard
              icon={<Icon name="cart" size={26} color={theme.greenDark} />}
              title="B2B Shopping"
              description="Create repeatable purchasing flows for retailer orders, bulk medicine requests, and regular partner replenishment."
              actionLabel="Open ordering workspace"
            />
            <ServiceCard
              icon={<Icon name="orders" size={26} color={theme.greenDark} />}
              title="Sales Operations"
              description="Keep sales teams aligned with product visibility, retailer onboarding, and consistent follow-up on active requirements."
              actionLabel="Manage sales activity"
            />
            <ServiceCard
              icon={<Icon name="chat" size={26} color={theme.greenDark} />}
              title="Doctor Appointment"
              description="Prepare a cleaner service area for consultations, appointment requests, and doctor-facing coordination inside one system."
              actionLabel="Configure appointment flow"
            />
          </div>
        </div>

        <div>
          <SectionTitle>Upcoming Services</SectionTitle>
          <div style={layout.featureGrid}>
            <EmptyFeatureCard
              icon={<Icon name="search" size={24} color={theme.greenDark} />}
              title="Lab Test"
              description="Set up at-home collection requests, test package visibility, and customer coordination from a single business-facing panel."
              actionLabel="Prepare lab service"
            />
            <EmptyFeatureCard
              icon={<Icon name="user" size={24} color={theme.greenDark} />}
              title="Doctor Appointment"
              description="Offer a more structured appointment experience with doctor listing, booking status, and customer communication workflows."
              actionLabel="Plan appointment module"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Sidebar = ({ open, onClose, setCurrentPage }) => {
  const menuItems = [
    { icon: "user",     label: "My Accounts",          page: "profile" },
    { icon: "grid",     label: "Retailer Registration", page: "retailer" },
    { icon: "grid",     label: "B2B Dashboard",         page: null },
    { icon: "wallet",   label: "Wallet",                page: "wallet" },
    { icon: "bookmark", label: "Order History",         page: null },
    { icon: "share",    label: "Share",                 page: null },
    { icon: "bell",     label: "Notification",          badge: "new 0", page: null },
    { icon: "info",     label: "About us",              page: "about" },
    { icon: "shield",   label: "Privacy Policy",        page: "privacy" },
    { icon: "info",     label: "Contact us",            page: "contact" },
    { icon: "exit",     label: "Exit",                  page: null },
  ];

  return (
    <>
      {/* Dim overlay */}
      <div
        onClick={onClose}
        style={{
          position: "fixed", inset: 0, zIndex: 200,
          background: "rgba(0,0,0,0.45)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 0.28s ease",
        }}
      />
      {/* Drawer panel */}
      <div style={{
        position: "fixed", top: 0, left: 0,
        width: "min(320px, 86vw)", height: "100vh",
        background: "#fff",
        zIndex: 300,
        transform: open ? "translateX(0)" : "translateX(-100%)",
        transition: "transform 0.28s cubic-bezier(.4,0,.2,1)",
        boxShadow: open ? "6px 0 24px rgba(0,0,0,0.18)" : "none",
        display: "flex", flexDirection: "column",
        overflowY: "auto",
      }}>
        {/* Green profile header */}
        <div style={{
          background: theme.green,
          padding: "44px 20px 22px",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
        }}>
          <div style={{
            width: 72, height: 72, borderRadius: "50%",
            background: "#1e40af",
            display: "flex", alignItems: "center", justifyContent: "center",
            border: "3px solid rgba(255,255,255,0.5)",
          }}>
            <Icon name="user" size={38} color="#fff" />
          </div>
          <span style={{ color: "#fff", fontSize: 15, fontWeight: 600, letterSpacing: 0.3 }}>
            9348225402
          </span>
        </div>

        {/* Menu list */}
        <div style={{ flex: 1 }}>
          {menuItems.map((item, i) => (
            <button
              key={i}
              onClick={() => {
                if (item.page) { setCurrentPage(item.page); }
                onClose();
              }}
              style={{
                width: "100%", background: "none", border: "none",
                borderBottom: "1px solid #f3f4f6",
                padding: "15px 20px",
                display: "flex", alignItems: "center", gap: 14,
                cursor: "pointer", textAlign: "left",
              }}
            >
              <Icon name={item.icon} size={20} color="#444" />
              <span style={{ flex: 1, fontSize: 14, color: "#222", fontWeight: 500 }}>{item.label}</span>
              {item.badge && (
                <span style={{
                  background: theme.green, color: "#fff",
                  borderRadius: 10, fontSize: 10, padding: "2px 8px", fontWeight: 700,
                }}>{item.badge}</span>
              )}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

// Profile Screen
const ProfileScreen = ({ setCurrentPage }) => (
  <div style={style.screen}>
    <div style={{ background: theme.white, padding: "16px", display: "flex", alignItems: "center", justifyContent: "space-between", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
      <button onClick={() => setCurrentPage("home")} style={{ background: "none", border: "none", cursor: "pointer" }}>
        <Icon name="back" size={22} color={theme.navy} />
      </button>
      <span style={{ fontWeight: 800, fontSize: 17, color: theme.navy }}>Profile</span>
      <button style={{ width: 38, height: 38, borderRadius: "50%", background: "#eff6ff", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Icon name="settings" size={18} color={theme.blue} />
      </button>
    </div>

    <div style={{ padding: "30px 20px 20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ width: 100, height: 100, borderRadius: "50%", background: "#e5e7eb", marginBottom: 12, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontSize: 60 }}>👤</span>
      </div>
      <span style={{ color: theme.grayText, fontSize: 14 }}>Customer ID: 8768</span>
    </div>

    <div style={{ padding: "0 16px" }}>
      <div style={{ fontWeight: 700, fontSize: 15, color: theme.navy, marginBottom: 12 }}>More</div>
      {[
        { icon: "edit", label: "Edit Profile", color: theme.blue },
        { icon: "location", label: "My Address", color: theme.blue },
        { icon: "orders", label: "My Orders", color: theme.blue },
        { icon: "chat", label: "Chat with us", color: theme.blue },
        { icon: "phone", label: "Talk to our Support", color: theme.blue },
        { icon: "mail", label: "Feedback / Complain", color: theme.blue },
        { icon: "logout", label: "Log Out", color: theme.red },
      ].map((item, i) => (
        <div key={i} style={{ background: theme.white, borderRadius: 14, padding: "16px 16px", marginBottom: 10, display: "flex", alignItems: "center", gap: 14, cursor: "pointer", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
          <Icon name={item.icon} size={20} color={item.color} />
          <span style={{ flex: 1, fontSize: 14, color: item.label === "Log Out" ? theme.red : theme.navy, fontWeight: 500 }}>{item.label}</span>
          <Icon name="chevronRight" size={18} color={theme.grayText} />
        </div>
      ))}
    </div>
  </div>
);

// Retailer Registration
const RetailerScreen = ({ setCurrentPage }) => {
  const fields = [
    "Shop/Firm Full Name *", "Owner Name *", "Shop Address *",
    "Pincode *", "City *", "District *", "State *",
    "Email Address (Optional)", "GSTIN Number", "PAN Number", "License No"
  ];
  return (
    <div style={style.screen}>
      <div style={{ background: theme.white, padding: "16px", display: "flex", alignItems: "center", gap: 16, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
        <button onClick={() => setCurrentPage("home")} style={{ background: "none", border: "none", cursor: "pointer" }}>
          <Icon name="back" size={22} color={theme.navy} />
        </button>
        <span style={{ fontWeight: 800, fontSize: 17, color: theme.navy }}>Retailer Details</span>
      </div>
      <div style={{ padding: 16 }}>
        {fields.map(f => (
          <input key={f} placeholder={f} style={{
            width: "100%", boxSizing: "border-box", padding: "14px 16px", marginBottom: 12,
            borderRadius: 10, border: "1.5px solid #e5e7eb", fontSize: 14, color: theme.navy,
            background: theme.white, outline: "none",
          }} />
        ))}
        {/* Vendor Search */}
        <div style={{ marginBottom: 12 }}>
          <div style={{ display: "flex", alignItems: "center", borderBottom: "1.5px solid #e5e7eb", padding: "8px 0", marginBottom: 10 }}>
            <Icon name="search" size={18} color={theme.blue} />
            <input placeholder="Search Vendor" style={{ flex: 1, border: "none", outline: "none", fontSize: 14, color: theme.navy, paddingLeft: 10 }} />
            <span style={{ fontSize: 22, color: theme.grayText, cursor: "pointer" }}>+</span>
          </div>
          <span style={{ background: "#fff", border: "1.5px solid #e5e7eb", borderRadius: 20, padding: "4px 12px", fontSize: 12, color: theme.navy, display: "inline-flex", alignItems: "center", gap: 6 }}>
            Software House <span style={{ color: theme.red, cursor: "pointer" }}>✕</span>
          </span>
        </div>
        <button style={{ width: "100%", background: theme.green, color: "#fff", border: "none", borderRadius: 28, padding: "16px", fontSize: 16, fontWeight: 700, cursor: "pointer", marginTop: 8 }}>
          Register
        </button>
      </div>
    </div>
  );
};

// Wallet Screen
const WalletScreen = ({ setCurrentPage }) => (
  <div style={style.screen}>
    {/* Green header */}
    <div style={{ background: theme.green, padding: "40px 20px 30px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
        <div>
          <div style={{ color: "#fff", fontSize: 30, fontWeight: 800 }}>₹ 0.0</div>
          <div style={{ color: "#c8f7da", fontSize: 13, marginTop: 4 }}>Available Balance</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
          <span style={{ color: "#c8f7da", fontSize: 12 }}>ID: 8768</span>
          <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#1e40af", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon name="user" size={22} color="#fff" />
          </div>
        </div>
      </div>
      <div style={{ display: "flex", gap: 10, justifyContent: "space-between" }}>
        {[
          { icon: "send", label: "Send" },
          { icon: "search", label: "Request" },
          { icon: "wallet", label: "Loan" },
          { icon: "chevronRight", label: "Topup" },
        ].map(a => (
          <div key={a.label} style={{ flex: 1, background: "rgba(255,255,255,0.2)", borderRadius: 14, padding: "12px 0", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, cursor: "pointer" }}>
            <Icon name={a.icon} size={22} color="#fff" />
            <span style={{ fontSize: 11, color: "#fff", fontWeight: 600 }}>{a.label}</span>
          </div>
        ))}
      </div>
    </div>

    {/* Transactions */}
    <div style={{ background: theme.white, borderRadius: "20px 20px 0 0", minHeight: 300, padding: "20px 16px", marginTop: -10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <span style={{ fontWeight: 800, fontSize: 16, color: theme.navy }}>Transactions</span>
        <span style={{ fontSize: 13, color: theme.green, fontWeight: 600 }}>See all</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: 200, color: theme.grayText, fontSize: 14 }}>
        No transactions yet
      </div>
    </div>
  </div>
);

// ── Shared Page Header ──────────────────────────────────────
const PageHeader = ({ title, onBack, uppercase = false }) => (
  <div style={{
    background: "#fff",
    borderBottom: "1px solid #e5e7eb",
    position: "sticky", top: 0, zIndex: 10,
  }}>
    <div style={{ ...layout.content, padding: "15px 0", display: "flex", alignItems: "center", gap: 14 }}>
      <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", padding: 2 }}>
        <Icon name="back" size={22} color="#222" />
      </button>
      <span style={{ fontWeight: 800, fontSize: 18, color: "#111", letterSpacing: uppercase ? 0.8 : 0, textTransform: uppercase ? "uppercase" : "none" }}>
        {title}
      </span>
    </div>
  </div>
);

// ── About Us ─────────────────────────────────────────────────
const AboutScreen = ({ setCurrentPage }) => (
  <div style={{ ...style.screen, background: "#f5f6fa" }}>
    <PageHeader title="ABOUT US" onBack={() => setCurrentPage("home")} uppercase />
    <div style={{ padding: "16px 16px", background: "#fff", minHeight: "90vh" }}>
      <p style={{ color: theme.green, fontWeight: 800, fontSize: 15, marginBottom: 8, marginTop: 4 }}>About</p>
      <p style={{ fontSize: 14, color: "#111", lineHeight: 1.75, textAlign: "justify", margin: 0 }}>
        vedikamed.com brings an online platform, which can be accessed for all your health needs. We are trying to make healthcare an easy experience for you. Get all kinds of medicines, vitamins &amp; nutrition supplements and other health-related products delivered at your doorstep. Lab tests? That too in the comfort of your home.
      </p>
    </div>
  </div>
);

// ── Privacy Policy ───────────────────────────────────────────
const privacySections = [
  {
    heading: "1. Introduction",
    body: `Welcome to Vedikamed. Vedikamed ("us", "we", or "our") operates vedikamed.com (hereinafter referred to as "Service"). Our Privacy Policy governs your visit to vedikamed.com, and explains how we collect, safeguard and disclose information that results from your use of our Service. We use your data to provide and improve Service. By using Service, you agree to the collection and use of information in accordance with this policy. Unless otherwise defined in this Privacy Policy, the terms used in this Privacy Policy have the same meanings as in our Terms and Conditions. Our Terms and Conditions ("Terms") govern all use of our Service and together with the Privacy Policy constitutes your agreement with us ("agreement").`,
  },
  {
    heading: "2. Definitions",
    body: `SERVICE means the vedikamed.com website operated by Vedikamed. PERSONAL DATA means data about a living individual who can be identified from those data (or from those and other information either in our possession or likely to come into our possession).\nUSAGE DATA is data collected automatically either generated by the use of Service or from Service infrastructure itself (for example, the duration of a page visit).\nCOOKIES are small files stored on your device (computer or mobile device).\nDATA CONTROLLER means a natural or legal person who (either alone or jointly or in common with other persons) determines the purposes for which and the manner in which any personal data are, or are to be, processed. For the purpose of this Privacy Policy, we are a Data Controller of your data.\nDATA PROCESSORS (OR SERVICE PROVIDERS) means any natural or legal person who processes the data on behalf of the Data Controller. We may use the services of various Service Providers in order to process your data more effectively.\nSUBJECT any living individual who is the subject of Personal Data.\nTHE USER is the individual using our Service. The User corresponds to the Data Subject, who is the subject of Personal Data.`,
  },
  {
    heading: "3. Information Collection and Use",
    body: `We collect several different types of information for various purposes to provide and improve our Service to you.`,
  },
  {
    heading: "4. Types of Data Collected Personal Data",
    body: `While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). Personally identifiable information may include, but is not limited to:\n\n0.1. Email address\n0.2. First name and last name\n0.3. Phone number\n0.4. Address, Country, State, Province, ZIP/Postal code, City\n0.5. Cookies and Usage Data\n\nWe may use your Personal Data to contact you with newsletters, marketing or promotional materials and other information that may be of interest to you. You may opt out of receiving any, or all, of these communications from us by following the unsubscribe link.\nUsage Data\n\nWe may also collect information that your browser sends whenever you visit our Service or when you access Service by or through any device ("Usage Data").`,
  },
  {
    heading: "5. Use of Data",
    body: `Vedikamed uses the collected data for various purposes:\n0.1. to provide and maintain our Service;\n0.2. to notify you about changes to our Service;\n0.3. to allow you to participate in interactive features of our Service when you choose to do so;\n0.4. to provide customer support;\n0.5. to gather analysis or valuable information so that we can improve our Service;\n0.6. to monitor the usage of our Service;\n0.7. to detect, prevent and address technical issues;\n0.8. to fulfil any other purpose for which you provide it;\n0.9. to carry out our obligations and enforce our rights arising from any contracts entered into between you and us, including for billing and collection;\n0.10. to provide you with notices about your account and/or subscription, including expiration and renewal notices;\n0.11. to provide you with news, special offers and general information about other goods, services and events;\n0.12. in any other way we may describe when you provide the information;\n0.13. for any other purpose with your consent.`,
  },
  {
    heading: "6. Retention of Data",
    body: `We will retain your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use your Personal Data to the extent necessary to comply with our legal obligations (for example, if we are required to retain your data to comply with applicable laws), resolve disputes, and enforce our legal agreements and policies.`,
  },
  {
    heading: "7. Transfer of Data",
    body: `Your information, including Personal Data, may be transferred to — and maintained on — computers located outside of your state, province, country or other governmental jurisdiction where the data protection laws may differ from those of your jurisdiction. If you are located outside India and choose to provide information to us, please note that we transfer the data, including Personal Data, to India and process it there.`,
  },
  {
    heading: "8. Disclosure of Data",
    body: `We may disclose personal information that we collect, or you provide:\n0.1. Disclosure for Law Enforcement. Under certain circumstances, we may be required to disclose your Personal Data if required to do so by law or in response to valid requests by public authorities.\n0.2. Business Transaction. If we or our subsidiaries are involved in a merger, acquisition or asset sale, your Personal Data may be transferred.\n0.3. Other cases:\n0.3.1. to our subsidiaries and affiliates;\n0.3.2. to contractors, service providers, and other third parties we use to support our business;\n0.3.3. to fulfill the purpose for which you provide it;\n0.3.4. for the purpose of including your company's logo on our website;\n0.3.5. for any other purpose disclosed by us when you provide the information;\n0.3.6. with your consent in any other cases;\n0.3.7. if we believe disclosure is necessary or appropriate to protect the rights, property, or safety of the Company, our customers, or others.`,
  },
  {
    heading: "9. Security of Data",
    body: `The security of your data is important to us but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.`,
  },
  {
    heading: "10. Your Data Protection Rights Under General Data Protection Regulation (GDPR)",
    body: `If you are a resident of the European Union (EU) and European Economic Area (EEA), you have certain data protection rights, covered by GDPR. We aim to take reasonable steps to allow you to correct, amend, delete, or limit the use of your Personal Data.\n0.1. the right to access, update or to delete the information we have on you;\n0.2. the right of rectification;\n0.3. the right to object;\n0.4. the right of restriction;\n0.5. the right to data portability;\n0.6. the right to withdraw consent.`,
  },
  {
    heading: "11. Your Data Protection Rights under the California Privacy Protection Act (CalOPPA)",
    body: `CalOPPA is the first state law in the nation to require commercial websites and online services to post a privacy policy.\n0.1. users can visit our site anonymously;\n0.2. our Privacy Policy link includes the word "Privacy", and can easily be found on the home page of our website;\n0.3. users will be notified of any privacy policy changes on our Privacy Policy Page;\n0.4. users are able to change their personal information by emailing us at vedikamedi@gmail.com.`,
  },
  {
    heading: "12. Your Data Protection Rights under the India Consumer Privacy Act",
    body: `If you are an Indian resident, you are entitled to learn what data we collect about you, ask to delete your data and not to sell (share) it. To exercise your data protection rights, you can make certain requests and ask us:\n0.1. What personal information we have about you;\n0.2. To delete your personal information;\n0.3. To stop selling your personal information.`,
  },
  {
    heading: "13. Service Providers",
    body: `We may employ third party companies and individuals to facilitate our Service ("Service Providers"), provide Service on our behalf, perform Service-related services or assist us in analysing how our Service is used. These third parties have access to your Personal Data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.`,
  },
  {
    heading: "14. Links to Other Sites",
    body: `Our Service may contain links to other sites that are not operated by us. If you click a third party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you visit. We have no control over and assume no responsibility for the content, privacy policies or practices of any third party sites or services.`,
  },
  {
    heading: "15. Children's Privacy",
    body: `Our Services are not intended for use by children under the age of 18 ("Child" or "Children"). We do not knowingly collect personally identifiable information from Children under 18. If you become aware that a Child has provided us with Personal Data, please contact us.`,
  },
  {
    heading: "16. Changes to This Privacy Policy",
    body: `We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. We will let you know via email and/or a prominent notice on our Service, prior to the change becoming effective and update "effective date" at the top of this Privacy Policy.`,
  },
];

const PrivacyScreen = ({ setCurrentPage }) => (
  <div style={{ ...style.screen, background: "#fff" }}>
    <PageHeader title="Privacy Policy" onBack={() => setCurrentPage("home")} />
    <div style={{ padding: "14px 16px 40px" }}>
      {privacySections.map((s, i) => (
        <div key={i} style={{ marginBottom: 20 }}>
          <p style={{ color: theme.green, fontWeight: 800, fontSize: 14, marginBottom: 6, marginTop: 0 }}>{s.heading}</p>
          <p style={{ fontSize: 13, color: "#111", lineHeight: 1.78, textAlign: "justify", margin: 0, whiteSpace: "pre-line" }}>{s.body}</p>
        </div>
      ))}
    </div>
  </div>
);

// ── Contact Us ────────────────────────────────────────────────
const ContactScreen = ({ setCurrentPage }) => (
  <div style={{ ...style.screen, background: "#f5f6fa" }}>
    <PageHeader title="CONTACT US" onBack={() => setCurrentPage("home")} uppercase />
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", minHeight: "78vh", padding: "0 24px", gap: 18,
    }}>
      <p style={{
        color: theme.green, fontWeight: 800, fontSize: 22,
        textDecoration: "underline", margin: 0, textAlign: "center",
      }}>Contact Us</p>

      <p style={{ fontWeight: 700, fontSize: 14, color: "#111", textAlign: "center", lineHeight: 1.8, margin: 0 }}>
        Vedika Software Pvt.<br />
        Ltd.3dr Floor;<br />
        J-4-A Gali No.6 Laxmi<br />
        Nagar New Delhi, DELHI<br />
        110092
      </p>

      <p style={{ fontWeight: 700, fontSize: 14, color: "#111", textAlign: "center", margin: 0 }}>
        Contact No: 9038735766, 9110099122
      </p>

      {/* Social icons row */}
      <div style={{ display: "flex", gap: 18, marginTop: 8 }}>
        {/* Facebook */}
        <div style={{ width: 48, height: 48, borderRadius: "50%", background: "#1877f2", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <svg width={22} height={22} viewBox="0 0 24 24" fill="#fff">
            <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
          </svg>
        </div>
        {/* LinkedIn */}
        <div style={{ width: 48, height: 48, borderRadius: "50%", background: "#0077b5", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <svg width={22} height={22} viewBox="0 0 24 24" fill="#fff">
            <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
            <circle cx="4" cy="4" r="2" fill="#fff"/>
          </svg>
        </div>
        {/* YouTube */}
        <div style={{ width: 48, height: 48, borderRadius: "50%", background: "#ff0000", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <svg width={22} height={22} viewBox="0 0 24 24" fill="#fff">
            <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58z"/>
            <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#ff0000"/>
          </svg>
        </div>
        {/* Twitter */}
        <div style={{ width: 48, height: 48, borderRadius: "50%", background: "#1da1f2", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <svg width={22} height={22} viewBox="0 0 24 24" fill="#fff">
            <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
          </svg>
        </div>
      </div>
    </div>
  </div>
);

// Search Screen
const SearchScreen = () => (
  <div style={style.screen}>
    <div style={{ padding: 16 }}>
      <div style={{ background: theme.white, borderRadius: 12, padding: "12px 14px", display: "flex", alignItems: "center", gap: 10, boxShadow: "0 1px 4px rgba(0,0,0,0.07)", marginBottom: 20 }}>
        <Icon name="search" size={18} color={theme.grayText} />
        <input placeholder="Search from 5000+ products" style={{ border: "none", outline: "none", flex: 1, fontSize: 14, color: theme.navy, background: "transparent" }} />
      </div>
      <div style={{ color: theme.grayText, textAlign: "center", marginTop: 60, fontSize: 14 }}>Search for medicines & health products</div>
    </div>
  </div>
);

// Orders Screen
const OrdersScreen = () => (
  <div style={style.screen}>
    <div style={{ padding: 20, textAlign: "center", marginTop: 80, color: theme.grayText, fontSize: 14 }}>
      <div style={{ fontSize: 50, marginBottom: 16 }}>📦</div>
      No orders yet
    </div>
  </div>
);

// ── Product List Screen ──────────────────────────────────────
const productData = {
  Capsules: {
    bannerBg: "#fff",
    bannerSvg: (
      <svg viewBox="0 0 340 160" width="340" height="160">
        {/* Two yellow oblong tablets stacked */}
        <g transform="translate(170,55)">
          <rect x="-90" y="-22" width="180" height="44" rx="22" fill="#f5c518"/>
          <rect x="-90" y="-22" width="90" height="44" rx="22" fill="#e6a800"/>
          <text x="-18" y="8" fontSize="22" fontWeight="bold" fill="#fff" fontFamily="sans-serif">L | U</text>
        </g>
        <g transform="translate(170,115)">
          <rect x="-90" y="-22" width="180" height="44" rx="22" fill="#f5c518"/>
          <rect x="-90" y="-22" width="90" height="44" rx="22" fill="#e6a800"/>
          <text x="-24" y="8" fontSize="22" fontWeight="bold" fill="#fff" fontFamily="sans-serif">D 0 3</text>
        </g>
      </svg>
    ),
    products: [
      { name: "A TRET 25MG CAPSULE", stars: 1, mrp: 0.0, price: 0.0, discount: 0.0, unit: "" },
      { name: "ABCLOX 250MG/250MG CAPSULE", stars: 1, mrp: 0.0, price: 0.0, discount: 0.0, unit: "" },
      { name: "AC DOX 250MG/250MG CAPSULE", stars: 1, mrp: 0.0, price: 0.0, discount: 0.0, unit: "" },
    ],
  },
  capsule: {
    bannerBg: "#fff",
    bannerSvg: (
      <svg viewBox="0 0 340 160" width="340" height="160">
        {[
          {x:240,y:30,r:-30},{x:120,y:25,r:20},{x:280,y:90,r:45},
          {x:80,y:90,r:-10},{x:190,y:110,r:15},{x:60,y:135,r:30},{x:290,y:140,r:-20},
        ].map((c,i)=>(
          <g key={i} transform={`translate(${c.x},${c.y}) rotate(${c.r})`}>
            <rect x="-45" y="-16" width="90" height="32" rx="16" fill="#7ac942"/>
            <rect x="-45" y="-16" width="45" height="32" rx="16" fill="#5ba832"/>
            {/* dots */}
            {[[-20,-5],[-5,-5],[10,-5],[-20,6],[-5,6],[10,6]].map(([dx,dy],j)=>
              <circle key={j} cx={dx+22} cy={dy} r="2.5" fill="#fff" opacity="0.6"/>
            )}
          </g>
        ))}
      </svg>
    ),
    products: [
      { name: "CRESEMBA 100MG CAPSULE", stars: 1, mrp: 120.0, price: 120.0, discount: 0.0, unit: "capsule" },
      { name: "GENERIC ZOLOFIT", stars: 1, mrp: 50.0, price: 50.0, discount: 0.0, unit: "box" },
    ],
  },
  Medicine: {
    bannerBg: "#fff",
    bannerSvg: (
      <svg viewBox="0 0 340 160" width="340" height="160">
        <g transform="translate(170,88) rotate(-20)">
          <rect x="-80" y="-34" width="160" height="68" rx="34" fill="#c8392b"/>
          <rect x="-80" y="-34" width="80" height="68" rx="34" fill="#f0d9b5"/>
        </g>
      </svg>
    ),
    products: [
      { name: "A 1 5MG TABLET 10 TABLETS IN 1 STRIP", stars: 4, mrp: 15.0, price: 15.0, discount: 0.0, unit: "10 tablets in 1 strip" },
      { name: "A C FORD 100MG TABLET 4 TABLETS IN 1 STRIP", stars: 1, mrp: 597.0, price: 597.0, discount: 0.0, unit: "4 tablets in 1 strip" },
      { name: "A CLO 200MG TABLET SR 10 TABLET SR IN 1 STRIP", stars: 1, mrp: 595.0, price: 595.0, discount: 0.0, unit: "10 tablets in 1 strip" },
    ],
  },
  Injection: {
    bannerBg: "#fff",
    bannerSvg: (
      <svg viewBox="0 0 340 160" width="340" height="160">
        {/* Vial */}
        <rect x="140" y="30" width="70" height="100" rx="12" fill="#d8b4fe"/>
        <rect x="148" y="38" width="54" height="84" rx="8" fill="#ede9fe"/>
        <rect x="140" y="30" width="70" height="22" rx="8" fill="#9333ea"/>
        <text x="155" y="82" fontSize="9" fill="#7c3aed" fontWeight="bold">COVID</text>
        <text x="158" y="94" fontSize="9" fill="#7c3aed" fontWeight="bold">-19</text>
        {/* Left ampoule */}
        <rect x="80" y="60" width="32" height="80" rx="10" fill="#fca5a5"/>
        <rect x="80" y="60" width="32" height="20" rx="8" fill="#ef4444"/>
        <text x="83" y="82" fontSize="6" fill="#fff" fontWeight="bold" transform="rotate(-90,96,100)">COVID-19</text>
        {/* Right ampoule */}
        <rect x="228" y="60" width="32" height="80" rx="10" fill="#fca5a5"/>
        <rect x="228" y="60" width="32" height="20" rx="8" fill="#ef4444"/>
        {/* Syringe */}
        <rect x="170" y="68" width="120" height="14" rx="7" fill="#93c5fd" transform="rotate(-35,170,68)"/>
        <rect x="268" y="110" width="6" height="20" rx="3" fill="#f97316" transform="rotate(-35,268,110)"/>
      </svg>
    ),
    products: [
      { name: "A CEF 1GM INJECTION 1 INJECTION IN 1 VIAL", stars: 4, mrp: 50.3, price: 45.3, discount: 5.0, unit: "1 Injection in 1 vial" },
      { name: "A CEF 2GM INJECTION 1 INJECTION IN 1 VIAL", stars: 1, mrp: 149.9, price: 135.0, discount: 15.0, unit: "1 Injection in 1 vial" },
      { name: "A CON 150MG INJECTION 2 ML IN 1 VIAL", stars: 1, mrp: 83.5, price: 75.2, discount: 8.3, unit: "2 ml in 1 vial" },
    ],
  },
  Insulin: {
    bannerBg: "#fff",
    bannerSvg: (
      <svg viewBox="0 0 340 160" width="340" height="160">
        {/* Insulin pen */}
        <rect x="40" y="95" width="200" height="28" rx="14" fill="#c8b89a"/>
        <rect x="40" y="95" width="40" height="28" rx="14" fill="#6b7280"/>
        <rect x="230" y="99" width="40" height="20" rx="10" fill="#d97706"/>
        <circle cx="240" cy="109" r="8" fill="#f59e0b"/>
        {/* Vial */}
        <rect x="230" y="20" width="50" height="75" rx="10" fill="#e5e7eb"/>
        <rect x="234" y="28" width="42" height="58" rx="7" fill="#f9fafb"/>
        <rect x="230" y="20" width="50" height="18" rx="8" fill="#9ca3af"/>
        <rect x="248" y="10" width="14" height="12" rx="3" fill="#6b7280"/>
        {/* Syringe */}
        <rect x="60" y="120" width="180" height="12" rx="6" fill="#d1d5db" transform="rotate(-8,60,120)"/>
        <rect x="228" y="125" width="5" height="22" rx="2" fill="#9ca3af" transform="rotate(-8,228,125)"/>
      </svg>
    ),
    products: [
      { name: "ACTRAPID 100 IU/ML FLEXPEN 3 ML IN 1 FLEXPEN", stars: 5, mrp: 569.8, price: 512.8, discount: 57.0, unit: "3 ml in 1 flexpen" },
      { name: "ACTRAPID 100IU/ML SOLUTION FOR INJECTION 10 ML IN 1 VIAL", stars: 1, mrp: 350.9, price: 315.8, discount: 35.1, unit: "10 ml in 1 vial" },
      { name: "ACTRAPID HM 100IU/ML PENFILL 3 ML IN 1 PENFILL", stars: 1, mrp: 386.0, price: 347.4, discount: 38.6, unit: "3 ml in 1 penfill" },
    ],
  },
  Bottle: {
    bannerBg: "#fff",
    bannerSvg: (
      <svg viewBox="0 0 340 160" width="340" height="160">
        <rect x="148" y="12" width="44" height="14" rx="7" fill="#9ca3af"/>
        <path d="M140 26 Q130 50 128 80 L128 148 Q128 156 170 156 Q212 156 212 148 L212 80 Q210 50 200 26Z" fill="#e5e7eb"/>
        <path d="M140 26 Q130 50 128 80 L128 148 Q128 156 170 156 Q212 156 212 148 L212 80 Q210 50 200 26Z" fill="#f9fafb" opacity="0.7"/>
        <rect x="136" y="85" width="68" height="50" rx="4" fill="#f3f4f6"/>
        <path d="M148 26 Q140 50 138 80 L202 80 Q198 50 192 26Z" fill="#d1fae5" opacity="0.5"/>
      </svg>
    ),
    products: [
      { name: "ACILOC 150MG SYRUP 100ML", stars: 3, mrp: 52.0, price: 47.0, discount: 5.0, unit: "100 ml bottle" },
      { name: "ARISTOZYME LIQUID 200ML", stars: 2, mrp: 98.0, price: 88.0, discount: 10.0, unit: "200 ml bottle" },
      { name: "BENADRYL COUGH SYRUP 100ML", stars: 4, mrp: 79.0, price: 71.0, discount: 8.0, unit: "100 ml bottle" },
    ],
  },
  Syrup: {
    bannerBg: "#fff",
    bannerSvg: (
      <svg viewBox="0 0 340 160" width="340" height="160">
        {/* Pouring syrup bottle */}
        <rect x="180" y="10" width="60" height="100" rx="12" fill="#fca5a5"/>
        <rect x="184" y="18" width="52" height="84" rx="8" fill="#fecaca"/>
        <rect x="180" y="10" width="60" height="20" rx="8" fill="#ef4444"/>
        <rect x="196" y="2" width="28" height="10" rx="5" fill="#dc2626"/>
        {/* Pouring liquid */}
        <path d="M180 70 Q160 90 155 130 Q165 140 175 130 Q172 100 185 80Z" fill="#f87171" opacity="0.7"/>
        {/* Spoon */}
        <ellipse cx="120" cy="138" rx="40" ry="14" fill="#fca5a5" opacity="0.5"/>
        <rect x="155" y="132" width="60" height="8" rx="4" fill="#d1d5db"/>
      </svg>
    ),
    products: [
      { name: "ALEX SYRUP 100ML", stars: 3, mrp: 85.0, price: 76.5, discount: 8.5, unit: "100 ml" },
      { name: "BENADRYL DR 100ML", stars: 2, mrp: 97.0, price: 87.0, discount: 10.0, unit: "100 ml" },
      { name: "COREX DX 100ML SYRUP", stars: 4, mrp: 110.0, price: 99.0, discount: 11.0, unit: "100 ml" },
    ],
  },
};

const categorySidebarItems = [
  { key: "Capsules", label: "Capsules", svgThumb: (<svg viewBox="0 0 60 60" width="44" height="44"><g transform="translate(30,22)"><rect x="-22" y="-8" width="44" height="16" rx="8" fill="#f5c518"/><rect x="-22" y="-8" width="22" height="16" rx="8" fill="#e6a800"/></g><g transform="translate(30,40)"><rect x="-22" y="-8" width="44" height="16" rx="8" fill="#f5c518"/><rect x="-22" y="-8" width="22" height="16" rx="8" fill="#e6a800"/></g></svg>) },
  { key: "capsule", label: "capsule", svgThumb: (<svg viewBox="0 0 60 60" width="44" height="44">{[{x:20,y:18,r:20},{x:40,y:15,r:-15},{x:15,y:38,r:30},{x:42,y:40,r:-30},{x:30,y:30,r:5}].map((c,i)=><g key={i} transform={`translate(${c.x},${c.y}) rotate(${c.r})`}><rect x="-14" y="-5" width="28" height="10" rx="5" fill="#7ac942"/><rect x="-14" y="-5" width="14" height="10" rx="5" fill="#5ba832"/></g>)}</svg>) },
  { key: "Medicine", label: "Medicine", svgThumb: (<svg viewBox="0 0 60 60" width="44" height="44"><g transform="translate(30,30) rotate(-20)"><rect x="-20" y="-9" width="40" height="18" rx="9" fill="#c8392b"/><rect x="-20" y="-9" width="20" height="18" rx="9" fill="#f0d9b5"/></g></svg>) },
  { key: "Injection", label: "Injection", svgThumb: (<svg viewBox="0 0 60 60" width="44" height="44"><rect x="20" y="8" width="18" height="44" rx="6" fill="#fca5a5"/><rect x="20" y="8" width="18" height="14" rx="6" fill="#ef4444"/><rect x="26" y="2" width="6" height="8" rx="3" fill="#dc2626"/><rect x="14" y="28" width="32" height="8" rx="4" fill="#93c5fd" transform="rotate(-40,30,32)"/></svg>) },
  { key: "Insulin", label: "Insulin", svgThumb: (<svg viewBox="0 0 60 60" width="44" height="44"><rect x="6" y="30" width="48" height="12" rx="6" fill="#c8b89a"/><rect x="6" y="30" width="12" height="12" rx="6" fill="#6b7280"/><rect x="48" y="32" width="10" height="8" rx="4" fill="#d97706"/><rect x="32" y="8" width="14" height="26" rx="5" fill="#e5e7eb"/><rect x="32" y="8" width="14" height="8" rx="4" fill="#9ca3af"/></svg>) },
  { key: "Bottle", label: "Bottle", svgThumb: (<svg viewBox="0 0 60 60" width="44" height="44"><rect x="24" y="2" width="12" height="6" rx="3" fill="#9ca3af"/><path d="M22 8 Q18 18 17 30 L17 55 Q17 58 30 58 Q43 58 43 55 L43 30 Q42 18 38 8Z" fill="#e5e7eb"/><rect x="20" y="32" width="20" height="16" rx="3" fill="#f3f4f6"/></svg>) },
  { key: "Syrup", label: "Syrup", svgThumb: (<svg viewBox="0 0 60 60" width="44" height="44"><rect x="22" y="6" width="20" height="36" rx="6" fill="#fca5a5"/><rect x="22" y="6" width="20" height="10" rx="6" fill="#ef4444"/><rect x="27" y="2" width="10" height="6" rx="3" fill="#dc2626"/><path d="M22 28 Q14 36 12 50 Q18 54 22 50 Q20 40 26 32Z" fill="#f87171" opacity="0.7"/></svg>) },
];

const StarRating = ({ count }) => (
  <div style={{ display: "flex", gap: 2 }}>
    {[1,2,3,4,5].map(i => (
      <svg key={i} width={14} height={14} viewBox="0 0 24 24">
        <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
          fill={i <= count ? "#f59e0b" : "#e5e7eb"} stroke={i <= count ? "#f59e0b" : "#d1d5db"} strokeWidth="1"/>
      </svg>
    ))}
  </div>
);

const ProductListScreen = ({ setCurrentPage, initialCategory = "Capsules" }) => {
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [cart, setCart] = useState({});
  const data = productData[activeCategory] || productData["Capsules"];
  const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);
  const totalPrice = Object.entries(cart).reduce((sum, [key, qty]) => {
    const [cat, idx] = key.split("__");
    const p = productData[cat]?.products[Number(idx)];
    return p ? sum + p.price * qty : sum;
  }, 0);

  const addToCart = (cat, idx) => {
    const key = `${cat}__${idx}`;
    setCart(prev => ({ ...prev, [key]: (prev[key] || 0) + 1 }));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: "transparent" }}>
      {/* Header */}
      <div style={{ background: "#fff", padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", boxShadow: "0 1px 4px rgba(0,0,0,0.07)", flexShrink: 0 }}>
        <button onClick={() => setCurrentPage("home")} style={{ background: "none", border: "none", cursor: "pointer" }}>
          <Icon name="back" size={22} color="#222" />
        </button>
        <span style={{ fontWeight: 800, fontSize: 20, color: "#111" }}>Product List</span>
        <button style={{ background: "none", border: "none", cursor: "pointer" }}>
          <Icon name="search" size={22} color="#222" />
        </button>
      </div>

      {/* Body: left sidebar + right content */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden", padding: "20px" }}>
        {/* Left sidebar */}
        <div style={{
          width: 170, flexShrink: 0, background: "#f8fafc",
          overflowY: "auto", borderRight: "1px solid #e5e7eb", borderRadius: 20,
        }}>
          {categorySidebarItems.map(cat => (
            <button key={cat.key} onClick={() => setActiveCategory(cat.key)} style={{
              width: "100%", background: activeCategory === cat.key ? "#fff" : "transparent",
              border: "none", borderLeft: activeCategory === cat.key ? `3px solid ${theme.green}` : "3px solid transparent",
              padding: "14px 12px", cursor: "pointer",
              display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
            }}>
              <div style={{ width: 52, height: 52, borderRadius: "50%", background: "#f0f2f5", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                {cat.svgThumb}
              </div>
              <span style={{ fontSize: 12, color: activeCategory === cat.key ? theme.green : "#555", fontWeight: activeCategory === cat.key ? 700 : 500, textAlign: "center", lineHeight: 1.3 }}>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Right product panel */}
        <div style={{ flex: 1, overflowY: "auto", paddingBottom: 90, minWidth: 0, paddingLeft: 20 }}>
          {/* Banner */}
          <div style={{ background: data.bannerBg, margin: "0 0 12px", borderRadius: 20, overflow: "hidden", position: "relative", boxShadow: "0 10px 24px rgba(15,23,42,0.08)" }}>
            <div style={{ position: "absolute", top: 0, left: 0, background: theme.green, padding: "6px 16px 6px 12px", borderRadius: "12px 0 16px 0", zIndex: 1 }}>
              <span style={{ color: "#fff", fontWeight: 700, fontSize: 13 }}>{activeCategory}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: 220, padding: "16px" }}>
              {data.bannerSvg}
            </div>
          </div>

          {/* Product cards */}
          {data.products.map((p, i) => (
            <div key={i} style={{ background: "#fff", margin: "0 0 14px", borderRadius: 20, padding: "18px", boxShadow: "0 10px 24px rgba(15,23,42,0.08)", position: "relative", border: "1px solid #eef2f7" }}>
              {/* Discount badge */}
              <div style={{ position: "absolute", top: 0, left: 0, background: theme.green, borderRadius: "12px 0 10px 0", padding: "3px 10px" }}>
                <span style={{ color: "#fff", fontSize: 10, fontWeight: 700 }}>₹ {p.discount.toFixed(1)} Off</span>
              </div>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginTop: 14 }}>
                {/* Placeholder product image / reload icon */}
                <div style={{ width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg width={32} height={32} viewBox="0 0 24 24" fill="none">
                    <path d="M1 4v6h6" stroke="#9ca3af" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M3.51 15a9 9 0 102.13-9.36L1 10" stroke="#9ca3af" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 12, color: "#111", lineHeight: 1.4, marginBottom: 4 }}>{p.name}</div>
                  <StarRating count={p.stars} />
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 5 }}>
                    <span style={{ fontSize: 11, color: "#aaa", textDecoration: "line-through" }}>₹{p.mrp.toFixed(1)}</span>
                    <span style={{ fontSize: 13, fontWeight: 800, color: "#111" }}>₹ {p.price.toFixed(1)}</span>
                  </div>
                  {p.unit ? <div style={{ fontSize: 10, color: "#aaa", marginTop: 2 }}>{p.unit}</div> : null}
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 8 }}>
                <button
                  onClick={() => addToCart(activeCategory, i)}
                  style={{ background: theme.green, color: "#fff", border: "none", borderRadius: 20, padding: "7px 20px", fontSize: 13, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}
                >
                  <span style={{ fontSize: 16, lineHeight: 1 }}>+</span> ADD
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom cart bar */}
      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0,
        background: "rgba(255,255,255,0.95)", borderTop: "1px solid #e5e7eb",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "12px 20px", zIndex: 50, backdropFilter: "blur(10px)",
      }}>
        <div>
          <div style={{ fontSize: 12, color: "#666" }}>{totalItems} Items</div>
          <div style={{ fontSize: 15, fontWeight: 800, color: "#111" }}>₹ {totalPrice.toFixed(2)}</div>
        </div>
        <button style={{ background: theme.green, color: "#fff", border: "none", borderRadius: 999, padding: "12px 24px", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
          Go to cart
        </button>
      </div>
    </div>
  );
};

// Chat Screen
const ChatScreen = () => (
  <div style={style.screen}>
    <div style={{ padding: 20, textAlign: "center", marginTop: 80, color: theme.grayText, fontSize: 14 }}>
      <div style={{ fontSize: 50, marginBottom: 16 }}>💬</div>
      No messages yet
    </div>
  </div>
);

// Main App
export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [activeTab, setActiveTab] = useState("home");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(tab);
  };

  const renderScreen = () => {
    if (currentPage.startsWith("products:")) {
      const cat = currentPage.split(":")[1];
      return <ProductListScreen setCurrentPage={setCurrentPage} initialCategory={cat} />;
    }
    switch (currentPage) {
      case "home": return <HomeScreen setSidebarOpen={setSidebarOpen} setCurrentPage={setCurrentPage} />;
      case "search": return <SearchScreen />;
      case "orders": return <OrdersScreen />;
      case "wallet": return <WalletScreen setCurrentPage={setCurrentPage} />;
      case "chat": return <ChatScreen />;
      case "profile": return <ProfileScreen setCurrentPage={setCurrentPage} />;
      case "retailer": return <RetailerScreen setCurrentPage={setCurrentPage} />;
      case "about": return <AboutScreen setCurrentPage={setCurrentPage} />;
      case "privacy": return <PrivacyScreen setCurrentPage={setCurrentPage} />;
      case "contact": return <ContactScreen setCurrentPage={setCurrentPage} />;
      default: return <HomeScreen setSidebarOpen={setSidebarOpen} setCurrentPage={setCurrentPage} />;
    }
  };

  const hideBottomNav = ["profile", "retailer", "about", "privacy", "contact"].includes(currentPage) || currentPage.startsWith("products:");

  return (
    <div style={{ background: "#e8eef5", minHeight: "100vh" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700;800&display=swap" rel="stylesheet" />
      <div style={style.app}>
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} setCurrentPage={(page) => { setCurrentPage(page); setSidebarOpen(false); }} />
        {renderScreen()}
        {!hideBottomNav && <BottomNav active={activeTab} setActive={handleTabChange} />}
      </div>
    </div>
  );
}

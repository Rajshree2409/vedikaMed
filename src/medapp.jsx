import { useState } from "react";

const theme = {
  green: "#3CB371",
  greenDark: "#2E8B57",
  greenLight: "#e8f5e9",
  navy: "#374151",
  gray: "#f3f4f6",
  grayBorder: "#e5e7eb",
  grayText: "#9ca3af",
  white: "#ffffff",
  red: "#ef4444",
  blue: "#3b82f6",
};

const style = {
  app: {
    fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
    maxWidth: 390,
    margin: "0 auto",
    background: "#f0f2f5",
    minHeight: "100vh",
    position: "relative",
    overflow: "hidden",
    boxShadow: "0 0 40px rgba(0,0,0,0.15)",
  },
  screen: {
    background: "#f5f6fa",
    minHeight: "100vh",
    paddingBottom: 80,
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
      position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)",
      width: 390, background: "#374151", display: "flex", zIndex: 100,
    }}>
      {tabs.map(t => (
        <button key={t.key} onClick={() => setActive(t.key)} style={{
          flex: 1, padding: "12px 0 8px", background: "none", border: "none",
          cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
        }}>
          <Icon name={t.key} size={22} color={active === t.key ? theme.green : "#9ca3af"} />
          <span style={{ fontSize: 10, color: active === t.key ? theme.green : "#9ca3af", fontWeight: active === t.key ? 700 : 400 }}>
            {t.label}
          </span>
        </button>
      ))}
    </div>
  );
};

// Medicine image card (matches screenshot style)
const CategoryCard = ({ imgSrc, label, bg = "#fff" }) => (
  <div style={{
    background: bg,
    borderRadius: 14,
    padding: "10px 8px 8px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 6,
    minWidth: 100,
    maxWidth: 100,
    flexShrink: 0,
    boxShadow: "0 1px 6px rgba(0,0,0,0.08)",
    cursor: "pointer",
    border: "1px solid #f0f0f0",
  }}>
    <div style={{
      width: 80, height: 72,
      borderRadius: 10,
      overflow: "hidden",
      display: "flex", alignItems: "center", justifyContent: "center",
      background: "#f8f9fa",
    }}>
      <img src={imgSrc} alt={label} style={{ width: "100%", height: "100%", objectFit: "contain" }} onError={e => { e.target.style.display='none'; }} />
    </div>
    <span style={{ fontSize: 11, color: "#222", textAlign: "center", fontWeight: 500, lineHeight: 1.2 }}>{label}</span>
  </div>
);

const SectionTitle = ({ children }) => (
  <div style={{ fontWeight: 800, fontSize: 15, color: "#111", marginBottom: 10, letterSpacing: 0 }}>{children}</div>
);

// For You shortcut button
const ForYouItem = ({ icon, label, bg }) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 7, cursor: "pointer", flex: 1 }}>
    <div style={{
      width: 58, height: 58, borderRadius: "50%",
      background: bg || "#e8f5e9",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: 28,
      boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
    }}>{icon}</div>
    <span style={{ fontSize: 11, color: "#222", textAlign: "center", fontWeight: 500, maxWidth: 72, lineHeight: 1.3 }}>{label}</span>
  </div>
);

// Home Screen
const HomeScreen = ({ setSidebarOpen }) => (
  <div style={{ ...style.screen, overflowY: "auto" }}>
    {/* Header */}
    <div style={{
      background: "#fff",
      padding: "14px 16px 12px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      boxShadow: "0 1px 3px rgba(0,0,0,0.07)",
      position: "sticky", top: 0, zIndex: 10,
    }}>
      <button
        onClick={() => setSidebarOpen(true)}
        style={{ background: "none", border: "none", cursor: "pointer", padding: 2, display: "flex", alignItems: "center" }}
      >
        <Icon name="menu" size={26} color="#222" />
      </button>
      <span style={{ color: theme.green, fontWeight: 800, fontSize: 17, letterSpacing: -0.3 }}>
        Software House 👋
      </span>
      <div style={{ position: "relative", cursor: "pointer" }}>
        {/* Cart icon SVG */}
        <svg width={28} height={28} fill="none" viewBox="0 0 24 24">
          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" stroke="#222" strokeWidth={1.8} strokeLinejoin="round"/>
          <path d="M3 6h18" stroke="#222" strokeWidth={1.8} strokeLinecap="round"/>
          <path d="M16 10a4 4 0 01-8 0" stroke="#222" strokeWidth={1.8} strokeLinecap="round"/>
        </svg>
        <span style={{
          position: "absolute", top: -5, right: -5,
          background: theme.red, color: "#fff",
          borderRadius: "50%", fontSize: 9, width: 16, height: 16,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontWeight: 700, border: "1.5px solid #fff",
        }}>0</span>
      </div>
    </div>

    <div style={{ padding: "12px 12px 0" }}>
      {/* Search bar */}
      <div style={{
        background: "#fff", borderRadius: 10, padding: "11px 14px",
        display: "flex", alignItems: "center", gap: 10,
        boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
        marginBottom: 16, border: "1px solid #ececec",
      }}>
        <Icon name="search" size={18} color="#aaa" />
        <span style={{ color: "#aaa", fontSize: 14 }}>Search from 5000+ products</span>
      </div>

      {/* ── Medicine ── */}
      <SectionTitle>Medicine</SectionTitle>
      <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 8, marginBottom: 16, scrollbarWidth: "none" }}>
        <CategoryCard
          imgSrc="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Pill_closeup.jpg/320px-Pill_closeup.jpg"
          label="Capsules"
        />
        <CategoryCard
          imgSrc="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Capsules_and_tablets.jpg/320px-Capsules_and_tablets.jpg"
          label="capsule"
        />
        <CategoryCard
          imgSrc="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/红绿胶囊.jpg/320px-红绿胶囊.jpg"
          label="Medicine"
        />
        <CategoryCard
          imgSrc="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Syringe_needle_close-up.jpg/320px-Syringe_needle_close-up.jpg"
          label="Injection"
        />
      </div>

      {/* ── OTC ── */}
      <SectionTitle>OTC</SectionTitle>
      <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 8, marginBottom: 16, scrollbarWidth: "none" }}>
        <CategoryCard
          imgSrc="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Ayurveda_herbs_and_spices.jpg/320px-Ayurveda_herbs_and_spices.jpg"
          label="Ayurveda Prod..."
        />
        <CategoryCard
          imgSrc="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Medicine_assorted.jpg/320px-Medicine_assorted.jpg"
          label="OTC Medicine 2"
        />
        <CategoryCard
          imgSrc="https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Medical_bandage.jpg/320px-Medical_bandage.jpg"
          label="BANDAGE"
        />
      </div>

      {/* ── Baby Care ── */}
      <SectionTitle>Baby Care</SectionTitle>
      <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 8, marginBottom: 16, scrollbarWidth: "none" }}>
        <CategoryCard
          imgSrc="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Baby_formula_-_Similac_-_cropped.jpg/320px-Baby_formula_-_Similac_-_cropped.jpg"
          label="Baby Formula"
        />
        <CategoryCard
          imgSrc="https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Baby_powder.jpg/320px-Baby_powder.jpg"
          label="Baby Powder"
        />
      </div>
    </div>

    {/* Divider line like screenshot */}
    <div style={{ height: 8, background: "#ebebeb", margin: "2px 0 0" }} />

    {/* ── For You ── */}
    <div style={{ padding: "14px 12px 0" }}>
      <SectionTitle>For You</SectionTitle>
      <div style={{
        background: "#fff", borderRadius: 14, padding: "16px 10px",
        boxShadow: "0 1px 6px rgba(0,0,0,0.07)", marginBottom: 16,
        display: "flex", justifyContent: "space-around",
      }}>
        <ForYouItem icon="🤝" label="B2B Shopping" bg="#dbeafe" />
        <ForYouItem icon="🎧" label="SalesMan App" bg="#e0f2fe" />
        <ForYouItem icon="👨‍⚕️" label="Doctor Appointment" bg="#f0fdf4" />
      </div>

      {/* ── Lab Test ── */}
      <SectionTitle>Lab Test</SectionTitle>
      <div style={{
        background: "#fff", borderRadius: 14, height: 110,
        marginBottom: 16, boxShadow: "0 1px 6px rgba(0,0,0,0.07)",
        display: "flex", alignItems: "center", justifyContent: "center",
        color: "#ccc", fontSize: 13,
      }}>
        {/* empty like screenshot */}
      </div>

      <SectionTitle>Doctor Appoinment</SectionTitle>
      <div style={{
        background: "#fff", borderRadius: 14, height: 110,
        marginBottom: 16, boxShadow: "0 1px 6px rgba(0,0,0,0.07)",
        display: "flex", alignItems: "center", justifyContent: "center",
        color: "#ccc", fontSize: 13,
      }}>
        {/* empty like screenshot */}
      </div>
    </div>
  </div>
);

// Sidebar / Drawer — slides in from the LEFT edge of the phone
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
          position: "absolute", inset: 0, zIndex: 200,
          background: "rgba(0,0,0,0.45)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 0.28s ease",
        }}
      />
      {/* Drawer panel */}
      <div style={{
        position: "absolute", top: 0, left: 0,
        width: 270, height: "100%",
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
    background: "#fff", padding: "15px 16px",
    display: "flex", alignItems: "center", gap: 14,
    borderBottom: "1px solid #e5e7eb",
    position: "sticky", top: 0, zIndex: 10,
  }}>
    <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", padding: 2 }}>
      <Icon name="back" size={22} color="#222" />
    </button>
    <span style={{ fontWeight: 800, fontSize: 16, color: "#111", letterSpacing: uppercase ? 0.8 : 0, textTransform: uppercase ? "uppercase" : "none" }}>
      {title}
    </span>
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
    switch (currentPage) {
      case "home": return <HomeScreen setSidebarOpen={setSidebarOpen} />;
      case "search": return <SearchScreen />;
      case "orders": return <OrdersScreen />;
      case "wallet": return <WalletScreen setCurrentPage={setCurrentPage} />;
      case "chat": return <ChatScreen />;
      case "profile": return <ProfileScreen setCurrentPage={setCurrentPage} />;
      case "retailer": return <RetailerScreen setCurrentPage={setCurrentPage} />;
      case "about": return <AboutScreen setCurrentPage={setCurrentPage} />;
      case "privacy": return <PrivacyScreen setCurrentPage={setCurrentPage} />;
      case "contact": return <ContactScreen setCurrentPage={setCurrentPage} />;
      default: return <HomeScreen setSidebarOpen={setSidebarOpen} />;
    }
  };

  const hideBottomNav = ["profile", "retailer", "about", "privacy", "contact"].includes(currentPage);

  return (
    <div style={{ background: "#d1d5db", minHeight: "100vh", display: "flex", alignItems: "flex-start", justifyContent: "center", paddingTop: 20 }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700;800&display=swap" rel="stylesheet" />
      <div style={{ ...style.app, height: "calc(100vh - 40px)", maxHeight: 820, overflowY: "auto" }}>
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} setCurrentPage={(page) => { setCurrentPage(page); setSidebarOpen(false); }} />
        {renderScreen()}
        {!hideBottomNav && <BottomNav active={activeTab} setActive={handleTabChange} />}
      </div>
    </div>
  );
}

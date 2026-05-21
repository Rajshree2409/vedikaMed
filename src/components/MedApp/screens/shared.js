import React from "react";
import { theme, Icon, StarRating } from "../components.js";
import { categorySidebarItems } from "../data.js";
import { matchesProductCategory } from "../api.js";

const vedikaLogoImageSrc = `${process.env.PUBLIC_URL || ""}/vedika-logo.png`;

const homeCategoryCards = [
  {
    fallback: (
      <svg viewBox="0 0 80 72" width="80" height="72">
        <rect x="15" y="28" width="50" height="18" rx="9" fill="#f5c842" />
        <rect x="15" y="28" width="25" height="18" rx="9" fill="#e6a800" />
        <text x="28" y="41" fontSize="9" fill="#fff" fontWeight="bold">
          L U
        </text>
        <rect x="15" y="50" width="50" height="18" rx="9" fill="#f5c842" />
        <rect x="15" y="50" width="25" height="18" rx="9" fill="#e6a800" />
        <text x="24" y="63" fontSize="9" fill="#fff" fontWeight="bold">
          D 0 3
        </text>
      </svg>
    ),
    imgSrc: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/2019-01-11_Oral_contraceptive_pills_in_blister_packs.jpg/320px-2019-01-11_Oral_contraceptive_pills_in_blister_packs.jpg",
    label: "Capsules",
    page: "products:Capsules",
  },
  {
    fallback: (
      <svg viewBox="0 0 80 72" width="80" height="72">
        {[
          { x: 30, y: 10, r: 0 },
          { x: 50, y: 18, r: 30 },
          { x: 20, y: 30, r: -20 },
          { x: 45, y: 35, r: 45 },
          { x: 32, y: 50, r: 10 },
          { x: 55, y: 48, r: -30 },
        ].map((capsule, index) => (
          <g key={index} transform={`translate(${capsule.x},${capsule.y}) rotate(${capsule.r})`}>
            <rect x="-10" y="-5" width="20" height="10" rx="5" fill="#7ac942" />
            <rect x="-10" y="-5" width="10" height="10" rx="5" fill="#5ba832" />
          </g>
        ))}
      </svg>
    ),
    imgSrc: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Herbal_supplements.jpg/320px-Herbal_supplements.jpg",
    label: "Softgels",
    page: "products:capsule",
  },
  {
    fallback: (
      <svg viewBox="0 0 80 72" width="80" height="72">
        <g transform="translate(40,36) rotate(-30)">
          <rect x="-22" y="-10" width="44" height="20" rx="10" fill="#e05c5c" />
          <rect x="-22" y="-10" width="22" height="20" rx="10" fill="#f5e0c0" />
        </g>
      </svg>
    ),
    imgSrc: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/%E7%BA%A2%E7%BB%BF%E8%83%B6%E5%9B%8A.jpg/320px-%E7%BA%A2%E7%BB%BF%E8%83%B6%E5%9B%8A.jpg",
    label: "Tablets",
    page: "products:Medicine",
  },
  {
    fallback: (
      <svg viewBox="0 0 80 72" width="80" height="72">
        <rect x="34" y="8" width="12" height="42" rx="4" fill="#c084fc" />
        <rect x="36" y="10" width="8" height="38" rx="3" fill="#e9d5ff" />
        <rect x="30" y="48" width="20" height="8" rx="2" fill="#7c3aed" />
        <rect x="38" y="56" width="4" height="10" rx="1" fill="#6d28d9" />
      </svg>
    ),
    imgSrc: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Syringe_2.jpg/320px-Syringe_2.jpg",
    label: "Injection",
    page: "products:Injection",
  },
];

const homeOtcCards = [
  {
    fallback: (
      <svg viewBox="0 0 80 72" width="80" height="72">
        <ellipse cx="40" cy="52" rx="22" ry="14" fill="#c8a96e" />
        <ellipse cx="40" cy="48" rx="18" ry="10" fill="#8b6914" />
        <path d="M30 20 Q40 5 50 20 Q45 35 40 42 Q35 35 30 20z" fill="#4ade80" />
      </svg>
    ),
    imgSrc: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Spices_of_Kerala.jpg/320px-Spices_of_Kerala.jpg",
    label: "Ayurveda",
  },
  {
    fallback: (
      <svg viewBox="0 0 80 72" width="80" height="72">
        <ellipse cx="40" cy="44" rx="20" ry="14" fill="#d4d4d4" opacity="0.4" />
        <circle cx="28" cy="28" r="7" fill="#e05c5c" />
        <circle cx="42" cy="22" r="7" fill="#f5c842" />
        <circle cx="55" cy="30" r="7" fill="#4ade80" />
      </svg>
    ),
    imgSrc: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Pills.jpg/320px-Pills.jpg",
    label: "OTC Care",
  },
  {
    fallback: (
      <svg viewBox="0 0 80 72" width="80" height="72">
        <ellipse cx="40" cy="46" rx="24" ry="12" fill="#e5e7eb" />
        <ellipse cx="40" cy="34" rx="20" ry="8" fill="#fff" stroke="#d1d5db" strokeWidth="1" />
      </svg>
    ),
    imgSrc: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Bandage_roll.jpg/320px-Bandage_roll.jpg",
    label: "Bandage",
  },
];

const homeBabyCards = [
  {
    fallback: (
      <svg viewBox="0 0 80 72" width="80" height="72">
        <rect x="22" y="16" width="36" height="48" rx="6" fill="#1d4ed8" />
        <rect x="26" y="20" width="28" height="36" rx="4" fill="#3b82f6" />
      </svg>
    ),
    imgSrc: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Baby_formula_-_Similac_-_cropped.jpg/320px-Baby_formula_-_Similac_-_cropped.jpg",
    label: "Baby Formula",
  },
  {
    fallback: (
      <svg viewBox="0 0 80 72" width="80" height="72">
        <circle cx="30" cy="30" r="14" fill="#fde68a" />
        <rect x="18" y="44" width="24" height="14" rx="7" fill="#93c5fd" />
        <circle cx="50" cy="40" r="10" fill="#f9a8d4" />
      </svg>
    ),
    imgSrc: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Baby_Products.jpg/320px-Baby_Products.jpg",
    label: "Baby Care",
  },
];

const VedikaLogo = ({ size = 84 }) => (
  <img
    src={vedikaLogoImageSrc}
    alt="Vedika logo"
    style={{
      width: size,
      height: "auto",
      display: "block",
      objectFit: "contain",
      flexShrink: 0,
    }}
  />
);

const formInputStyle = {
  width: "100%",
  boxSizing: "border-box",
  padding: "16px 18px",
  borderRadius: 12,
  border: `2px solid ${theme.grayBorder}`,
  fontSize: 16,
  color: theme.navy,
  background: theme.white,
  outline: "none",
  transition: "all 0.2s ease-in-out",
  fontFamily: "'DM Sans', sans-serif",
};

const primaryButtonStyle = {
  width: "100%",
  borderRadius: 12,
  padding: "16px 20px",
  border: "none",
  background: theme.greenGradient,
  color: theme.white,
  fontSize: 16,
  fontWeight: 700,
  cursor: "pointer",
  transition: "all 0.2s ease-in-out",
  boxShadow: theme.shadow.md,
};

const stackedActionGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(160px, 100%), 1fr))",
  gap: 12,
};

const surfaceCardStyle = {
  background: theme.white,
  border: `1px solid ${theme.grayBorder}`,
  borderRadius: 22,
  boxShadow: theme.shadow.sm,
  transition: "transform 0.2s ease, box-shadow 0.2s ease",
};

const mutedTextStyle = {
  color: theme.grayText,
  fontSize: 14,
  lineHeight: 1.6,
};

const getErrorMessage = (error, fallbackMessage) => (error instanceof Error ? error.message : fallbackMessage);

const getSessionPhone = (session) => session?.mobileNumber || session?.phoneNumber || "";

const getSessionName = (session) => session?.name || "";

const formatCurrency = (value) => `Rs. ${Number(value || 0).toFixed(2)}`;

const buildInitialAddressForm = (session = null, profile = null) => ({
  address: "",
  addressType: "Home",
  city: profile?.city || "",
  district: profile?.city || "",
  latitude: "",
  location: "",
  longitude: "",
  mobileNumber: getSessionPhone(session),
  name: profile?.name || getSessionName(session),
  pinCode: profile?.pinCode || "",
  state: "",
});

const buildInitialProfileForm = (profile = {}, session = null) => ({
  name: profile?.name || getSessionName(session),
  email: profile?.email || "",
  address: profile?.address || "",
  city: profile?.city || "",
  pinCode: profile?.pinCode || "",
  photo: profile?.profilePhoto || session?.profilePhoto || "",
});

const buildInitialRetailerForm = (session = null, retailer = null) => ({
  contactName: retailer?.contactName || "",
  customerMobile: retailer?.customerMobile || getSessionPhone(session),
  district: retailer?.district || "",
  email: retailer?.email || "",
  gstNo: retailer?.gstNo || "",
  licenseNo: retailer?.licenseNo || "",
  panNo: retailer?.panNo || "",
  pinCode: retailer?.pinCode || "",
  shopAddress: retailer?.shopAddress || "",
  shopName: retailer?.shopName || "",
  state: retailer?.state || "",
  station: retailer?.station || "",
});

const createAvatarLabel = (text) =>
  (text || "V")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

const getCategoryFromProduct = (product) =>
  categorySidebarItems.find((category) => matchesProductCategory(product, category.key))?.key || "Medicine";

const InlineMessage = ({ children, tone = "muted" }) => {
  const toneMap = {
    error: {
      background: "#fef2f2",
      borderColor: "#fecaca",
      color: "#b91c1c",
    },
    muted: {
      background: "#f8fafc",
      borderColor: "#e2e8f0",
      color: theme.grayText,
    },
    success: {
      background: "#ecfdf5",
      borderColor: "#bbf7d0",
      color: "#15803d",
    },
  };

  const colors = toneMap[tone] || toneMap.muted;

  return (
    <div
      style={{
        background: colors.background,
        border: `1px solid ${colors.borderColor}`,
        borderRadius: 14,
        color: colors.color,
        fontSize: 13,
        lineHeight: 1.5,
        padding: "12px 14px",
      }}
    >
      {children}
    </div>
  );
};

const ProductListCard = ({ onAdd, product }) => (
  <div
    style={{
      ...surfaceCardStyle,
      marginBottom: 14,
      padding: "20px 20px 18px",
      position: "relative",
    }}
  >
    {product.discount > 0 ? (
      <div style={{ position: "absolute", top: 16, left: 16, background: theme.greenLight, borderRadius: 14, padding: "6px 12px" }}>
        <span style={{ color: theme.greenDark, fontSize: 11, fontWeight: 700 }}>{formatCurrency(product.discount)} off</span>
      </div>
    ) : null}
    <div style={{ display: "flex", alignItems: "flex-start", gap: 18, marginTop: product.discount > 0 ? 24 : 0 }}>
      <div
        style={{
          width: 68,
          height: 68,
          borderRadius: 20,
          overflow: "hidden",
          background: theme.grayLight,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {product.imageUrl ? (
          <img src={product.imageUrl} alt={product.productName} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          <Icon name="cart" size={28} color={theme.grayText} />
        )}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: 800, fontSize: 15, color: theme.navy, lineHeight: 1.4, marginBottom: 6 }}>{product.productName}</div>
        <StarRating count={product.stars || 4} />
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 8, flexWrap: "wrap" }}>
          <span style={{ fontSize: 12, color: theme.grayText, textDecoration: product.mrp ? "line-through" : "none" }}>
            {product.mrp ? formatCurrency(product.mrp) : ""}
          </span>
          <span style={{ fontSize: 16, fontWeight: 800, color: theme.navy }}>{formatCurrency(product.price)}</span>
        </div>
        {product.unit ? <div style={{ fontSize: 12, color: theme.grayText, marginTop: 6 }}>{product.unit}</div> : null}
      </div>
    </div>
    <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 16 }}>
      <button
        onClick={onAdd}
        style={{
          alignItems: "center",
          justifyContent: "center",
          background: theme.greenGradient,
          border: "none",
          borderRadius: 16,
          color: theme.white,
          cursor: "pointer",
          display: "flex",
          fontSize: 13,
          fontWeight: 700,
          gap: 8,
          padding: "12px 22px",
          minWidth: 120,
        }}
      >
        <span style={{ fontSize: 16, lineHeight: 1 }}>+</span> Add to cart
      </button>
    </div>
  </div>
);

const SearchResultCard = ({ onBrowse, onAddToCart, product }) => (
  <div
    style={{
      ...surfaceCardStyle,
      padding: 18,
      display: "flex",
      gap: 16,
      alignItems: "center",
    }}
  >
    <div
      style={{
        width: 80,
        height: 80,
        borderRadius: 20,
        overflow: "hidden",
        background: theme.grayLight,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      {product.imageUrl ? (
        <img src={product.imageUrl} alt={product.productName} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      ) : (
        <Icon name="search" size={30} color={theme.grayText} />
      )}
    </div>
    <div style={{ minWidth: 0, flex: 1 }}>
      <div style={{ fontSize: 15, fontWeight: 700, color: theme.navy, lineHeight: 1.4 }}>{product.productName}</div>
      <div style={{ ...mutedTextStyle, fontSize: 12, marginTop: 6 }}>{product.unit || product.brandName || "Healthcare product"}</div>
      <div style={{ display: "flex", gap: 10, alignItems: "center", marginTop: 10, flexWrap: "wrap" }}>
        {product.mrp ? <span style={{ fontSize: 12, color: theme.grayText, textDecoration: "line-through" }}>{formatCurrency(product.mrp)}</span> : null}
        <span style={{ fontWeight: 800, color: theme.green }}>{formatCurrency(product.price)}</span>
      </div>
    </div>
    <div style={{ display: "flex", gap: 10, flexShrink: 0 }}>
      <button
        onClick={onAddToCart}
        style={{
          background: theme.greenGradient,
          border: "none",
          borderRadius: 16,
          color: theme.white,
          cursor: "pointer",
          fontSize: 12,
          fontWeight: 700,
          padding: "12px 18px",
          whiteSpace: "nowrap",
          boxShadow: theme.shadow.sm,
          display: "flex",
          alignItems: "center",
          gap: 6,
        }}
      >
        <span style={{ fontSize: 14, lineHeight: 1 }}>+</span> Add
      </button>
      <button
        onClick={onBrowse}
        style={{
          background: "transparent",
          border: `2px solid ${theme.grayBorder}`,
          borderRadius: 16,
          color: theme.green,
          cursor: "pointer",
          fontSize: 12,
          fontWeight: 700,
          padding: "10px 18px",
          whiteSpace: "nowrap",
          transition: "all 0.2s ease-in-out",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = theme.green;
          e.currentTarget.style.background = theme.greenLight;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = theme.grayBorder;
          e.currentTarget.style.background = "transparent";
        }}
      >
        Browse
      </button>
    </div>
  </div>
);

const buildDoctorPortrait = ({ accent, accentSecondary, backgroundStart, backgroundEnd, initials, skinTone }) =>
  `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 360" fill="none">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="320" y2="360" gradientUnits="userSpaceOnUse">
        <stop stop-color="${backgroundStart}" />
        <stop offset="1" stop-color="${backgroundEnd}" />
      </linearGradient>
      <linearGradient id="accent" x1="216" y1="44" x2="276" y2="104" gradientUnits="userSpaceOnUse">
        <stop stop-color="${accent}" />
        <stop offset="1" stop-color="${accentSecondary}" />
      </linearGradient>
    </defs>
    <rect width="320" height="360" rx="36" fill="url(#bg)" />
    <circle cx="258" cy="74" r="34" fill="white" fill-opacity="0.48" />
    <circle cx="74" cy="294" r="58" fill="white" fill-opacity="0.26" />
    <path d="M96 130c0-38 29-68 64-68s64 30 64 68v10c0 27-22 49-49 49h-30c-27 0-49-22-49-49v-10Z" fill="${skinTone}" />
    <path d="M92 128c4-53 37-87 70-87 38 0 71 34 74 87l-24 16c-8-22-28-35-52-35-23 0-43 13-51 35l-17-16Z" fill="#475569" />
    <path d="M84 302c8-56 45-95 78-95s70 39 79 95" fill="white" />
    <path d="M124 229l36 44 36-44" fill="#e2e8f0" />
    <path d="M142 228h36l-18 76-18-76Z" fill="#64748b" />
    <path d="M121 226l-25 31 11 40" stroke="#94a3b8" stroke-width="8" stroke-linecap="round" />
    <path d="M199 226l25 31-11 40" stroke="#94a3b8" stroke-width="8" stroke-linecap="round" />
    <circle cx="232" cy="262" r="18" stroke="#94a3b8" stroke-width="6" fill="none" />
    <path d="M86 257c0-37 29-67 65-67" stroke="#94a3b8" stroke-width="10" stroke-linecap="round" />
    <rect x="34" y="34" width="74" height="30" rx="15" fill="white" fill-opacity="0.82" />
    <text x="71" y="54" text-anchor="middle" font-size="18" font-family="Arial, sans-serif" font-weight="700" fill="${accent}">${initials}</text>
    <rect x="216" y="44" width="60" height="60" rx="20" fill="url(#accent)" fill-opacity="0.14" />
    <path d="M246 58v32M230 74h32" stroke="url(#accent)" stroke-width="10" stroke-linecap="round" />
  </svg>`)}`;

const doctorWeekdayShortLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const doctorWeekdayFullLabels = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const doctorAppointmentDoctors = [
  {
    id: "diwakar-sharma",
    name: "Diwakar Sharma",
    specialty: "Internal Medicine",
    listExperience: "Exp - 5 Years",
    experience: "10 Yr",
    patients: "200+",
    rating: "5",
    clinic: "Vedika Internal Care",
    fee: "Consultation Rs. 499",
    description:
      "Experienced in adult primary care, fever management, blood pressure follow-up, and long-term treatment planning for everyday medical concerns.",
    focusAreas: ["General physician", "Lifestyle disease review", "Clinic follow-up"],
    sittingDays: ["Monday", "Friday"],
    slots: {
      Monday: ["09:30 AM", "11:00 AM", "05:30 PM"],
      Friday: ["10:15 AM", "01:00 PM", "06:00 PM"],
    },
    accent: "#2563eb",
    accentSecondary: "#0f9d8a",
    heroGradient: "linear-gradient(145deg, #eff6ff 0%, #ecfeff 100%)",
    image: buildDoctorPortrait({
      accent: "#2563eb",
      accentSecondary: "#0f9d8a",
      backgroundStart: "#f8fbff",
      backgroundEnd: "#dbeafe",
      initials: "DS",
      skinTone: "#f3d2b3",
    }),
  },
  {
    id: "kundan-kumar",
    name: "Kundan Kumar",
    specialty: "Dermatology",
    listExperience: "Exp - 4 Years",
    experience: "7 Yr",
    patients: "150+",
    rating: "4.8",
    clinic: "Vedika Skin Studio",
    fee: "Consultation Rs. 599",
    description:
      "Focuses on skin allergies, acne care, pigmentation concerns, and clear treatment plans with practical follow-up support for daily routines.",
    focusAreas: ["Skin care", "Rash and allergy review", "Acne support"],
    sittingDays: ["Tuesday", "Saturday"],
    slots: {
      Tuesday: ["10:00 AM", "12:30 PM", "04:45 PM"],
      Saturday: ["09:15 AM", "11:45 AM", "03:30 PM"],
    },
    accent: "#8b5cf6",
    accentSecondary: "#ec4899",
    heroGradient: "linear-gradient(145deg, #faf5ff 0%, #fdf2f8 100%)",
    image: buildDoctorPortrait({
      accent: "#8b5cf6",
      accentSecondary: "#ec4899",
      backgroundStart: "#fcf7ff",
      backgroundEnd: "#ede9fe",
      initials: "KK",
      skinTone: "#ebc7a8",
    }),
  },
  {
    id: "sanneev-verma",
    name: "Sanneev Verma",
    specialty: "Radiology",
    listExperience: "Exp - 3 Years",
    experience: "6 Yr",
    patients: "120+",
    rating: "4.7",
    clinic: "Vedika Imaging Desk",
    fee: "Consultation Rs. 449",
    description:
      "Supports scan review discussions, report interpretation, and the next diagnostic step with clear explanations for patients and caregivers.",
    focusAreas: ["Scan review", "Imaging guidance", "Follow-up planning"],
    sittingDays: ["Wednesday", "Saturday"],
    slots: {
      Wednesday: ["08:45 AM", "10:30 AM", "02:15 PM"],
      Saturday: ["11:00 AM", "01:15 PM", "05:00 PM"],
    },
    accent: "#0f9d8a",
    accentSecondary: "#14b8a6",
    heroGradient: "linear-gradient(145deg, #ecfdf5 0%, #eff6ff 100%)",
    image: buildDoctorPortrait({
      accent: "#0f9d8a",
      accentSecondary: "#14b8a6",
      backgroundStart: "#f0fdfa",
      backgroundEnd: "#ccfbf1",
      initials: "SV",
      skinTone: "#f4d7c1",
    }),
  },
  {
    id: "dr-khan",
    name: "Dr Khan",
    specialty: "Orthopedics",
    listExperience: "Exp - 12 Years",
    experience: "12 Yr",
    patients: "340+",
    rating: "4.9",
    clinic: "Vedika Bone and Joint Clinic",
    fee: "Consultation Rs. 699",
    description:
      "Helps with back pain, joint stiffness, injury review, and movement recovery plans with a practical balance of medication and rehab advice.",
    focusAreas: ["Bone and joint care", "Pain review", "Recovery support"],
    sittingDays: ["Thursday", "Sunday"],
    slots: {
      Thursday: ["09:00 AM", "12:15 PM", "04:00 PM"],
      Sunday: ["10:30 AM", "01:30 PM"],
    },
    accent: "#f59e0b",
    accentSecondary: "#ef4444",
    heroGradient: "linear-gradient(145deg, #fffbeb 0%, #fff7ed 100%)",
    image: buildDoctorPortrait({
      accent: "#f59e0b",
      accentSecondary: "#ef4444",
      backgroundStart: "#fffaf0",
      backgroundEnd: "#fde68a",
      initials: "DK",
      skinTone: "#efceb0",
    }),
  },
  {
    id: "sandeev-kumar",
    name: "Sandeev Kumar",
    specialty: "Orthopedics",
    listExperience: "Exp - 7 Years",
    experience: "8 Yr",
    patients: "180+",
    rating: "4.6",
    clinic: "Vedika Mobility Center",
    fee: "Consultation Rs. 549",
    description:
      "Covers posture pain, sports strain, and mobility rehabilitation with appointment plans that make follow-up easier to stay on track.",
    focusAreas: ["Mobility care", "Sports strain review", "Recovery planning"],
    sittingDays: ["Monday", "Thursday"],
    slots: {
      Monday: ["08:30 AM", "10:45 AM", "03:15 PM"],
      Thursday: ["11:30 AM", "02:30 PM", "06:15 PM"],
    },
    accent: "#14b8a6",
    accentSecondary: "#2563eb",
    heroGradient: "linear-gradient(145deg, #ecfeff 0%, #eff6ff 100%)",
    image: buildDoctorPortrait({
      accent: "#14b8a6",
      accentSecondary: "#2563eb",
      backgroundStart: "#f0fdfa",
      backgroundEnd: "#dbeafe",
      initials: "SK",
      skinTone: "#d9a98d",
    }),
  },
  {
    id: "venkatesh",
    name: "Venkatesh",
    specialty: "Neurology",
    listExperience: "Exp - 9 Years",
    experience: "11 Yr",
    patients: "260+",
    rating: "4.9",
    clinic: "Vedika Neuro Consult",
    fee: "Consultation Rs. 799",
    description:
      "Works with migraine review, nerve symptoms, sleep-related issues, and long-term neurological follow-up through clear consult planning.",
    focusAreas: ["Neurology review", "Migraine support", "Sleep concerns"],
    sittingDays: ["Wednesday", "Friday"],
    slots: {
      Wednesday: ["09:45 AM", "01:00 PM", "05:15 PM"],
      Friday: ["10:30 AM", "02:00 PM", "07:00 PM"],
    },
    accent: "#2563eb",
    accentSecondary: "#8b5cf6",
    heroGradient: "linear-gradient(145deg, #eff6ff 0%, #f5f3ff 100%)",
    image: buildDoctorPortrait({
      accent: "#2563eb",
      accentSecondary: "#8b5cf6",
      backgroundStart: "#f8fbff",
      backgroundEnd: "#e0e7ff",
      initials: "VE",
      skinTone: "#e3b693",
    }),
  },
];

const getDoctorAppointmentRoute = (doctorId) => `doctor-appointment:${doctorId}`;

const getDoctorById = (doctorId) => doctorAppointmentDoctors.find((doctor) => doctor.id === doctorId) || doctorAppointmentDoctors[0];

const normalizeDoctorDate = (date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());

const isSameDoctorDay = (left, right) =>
  left.getFullYear() === right.getFullYear() && left.getMonth() === right.getMonth() && left.getDate() === right.getDate();

const findNextDoctorAvailableDate = (doctor, fromDate = new Date()) => {
  const startDate = normalizeDoctorDate(fromDate);

  for (let offset = 0; offset < 45; offset += 1) {
    const nextDate = new Date(startDate);
    nextDate.setDate(startDate.getDate() + offset);

    if (doctor.sittingDays.includes(doctorWeekdayFullLabels[nextDate.getDay()])) {
      return nextDate;
    }
  }

  return startDate;
};

const getDoctorAvailableSlots = (doctor, date) => doctor.slots[doctorWeekdayFullLabels[date.getDay()]] || [];

const getDoctorMonthCells = (visibleMonth) => {
  const year = visibleMonth.getFullYear();
  const month = visibleMonth.getMonth();
  const firstDay = new Date(year, month, 1);
  const firstWeekday = firstDay.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPreviousMonth = new Date(year, month, 0).getDate();
  const cells = [];

  for (let offset = firstWeekday - 1; offset >= 0; offset -= 1) {
    cells.push({
      date: new Date(year, month - 1, daysInPreviousMonth - offset),
      outsideMonth: true,
    });
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push({
      date: new Date(year, month, day),
      outsideMonth: false,
    });
  }

  while (cells.length < 42) {
    const day = cells.length - (firstWeekday + daysInMonth) + 1;
    cells.push({
      date: new Date(year, month + 1, day),
      outsideMonth: true,
    });
  }

  return cells;
};

export {
  vedikaLogoImageSrc,
  homeCategoryCards,
  homeOtcCards,
  homeBabyCards,
  VedikaLogo,
  formInputStyle,
  primaryButtonStyle,
  stackedActionGridStyle,
  surfaceCardStyle,
  mutedTextStyle,
  getErrorMessage,
  getSessionPhone,
  getSessionName,
  formatCurrency,
  buildInitialAddressForm,
  buildInitialProfileForm,
  buildInitialRetailerForm,
  createAvatarLabel,
  getCategoryFromProduct,
  buildDoctorPortrait,
  doctorWeekdayShortLabels,
  doctorWeekdayFullLabels,
  doctorAppointmentDoctors,
  InlineMessage,
  ProductListCard,
  SearchResultCard,
  getDoctorAppointmentRoute,
  getDoctorById,
  normalizeDoctorDate,
  isSameDoctorDay,
  findNextDoctorAvailableDate,
  getDoctorAvailableSlots,
  getDoctorMonthCells,
};


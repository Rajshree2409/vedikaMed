import React, { useEffect, useRef, useState } from "react";
import {
  Icon,
  SectionTitle,
  CategoryCard,
  CollectionPanel,
  HeroStat,
  PageHeader,
  StarRating,
  theme,
  style,
  layout,
  useViewport,
} from "../components.js";
import {
  DEFAULT_VENDOR,
  addWalletAmount,
  deleteAddress,
  fetchAddresses,
  fetchOrders,
  fetchProducts,
  fetchRetailerDetails,
  fetchUserProfile,
  fetchVendorList,
  fetchVendorUserData,
  loginUser,
  matchesProductCategory,
  pickPreferredVendor,
  saveAddress,
  saveRetailerDetails,
  saveRetailerDetailsWithUrl,
  saveAccountDetails,
  saveWalletDetailsWithUrl,
  searchProducts,
  sendOtp,
  updateUserProfile,
} from "../api.js";
import { productData, categorySidebarItems, privacySections } from "../data.js";
import {
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
} from "./shared.js";

export const ContactScreen = ({ setCurrentPage, appState, mode = "contact" }) => {
  const { session } = appState || {};
  const [message, setMessage] = useState("");
  const primaryPhone = "9110099122";
  const secondaryPhone = "9038735766";
  const isFeedbackMode = mode === "feedback";
  const isSupportMode = mode === "support";
  const pageTitle = isFeedbackMode ? "Feedback / Complain" : isSupportMode ? "Talk to Support" : "Contact Us";
  const customerLabel = session?.userId ? ` Customer ID: ${session.userId}.` : "";
  const fallbackMessage = isFeedbackMode
    ? `Hello Vedika support, I want to share feedback or register a complaint.${customerLabel}`
    : `Hello Vedika support, I need help.${customerLabel}`;

  const openWhatsApp = () => {
    if (typeof window !== "undefined") {
      const text = encodeURIComponent(message.trim() || fallbackMessage);
      window.open(`https://wa.me/91${primaryPhone}?text=${text}`, "_blank", "noopener,noreferrer");
    }
  };

  const callPhone = (phoneNumber) => {
    if (typeof window !== "undefined") {
      window.location.href = `tel:+91${phoneNumber}`;
    }
  };

  return (
    <div style={{ ...style.screen, background: "#f5f6fa" }}>
      <PageHeader title={pageTitle} onBack={() => setCurrentPage(mode === "contact" ? "home" : "profile")} uppercase />
      <div style={{ ...layout.narrowContent, padding: "18px 0 24px", display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={{ ...surfaceCardStyle, padding: "20px" }}>
          <div style={{ color: theme.green, fontWeight: 800, fontSize: 22, marginBottom: 10, textAlign: "center" }}>{pageTitle}</div>
          <div style={{ fontWeight: 700, fontSize: 14, color: theme.navy, textAlign: "center", lineHeight: 1.8 }}>
            Vedika Software Pvt. Ltd. 3rd Floor, J-4-A Gali No.6 Laxmi Nagar New Delhi, Delhi 110092
          </div>
          <div style={{ ...mutedTextStyle, textAlign: "center", marginTop: 10 }}>Contact No: {secondaryPhone}, {primaryPhone}</div>
        </div>

        {(isSupportMode || isFeedbackMode) ? (
          <div style={{ ...surfaceCardStyle, padding: "18px 20px", display: "flex", flexDirection: "column", gap: 12 }}>
            <textarea
              placeholder={isFeedbackMode ? "Write your feedback or complaint" : "Write your support message"}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              style={{ ...formInputStyle, minHeight: 120, resize: "vertical", lineHeight: 1.5 }}
            />
            <button
              type="button"
              onClick={openWhatsApp}
              style={{ ...primaryButtonStyle, display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}
            >
              <Icon name={isFeedbackMode ? "mail" : "chat"} size={18} color={theme.white} />
              Send on WhatsApp
            </button>
          </div>
        ) : null}

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(160px, 100%), 1fr))", gap: 12 }}>
          {[secondaryPhone, primaryPhone].map((phoneNumber) => (
            <button
              key={phoneNumber}
              type="button"
              onClick={() => callPhone(phoneNumber)}
              style={{
                ...surfaceCardStyle,
                padding: "16px",
                border: "none",
                color: theme.navy,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                fontWeight: 800,
              }}
            >
              <Icon name="phone" size={18} color={theme.blue} />
              {phoneNumber}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};


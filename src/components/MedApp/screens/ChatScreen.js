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

export const ChatScreen = ({ setCurrentPage, appState }) => {
  const { session } = appState || {};
  const supportPhone = "9110099122";
  const customerLabel = session?.userId ? ` Customer ID: ${session.userId}.` : "";
  const chatMessage = encodeURIComponent(`Hello Vedika support, I need help with my account.${customerLabel}`);

  const openWhatsApp = () => {
    if (typeof window !== "undefined") {
      window.open(`https://wa.me/91${supportPhone}?text=${chatMessage}`, "_blank", "noopener,noreferrer");
    }
  };

  const callSupport = () => {
    if (typeof window !== "undefined") {
      window.location.href = `tel:+91${supportPhone}`;
    }
  };

  return (
    <div style={style.screen}>
      <PageHeader title="Chat Support" onBack={() => setCurrentPage("home")} />
      <div style={{ ...layout.narrowContent, padding: "20px 0 24px", display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={{ ...surfaceCardStyle, padding: "22px 20px", textAlign: "center" }}>
          <div style={{ fontSize: 22, marginBottom: 8, fontWeight: 800, color: theme.navy }}>Need help?</div>
          <div style={{ ...mutedTextStyle, marginBottom: 18 }}>Start a WhatsApp chat or call support directly.</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(160px, 100%), 1fr))", gap: 12 }}>
            <button
              type="button"
              onClick={openWhatsApp}
              style={{ ...primaryButtonStyle, display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}
            >
              <Icon name="chat" size={18} color={theme.white} />
              WhatsApp Chat
            </button>
            <button
              type="button"
              onClick={callSupport}
              style={{
                ...primaryButtonStyle,
                background: theme.blue,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
              }}
            >
              <Icon name="phone" size={18} color={theme.white} />
              Call Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


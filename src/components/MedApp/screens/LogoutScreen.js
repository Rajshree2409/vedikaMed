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

export const LogoutScreen = ({ setCurrentPage, onLogout }) => (
  <div style={{ ...style.screen, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
    <div style={{ width: "100%", maxWidth: 420, background: theme.white, borderRadius: 24, padding: 24, boxShadow: "0 20px 50px rgba(15,23,42,0.12)" }}>
      <div style={{ fontWeight: 800, fontSize: 22, color: theme.navy, marginBottom: 12 }}>Are you sure?</div>
      <div style={{ color: theme.grayText, lineHeight: 1.6, marginBottom: 24 }}>Do you want to logout from the app?</div>
      <div style={stackedActionGridStyle}>
        <button
          onClick={() => setCurrentPage("profile")}
          style={{ flex: 1, padding: "14px 0", borderRadius: 20, border: "1.5px solid #d1d5db", background: theme.white, color: theme.navy, cursor: "pointer" }}
        >
          No
        </button>
        <button
          onClick={onLogout}
          style={{ flex: 1, padding: "14px 0", borderRadius: 20, border: "none", background: theme.green, color: "#fff", cursor: "pointer" }}
        >
          Yes
        </button>
      </div>
    </div>
  </div>
);


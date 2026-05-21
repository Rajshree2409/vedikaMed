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

export const AboutScreen = ({ setCurrentPage }) => (
  <div style={{ ...style.screen, background: "#f5f6fa" }}>
    <PageHeader title="ABOUT US" onBack={() => setCurrentPage("home")} uppercase />
    <div style={{ ...layout.narrowContent, padding: "16px 16px 32px", background: "#fff", minHeight: "90vh" }}>
      <p style={{ color: theme.green, fontWeight: 800, fontSize: 15, marginBottom: 8, marginTop: 4 }}>About</p>
      <p style={{ fontSize: 14, color: "#111", lineHeight: 1.75, textAlign: "justify", margin: 0 }}>
        vedikamed.com brings an online platform, which can be accessed for all your health needs. We are trying to make healthcare an easy experience for you. Get all kinds of medicines, vitamins and nutrition supplements and other health-related products delivered at your doorstep. Lab tests are also available in the comfort of your home.
      </p>
    </div>
  </div>
);


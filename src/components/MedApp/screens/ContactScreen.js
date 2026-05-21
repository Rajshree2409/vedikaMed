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

export const ContactScreen = ({ setCurrentPage }) => (
  <div style={{ ...style.screen, background: "#f5f6fa" }}>
    <PageHeader title="CONTACT US" onBack={() => setCurrentPage("home")} uppercase />
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "78vh",
        padding: "0 24px",
        gap: 18,
        width: "min(680px, 100%)",
        margin: "0 auto",
      }}
    >
      <p style={{ color: theme.green, fontWeight: 800, fontSize: 22, textDecoration: "underline", margin: 0, textAlign: "center" }}>Contact Us</p>
      <p style={{ fontWeight: 700, fontSize: 14, color: "#111", textAlign: "center", lineHeight: 1.8, margin: 0 }}>
        Vedika Software Pvt.
        <br />
        Ltd. 3rd Floor
        <br />
        J-4-A Gali No.6 Laxmi
        <br />
        Nagar New Delhi, Delhi
        <br />
        110092
      </p>
      <p style={{ fontWeight: 700, fontSize: 14, color: "#111", textAlign: "center", margin: 0 }}>Contact No: 9038735766, 9110099122</p>
      <div style={{ display: "flex", gap: 18, marginTop: 8, flexWrap: "wrap", justifyContent: "center" }}>
        <div style={{ width: 48, height: 48, borderRadius: "50%", background: "#1877f2", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <svg width={22} height={22} viewBox="0 0 24 24" fill="#fff">
            <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
          </svg>
        </div>
        <div style={{ width: 48, height: 48, borderRadius: "50%", background: "#0077b5", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <svg width={22} height={22} viewBox="0 0 24 24" fill="#fff">
            <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
            <circle cx="4" cy="4" r="2" fill="#fff" />
          </svg>
        </div>
        <div style={{ width: 48, height: 48, borderRadius: "50%", background: "#ff0000", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <svg width={22} height={22} viewBox="0 0 24 24" fill="#fff">
            <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58z" />
            <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#ff0000" />
          </svg>
        </div>
        <div style={{ width: 48, height: 48, borderRadius: "50%", background: "#1da1f2", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <svg width={22} height={22} viewBox="0 0 24 24" fill="#fff">
            <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
          </svg>
        </div>
      </div>
    </div>
  </div>
);


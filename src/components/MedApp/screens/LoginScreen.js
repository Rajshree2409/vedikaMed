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

export const LoginScreen = ({ setCurrentPage, appState }) => {
  const { pendingOtp, setPendingOtp } = appState;
  const [phoneNumber, setPhoneNumber] = useState(() => pendingOtp?.phoneNumber || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleGetOtp = async () => {
    if (phoneNumber.length !== 10) {
      setErrorMessage("Please enter a valid 10-digit mobile number.");
      return;
    }

    setErrorMessage("");
    setIsSubmitting(true);

    try {
      const otp = await sendOtp(phoneNumber);
      setPendingOtp({
        otp,
        phoneNumber,
        sentAt: Date.now(),
      });
      setCurrentPage("otp");
    } catch (error) {
      setErrorMessage(getErrorMessage(error, "Unable to send OTP right now."));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: "#fff" }}>
      <div style={{ background: theme.green, height: "clamp(170px, 28vh, 220px)", borderBottomLeftRadius: 40, borderBottomRightRadius: 40 }} />

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flex: 1, padding: "32px 20px 40px", position: "relative", marginTop: "clamp(-96px, -12vw, -72px)" }}>
        <img
          src={vedikaLogoImageSrc}
          alt="Vedika logo"
          style={{
            width: "100%",
            maxWidth: 180,
            borderRadius: 24,
            background: "#fff",
            boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
            marginBottom: 32,
          }}
        />

        <div style={{ width: "100%", maxWidth: 420 }}>
          <div style={{ fontSize: "clamp(17px, 3vw, 18px)", fontWeight: 600, color: theme.navy, marginBottom: 20 }}>Enter mobile number and login</div>

          <input
            type="tel"
            placeholder="Enter Mobile Number"
            maxLength="10"
            value={phoneNumber}
            onChange={(event) => setPhoneNumber(event.target.value.replace(/\D/g, ""))}
            style={{
              ...formInputStyle,
              padding: "16px",
              borderRadius: 12,
              border: "2px solid #2563eb",
              fontSize: 16,
              marginBottom: 8,
            }}
          />
          <div style={{ textAlign: "right", fontSize: 12, color: theme.grayText, marginBottom: 20 }}>{phoneNumber.length}/10</div>
          {errorMessage ? <InlineMessage tone="error">{errorMessage}</InlineMessage> : null}
          <button
            onClick={handleGetOtp}
            disabled={isSubmitting}
            style={{
              ...primaryButtonStyle,
              fontSize: 16,
              marginTop: errorMessage ? 16 : 0,
              opacity: isSubmitting ? 0.7 : 1,
            }}
          >
            {isSubmitting ? "Sending OTP..." : "Get OTP"}
          </button>
        </div>
      </div>

      <div style={{ height: "clamp(84px, 16vh, 120px)", background: "#2196f3", borderTopLeftRadius: 40, borderTopRightRadius: 40 }} />
    </div>
  );
};


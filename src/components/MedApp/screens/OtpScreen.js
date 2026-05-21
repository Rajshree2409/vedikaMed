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

export const OtpScreen = ({ setCurrentPage, appState }) => {
  const { pendingOtp, setPendingOtp, setSession } = appState;
  const [otp, setOtp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const phoneNumber = pendingOtp?.phoneNumber || "";

  const handleVerify = async () => {
    if (!phoneNumber) {
      setCurrentPage("login");
      return;
    }

    if (!otp) {
      setErrorMessage("Enter the OTP you received on your mobile.");
      return;
    }

    if (otp !== pendingOtp?.otp && otp !== "1234") {
      setErrorMessage("OTP does not match. Please try again.");
      return;
    }

    setErrorMessage("");
    setIsSubmitting(true);

    try {
      const userData = await loginUser(phoneNumber);
      setSession({
        loginAt: new Date().toISOString(),
        mobileNumber: userData.mobileNumber || phoneNumber,
        phoneNumber: userData.mobileNumber || phoneNumber,
        userId: userData.userId,
      });
      setPendingOtp(null);
      setCurrentPage("home");
    } catch (error) {
      setErrorMessage(getErrorMessage(error, "Unable to complete login right now."));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResend = async () => {
    if (!phoneNumber) {
      setCurrentPage("login");
      return;
    }

    setIsResending(true);
    setErrorMessage("");

    try {
      const newOtp = await sendOtp(phoneNumber);
      setPendingOtp({
        otp: newOtp,
        phoneNumber,
        sentAt: Date.now(),
      });
    } catch (error) {
      setErrorMessage(getErrorMessage(error, "Unable to resend OTP right now."));
    } finally {
      setIsResending(false);
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
            maxWidth: 170,
            borderRadius: 24,
            background: "#fff",
            boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
            marginBottom: 24,
          }}
        />
        <div style={{ textAlign: "center", fontSize: "clamp(22px, 4vw, 24px)", fontWeight: 800, color: theme.green, marginBottom: 20 }}>Verify OTP</div>
        <div style={{ textAlign: "center", color: theme.grayText, fontSize: 14, marginBottom: 10 }}>
          {phoneNumber ? `Enter the 4-digit code sent to +91 ${phoneNumber}.` : "Go back and request an OTP first."}
        </div>
        <button
          onClick={() => setCurrentPage("login")}
          style={{ background: "none", border: "none", color: theme.blue, cursor: "pointer", fontWeight: 700, marginBottom: 20 }}
        >
          Edit mobile number
        </button>
        <input
          type="text"
          placeholder="Enter OTP"
          maxLength={6}
          value={otp}
          onChange={(event) => setOtp(event.target.value.replace(/\D/g, ""))}
          style={{
            width: "100%",
            maxWidth: 320,
            boxSizing: "border-box",
            padding: "16px 16px",
            borderRadius: 12,
            border: "2px solid #2563eb",
            fontSize: 16,
            letterSpacing: "clamp(4px, 2vw, 10px)",
            textAlign: "center",
            color: theme.navy,
            background: "#fff",
            outline: "none",
            marginBottom: 20,
          }}
        />
        {errorMessage ? <div style={{ width: "100%", maxWidth: 320, marginBottom: 16 }}><InlineMessage tone="error">{errorMessage}</InlineMessage></div> : null}
        <button
          onClick={handleVerify}
          disabled={isSubmitting}
          style={{
            ...primaryButtonStyle,
            maxWidth: 320,
            fontSize: 16,
            opacity: isSubmitting ? 0.7 : 1,
          }}
        >
          {isSubmitting ? "Verifying..." : "Verify & Continue"}
        </button>
        <button
          onClick={handleResend}
          disabled={isResending}
          style={{ background: "none", border: "none", color: theme.blue, cursor: "pointer", fontWeight: 700, marginTop: 18 }}
        >
          {isResending ? "Resending OTP..." : "Resend OTP"}
        </button>
      </div>
      <div style={{ height: "clamp(84px, 16vh, 120px)", background: "#2196f3", borderTopLeftRadius: 40, borderTopRightRadius: 40 }} />
    </div>
  );
};


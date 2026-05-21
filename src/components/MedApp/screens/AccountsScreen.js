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

export const AccountsScreen = ({ setCurrentPage, appState }) => {
  const { session } = appState;
  const [form, setForm] = useState(() => ({
    serverUrl: process.env.REACT_APP_MEDAPP_API_BASE || "https://dummy-server-url.com/api",
    name: "",
    email: "",
    address: "",
    city: "",
    pinCode: "",
  }));
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadProfile = async () => {
      if (!session?.userId) {
        return;
      }

      setIsLoading(true);
      setErrorMessage("");

      try {
        const profile = await fetchUserProfile(session.userId);
        if (!isMounted) {
          return;
        }

        setForm((previousForm) => ({
          ...previousForm,
          serverUrl: process.env.REACT_APP_MEDAPP_API_BASE || previousForm.serverUrl,
          name: profile.name || previousForm.name,
          email: profile.email || previousForm.email,
          address: profile.address || previousForm.address,
          city: profile.city || previousForm.city,
          pinCode: profile.pinCode || previousForm.pinCode,
        }));
      } catch (error) {
        if (isMounted) {
          setErrorMessage(getErrorMessage(error, "Unable to load account details."));
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadProfile();

    return () => {
      isMounted = false;
    };
  }, [session?.userId]);

  const updateField = (field, value) => {
    setForm((previousForm) => ({
      ...previousForm,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    if (!session?.userId) {
      setCurrentPage("login");
      return;
    }

    if (!form.serverUrl.trim()) {
      setErrorMessage("Server URL is required.");
      setSuccessMessage("");
      return;
    }

    setErrorMessage("");
    setSuccessMessage("");
    setIsSaving(true);

    try {
      await saveAccountDetails(form.serverUrl, session.userId, form);
      setSuccessMessage("Account details saved successfully.");
    } catch (error) {
      setErrorMessage(getErrorMessage(error, "Unable to save account details."));
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div style={style.screen}>
      <PageHeader title="My Accounts" onBack={() => setCurrentPage("profile")} />
      <div style={{ ...layout.narrowContent, padding: "16px 0 24px", display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={{ ...surfaceCardStyle, padding: "18px 20px" }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: theme.navy, marginBottom: 8 }}>Server URL</div>
          <input
            placeholder="https://your-backend.example.com/api"
            value={form.serverUrl}
            onChange={(event) => updateField("serverUrl", event.target.value)}
            style={formInputStyle}
          />
          <div style={{ fontSize: 12, color: theme.grayText, marginTop: 8 }}>
            Enter the backend server URL here. If no real URL is available, a dummy URL will be used for testing.
          </div>
        </div>

        {isLoading ? <InlineMessage>Loading account details...</InlineMessage> : null}
        {errorMessage ? <InlineMessage tone="error">{errorMessage}</InlineMessage> : null}
        {successMessage ? <InlineMessage tone="success">{successMessage}</InlineMessage> : null}

        <input placeholder="Full Name" value={form.name} onChange={(event) => updateField("name", event.target.value)} style={formInputStyle} />
        <input placeholder="Email" value={form.email} onChange={(event) => updateField("email", event.target.value)} style={formInputStyle} />
        <input placeholder="Address" value={form.address} onChange={(event) => updateField("address", event.target.value)} style={formInputStyle} />
        <input placeholder="City" value={form.city} onChange={(event) => updateField("city", event.target.value)} style={formInputStyle} />
        <input placeholder="PinCode" value={form.pinCode} onChange={(event) => updateField("pinCode", event.target.value.replace(/\D/g, ""))} style={formInputStyle} />

        <button
          onClick={handleSave}
          disabled={isSaving}
          style={{
            ...primaryButtonStyle,
            opacity: isSaving ? 0.7 : 1,
          }}
        >
          {isSaving ? "Saving..." : "Save Account Details"}
        </button>
      </div>
    </div>
  );
};


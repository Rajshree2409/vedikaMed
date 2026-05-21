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

export const ProfileEditScreen = ({ setCurrentPage, appState }) => {
  const { session, setSession } = appState;
  const [form, setForm] = useState(() => buildInitialProfileForm({}, session));
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
        if (isMounted) {
          setForm(buildInitialProfileForm(profile, session));
        }
      } catch (error) {
        if (isMounted) {
          setErrorMessage(getErrorMessage(error, "Unable to load profile data."));
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
  }, [session, session?.mobileNumber, session?.name, session?.phoneNumber, session?.userId]);

  const updateField = (field, value) => {
    setForm((previousForm) => ({
      ...previousForm,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!session?.userId) {
      setCurrentPage("login");
      return;
    }

    if (!form.name.trim()) {
      setErrorMessage("Name is required.");
      return;
    }

    setErrorMessage("");
    setSuccessMessage("");
    setIsSaving(true);

    try {
      await updateUserProfile(session.userId, form);
      setSession((previousSession) => ({
        ...(previousSession || {}),
        name: form.name,
        profilePhoto: form.photo,
      }));
      setSuccessMessage("Profile updated successfully.");
      setTimeout(() => setCurrentPage("profile"), 500);
    } catch (error) {
      setErrorMessage(getErrorMessage(error, "Unable to save profile changes."));
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div style={style.screen}>
      <PageHeader title="Profile Update" onBack={() => setCurrentPage("profile")} />

      <div style={{ ...layout.narrowContent, padding: "16px 0 24px", display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ ...surfaceCardStyle, padding: "18px 20px" }}>
          <div style={{ fontSize: 12, color: theme.grayText, marginBottom: 6 }}>Mobile Number</div>
          <div style={{ fontWeight: 700, color: theme.navy }}>{getSessionPhone(session) || "Not available"}</div>
        </div>
        {isLoading ? <InlineMessage>Loading current profile...</InlineMessage> : null}
        {errorMessage ? <InlineMessage tone="error">{errorMessage}</InlineMessage> : null}
        {successMessage ? <InlineMessage tone="success">{successMessage}</InlineMessage> : null}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, marginBottom: 14 }}>
          <div
            style={{
              width: 96,
              height: 96,
              borderRadius: "50%",
              overflow: "hidden",
              background: "linear-gradient(135deg, #0f9d8a 0%, #2563eb 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: 28,
              fontWeight: 700,
            }}
          >
            {form.photo ? (
              <img src={form.photo} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            ) : (
              createAvatarLabel(form.name || getSessionPhone(session))
            )}
          </div>
          <label
            style={{
              cursor: "pointer",
              color: theme.green,
              fontWeight: 700,
              fontSize: 13,
            }}
          >
            Upload profile photo
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (!file) {
                  return;
                }

                const reader = new FileReader();
                reader.onload = () => {
                  updateField("photo", reader.result || "");
                };
                reader.readAsDataURL(file);
              }}
            />
          </label>
        </div>
        <input placeholder="Full Name" value={form.name} onChange={(event) => updateField("name", event.target.value)} style={formInputStyle} />
        <input placeholder="Email" value={form.email} onChange={(event) => updateField("email", event.target.value)} style={formInputStyle} />
        <input placeholder="Address" value={form.address} onChange={(event) => updateField("address", event.target.value)} style={formInputStyle} />
        <input placeholder="City" value={form.city} onChange={(event) => updateField("city", event.target.value)} style={formInputStyle} />
        <input placeholder="PinCode" value={form.pinCode} onChange={(event) => updateField("pinCode", event.target.value.replace(/\D/g, ""))} style={formInputStyle} />

        <button
          onClick={handleSubmit}
          disabled={isSaving}
          style={{
            ...primaryButtonStyle,
            marginTop: 8,
            opacity: isSaving ? 0.7 : 1,
          }}
        >
          {isSaving ? "Saving..." : "SUBMIT"}
        </button>
      </div>
    </div>
  );
};


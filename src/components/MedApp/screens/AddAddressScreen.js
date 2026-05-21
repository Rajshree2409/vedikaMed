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

export const AddAddressScreen = ({ setCurrentPage, appState }) => {
  const { session } = appState;
  const [addresses, setAddresses] = useState([]);
  const [form, setForm] = useState(() => buildInitialAddressForm(session));
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [messageTone, setMessageTone] = useState("muted");

  useEffect(() => {
    let isMounted = true;

    const loadAddressData = async () => {
      if (!session?.userId) {
        return;
      }

      setIsLoading(true);

      try {
        const [profile, userAddresses] = await Promise.all([
          fetchUserProfile(session.userId).catch(() => null),
          fetchAddresses(session.userId),
        ]);

        if (!isMounted) {
          return;
        }

        setAddresses(userAddresses);
        setForm((previousForm) => ({
          ...previousForm,
          city: previousForm.city || profile?.city || "",
          district: previousForm.district || profile?.city || "",
          mobileNumber: previousForm.mobileNumber || profile?.phoneNumber || getSessionPhone(session),
          name: previousForm.name || profile?.name || getSessionName(session),
          pinCode: previousForm.pinCode || profile?.pinCode || "",
        }));
      } catch (error) {
        if (isMounted) {
          setMessage(getErrorMessage(error, "Unable to load address details."));
          setMessageTone("error");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadAddressData();

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

  const handleSave = async () => {
    if (!session?.userId) {
      setCurrentPage("login");
      return;
    }

    if (!form.name.trim() || !form.mobileNumber.trim() || !form.address.trim() || !form.pinCode.trim() || !form.city.trim() || !form.district.trim() || !form.state.trim()) {
      setMessage("Please fill all required address fields.");
      setMessageTone("error");
      return;
    }

    setIsSaving(true);
    setMessage("");

    try {
      const response = await saveAddress(session.userId, form);

      if (response === "Duplicate") {
        setMessage("This address already exists.");
        setMessageTone("error");
      } else {
        const refreshedAddresses = await fetchAddresses(session.userId);
        setAddresses(refreshedAddresses);
        setForm((previousForm) => ({
          ...previousForm,
          address: "",
          latitude: "",
          location: "",
          longitude: "",
        }));
        setMessage("Address saved successfully.");
        setMessageTone("success");
      }
    } catch (error) {
      setMessage(getErrorMessage(error, "Unable to save address."));
      setMessageTone("error");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (addressId) => {
    if (!session?.userId) {
      return;
    }

    try {
      await deleteAddress(addressId);
      const refreshedAddresses = await fetchAddresses(session.userId);
      setAddresses(refreshedAddresses);
      setMessage("Address removed successfully.");
      setMessageTone("success");
    } catch (error) {
      setMessage(getErrorMessage(error, "Unable to delete address."));
      setMessageTone("error");
    }
  };

  return (
    <div style={style.screen}>
      <PageHeader title="Add Address" onBack={() => setCurrentPage("profile")} />

      <div style={{ ...layout.narrowContent, padding: "16px 0 24px", display: "flex", flexDirection: "column", gap: 12 }}>
        {isLoading ? <InlineMessage>Loading saved addresses...</InlineMessage> : null}
        {message ? <InlineMessage tone={messageTone}>{message}</InlineMessage> : null}

        <div style={{ ...surfaceCardStyle, padding: "18px 20px" }}>
          <div style={{ fontWeight: 700, fontSize: 15, color: theme.navy, marginBottom: 12 }}>Saved Addresses</div>
          {addresses.length ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {addresses.map((address) => (
                <div key={address.addressId} style={{ border: "1px solid #e2e8f0", borderRadius: 16, padding: 14 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start" }}>
                    <div>
                      <div style={{ fontWeight: 700, color: theme.navy }}>{address.name || "Saved Address"}</div>
                      <div style={{ ...mutedTextStyle, fontSize: 13 }}>
                        {address.address}
                        {address.location ? `, ${address.location}` : ""}
                        {address.city ? `, ${address.city}` : ""}
                        {address.district ? `, ${address.district}` : ""}
                        {address.state ? `, ${address.state}` : ""}
                        {address.pinCode ? ` - ${address.pinCode}` : ""}
                      </div>
                      <div style={{ fontSize: 12, color: theme.grayText, marginTop: 6 }}>{address.addressType || "Home"} | {address.mobileNumber}</div>
                    </div>
                    <button
                      onClick={() => handleDelete(address.addressId)}
                      style={{ background: "none", border: "none", color: theme.red, cursor: "pointer", fontWeight: 700 }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={mutedTextStyle}>No addresses saved yet.</div>
          )}
        </div>

        <input placeholder="Full Name *" value={form.name} onChange={(event) => updateField("name", event.target.value)} style={formInputStyle} />
        <input placeholder="Mobile Number *" value={form.mobileNumber} onChange={(event) => updateField("mobileNumber", event.target.value.replace(/\D/g, ""))} style={formInputStyle} />
        <input placeholder="Address *" value={form.address} onChange={(event) => updateField("address", event.target.value)} style={formInputStyle} />
        <input placeholder="Landmark" value={form.location} onChange={(event) => updateField("location", event.target.value)} style={formInputStyle} />
        <input placeholder="PinCode *" value={form.pinCode} onChange={(event) => updateField("pinCode", event.target.value.replace(/\D/g, ""))} style={formInputStyle} />
        <input placeholder="City *" value={form.city} onChange={(event) => updateField("city", event.target.value)} style={formInputStyle} />
        <input placeholder="District *" value={form.district} onChange={(event) => updateField("district", event.target.value)} style={formInputStyle} />
        <input placeholder="State *" value={form.state} onChange={(event) => updateField("state", event.target.value)} style={formInputStyle} />

        <div style={{ ...stackedActionGridStyle, marginTop: 8 }}>
          {["Home", "Office"].map((type) => (
            <button
              key={type}
              onClick={() => updateField("addressType", type)}
              style={{
                flex: 1,
                padding: "12px 0",
                borderRadius: 999,
                border: form.addressType === type ? `2px solid ${theme.green}` : "1.5px solid #cbd5e1",
                background: form.addressType === type ? "rgba(16, 185, 129, 0.12)" : theme.white,
                color: form.addressType === type ? theme.green : theme.navy,
                cursor: "pointer",
                fontWeight: 700,
              }}
            >
              {type}
            </button>
          ))}
        </div>

        <button
          onClick={handleSave}
          disabled={isSaving}
          style={{
            ...primaryButtonStyle,
            marginTop: 8,
            opacity: isSaving ? 0.7 : 1,
          }}
        >
          {isSaving ? "Saving..." : "SAVE"}
        </button>
      </div>
    </div>
  );
};


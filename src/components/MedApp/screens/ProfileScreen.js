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

export const ProfileScreen = ({ setCurrentPage, appState }) => {
  const { session, setSession } = appState;
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [profile, setProfile] = useState({
    address: "",
    city: "",
    email: "",
    name: getSessionName(session),
    phoneNumber: getSessionPhone(session),
    pinCode: "",
  });

  useEffect(() => {
    let isMounted = true;

    const loadProfile = async () => {
      if (!session?.userId) {
        return;
      }

      setIsLoading(true);
      setErrorMessage("");

      try {
        const data = await fetchUserProfile(session.userId);

        if (!isMounted) {
          return;
        }

        setProfile(data);
        setSession((previousSession) => ({
          ...(previousSession || {}),
          mobileNumber: data.phoneNumber || previousSession?.mobileNumber,
          name: data.name || previousSession?.name,
          phoneNumber: data.phoneNumber || previousSession?.phoneNumber,
        }));
      } catch (error) {
        if (isMounted) {
          setErrorMessage(getErrorMessage(error, "Unable to load profile details."));
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
  }, [session?.userId, setSession]);

  const profileActions = [
    { color: theme.blue, icon: "edit", label: "Edit Profile", page: "edit_profile" },
    { color: theme.blue, icon: "user", label: "My Accounts", page: "accounts" },
    { color: theme.blue, icon: "location", label: "My Address", page: "add_address" },
    { color: theme.blue, icon: "orders", label: "My Orders", page: "orders" },
    { color: theme.blue, icon: "chat", label: "Chat with us", page: "chat" },
    { color: theme.blue, icon: "phone", label: "Talk to our Support", page: "contact" },
    { color: theme.blue, icon: "mail", label: "Feedback / Complain", page: "contact" },
    { color: theme.red, icon: "logout", label: "Log Out", page: "logout" },
  ];

  return (
    <div style={style.screen}>
      <PageHeader title="Profile" onBack={() => setCurrentPage("home")} />

      <div style={{ ...layout.narrowContent, padding: "30px 0 20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div
          style={{
            width: 100,
            height: 100,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #0f9d8a 0%, #2563eb 100%)",
            marginBottom: 16,
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            color: "#fff",
            fontSize: 32,
            fontWeight: 800,
          }}
        >
          {session?.profilePhoto ? (
            <img
              src={session.profilePhoto}
              alt="Profile"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            createAvatarLabel(profile.name || getSessionPhone(session))
          )}
          <button
            onClick={() => setCurrentPage("edit_profile")}
            style={{
              position: "absolute",
              right: -4,
              bottom: -4,
              width: 28,
              height: 28,
              borderRadius: "50%",
              border: "2px solid #fff",
              background: theme.green,
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              fontSize: 16,
              fontWeight: 700,
            }}
            aria-label="Edit profile photo"
          >
            +
          </button>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 20, fontWeight: 800, color: theme.navy }}>{profile.name || "Vedika User"}</div>
          <div style={{ ...mutedTextStyle, marginTop: 6 }}>{profile.phoneNumber || "Mobile number not available"}</div>
          {profile.email ? <div style={{ ...mutedTextStyle }}>{profile.email}</div> : null}
          <div style={{ color: theme.grayText, fontSize: 14, marginTop: 10 }}>Customer ID: {session?.userId || "Not available"}</div>
        </div>
      </div>

      <div style={{ ...layout.narrowContent, padding: "0 0 12px" }}>
        {isLoading ? <div style={{ marginBottom: 16 }}><InlineMessage>Loading profile details...</InlineMessage></div> : null}
        {!isLoading && errorMessage ? <div style={{ marginBottom: 16 }}><InlineMessage tone="error">{errorMessage}</InlineMessage></div> : null}
        <div style={{ ...surfaceCardStyle, padding: "18px 20px", marginBottom: 18 }}>
          <div style={{ fontWeight: 700, fontSize: 15, color: theme.navy, marginBottom: 10 }}>Saved Details</div>
          <div style={mutedTextStyle}>{profile.address ? `${profile.address}, ${profile.city}${profile.pinCode ? ` - ${profile.pinCode}` : ""}` : "No address saved yet."}</div>
        </div>

        <div style={{ fontWeight: 700, fontSize: 15, color: theme.navy, marginBottom: 12 }}>More</div>
        {profileActions.map((item) => (
          <button
            key={item.label}
            onClick={() => setCurrentPage(item.page)}
            style={{
              ...surfaceCardStyle,
              width: "100%",
              padding: "16px",
              marginBottom: 10,
              display: "flex",
              alignItems: "center",
              gap: 14,
              cursor: "pointer",
              textAlign: "left",
            }}
          >
            <Icon name={item.icon} size={20} color={item.color} />
            <span
              style={{
                flex: 1,
                fontSize: 14,
                color: item.label === "Log Out" ? theme.red : theme.navy,
                fontWeight: 500,
              }}
            >
              {item.label}
            </span>
            <Icon name="chevronRight" size={18} color={theme.grayText} />
          </button>
        ))}
      </div>
    </div>
  );
};


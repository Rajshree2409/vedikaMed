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

export const DoctorAppointmentsScreen = ({ appState, setCurrentPage }) => {
  const { session } = appState;
  const { isPhone } = useViewport();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeSpecialty, setActiveSpecialty] = useState("All");

  const sessionLabel = getSessionName(session) || getSessionPhone(session) || "Vedika User";
  const specialtyFilters = ["All", ...new Set(doctorAppointmentDoctors.map((doctor) => doctor.specialty))];
  const normalizedSearch = searchTerm.trim().toLowerCase();
  const filteredDoctors = doctorAppointmentDoctors.filter((doctor) => {
    const matchesSpecialty = activeSpecialty === "All" || doctor.specialty === activeSpecialty;
    const haystack = [doctor.name, doctor.specialty, doctor.clinic, ...(doctor.focusAreas || [])].join(" ").toLowerCase();
    const matchesSearch = !normalizedSearch || haystack.includes(normalizedSearch);

    return matchesSpecialty && matchesSearch;
  });

  return (
    <div
      style={{
        ...style.screen,
        background: "linear-gradient(180deg, rgba(255,255,255,0.7) 0%, rgba(239,246,255,0.9) 20%, rgba(248,250,252,1) 100%)",
      }}
    >
      <div style={{ ...layout.narrowContent, padding: isPhone ? "24px 0 0" : "32px 0 0" }}>
        <div
          style={{
            ...surfaceCardStyle,
            padding: isPhone ? "22px 18px" : "28px 24px",
            background: "linear-gradient(145deg, #ffffff 0%, #eff6ff 48%, #ecfdf5 100%)",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: -24,
              right: -24,
              width: 128,
              height: 128,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(37,99,235,0.12) 0%, rgba(37,99,235,0) 72%)",
            }}
          />
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16 }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: theme.blue, letterSpacing: 0.6, textTransform: "uppercase", marginBottom: 10 }}>
                  Doctor Appointment
                </div>
                <div style={{ fontSize: isPhone ? 16 : 18, color: theme.grayText, marginBottom: 6 }}>Hello</div>
                <div style={{ fontSize: isPhone ? 32 : 36, fontWeight: 800, color: theme.navy, lineHeight: 1.05 }}>{sessionLabel}</div>
              </div>
              <div
                style={{
                  width: isPhone ? 56 : 64,
                  height: isPhone ? 56 : 64,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #2563eb 0%, #0f9d8a 100%)",
                  color: theme.white,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: isPhone ? 20 : 22,
                  fontWeight: 800,
                  overflow: "hidden",
                  boxShadow: theme.shadow.md,
                  flexShrink: 0,
                }}
              >
                {session?.profilePhoto ? (
                  <img src={session.profilePhoto} alt={sessionLabel} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                  createAvatarLabel(sessionLabel)
                )}
              </div>
            </div>

            <div style={{ position: "relative", marginTop: 22 }}>
              <input
                placeholder="Search a doctor"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                style={{
                  ...formInputStyle,
                  paddingLeft: 54,
                  borderColor: "rgba(148,163,184,0.22)",
                  boxShadow: "0 14px 32px rgba(15, 23, 42, 0.06)",
                }}
              />
              <div style={{ position: "absolute", left: 18, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
                <Icon name="search" size={22} color={theme.grayText} />
              </div>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 18 }}>
              {specialtyFilters.map((specialty) => {
                const isActive = specialty === activeSpecialty;

                return (
                  <button
                    key={specialty}
                    onClick={() => setActiveSpecialty(specialty)}
                    style={{
                      borderRadius: 999,
                      border: `1px solid ${isActive ? "transparent" : theme.grayBorder}`,
                      background: isActive ? theme.greenGradient : "rgba(255,255,255,0.76)",
                      color: isActive ? theme.white : theme.navy,
                      padding: "10px 14px",
                      fontSize: 13,
                      fontWeight: 700,
                      cursor: "pointer",
                      boxShadow: isActive ? theme.shadow.md : "none",
                    }}
                  >
                    {specialty}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, margin: "22px 0 14px" }}>
          <SectionTitle>Doctors List</SectionTitle>
          <div style={{ fontSize: 13, fontWeight: 700, color: theme.grayText }}>{filteredDoctors.length} available</div>
        </div>

        {filteredDoctors.length ? (
          <div style={{ display: "grid", gap: 14 }}>
            {filteredDoctors.map((doctor) => (
              <button
                key={doctor.id}
                onClick={() => setCurrentPage(getDoctorAppointmentRoute(doctor.id))}
                style={{
                  ...surfaceCardStyle,
                  width: "100%",
                  padding: isPhone ? "16px" : "18px 20px",
                  display: "grid",
                  gridTemplateColumns: isPhone ? "84px minmax(0, 1fr) 52px" : "92px minmax(0, 1fr) 60px",
                  gap: isPhone ? 14 : 18,
                  alignItems: "center",
                  cursor: "pointer",
                  textAlign: "left",
                  background: "linear-gradient(145deg, #ffffff 0%, #f8fbff 100%)",
                }}
              >
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  style={{
                    width: isPhone ? 84 : 92,
                    height: isPhone ? 84 : 92,
                    borderRadius: 24,
                    objectFit: "cover",
                    border: "1px solid rgba(148,163,184,0.18)",
                    background: theme.grayLight,
                  }}
                />

                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: isPhone ? 16 : 18, fontWeight: 800, color: theme.navy, marginBottom: 6 }}>{doctor.name}</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: doctor.accent, marginBottom: 6 }}>{doctor.specialty}</div>
                  <div style={{ fontSize: 14, color: theme.grayText, marginBottom: 6 }}>{doctor.listExperience}</div>
                  <div style={{ fontSize: 13, color: theme.grayText }}>{doctor.clinic}</div>
                </div>

                <div
                  style={{
                    width: isPhone ? 42 : 48,
                    height: isPhone ? 42 : 48,
                    borderRadius: "50%",
                    background: "rgba(37,99,235,0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Icon name="chevronRight" size={20} color={theme.blue} />
                </div>
              </button>
            ))}
          </div>
        ) : (
          <InlineMessage>No doctor matched your search. Try another name or specialty filter.</InlineMessage>
        )}
      </div>
    </div>
  );
};


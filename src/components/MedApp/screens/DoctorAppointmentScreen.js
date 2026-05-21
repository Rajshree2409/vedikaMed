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

export const DoctorAppointmentScreen = ({ doctorId, setCurrentPage }) => {
  const { isPhone } = useViewport();
  const doctor = getDoctorById(doctorId);
  const [visibleMonth, setVisibleMonth] = useState(() => {
    const nextDate = findNextDoctorAvailableDate(doctor);

    return new Date(nextDate.getFullYear(), nextDate.getMonth(), 1);
  });
  const [selectedDate, setSelectedDate] = useState(() => findNextDoctorAvailableDate(doctor));
  const [selectedTime, setSelectedTime] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    const nextDate = findNextDoctorAvailableDate(doctor);

    setVisibleMonth(new Date(nextDate.getFullYear(), nextDate.getMonth(), 1));
    setSelectedDate(nextDate);
    setSelectedTime("");
    setIsSaved(false);
    setFeedback(null);
  }, [doctor]);

  useEffect(() => {
    const nextSlots = getDoctorAvailableSlots(doctor, selectedDate);

    setSelectedTime((previousTime) => (nextSlots.includes(previousTime) ? previousTime : nextSlots[0] || ""));
  }, [doctor, selectedDate]);

  const today = normalizeDoctorDate(new Date());
  const availableSlots = getDoctorAvailableSlots(doctor, selectedDate);
  const selectedWeekday = doctorWeekdayFullLabels[selectedDate.getDay()];
  const monthCells = getDoctorMonthCells(visibleMonth);

  const handleDateSelection = (date) => {
    const normalizedDate = normalizeDoctorDate(date);

    if (normalizedDate < today) {
      return;
    }

    setSelectedDate(normalizedDate);
    setVisibleMonth(new Date(normalizedDate.getFullYear(), normalizedDate.getMonth(), 1));
    setFeedback(null);
  };

  const handleContinue = () => {
    if (!availableSlots.length) {
      setFeedback({
        message: "Please choose a date when the doctor is available.",
        tone: "error",
      });
      return;
    }

    if (!selectedTime) {
      setFeedback({
        message: "Please choose an available time slot to continue.",
        tone: "error",
      });
      return;
    }

    setFeedback({
      message: `Appointment request ready for ${doctor.name} on ${selectedDate.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })} at ${selectedTime}.`,
      tone: "success",
    });
  };

  return (
    <div
      style={{
        ...style.screen,
        paddingBottom: 168,
        background: "linear-gradient(180deg, rgba(255,255,255,0.72) 0%, rgba(239,246,255,0.88) 18%, rgba(248,250,252,1) 100%)",
      }}
    >
      <div style={{ ...layout.narrowContent, padding: isPhone ? "20px 0 0" : "28px 0 0" }}>
        <div style={{ ...surfaceCardStyle, overflow: "hidden", marginBottom: 22, padding: 0 }}>
          <div
            style={{
              position: "relative",
              minHeight: isPhone ? 320 : 360,
              background: doctor.heroGradient,
              display: "flex",
              alignItems: "stretch",
            }}
          >
            <button
              onClick={() => setCurrentPage("doctor-appointments")}
              style={{
                position: "absolute",
                top: 18,
                left: 18,
                width: 42,
                height: 42,
                borderRadius: "50%",
                border: "1px solid rgba(255,255,255,0.8)",
                background: "rgba(255,255,255,0.9)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                boxShadow: theme.shadow.md,
                zIndex: 2,
              }}
              aria-label="Back to doctor list"
            >
              <Icon name="back" size={20} color={theme.navy} />
            </button>

            <button
              onClick={() => setIsSaved((previousState) => !previousState)}
              style={{
                position: "absolute",
                top: 18,
                right: 18,
                width: 42,
                height: 42,
                borderRadius: "50%",
                border: "1px solid rgba(255,255,255,0.8)",
                background: isSaved ? theme.navy : "rgba(255,255,255,0.9)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                boxShadow: theme.shadow.md,
                zIndex: 2,
              }}
              aria-label={isSaved ? "Saved doctor profile" : "Save doctor profile"}
            >
              <Icon name="bookmark" size={20} color={isSaved ? theme.white : theme.navy} />
            </button>

            <img
              src={doctor.image}
              alt={doctor.name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                alignSelf: "stretch",
              }}
            />
          </div>

          <div style={{ padding: isPhone ? "22px 18px 24px" : "26px 24px 28px" }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: doctor.accent, letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>
              {doctor.specialty}
            </div>
            <div style={{ fontSize: isPhone ? 32 : 36, fontWeight: 800, color: theme.navy, lineHeight: 1.05 }}>{doctor.name}</div>
            <div style={{ fontSize: 15, color: theme.grayText, marginTop: 8 }}>{doctor.clinic}</div>
            <div style={{ ...mutedTextStyle, marginTop: 18, fontSize: 15 }}>{doctor.description}</div>

            <div
              style={{
                marginTop: 24,
                display: "grid",
                gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                borderTop: `1px solid ${theme.grayBorder}`,
                borderBottom: `1px solid ${theme.grayBorder}`,
              }}
            >
              {[
                { label: "Experience", value: doctor.experience },
                { label: "Patient", value: doctor.patients },
                { label: "Rating", value: doctor.rating },
              ].map((item, index) => (
                <div
                  key={item.label}
                  style={{
                    padding: isPhone ? "18px 10px" : "20px 12px",
                    textAlign: "center",
                    borderRight: index < 2 ? `1px solid ${theme.grayBorder}` : "none",
                  }}
                >
                  <div style={{ fontSize: 15, fontWeight: 800, color: theme.navy, marginBottom: 8 }}>{item.label}</div>
                  <div style={{ fontSize: isPhone ? 18 : 22, fontWeight: 700, color: theme.grayText }}>{item.value}</div>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 18 }}>
              {doctor.focusAreas.map((focusArea) => (
                <span
                  key={focusArea}
                  style={{
                    borderRadius: 999,
                    padding: "10px 14px",
                    background: "rgba(37,99,235,0.08)",
                    color: theme.navy,
                    fontSize: 13,
                    fontWeight: 700,
                  }}
                >
                  {focusArea}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div style={{ ...surfaceCardStyle, padding: isPhone ? "18px" : "22px 24px", marginBottom: 24 }}>
          <div style={{ display: "flex", alignItems: isPhone ? "flex-start" : "center", justifyContent: "space-between", gap: 14, flexDirection: isPhone ? "column" : "row" }}>
            <div>
              <div style={{ fontSize: isPhone ? 18 : 20, fontWeight: 800, color: theme.navy }}>Select appointment date</div>
              <div style={{ ...mutedTextStyle, marginTop: 6 }}>{doctor.fee}</div>
            </div>
            <span
              style={{
                borderRadius: 999,
                padding: "10px 16px",
                background: "#f59e0b",
                color: theme.white,
                fontSize: 13,
                fontWeight: 700,
              }}
            >
              Month view
            </span>
          </div>

          <div style={{ marginTop: 18, border: `1px solid ${theme.grayBorder}`, borderRadius: 22, padding: isPhone ? "16px 12px" : "20px 18px", background: "#ffffff" }}>
            <div style={{ display: "grid", gridTemplateColumns: "40px 1fr 40px", alignItems: "center", gap: 12, marginBottom: 18 }}>
              <button
                onClick={() => setVisibleMonth((currentMonth) => new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  border: `1px solid ${theme.grayBorder}`,
                  background: theme.white,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
                aria-label="Previous month"
              >
                <Icon name="back" size={18} color={theme.navy} />
              </button>

              <div style={{ fontSize: isPhone ? 18 : 20, fontWeight: 800, color: theme.navy, textAlign: "center" }}>
                {visibleMonth.toLocaleDateString("en-IN", { month: "long", year: "numeric" })}
              </div>

              <button
                onClick={() => setVisibleMonth((currentMonth) => new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  border: `1px solid ${theme.grayBorder}`,
                  background: theme.white,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
                aria-label="Next month"
              >
                <Icon name="chevronRight" size={18} color={theme.navy} />
              </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, minmax(0, 1fr))", gap: 8, marginBottom: 10 }}>
              {doctorWeekdayShortLabels.map((label, index) => (
                <div
                  key={label}
                  style={{
                    textAlign: "center",
                    fontSize: 14,
                    fontWeight: 700,
                    color: index === 0 ? theme.red : theme.grayText,
                    paddingBottom: 4,
                  }}
                >
                  {label}
                </div>
              ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, minmax(0, 1fr))", gap: 8 }}>
              {monthCells.map(({ date, outsideMonth }) => {
                const normalizedDate = normalizeDoctorDate(date);
                const isSelected = isSameDoctorDay(normalizedDate, selectedDate);
                const isPastDate = normalizedDate < today;
                const isAvailable = doctor.sittingDays.includes(doctorWeekdayFullLabels[normalizedDate.getDay()]);

                return (
                  <button
                    key={normalizedDate.toISOString()}
                    onClick={() => handleDateSelection(normalizedDate)}
                    disabled={isPastDate}
                    style={{
                      border: isSelected ? "none" : `1px solid ${isAvailable ? "rgba(37,99,235,0.18)" : "transparent"}`,
                      background: isSelected ? "#6366f1" : isAvailable ? "rgba(99,102,241,0.08)" : "transparent",
                      color: isPastDate ? "#cbd5e1" : isSelected ? theme.white : outsideMonth ? theme.grayTextLight : theme.navy,
                      width: "100%",
                      aspectRatio: "1 / 1",
                      borderRadius: "50%",
                      fontSize: 16,
                      fontWeight: isSelected ? 800 : 600,
                      cursor: isPastDate ? "not-allowed" : "pointer",
                      opacity: isPastDate ? 0.7 : 1,
                    }}
                  >
                    {normalizedDate.getDate()}
                  </button>
                );
              })}
            </div>
          </div>

          <div style={{ marginTop: 22 }}>
            <div style={{ fontSize: isPhone ? 18 : 20, fontWeight: 800, color: theme.navy, marginBottom: 12 }}>Doctor Sitting Days</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {doctor.sittingDays.map((day) => (
                <span
                  key={day}
                  style={{
                    borderRadius: 999,
                    padding: "11px 16px",
                    background: "rgba(34,197,94,0.14)",
                    color: "#15803d",
                    fontSize: 14,
                    fontWeight: 700,
                  }}
                >
                  {day}
                </span>
              ))}
            </div>
          </div>

          <div style={{ marginTop: 22 }}>
            <div style={{ fontSize: isPhone ? 18 : 20, fontWeight: 800, color: theme.navy, marginBottom: 10 }}>Available Times</div>
            {availableSlots.length ? (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {availableSlots.map((slot) => {
                  const isSelected = selectedTime === slot;

                  return (
                    <button
                      key={slot}
                      onClick={() => {
                        setSelectedTime(slot);
                        setFeedback(null);
                      }}
                      style={{
                        borderRadius: 14,
                        border: `1px solid ${isSelected ? "transparent" : theme.grayBorder}`,
                        background: isSelected ? theme.greenGradient : theme.white,
                        color: isSelected ? theme.white : theme.navy,
                        padding: "12px 14px",
                        fontSize: 14,
                        fontWeight: 700,
                        cursor: "pointer",
                        boxShadow: isSelected ? theme.shadow.md : "none",
                      }}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>
            ) : (
              <div style={{ fontSize: 14, color: theme.red, fontWeight: 600 }}>
                Sorry Doctor not available on selected date
              </div>
            )}
          </div>

          <div style={{ marginTop: 18, fontSize: 14, color: theme.grayText }}>
            Selected day: <span style={{ color: theme.navy, fontWeight: 700 }}>{selectedWeekday}</span>
          </div>

          {feedback ? (
            <div style={{ marginTop: 18 }}>
              <InlineMessage tone={feedback.tone}>{feedback.message}</InlineMessage>
            </div>
          ) : null}
        </div>
      </div>

      <div
        style={{
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(248,250,252,0.92)",
          backdropFilter: "blur(16px)",
          borderTop: `1px solid ${theme.grayBorder}`,
          boxShadow: "0 -12px 30px rgba(15, 23, 42, 0.08)",
          zIndex: 20,
        }}
      >
        <div style={{ ...layout.narrowContent, padding: "14px 0 calc(18px + env(safe-area-inset-bottom))" }}>
          <div style={{ display: "flex", alignItems: isPhone ? "stretch" : "center", justifyContent: "space-between", gap: 14, flexDirection: isPhone ? "column" : "row" }}>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: theme.grayTextLight, textTransform: "uppercase", letterSpacing: 0.6 }}>Appointment summary</div>
              <div style={{ fontSize: 15, color: theme.navy, fontWeight: 700, marginTop: 6 }}>
                {selectedDate.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                {selectedTime ? ` at ${selectedTime}` : " - choose a time slot"}
              </div>
            </div>
            <button
              onClick={handleContinue}
              style={{
                ...primaryButtonStyle,
                width: isPhone ? "100%" : 220,
                flexShrink: 0,
              }}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


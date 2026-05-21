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

export const LabTestScreen = ({ appState, setCurrentPage }) => {
  const { isPhone, isCompact } = useViewport();
  const { session } = appState;
  const fileInputRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAllPackages, setShowAllPackages] = useState(false);
  const [selectedPackageId, setSelectedPackageId] = useState(null);
  const [uploadedPrescriptionName, setUploadedPrescriptionName] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [statusTone, setStatusTone] = useState("muted");

  const advisorPhone = "9038735766";
  const whatsappPhone = "919038735766";
  const previewCount = 9;
  const displayName = getSessionName(session) || getSessionPhone(session) || "Vedika Customer";

  const healthCheckupPackages = [
    {
      id: 1,
      name: "Full Body CheckUp",
      description: "Comprehensive screening for everyday wellness",
      price: 1499,
      tests: 45,
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 2,
      name: "Cardiac CheckUp",
      description: "Heart health screening for early risk checks",
      price: 1199,
      tests: 8,
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 3,
      name: "Diabetes CheckUp",
      description: "Blood sugar and metabolic health panel",
      price: 499,
      tests: 5,
      image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 4,
      name: "Liver CheckUp",
      description: "Important markers for liver function",
      price: 799,
      tests: 6,
      image: "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 5,
      name: "Kidney CheckUp",
      description: "Renal function and hydration markers",
      price: 699,
      tests: 5,
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 6,
      name: "Thyroid CheckUp",
      description: "Hormone testing for thyroid balance",
      price: 549,
      tests: 3,
      image: "https://images.unsplash.com/photo-1580281657527-47df97d3ff49?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 7,
      name: "Blood Count",
      description: "CBC and related blood health markers",
      price: 349,
      tests: 12,
      image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 8,
      name: "Allergy Panel",
      description: "Useful screening for common allergies",
      price: 1799,
      tests: 20,
      image: "https://images.unsplash.com/photo-1581595219315-a187dd40c322?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 9,
      name: "Pregnancy CheckUp",
      description: "Prenatal wellness package for routine checks",
      price: 1999,
      tests: 15,
      image: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 10,
      name: "Vitamin Profile",
      description: "Check core vitamin and nutrition markers",
      price: 899,
      tests: 7,
      image: "https://images.unsplash.com/photo-1579684453377-1d5a0c66f93b?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 11,
      name: "Senior Citizen Care",
      description: "Wellness panel tailored for older adults",
      price: 2299,
      tests: 28,
      image: "https://images.unsplash.com/photo-1576765607924-3f3c8b5b34ef?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 12,
      name: "Women Wellness",
      description: "Hormonal and preventive health screening",
      price: 1599,
      tests: 18,
      image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=600&q=80",
    },
  ];

  const normalizedSearch = searchTerm.trim().toLowerCase();
  const filteredPackages = healthCheckupPackages.filter((pkg) =>
    [pkg.name, pkg.description].some((value) => value.toLowerCase().includes(normalizedSearch))
  );
  const visiblePackages = normalizedSearch
    ? filteredPackages
    : showAllPackages
      ? filteredPackages
      : filteredPackages.slice(0, previewCount);
  const selectedPackage = filteredPackages.find((pkg) => pkg.id === selectedPackageId) || null;
  const canTogglePackages = !normalizedSearch && filteredPackages.length > previewCount;
  const gridTemplateColumns = isPhone
    ? "repeat(3, minmax(0, 1fr))"
    : isCompact
      ? "repeat(3, minmax(0, 1fr))"
      : "repeat(4, minmax(0, 1fr))";

  const handlePrescriptionPicker = () => {
    fileInputRef.current?.click();
  };

  const handlePrescriptionChange = (event) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) {
      return;
    }

    setUploadedPrescriptionName(selectedFile.name);
    setStatusTone("success");
    setStatusMessage(`Prescription uploaded: ${selectedFile.name}. Our team will help you book the right lab tests.`);
    event.target.value = "";
  };

  const handleAdvisorCall = () => {
    setStatusTone("muted");
    setStatusMessage(`Calling our lab advisor on ${advisorPhone}.`);

    if (typeof window !== "undefined") {
      window.location.href = `tel:${advisorPhone}`;
    }
  };

  const handleWhatsappBooking = () => {
    setStatusTone("muted");
    setStatusMessage("Opening WhatsApp booking chat.");

    if (typeof window !== "undefined") {
      window.open(
        `https://wa.me/${whatsappPhone}?text=${encodeURIComponent("Hi Vedika, I want to book a lab test.")}`,
        "_blank",
        "noopener,noreferrer"
      );
    }
  };

  const handlePackageBooking = (pkg) => {
    setSelectedPackageId(pkg.id);
    setStatusTone("success");
    setStatusMessage(`Booking request created for ${pkg.name}. Our collection team will contact you shortly.`);
  };

  const quickActions = [
    {
      key: "prescription",
      title: "Have a prescription?",
      subtitle: "Upload and book your tests",
      onClick: handlePrescriptionPicker,
      icon: (
        <svg width="56" height="56" viewBox="0 0 56 56" fill="none" aria-hidden="true">
          <rect x="12" y="8" width="28" height="36" rx="8" fill="#dbeafe" />
          <path d="M21 18h10M21 24h10M21 30h6" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M34 13l7 7" stroke="#f97316" strokeWidth="5" strokeLinecap="round" />
          <circle cx="42" cy="11" r="4" fill="#fca5a5" />
          <circle cx="12" cy="40" r="4" fill="#fb923c" opacity="0.8" />
          <circle cx="18" cy="46" r="4" fill="#60a5fa" opacity="0.8" />
        </svg>
      ),
    },
    {
      key: "advisor",
      title: "Call our advisor to book",
      subtitle: "Our team of experts will guide you",
      onClick: handleAdvisorCall,
      icon: (
        <svg width="56" height="56" viewBox="0 0 56 56" fill="none" aria-hidden="true">
          <defs>
            <linearGradient id="lab-call-gradient" x1="12" y1="8" x2="42" y2="46" gradientUnits="userSpaceOnUse">
              <stop stopColor="#0ea5e9" />
              <stop offset="1" stopColor="#4f46e5" />
            </linearGradient>
          </defs>
          <path
            d="M18.5 13.5c1.8-1.8 4.8-1.8 6.6 0l2.6 2.6c1.8 1.8 1.8 4.8 0 6.6l-1.6 1.6c2.5 4.5 6.1 8.1 10.6 10.6l1.6-1.6c1.8-1.8 4.8-1.8 6.6 0l2.6 2.6c1.8 1.8 1.8 4.8 0 6.6l-1.7 1.7c-2.2 2.2-5.6 3-8.5 1.9-11.1-4-19.9-12.8-23.9-23.9-1.1-2.9-.3-6.3 1.9-8.5l1.7-1.7z"
            fill="url(#lab-call-gradient)"
          />
          <path d="M35 15c3.7.3 6.7 3.3 7 7M35 9c7 .4 12.6 6 13 13" stroke="#bae6fd" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      key: "whatsapp",
      title: "Book through WhatsApp",
      subtitle: "To book a test lab, say Hi",
      onClick: handleWhatsappBooking,
      icon: (
        <svg width="56" height="56" viewBox="0 0 56 56" fill="none" aria-hidden="true">
          <circle cx="28" cy="28" r="21" fill="#16a34a" />
          <path d="M20 41l1.6-5.9A14 14 0 1136.3 39L30 37.7 20 41z" fill="#fff" />
          <path
            d="M24.7 22.4c-.4-.9-.8-.9-1.1-.9h-.9c-.3 0-.9.1-1.4.7-.5.6-1.9 1.8-1.9 4.4 0 2.5 1.9 5 2.1 5.3.3.3 3.8 6.2 9.4 8.5 4.6 1.9 5.6 1.6 6.6 1.5 1-.1 3.2-1.3 3.7-2.6.5-1.3.5-2.5.3-2.7-.1-.2-.5-.4-1-.7-.5-.3-3.2-1.6-3.7-1.8-.5-.2-.9-.3-1.3.3-.4.6-1.4 1.8-1.7 2.1-.3.4-.7.4-1.2.1-.5-.3-2.2-.8-4.3-2.7-1.6-1.4-2.7-3.1-3-3.7-.3-.6 0-.9.3-1.2.3-.3.5-.7.8-1 .3-.4.4-.6.6-1 .2-.4.1-.8 0-1.1-.2-.3-1.3-3.1-1.8-4.2z"
            fill="#16a34a"
          />
        </svg>
      ),
    },
  ];

  return (
    <div style={{ ...style.screen, background: "#ffffff" }}>
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,image/*"
        style={{ display: "none" }}
        onChange={handlePrescriptionChange}
      />

      <div
        style={{
          width: "min(760px, 100%)",
          margin: "0 auto",
          padding: "18px 18px 148px",
          background: "#ffffff",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
          <button
            onClick={() => setCurrentPage("home")}
            style={{
              width: 42,
              height: 42,
              borderRadius: 14,
              border: `1px solid ${theme.grayBorder}`,
              background: theme.white,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              boxShadow: theme.shadow.sm,
            }}
          >
            <Icon name="back" size={20} color={theme.navy} />
          </button>
          <div style={{ fontSize: 12, fontWeight: 700, color: theme.green, letterSpacing: 1, textTransform: "uppercase" }}>Lab Test</div>
          <div style={{ width: 42 }} />
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 18,
            paddingBottom: 18,
            borderBottom: "1px solid #e5e7eb",
            marginBottom: 18,
          }}
        >
          <div style={{ minWidth: 0, flex: 1 }}>
            <div style={{ fontSize: 16, color: "#111827", marginBottom: 6 }}>Hello</div>
            <div
              style={{
                fontSize: isPhone ? 24 : 30,
                fontWeight: 800,
                color: theme.navy,
                lineHeight: 1.15,
                wordBreak: "break-word",
              }}
            >
              {displayName}
            </div>
          </div>

          <div
            style={{
              width: isPhone ? 64 : 76,
              height: isPhone ? 64 : 76,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #60a5fa 0%, #2563eb 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: theme.shadow.md,
              flexShrink: 0,
            }}
          >
            <div
              style={{
                width: "78%",
                height: "78%",
                borderRadius: "50%",
                background: "#fde68a",
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "center",
                overflow: "hidden",
              }}
            >
              <svg width="44" height="44" viewBox="0 0 44 44" fill="none" aria-hidden="true">
                <circle cx="22" cy="15" r="10" fill="#f8d0b4" />
                <path d="M10 42c1.8-8.7 8.1-13.1 12-13.1S32.2 33.3 34 42" fill="#ef4444" />
                <path d="M12.5 15.8c.5-8 5-12.8 9.5-12.8s8.9 4.8 9.5 12.8c-2.8-1.2-5.8-1.8-9.5-1.8s-6.7.6-9.5 1.8z" fill="#334155" />
              </svg>
            </div>
          </div>
        </div>

        <div style={{ fontSize: isPhone ? 17 : 20, fontWeight: 800, color: theme.navy, marginBottom: 14 }}>
          Search labtest and packages
        </div>

        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            borderRadius: 12,
            background: theme.white,
            padding: "16px 18px",
            boxShadow: theme.shadow.sm,
            border: `1px solid ${theme.grayBorder}`,
            marginBottom: 24,
          }}
        >
          <input
            type="text"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search labtest and packages"
            style={{
              border: "none",
              outline: "none",
              background: "transparent",
              flex: 1,
              minWidth: 0,
              fontSize: isPhone ? 14 : 16,
              color: theme.navy,
            }}
          />
          <Icon name="search" size={isPhone ? 24 : 26} color="#9ca3af" />
        </label>

        <div style={{ height: 12, borderRadius: 999, background: "#f1f5f9", marginBottom: 26 }} />

        <div style={{ display: "grid", gap: 18, marginBottom: 26 }}>
          {quickActions.map((action) => (
            <button
              key={action.key}
              onClick={action.onClick}
              style={{
                background: "none",
                border: "none",
                padding: 0,
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{ width: 64, height: 64, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {action.icon}
                </div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: isPhone ? 17 : 20, fontWeight: 700, color: theme.navy, lineHeight: 1.2 }}>{action.title}</div>
                  <div style={{ fontSize: isPhone ? 14 : 15, color: "#9ca3af", marginTop: 6, lineHeight: 1.45 }}>{action.subtitle}</div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {uploadedPrescriptionName ? (
          <div style={{ marginBottom: 14 }}>
            <InlineMessage tone="success">Prescription ready: {uploadedPrescriptionName}</InlineMessage>
          </div>
        ) : null}
        {statusMessage ? (
          <div style={{ marginBottom: 16 }}>
            <InlineMessage tone={statusTone}>{statusMessage}</InlineMessage>
          </div>
        ) : null}

        <div style={{ height: 12, borderRadius: 999, background: "#f1f5f9", marginBottom: 24 }} />

        <div style={{ fontSize: isPhone ? 18 : 22, fontWeight: 800, color: theme.navy, marginBottom: 18 }}>
          Popular Health CheckUp Category
        </div>

        {visiblePackages.length === 0 ? (
          <InlineMessage tone="error">No packages matched "{searchTerm}". Try a different keyword.</InlineMessage>
        ) : (
          <>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: gridTemplateColumns,
                gap: isPhone ? 16 : 20,
              }}
            >
              {visiblePackages.map((pkg) => {
                const isSelected = selectedPackageId === pkg.id;

                return (
                  <button
                    key={pkg.id}
                    onClick={() => setSelectedPackageId(pkg.id)}
                    style={{
                      background: "none",
                      border: "none",
                      padding: 0,
                      cursor: "pointer",
                      textAlign: "left",
                    }}
                  >
                    <div
                      style={{
                        borderRadius: 24,
                        overflow: "hidden",
                        border: `2px solid ${isSelected ? theme.green : "transparent"}`,
                        boxShadow: isSelected ? theme.shadow.md : "none",
                        transition: "all 0.2s ease-in-out",
                        background: theme.white,
                      }}
                    >
                      <div
                        style={{
                          width: "100%",
                          aspectRatio: "1 / 1",
                          borderRadius: 24,
                          overflow: "hidden",
                          background: "linear-gradient(180deg, #eef7fb 0%, #dff2ff 100%)",
                        }}
                      >
                        <img
                          src={pkg.image}
                          alt={pkg.name}
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                          onError={(event) => {
                            event.currentTarget.style.display = "none";
                          }}
                        />
                      </div>
                    </div>
                    <div
                      style={{
                        marginTop: 10,
                        fontSize: isPhone ? 11 : 14,
                        fontWeight: 700,
                        color: theme.navy,
                        lineHeight: 1.35,
                      }}
                    >
                      {pkg.name}
                    </div>
                  </button>
                );
              })}
            </div>

            {selectedPackage ? (
              <div
                style={{
                  ...surfaceCardStyle,
                  marginTop: 22,
                  padding: isPhone ? "18px 16px" : "22px 20px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: isPhone ? "column" : "row",
                    alignItems: isPhone ? "stretch" : "center",
                    justifyContent: "space-between",
                    gap: 16,
                  }}
                >
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: isPhone ? 18 : 22, fontWeight: 800, color: theme.navy }}>{selectedPackage.name}</div>
                    <div style={{ fontSize: 14, color: theme.grayText, lineHeight: 1.6, marginTop: 8 }}>{selectedPackage.description}</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 14 }}>
                      <span
                        style={{
                          background: theme.greenLight,
                          color: theme.greenDark,
                          borderRadius: 999,
                          padding: "8px 12px",
                          fontSize: 12,
                          fontWeight: 700,
                        }}
                      >
                        {selectedPackage.tests} tests included
                      </span>
                      <span
                        style={{
                          background: theme.blueLight,
                          color: theme.blue,
                          borderRadius: 999,
                          padding: "8px 12px",
                          fontSize: 12,
                          fontWeight: 700,
                        }}
                      >
                        Home sample collection
                      </span>
                    </div>
                  </div>

                  <div style={{ minWidth: isPhone ? 0 : 170 }}>
                    <div style={{ fontSize: 13, color: theme.grayText, marginBottom: 6 }}>Starting price</div>
                    <div style={{ fontSize: isPhone ? 24 : 28, fontWeight: 800, color: theme.green, marginBottom: 12 }}>
                      {formatCurrency(selectedPackage.price)}
                    </div>
                    <button
                      onClick={() => handlePackageBooking(selectedPackage)}
                      style={{
                        width: "100%",
                        borderRadius: 14,
                        border: "none",
                        background: theme.greenGradient,
                        color: theme.white,
                        padding: "14px 18px",
                        fontSize: 14,
                        fontWeight: 700,
                        cursor: "pointer",
                        boxShadow: theme.shadow.md,
                      }}
                    >
                      Book This Package
                    </button>
                  </div>
                </div>
              </div>
            ) : null}

            {canTogglePackages ? (
              <button
                onClick={() => setShowAllPackages((previousValue) => !previousValue)}
                style={{
                  width: "100%",
                  marginTop: 24,
                  background: theme.greenGradient,
                  border: "none",
                  borderRadius: 0,
                  color: theme.white,
                  cursor: "pointer",
                  padding: "18px 20px",
                  fontSize: 16,
                  fontWeight: 700,
                  boxShadow: theme.shadow.md,
                }}
              >
                {showAllPackages ? "Show Less" : "See All"}
              </button>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
};


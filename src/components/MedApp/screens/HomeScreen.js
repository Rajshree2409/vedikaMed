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

export const HomeScreen = ({ setSidebarOpen, setCurrentPage, appState }) => {
  const { session, setSession, setVendor, vendor, cart = {} } = appState;
  const { isPhone, isCompact } = useViewport();
  const [showCartPreview, setShowCartPreview] = useState(false);
  const sessionName = getSessionName(session);
  const sessionPhone = getSessionPhone(session);
  const preferredVendor = vendor?.vendorId ? vendor : DEFAULT_VENDOR;
  const cartEntries = Object.entries(cart);
  const totalCartItems = cartEntries.reduce((sum, [, item]) => sum + (item.qty || 0), 0);
  const totalCartPrice = cartEntries.reduce((sum, [, item]) => sum + (item.product?.price || 0) * (item.qty || 0), 0);
  const cartPreviewItems = cartEntries.slice(0, 3);
  const [homeData, setHomeData] = useState({
    categories: [],
    mobileNumber: sessionPhone,
    name: sessionName,
    retailerData: [],
    retailerDataIsConfirm: [],
  });
  const [vendorError, setVendorError] = useState("");
  const [vendorLoading, setVendorLoading] = useState(false);
  const dashboardFeatureCardStyle = {
    ...surfaceCardStyle,
    width: "100%",
    minHeight: isPhone ? 280 : 320,
    padding: isPhone ? 22 : 28,
    position: "relative",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    gap: 24,
    textAlign: "left",
  };
  const dashboardFeaturePillStyle = {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "8px 12px",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 700,
    lineHeight: 1,
    backdropFilter: "blur(8px)",
  };
  const dashboardFeatureCtaStyle = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderRadius: 999,
    padding: "12px 16px",
    fontSize: 13,
    fontWeight: 700,
    border: "none",
    cursor: "pointer",
    boxShadow: theme.shadow.md,
  };
  const dashboardPanelStyle = {
    ...surfaceCardStyle,
    borderRadius: 26,
    padding: isPhone ? 20 : 24,
  };
  const dashboardShortcutCardStyle = {
    ...surfaceCardStyle,
    borderRadius: 26,
    width: "100%",
    minHeight: 214,
    padding: isPhone ? 20 : 24,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    gap: 20,
    textAlign: "left",
  };

  useEffect(() => {
    let isMounted = true;

    const loadHomeData = async () => {
      if (!session?.userId) {
        return;
      }

      setVendorLoading(true);
      setVendorError("");

      try {
        const vendorList = await fetchVendorList();
        const selectedVendor = pickPreferredVendor(vendorList, preferredVendor);

        if (!isMounted) {
          return;
        }

        setVendor(selectedVendor);

        try {
          const userData = await fetchVendorUserData(session.userId, selectedVendor.vendorId);

          if (!isMounted) {
            return;
          }

          setHomeData({
            categories: userData.categories,
            mobileNumber: userData.mobileNumber || sessionPhone,
            name: userData.name || sessionName,
            retailerData: userData.retailerData,
            retailerDataIsConfirm: userData.retailerDataIsConfirm,
          });

          if (userData.name || userData.mobileNumber) {
            setSession((previousSession) => ({
              ...(previousSession || {}),
              mobileNumber: userData.mobileNumber || previousSession?.mobileNumber,
              name: userData.name || previousSession?.name,
              phoneNumber: userData.mobileNumber || previousSession?.phoneNumber,
            }));
          }
        } catch (error) {
          if (!isMounted) {
            return;
          }

          setVendorError(getErrorMessage(error, "Vendor-linked profile details could not be loaded."));
        }
      } catch (error) {
        if (!isMounted) {
          return;
        }

        setVendorError(getErrorMessage(error, "Unable to fetch vendor information."));
        setVendor(preferredVendor);
      } finally {
        if (isMounted) {
          setVendorLoading(false);
        }
      }
    };

    loadHomeData();

    return () => {
      isMounted = false;
    };
  }, [preferredVendor, session?.userId, sessionName, sessionPhone, setSession, setVendor]);

  const welcomeName = homeData.name || getSessionName(session) || "Vedika User";
  const retailerStatus = homeData.retailerData.length
    ? homeData.retailerDataIsConfirm.length
      ? "Retailer profile linked and active."
      : "Retailer request submitted. Confirmation pending."
    : "Retailer registration not completed yet.";
  const customerInitials = createAvatarLabel(welcomeName);
  const featuredCollectionCount = homeCategoryCards.length + homeOtcCards.length + homeBabyCards.length;
  const heroStats = [
    { label: "Featured collections", value: `${featuredCollectionCount}+` },
    { label: totalCartItems === 1 ? "Item in cart" : "Items in cart", value: `${totalCartItems}` },
    { label: "Retailer profile", value: homeData.retailerData.length ? "Ready" : "Pending" },
  ];
  const dashboardSnapshotItems = [
    {
      key: "mobile",
      label: "Mobile",
      value: homeData.mobileNumber || getSessionPhone(session) || "Not available",
      icon: "phone",
      iconBg: theme.blueLight,
      iconColor: theme.blue,
    },
    {
      key: "customer",
      label: "Customer ID",
      value: session?.userId || "Not logged in",
      icon: "user",
      iconBg: theme.purpleLight,
      iconColor: theme.purple,
    },
    {
      key: "vendor",
      label: "Active Vendor",
      value: vendor?.vendorName || DEFAULT_VENDOR.vendorName,
      icon: "grid",
      iconBg: theme.greenLight,
      iconColor: theme.green,
    },
    {
      key: "retailer",
      label: "Retailer Status",
      value: retailerStatus,
      icon: "shield",
      iconBg: theme.yellowLight,
      iconColor: theme.yellow,
      wide: true,
    },
  ];
  const dashboardQuickActions = [
    {
      key: "search",
      title: "Medicine Search",
      description: "Explore medicines, supplements, and daily health products from one fast entry point.",
      cta: "Browse products",
      page: "search",
      badge: "Fast lane",
      icon: "search",
      iconBg: "rgba(15,157,138,0.12)",
      iconColor: theme.green,
      background: "linear-gradient(145deg, #ffffff 0%, #ecfdf5 100%)",
    },
    {
      key: "retailer",
      title: "B2B Shopping",
      description: "Open your retailer flow, manage bulk needs, and continue onboarding without extra steps.",
      cta: "Open retailer",
      page: "retailer",
      badge: "Business",
      icon: "grid",
      iconBg: "rgba(37,99,235,0.12)",
      iconColor: theme.blue,
      background: "linear-gradient(145deg, #ffffff 0%, #eff6ff 100%)",
    },
    {
      key: "wallet",
      title: "Wallet & Credits",
      description: "Review balance, add money, and keep reimbursements or credits easy to track.",
      cta: "Check wallet",
      page: "wallet",
      badge: "Payments",
      icon: "wallet",
      iconBg: "rgba(139,92,246,0.12)",
      iconColor: theme.purple,
      background: "linear-gradient(145deg, #ffffff 0%, #faf5ff 100%)",
    },
    {
      key: "orders",
      title: "Orders & Tracking",
      description: "Jump into your order history and monitor repeat purchases or recent activity quickly.",
      cta: "View orders",
      page: "orders",
      badge: "History",
      icon: "orders",
      iconBg: "rgba(245,158,11,0.14)",
      iconColor: theme.yellow,
      background: "linear-gradient(145deg, #ffffff 0%, #fffbeb 100%)",
    },
  ];

  return (
    <div
      style={{
        ...style.screen,
        overflowY: "auto",
        background: "linear-gradient(180deg, rgba(255,255,255,0.74) 0%, rgba(240,248,255,0.88) 18%, rgba(248,250,252,1) 100%)",
      }}
    >
      <div
        style={{
          background: "rgba(255, 255, 255, 0.92)",
          backdropFilter: "blur(20px)",
          boxShadow: theme.shadow.sm,
          position: "sticky",
          top: 0,
          zIndex: 10,
          borderBottom: `1px solid ${theme.grayBorder}`,
        }}
      >
        <div
          style={{
            ...layout.content,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
            padding: isPhone ? "16px 0" : "18px 0",
          }}
        >
          <button
            onClick={() => setSidebarOpen(true)}
            style={{
              width: 46,
              height: 46,
              background: theme.white,
              border: `1px solid ${theme.grayBorder}`,
              cursor: "pointer",
              padding: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 16,
              boxShadow: theme.shadow.sm,
              flexShrink: 0,
            }}
          >
            <Icon name="menu" size={22} color={theme.navy} />
          </button>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              gap: 12,
              flex: 1,
              minWidth: 0,
            }}
          >
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 18,
                background: "linear-gradient(145deg, #ecfdf5 0%, #ffffff 100%)",
                border: `1px solid ${theme.grayBorder}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: theme.shadow.sm,
                flexShrink: 0,
              }}
            >
              <VedikaLogo size={34} />
            </div>
            <div style={{ minWidth: 0 }}>
              <div
                style={{
                  color: theme.green,
                  fontWeight: 800,
                  fontSize: "clamp(20px, 4vw, 24px)",
                  letterSpacing: -0.5,
                  background: `linear-gradient(135deg, ${theme.green} 0%, ${theme.greenDark} 100%)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  lineHeight: 1,
                }}
              >
                VEDIKA
              </div>
              {!isPhone ? (
                <div style={{ fontSize: 12, color: theme.grayTextLight, marginTop: 5, fontWeight: 600 }}>
                  Personalized health dashboard
                </div>
              ) : null}
            </div>
          </div>
          <div
            style={{ position: "relative", cursor: "pointer" }}
            onClick={() => setCurrentPage("cart")}
            onMouseEnter={() => setShowCartPreview(true)}
            onMouseLeave={() => setShowCartPreview(false)}
          >
            <svg width={34} height={34} fill="none" viewBox="0 0 24 24">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" stroke="#222" strokeWidth={1.8} strokeLinejoin="round" />
              <path d="M3 6h18" stroke="#222" strokeWidth={1.8} strokeLinecap="round" />
              <path d="M16 10a4 4 0 01-8 0" stroke="#222" strokeWidth={1.8} strokeLinecap="round" />
            </svg>
            <span
              style={{
                position: "absolute",
                top: -5,
                right: -5,
                background: theme.red,
                color: "#fff",
                borderRadius: "50%",
                fontSize: 10,
                width: 18,
                height: 18,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                border: "1.5px solid #fff",
              }}
            >
              {totalCartItems}
            </span>
            {totalCartItems > 0 && showCartPreview ? (
              <div
                style={{
                  position: "absolute",
                  top: 44,
                  right: 0,
                  width: 260,
                  background: "#fff",
                  borderRadius: 18,
                  boxShadow: "0 12px 30px rgba(0,0,0,0.16)",
                  padding: 14,
                  zIndex: 20,
                }}
              >
                <div style={{ fontWeight: 800, marginBottom: 10, color: theme.navy }}>Cart preview</div>
                {cartPreviewItems.map(([key, item]) => (
                  <div key={key} style={{ display: "flex", justifyContent: "space-between", gap: 12, marginBottom: 8 }}>
                    <span style={{ color: theme.grayText, fontSize: 13, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {item.product.productName}
                    </span>
                    <span style={{ fontWeight: 700, color: theme.green }}>{item.qty}×</span>
                  </div>
                ))}
                {cartEntries.length > cartPreviewItems.length ? (
                  <div style={{ fontSize: 12, color: theme.grayText, marginBottom: 10 }}>
                    +{cartEntries.length - cartPreviewItems.length} more item(s)
                  </div>
                ) : null}
                <button
                  onClick={(event) => {
                    event.stopPropagation();
                    setCurrentPage("cart");
                  }}
                  style={{
                    width: "100%",
                    background: theme.green,
                    color: "#fff",
                    border: "none",
                    borderRadius: 12,
                    padding: "10px 12px",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  View full cart
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <div style={{ ...layout.content, padding: "28px 0 40px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isCompact ? "1fr" : "minmax(0, 1.35fr) minmax(320px, 0.8fr)",
            gap: 24,
            marginBottom: 32,
          }}
        >
          <div
            style={{
              ...surfaceCardStyle,
              background: "linear-gradient(135deg, #0f172a 0%, #0f766e 56%, #34d399 100%)",
              color: theme.white,
              border: "none",
              boxShadow: theme.shadow.xl,
              padding: isPhone ? 22 : 30,
              minHeight: isCompact ? "auto" : 430,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: -90,
                right: -70,
                width: 240,
                height: 240,
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0) 72%)",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: -120,
                left: -50,
                width: 260,
                height: 260,
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0) 75%)",
              }}
            />

            <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", gap: 24, height: "100%" }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center" }}>
                <span
                  style={{
                    ...dashboardFeaturePillStyle,
                    background: "rgba(255,255,255,0.14)",
                    color: theme.white,
                    border: "1px solid rgba(255,255,255,0.16)",
                  }}
                >
                  Personal dashboard
                </span>
                <span
                  style={{
                    ...dashboardFeaturePillStyle,
                    background: "rgba(15,23,42,0.2)",
                    color: "#d1fae5",
                    border: "1px solid rgba(255,255,255,0.12)",
                  }}
                >
                  Vendor: {vendor?.vendorName || DEFAULT_VENDOR.vendorName}
                </span>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: isCompact ? "1fr" : "minmax(0, 1.15fr) minmax(220px, 0.85fr)",
                  gap: 24,
                  alignItems: "center",
                  flex: 1,
                }}
              >
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: 1.2, textTransform: "uppercase", color: "rgba(255,255,255,0.68)", marginBottom: 12 }}>
                    Welcome back
                  </div>
                  <div style={{ fontSize: isPhone ? 30 : 40, fontWeight: 800, lineHeight: 1.02, letterSpacing: -1.2, marginBottom: 14 }}>
                    {welcomeName}, your health routine starts here.
                  </div>
                  <div style={{ color: "rgba(255,255,255,0.78)", fontSize: 15, lineHeight: 1.7, maxWidth: 540, marginBottom: 18 }}>
                    Keep medicines, diagnostics, payments, and support moving from one brighter dashboard designed to feel faster and calmer every time you open it.
                  </div>

                  <button
                    onClick={() => setCurrentPage("search")}
                    style={{
                      width: "100%",
                      maxWidth: 560,
                      background: "rgba(255,255,255,0.96)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      borderRadius: 20,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: 16,
                      padding: "18px 18px 18px 20px",
                      textAlign: "left",
                      boxShadow: "0 18px 40px rgba(15,23,42,0.18)",
                    }}
                  >
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: 14,
                        background: theme.greenLight,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Icon name="search" size={20} color={theme.green} />
                    </div>
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: theme.green, marginBottom: 4, letterSpacing: 0.4, textTransform: "uppercase" }}>
                        Start shopping
                      </div>
                      <div style={{ color: theme.grayText, fontSize: 15, fontWeight: 500 }}>
                        Search 5000+ medicines and health products
                      </div>
                    </div>
                    <Icon name="chevronRight" size={20} color={theme.green} />
                  </button>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 18 }}>
                    <button
                      onClick={() => setCurrentPage("search")}
                      style={{
                        ...dashboardFeatureCtaStyle,
                        background: theme.white,
                        color: theme.navy,
                      }}
                    >
                      Browse medicines
                    </button>
                    <button
                      onClick={() => setCurrentPage("profile")}
                      style={{
                        ...dashboardFeatureCtaStyle,
                        background: "rgba(255,255,255,0.08)",
                        color: theme.white,
                        border: "1px solid rgba(255,255,255,0.16)",
                        boxShadow: "none",
                      }}
                    >
                      View profile
                    </button>
                  </div>
                </div>

                <div
                  style={{
                    borderRadius: 30,
                    padding: isPhone ? 20 : 24,
                    minHeight: 260,
                    background: "linear-gradient(160deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.04) 100%)",
                    border: "1px solid rgba(255,255,255,0.14)",
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.12)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    gap: 20,
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14 }}>
                    <div>
                      <div style={{ fontSize: 12, color: "rgba(255,255,255,0.68)", fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase", marginBottom: 6 }}>
                        Care profile
                      </div>
                      <div style={{ fontSize: 18, fontWeight: 800, color: theme.white }}>All your essentials in one place</div>
                    </div>
                    <div
                      style={{
                        width: 64,
                        height: 64,
                        borderRadius: 22,
                        background: "rgba(255,255,255,0.12)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 22,
                        fontWeight: 800,
                        color: theme.white,
                        flexShrink: 0,
                      }}
                    >
                      {customerInitials}
                    </div>
                  </div>

                  <div style={{ display: "grid", gap: 12 }}>
                    {[
                      { label: "Linked mobile", value: homeData.mobileNumber || getSessionPhone(session) || "Not available" },
                      { label: "Preferred vendor", value: vendor?.vendorName || DEFAULT_VENDOR.vendorName },
                      { label: "Retailer journey", value: homeData.retailerData.length ? "Already started" : "Ready when you are" },
                    ].map((item) => (
                      <div key={item.label} style={{ paddingBottom: 12, borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                        <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.62)", textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 4 }}>
                          {item.label}
                        </div>
                        <div style={{ fontSize: 14, fontWeight: 700, color: theme.white, lineHeight: 1.45 }}>{item.value}</div>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: 12 }}>
                    {heroStats.map((item) => (
                      <HeroStat key={item.label} value={item.value} label={item.label} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: "grid", gap: 18 }}>
            <div style={dashboardPanelStyle}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 18 }}>
                <div>
                  <div style={{ fontSize: 12, color: theme.grayTextLight, fontWeight: 700, letterSpacing: 0.6, textTransform: "uppercase", marginBottom: 6 }}>
                    Account snapshot
                  </div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: theme.navy }}>Everything important, at a glance.</div>
                </div>
                <div
                  style={{
                    width: 46,
                    height: 46,
                    borderRadius: 16,
                    background: theme.greenLight,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Icon name="user" size={20} color={theme.green} />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: isPhone ? "1fr" : "repeat(2, minmax(0, 1fr))", gap: 14 }}>
                {dashboardSnapshotItems.map((item) => (
                  <div
                    key={item.key}
                    style={{
                      borderRadius: 20,
                      padding: "16px 16px 15px",
                      background: theme.white,
                      border: `1px solid ${theme.grayBorder}`,
                      boxShadow: theme.shadow.sm,
                      gridColumn: item.wide && !isPhone ? "1 / -1" : "auto",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                      <div
                        style={{
                          width: 44,
                          height: 44,
                          borderRadius: 14,
                          background: item.iconBg,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <Icon name={item.icon} size={20} color={item.iconColor} />
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontSize: 11, color: theme.grayTextLight, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase", marginBottom: 4 }}>
                          {item.label}
                        </div>
                        <div style={{ fontWeight: 700, color: theme.navy, fontSize: item.wide ? 14 : 15, lineHeight: 1.5, wordBreak: "break-word" }}>
                          {item.value}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {vendorLoading ? (
                <div style={{ marginTop: 16 }}>
                  <InlineMessage>Refreshing vendor-linked data...</InlineMessage>
                </div>
              ) : null}
              {!vendorLoading && vendorError ? (
                <div style={{ marginTop: 16 }}>
                  <InlineMessage tone="error">{vendorError}</InlineMessage>
                </div>
              ) : null}
            </div>

            <div
              style={{
                ...dashboardPanelStyle,
                background: "linear-gradient(160deg, #0f172a 0%, #0f766e 100%)",
                border: "none",
                color: theme.white,
                boxShadow: theme.shadow.lg,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 18 }}>
                <div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.62)", fontWeight: 700, letterSpacing: 0.6, textTransform: "uppercase", marginBottom: 6 }}>
                    Cart summary
                  </div>
                  <div style={{ fontSize: 24, fontWeight: 800, color: theme.white }}>
                    {totalCartItems > 0 ? `${totalCartItems} item(s)` : "Start building your cart"}
                  </div>
                </div>
                <div
                  style={{
                    minWidth: 92,
                    textAlign: "right",
                    fontSize: 22,
                    fontWeight: 800,
                    color: "#d1fae5",
                  }}
                >
                  {formatCurrency(totalCartPrice)}
                </div>
              </div>

              <div style={{ display: "grid", gap: 10, marginBottom: 18 }}>
                {cartPreviewItems.length ? (
                  cartPreviewItems.map(([key, item]) => (
                    <div
                      key={key}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 12,
                        padding: "12px 14px",
                        borderRadius: 16,
                        background: "rgba(255,255,255,0.08)",
                        border: "1px solid rgba(255,255,255,0.08)",
                      }}
                    >
                      <span style={{ fontSize: 13, color: "rgba(255,255,255,0.84)", minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {item.product.productName}
                      </span>
                      <span style={{ fontSize: 13, fontWeight: 800, color: theme.white }}>{item.qty}x</span>
                    </div>
                  ))
                ) : (
                  <div
                    style={{
                      padding: "14px 16px",
                      borderRadius: 18,
                      background: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      color: "rgba(255,255,255,0.76)",
                      fontSize: 14,
                      lineHeight: 1.6,
                    }}
                  >
                    No items yet. Start with a search or browse the featured collections below.
                  </div>
                )}
              </div>

              <button
                onClick={() => setCurrentPage(totalCartItems > 0 ? "cart" : "search")}
                style={{
                  width: "100%",
                  background: theme.white,
                  color: theme.navy,
                  border: "none",
                  borderRadius: 16,
                  padding: "13px 16px",
                  fontWeight: 800,
                  cursor: "pointer",
                  boxShadow: "0 12px 30px rgba(15,23,42,0.18)",
                }}
              >
                {totalCartItems > 0 ? "Go to cart" : "Browse medicines"}
              </button>
            </div>
          </div>
        </div>

        <div style={{ marginBottom: 34 }}>
          <div style={{ fontSize: 12, color: theme.green, fontWeight: 700, letterSpacing: 0.9, textTransform: "uppercase", marginBottom: 8 }}>
            Care Hub
          </div>
          <SectionTitle>Quick Access</SectionTitle>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(220px, 100%), 1fr))",
              gap: 18,
            }}
          >
            {dashboardQuickActions.map((item) => (
              <button
                key={item.key}
                onClick={() => setCurrentPage(item.page)}
                style={{
                  ...dashboardShortcutCardStyle,
                  background: item.background,
                  border: `1px solid ${theme.grayBorder}`,
                  cursor: "pointer",
                }}
                onMouseEnter={(event) => {
                  event.currentTarget.style.transform = "translateY(-4px)";
                  event.currentTarget.style.boxShadow = theme.shadow.lg;
                }}
                onMouseLeave={(event) => {
                  event.currentTarget.style.transform = "translateY(0)";
                  event.currentTarget.style.boxShadow = theme.shadow.sm;
                }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 14 }}>
                  <span
                    style={{
                      ...dashboardFeaturePillStyle,
                      background: theme.white,
                      color: theme.navy,
                      border: `1px solid ${theme.grayBorder}`,
                    }}
                  >
                    {item.badge}
                  </span>
                  <div
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: 18,
                      background: item.iconBg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Icon name={item.icon} size={22} color={item.iconColor} />
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: theme.navy, marginBottom: 8, lineHeight: 1.2 }}>
                    {item.title}
                  </div>
                  <div style={{ fontSize: 14, color: theme.grayText, lineHeight: 1.65 }}>
                    {item.description}
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                  <span style={{ fontSize: 13, fontWeight: 800, color: theme.navy }}>{item.cta}</span>
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      background: theme.white,
                      border: `1px solid ${theme.grayBorder}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: theme.shadow.sm,
                      flexShrink: 0,
                    }}
                  >
                    <Icon name="chevronRight" size={18} color={theme.navy} />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 18 }}>
          <div style={{ fontSize: 12, color: theme.green, fontWeight: 700, letterSpacing: 0.9, textTransform: "uppercase", marginBottom: 8 }}>
            Storefront
          </div>
          <SectionTitle>Shop By Collection</SectionTitle>
        </div>

        <div style={{ marginBottom: 24 }}>
          <CollectionPanel
            eyebrow="Prescription Support"
            title="Medicine"
            description="Move faster through commonly purchased prescription formats and treatment-led categories."
          >
            {homeCategoryCards.map((card) => (
              <CategoryCard key={card.label} {...card} onClick={card.page ? () => setCurrentPage(card.page) : undefined} />
            ))}
          </CollectionPanel>
        </div>

        <div style={{ ...layout.featureGrid, marginBottom: 34 }}>
          <CollectionPanel
            eyebrow="Everyday Wellness"
            title="OTC"
            description="Discover over-the-counter essentials for daily care, relief, and self-managed wellbeing."
          >
            {homeOtcCards.map((card) => (
              <CategoryCard key={card.label} {...card} />
            ))}
          </CollectionPanel>
          <CollectionPanel
            eyebrow="Gentle Essentials"
            title="Baby Care"
            description="Keep a warmer, more focused shopping lane for baby feeding, comfort, and routine care."
          >
            {homeBabyCards.map((card) => (
              <CategoryCard key={card.label} {...card} />
            ))}
          </CollectionPanel>
        </div>

        <div style={{ marginBottom: 18 }}>
          <div style={{ fontSize: 12, color: theme.green, fontWeight: 700, letterSpacing: 0.9, textTransform: "uppercase", marginBottom: 8 }}>
            Care Services
          </div>
          <SectionTitle>Diagnostics and Consult Support</SectionTitle>
        </div>

        <div style={layout.featureGrid}>
          <div>
            <SectionTitle>Lab Test</SectionTitle>
            <button
              onClick={() => setCurrentPage("lab-test")}
              style={{
                ...dashboardFeatureCardStyle,
                marginBottom: 16,
                border: "none",
                cursor: "pointer",
                transition: "all 0.2s ease-in-out",
                background: "linear-gradient(145deg, #ecfdf5 0%, #f8fafc 44%, #ffffff 100%)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = theme.shadow.lg;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = theme.shadow.sm;
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: -34,
                  right: -18,
                  width: 150,
                  height: 150,
                  borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(15,157,138,0.2) 0%, rgba(15,157,138,0) 72%)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: -60,
                  left: -10,
                  width: 160,
                  height: 160,
                  borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(37,99,235,0.1) 0%, rgba(37,99,235,0) 72%)",
                }}
              />

              <div style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                <span
                  style={{
                    ...dashboardFeaturePillStyle,
                    background: "rgba(255,255,255,0.82)",
                    color: theme.greenDark,
                    border: "1px solid rgba(15,157,138,0.14)",
                  }}
                >
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: theme.green,
                    }}
                  />
                  Home sample collection
                </span>
                <div
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: 14,
                    background: "rgba(255,255,255,0.9)",
                    border: "1px solid rgba(15,157,138,0.12)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: theme.shadow.sm,
                    flexShrink: 0,
                  }}
                >
                  <Icon name="search" size={20} color={theme.green} />
                </div>
              </div>

              <div
                style={{
                  position: "relative",
                  zIndex: 1,
                  display: "grid",
                  gridTemplateColumns: isCompact ? "1fr" : "1.1fr 0.9fr",
                  gap: 18,
                  alignItems: "center",
                }}
              >
                <div>
                  <div style={{ fontSize: isPhone ? 24 : 28, fontWeight: 800, color: theme.navy, lineHeight: 1.12, marginBottom: 10 }}>
                    Book Lab Tests
                    <br />
                    Without the Wait
                  </div>
                  <div style={{ fontSize: 14, color: theme.grayText, lineHeight: 1.65, maxWidth: 320 }}>
                    Browse trusted checkups, schedule home collection, and receive reports digitally from one place.
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 16 }}>
                    {["500+ packages", "Same-day slots", "Digital reports"].map((item) => (
                      <span
                        key={item}
                        style={{
                          ...dashboardFeaturePillStyle,
                          background: "rgba(255,255,255,0.78)",
                          color: theme.navy,
                          border: `1px solid ${theme.grayBorder}`,
                        }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div
                  style={{
                    justifySelf: isCompact ? "stretch" : "end",
                    borderRadius: 24,
                    padding: 18,
                    minHeight: 156,
                    background: "linear-gradient(160deg, rgba(255,255,255,0.96) 0%, rgba(236,253,245,0.9) 100%)",
                    border: "1px solid rgba(15,157,138,0.12)",
                    boxShadow: "0 18px 36px rgba(15, 23, 42, 0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg width="170" height="130" viewBox="0 0 170 130" fill="none" aria-hidden="true">
                    <rect x="18" y="16" width="82" height="96" rx="22" fill="#ffffff" stroke="#dbeafe" strokeWidth="2" />
                    <rect x="36" y="34" width="48" height="10" rx="5" fill="#bfdbfe" />
                    <rect x="36" y="54" width="32" height="8" rx="4" fill="#cbd5e1" />
                    <rect x="36" y="70" width="42" height="8" rx="4" fill="#cbd5e1" />
                    <path d="M118 34h22" stroke="#0f9d8a" strokeWidth="8" strokeLinecap="round" />
                    <path d="M129 23v22" stroke="#0f9d8a" strokeWidth="8" strokeLinecap="round" />
                    <rect x="114" y="54" width="26" height="52" rx="13" fill="#14b8a6" />
                    <rect x="114" y="54" width="13" height="52" rx="13" fill="#0ea5a4" />
                    <circle cx="126" cy="44" r="18" fill="rgba(20,184,166,0.14)" />
                    <circle cx="147" cy="97" r="13" fill="rgba(37,99,235,0.12)" />
                  </svg>
                </div>
              </div>

              <div
                style={{
                  position: "relative",
                  zIndex: 1,
                  display: "flex",
                  alignItems: isPhone ? "stretch" : "center",
                  justifyContent: "space-between",
                  gap: 14,
                  flexDirection: isPhone ? "column" : "row",
                }}
              >
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: theme.grayTextLight, letterSpacing: 0.4, textTransform: "uppercase", marginBottom: 6 }}>
                    Most booked
                  </div>
                  <div style={{ fontSize: 16, fontWeight: 800, color: theme.navy }}>Full body, diabetes and thyroid checkups</div>
                </div>
                <div
                  style={{
                    ...dashboardFeaturePillStyle,
                    padding: "12px 18px",
                    background: theme.greenGradient,
                    color: theme.white,
                    boxShadow: theme.shadow.md,
                    alignSelf: isPhone ? "flex-start" : "center",
                  }}
                >
                  Explore now
                  <Icon name="chevronRight" size={16} color={theme.white} />
                </div>
              </div>
            </button>
          </div>
          <div>
            <SectionTitle>Doctor Appointment</SectionTitle>
            <div
              onClick={() => setCurrentPage("doctor-appointments")}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setCurrentPage("doctor-appointments");
                }
              }}
              role="button"
              tabIndex={0}
              style={{
                ...dashboardFeatureCardStyle,
                marginBottom: 16,
                background: "linear-gradient(145deg, #eff6ff 0%, #ffffff 48%, #f8fafc 100%)",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: -30,
                  right: -8,
                  width: 170,
                  height: 170,
                  borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(59,130,246,0.18) 0%, rgba(59,130,246,0) 74%)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: -50,
                  left: -26,
                  width: 160,
                  height: 160,
                  borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(20,184,166,0.12) 0%, rgba(20,184,166,0) 72%)",
                }}
              />

              <div style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                <span
                  style={{
                    ...dashboardFeaturePillStyle,
                    background: "rgba(255,255,255,0.84)",
                    color: theme.blue,
                    border: "1px solid rgba(37,99,235,0.12)",
                  }}
                >
                  Specialist care
                </span>
                <span
                  style={{
                    ...dashboardFeaturePillStyle,
                    background: "rgba(15,23,42,0.06)",
                    color: theme.navy,
                    border: "1px solid rgba(15,23,42,0.08)",
                  }}
                >
                  Live now
                </span>
              </div>

              <div
                style={{
                  position: "relative",
                  zIndex: 1,
                  display: "grid",
                  gridTemplateColumns: isCompact ? "1fr" : "1.05fr 0.95fr",
                  gap: 20,
                  alignItems: "center",
                }}
              >
                <div>
                  <div style={{ fontSize: isPhone ? 24 : 28, fontWeight: 800, color: theme.navy, lineHeight: 1.12, marginBottom: 10 }}>
                    Meet Experienced Doctors
                    <br />
                    and Book With Confidence
                  </div>
                  <div style={{ fontSize: 14, color: theme.grayText, lineHeight: 1.65, maxWidth: 340 }}>
                    We’re shaping a cleaner consultation flow for clinic visits and guided appointments. Until then, our support team can help you directly.
                  </div>
                  <div style={{ display: "grid", gap: 10, marginTop: 18 }}>
                    {[
                      "Browse doctors by specialty and experience",
                      "Open detailed profiles with patient and rating highlights",
                      "Check sitting days and available consultation times",
                    ].map((item) => (
                      <div key={item} style={{ display: "flex", alignItems: "center", gap: 10, color: theme.navy, fontSize: 14, fontWeight: 600 }}>
                        <span
                          style={{
                            width: 10,
                            height: 10,
                            borderRadius: "50%",
                            background: "linear-gradient(135deg, #2563eb 0%, #0f9d8a 100%)",
                            flexShrink: 0,
                          }}
                        />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div
                  style={{
                    justifySelf: isCompact ? "stretch" : "end",
                    borderRadius: 24,
                    padding: 20,
                    minHeight: 156,
                    background: "linear-gradient(160deg, rgba(255,255,255,0.98) 0%, rgba(239,246,255,0.95) 100%)",
                    border: "1px solid rgba(37,99,235,0.12)",
                    boxShadow: "0 18px 36px rgba(15, 23, 42, 0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg width="178" height="132" viewBox="0 0 178 132" fill="none" aria-hidden="true">
                    <rect x="18" y="18" width="142" height="92" rx="24" fill="#ffffff" stroke="#dbeafe" strokeWidth="2" />
                    <circle cx="66" cy="50" r="18" fill="#bfdbfe" />
                    <path d="M44 94c4.6-14 15.7-22 22-22 6.4 0 17.7 8 22.2 22" fill="#93c5fd" />
                    <rect x="105" y="38" width="34" height="10" rx="5" fill="#0f9d8a" opacity="0.82" />
                    <rect x="105" y="56" width="24" height="8" rx="4" fill="#cbd5e1" />
                    <rect x="105" y="72" width="29" height="8" rx="4" fill="#cbd5e1" />
                    <circle cx="144" cy="38" r="16" fill="rgba(20,184,166,0.14)" />
                    <path d="M144 31v14M137 38h14" stroke="#14b8a6" strokeWidth="5" strokeLinecap="round" />
                  </svg>
                </div>
              </div>

              <div
                style={{
                  position: "relative",
                  zIndex: 1,
                  display: "flex",
                  alignItems: isPhone ? "stretch" : "center",
                  justifyContent: "space-between",
                  gap: 14,
                  flexDirection: isPhone ? "column" : "row",
                }}
              >
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: theme.grayTextLight, letterSpacing: 0.4, textTransform: "uppercase", marginBottom: 6 }}>
                    Start booking
                  </div>
                  <div style={{ fontSize: 16, fontWeight: 800, color: theme.navy }}>Open the doctor list and continue to detailed availability in the next step.</div>
                </div>
                <button
                  onClick={(event) => {
                    event.stopPropagation();
                    setCurrentPage("doctor-appointments");
                  }}
                  style={{
                    ...dashboardFeatureCtaStyle,
                    background: theme.navy,
                    color: theme.white,
                    alignSelf: isPhone ? "flex-start" : "center",
                  }}
                >
                  Browse doctors
                  <Icon name="chevronRight" size={16} color={theme.white} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// shared helpers are imported from ./shared.js


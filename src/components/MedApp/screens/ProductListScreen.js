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

export const ProductListScreen = ({ setCurrentPage, initialCategory = "Capsules", appState }) => {
  const { isCompact, isPhone } = useViewport();
  const { session, vendor, cart = {}, setCart } = appState;
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [apiProducts, setApiProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setActiveCategory(initialCategory);
  }, [initialCategory]);

  useEffect(() => {
    let isMounted = true;

    const loadProducts = async () => {
      if (!session?.userId) {
        return;
      }

      setIsLoading(true);
      setErrorMessage("");

      try {
        const items = await fetchProducts(vendor?.vendorId || DEFAULT_VENDOR.vendorId);
        if (isMounted) {
          setApiProducts(items);
        }
      } catch (error) {
        if (isMounted) {
          setErrorMessage(getErrorMessage(error, "Unable to load live products. Showing fallback catalogue."));
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadProducts();

    return () => {
      isMounted = false;
    };
  }, [session?.userId, vendor?.vendorId]);

  const groupedProducts = (() => {
    const groups = {};

    categorySidebarItems.forEach((category) => {
      groups[category.key] = apiProducts.filter((product) => matchesProductCategory(product, category.key));
    });

    return groups;
  })();

  const fallbackCategoryData = productData[activeCategory] || productData.Capsules;
  const fallbackProducts = (fallbackCategoryData?.products || []).map((product, index) => ({
    discount: product.discount,
    imageUrl: "",
    mrp: product.mrp,
    price: product.price,
    productChildId: `fallback-${activeCategory}-${index}`,
    productName: product.name,
    stars: product.stars,
    unit: product.unit,
  }));
  const visibleProducts = groupedProducts[activeCategory]?.length ? groupedProducts[activeCategory] : fallbackProducts;
  const totalItems = Object.values(cart).reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = Object.values(cart).reduce((sum, item) => sum + item.product.price * item.qty, 0);

  const addToCart = (product) => {
    const key = product.productChildId || product.productId || product.productName;

    setCart((previousCart) => ({
      ...previousCart,
      [key]: {
        product,
        qty: (previousCart[key]?.qty || 0) + 1,
      },
    }));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: "transparent" }}>
      <div
        style={{
          background: "#fff",
          padding: "16px clamp(16px, 4vw, 24px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
          flexShrink: 0,
        }}
      >
        <button onClick={() => setCurrentPage("home")} style={{ background: "none", border: "none", cursor: "pointer" }}>
          <Icon name="back" size={22} color="#222" />
        </button>
        <span style={{ fontWeight: 800, fontSize: "clamp(18px, 4vw, 20px)", color: "#111" }}>Product List</span>
        <button onClick={() => setCurrentPage("search")} style={{ background: "none", border: "none", cursor: "pointer" }}>
          <Icon name="search" size={22} color="#222" />
        </button>
      </div>

      <div
        style={{
          ...layout.content,
          display: "flex",
          flexDirection: isCompact ? "column" : "row",
          flex: 1,
          overflow: isCompact ? "visible" : "hidden",
          gap: 16,
          padding: "20px 0 120px",
        }}
      >
        <div
          style={{
            width: isCompact ? "100%" : 170,
            minWidth: isCompact ? 0 : 170,
            flexShrink: 0,
            background: "#f8fafc",
            overflowX: isCompact ? "auto" : "hidden",
            overflowY: isCompact ? "hidden" : "auto",
            borderRight: isCompact ? "none" : "1px solid #e5e7eb",
            border: isCompact ? "1px solid #e5e7eb" : "none",
            borderRadius: 20,
            display: isCompact ? "flex" : "block",
            padding: isCompact ? 8 : 0,
            gap: isCompact ? 8 : 0,
          }}
        >
          {categorySidebarItems.map((category) => (
            <button
              key={category.key}
              onClick={() => setActiveCategory(category.key)}
              style={{
                width: isCompact ? 108 : "100%",
                minWidth: isCompact ? 108 : 0,
                background: activeCategory === category.key ? "#fff" : "transparent",
                border: "none",
                borderLeft: !isCompact && activeCategory === category.key ? `3px solid ${theme.green}` : "3px solid transparent",
                borderBottom: isCompact && activeCategory === category.key ? `3px solid ${theme.green}` : "3px solid transparent",
                borderRadius: isCompact ? 16 : 0,
                padding: isCompact ? "12px 10px" : "14px 12px",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: "50%",
                  background: "#f0f2f5",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                }}
              >
                {category.svgThumb}
              </div>
              <span
                style={{
                  fontSize: 12,
                  color: activeCategory === category.key ? theme.green : "#555",
                  fontWeight: activeCategory === category.key ? 700 : 500,
                  textAlign: "center",
                  lineHeight: 1.3,
                }}
              >
                {category.label}
              </span>
            </button>
          ))}
        </div>

        <div style={{ flex: 1, overflowY: isCompact ? "visible" : "auto", paddingBottom: 90, minWidth: 0, paddingLeft: isCompact ? 0 : 4 }}>
          {isLoading ? <div style={{ marginBottom: 14 }}><InlineMessage>Loading products...</InlineMessage></div> : null}
          {!isLoading && errorMessage ? <div style={{ marginBottom: 14 }}><InlineMessage tone="error">{errorMessage}</InlineMessage></div> : null}
          <div style={{ ...surfaceCardStyle, background: fallbackCategoryData?.bannerBg || "#fff", margin: "0 0 12px", overflow: "hidden", position: "relative" }}>
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                background: theme.green,
                padding: "6px 16px 6px 12px",
                borderRadius: "12px 0 16px 0",
                zIndex: 1,
              }}
            >
              <span style={{ color: "#fff", fontWeight: 700, fontSize: 13 }}>{activeCategory}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "clamp(180px, 28vw, 220px)", padding: "16px" }}>
              {fallbackCategoryData?.bannerSvg || productData.Capsules.bannerSvg}
            </div>
          </div>
          <div style={{ ...surfaceCardStyle, padding: "14px 18px", marginBottom: 14 }}>
            <div style={{ fontWeight: 700, color: theme.navy }}>{vendor?.vendorName || DEFAULT_VENDOR.vendorName}</div>
            <div style={{ ...mutedTextStyle, fontSize: 13, marginTop: 4 }}>{visibleProducts.length} products in {activeCategory}</div>
          </div>

          {visibleProducts.map((product) => (
            <ProductListCard key={`${product.productChildId || product.productId}-${product.productName}`} product={product} onAdd={() => addToCart(product)} />
          ))}
        </div>
      </div>

      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          background: "rgba(255,255,255,0.95)",
          borderTop: "1px solid #e5e7eb",
          zIndex: 50,
          backdropFilter: "blur(10px)",
        }}
      >
        <div
          style={{
            ...layout.content,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            padding: "12px 0 calc(12px + env(safe-area-inset-bottom))",
            flexDirection: isPhone ? "column" : "row",
          }}
        >
          <div style={{ textAlign: isPhone ? "center" : "left" }}>
            <div style={{ fontSize: 12, color: "#666" }}>{totalItems} Items</div>
            <div style={{ fontSize: 15, fontWeight: 800, color: "#111" }}>{formatCurrency(totalPrice)}</div>
          </div>
          <button
            onClick={() => totalItems ? setCurrentPage("cart") : null}
            style={{
              background: totalItems ? theme.green : "#cbd5e1",
              color: "#fff",
              border: "none",
              borderRadius: 999,
              padding: "12px 24px",
              fontSize: 14,
              fontWeight: 700,
              cursor: totalItems ? "pointer" : "not-allowed",
              width: isPhone ? "100%" : "auto",
            }}
          >
            Go to cart
          </button>
        </div>
      </div>
    </div>
  );
};


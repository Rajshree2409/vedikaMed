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

export const SearchScreen = ({ appState, setCurrentPage }) => {
  const { session, vendor, setCart } = appState;
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const searchInputRef = React.useRef(null);

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

  useEffect(() => {
    let isMounted = true;

    const loadProducts = async () => {
      if (!session?.userId) {
        return;
      }

      setIsLoading(true);
      setErrorMessage("");

      try {
        const items = await searchProducts(vendor?.vendorId || DEFAULT_VENDOR.vendorId);
        if (isMounted) {
          setProducts(items);
        }
      } catch (error) {
        if (isMounted) {
          setErrorMessage(getErrorMessage(error, "Unable to search products right now."));
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

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  const filteredProducts = (() => {
    if (!query.trim()) {
      return products.slice(0, 18);
    }

    return products.filter((product) => product.searchableText.includes(query.toLowerCase()));
  })();

  return (
    <div style={style.screen}>
      <div style={{ ...layout.narrowContent, padding: "20px 0 24px" }}>
        <div style={{ marginBottom: 28 }}>
          <div style={{ ...surfaceCardStyle, padding: "20px 24px", display: "flex", alignItems: "center", gap: 14, position: "relative" }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                background: theme.greenLight,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Icon name="search" size={20} color={theme.green} />
            </div>
            <input
              ref={searchInputRef}
              placeholder="Search medicines, brands, categories..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              style={{
                border: "none",
                outline: "none",
                flex: 1,
                minWidth: 0,
                fontSize: 15,
                color: theme.navy,
                background: "transparent",
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 500,
              }}
            />
            {query ? (
              <button
                onClick={() => {
                  setQuery("");
                  searchInputRef.current?.focus();
                }}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "8px 4px",
                  color: theme.grayText,
                }}
              >
                <Icon name="close" size={20} color={theme.grayText} />
              </button>
            ) : null}
          </div>
        </div>

        {query && (
          <div style={{ ...surfaceCardStyle, padding: "16px 20px", marginBottom: 20, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 13, color: theme.grayText }}>Showing results for</div>
              <div style={{ fontWeight: 700, color: theme.navy, fontSize: 16, marginTop: 4 }}>"{query}"</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: theme.green }}>{filteredProducts.length}</div>
              <div style={{ fontSize: 12, color: theme.grayText }}>product{filteredProducts.length !== 1 ? "s" : ""}</div>
            </div>
          </div>
        )}

        <div style={{ ...surfaceCardStyle, padding: "14px 18px", marginBottom: 20 }}>
          <div style={{ fontWeight: 700, color: theme.navy }}>{vendor?.vendorName || DEFAULT_VENDOR.vendorName}</div>
          <div style={{ ...mutedTextStyle, fontSize: 13, marginTop: 4 }}>
            {query ? `Searched in ${products.length} total products` : `${products.length} products available to search`}
          </div>
        </div>

        {isLoading ? <div style={{ marginBottom: 18 }}><InlineMessage>Loading product catalogue...</InlineMessage></div> : null}
        {!isLoading && errorMessage ? <div style={{ marginBottom: 18 }}><InlineMessage tone="error">{errorMessage}</InlineMessage></div> : null}

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {filteredProducts.length ? (
            filteredProducts.map((product) => (
              <SearchResultCard
                key={`${product.productChildId || product.productId}-${product.productName}`}
                product={product}
                onAddToCart={() => addToCart(product)}
                onBrowse={() => setCurrentPage(`products:${getCategoryFromProduct(product)}`)}
              />
            ))
          ) : query ? (
            <div style={{ ...surfaceCardStyle, padding: "40px 24px", textAlign: "center" }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: theme.navy, marginBottom: 8 }}>No products found</div>
              <div style={{ color: theme.grayText, fontSize: 14 }}>Try different keywords or browse by category</div>
            </div>
          ) : (
            <div style={{ ...surfaceCardStyle, padding: "40px 24px", textAlign: "center" }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: theme.navy, marginBottom: 8 }}>Start searching</div>
              <div style={{ color: theme.grayText, fontSize: 14 }}>Type medicine names, brands, or symptoms to find products</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


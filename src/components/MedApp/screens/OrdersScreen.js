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

export const OrdersScreen = ({ appState }) => {
  const { session } = appState;
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadOrders = async () => {
      if (!session?.userId) {
        return;
      }

      setIsLoading(true);
      setErrorMessage("");

      try {
        const userOrders = await fetchOrders(session.userId);
        if (isMounted) {
          setOrders(userOrders);
        }
      } catch (error) {
        if (isMounted) {
          setErrorMessage(getErrorMessage(error, "Unable to load order history."));
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadOrders();

    return () => {
      isMounted = false;
    };
  }, [session?.userId]);

  if (isLoading) {
    return (
      <div style={style.screen}>
        <div style={{ ...layout.narrowContent, padding: "20px 0" }}>
          <InlineMessage>Loading orders...</InlineMessage>
        </div>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div style={style.screen}>
        <div style={{ ...layout.narrowContent, padding: "20px 0" }}>
          <InlineMessage tone="error">{errorMessage}</InlineMessage>
        </div>
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div style={style.screen}>
        <div style={{ ...layout.narrowContent, padding: "20px 0", textAlign: "center", marginTop: 80, color: theme.grayText, fontSize: 14 }}>
          <div style={{ fontSize: 28, marginBottom: 16, fontWeight: 700, color: theme.navy }}>No Orders</div>
          No orders yet
        </div>
      </div>
    );
  }

  return (
    <div style={style.screen}>
      <div style={{ ...layout.narrowContent, padding: "16px 0 24px", display: "flex", flexDirection: "column", gap: 14 }}>
        {orders.map((order) => (
          <div key={order.orderId} style={{ ...surfaceCardStyle, padding: 18 }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start", flexWrap: "wrap" }}>
              <div>
                <div style={{ fontWeight: 800, color: theme.navy }}>Order #{order.orderId || "N/A"}</div>
                <div style={{ fontSize: 13, color: theme.grayText, marginTop: 6 }}>{order.createdAt || "Date unavailable"}</div>
              </div>
              <span
                style={{
                  background: "#ecfdf5",
                  borderRadius: 999,
                  color: theme.green,
                  fontSize: 12,
                  fontWeight: 700,
                  padding: "8px 12px",
                }}
              >
                {order.orderStatus || "Pending"}
              </span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(160px, 100%), 1fr))", gap: 12, marginTop: 16 }}>
              <div>
                <div style={{ fontSize: 12, color: theme.grayText }}>Paid Amount</div>
                <div style={{ fontWeight: 800, color: theme.navy }}>{formatCurrency(order.paidAmount)}</div>
              </div>
              <div>
                <div style={{ fontSize: 12, color: theme.grayText }}>Products</div>
                <div style={{ fontWeight: 800, color: theme.navy }}>{order.numberOfProducts || "0"}</div>
              </div>
              <div>
                <div style={{ fontSize: 12, color: theme.grayText }}>Shipping Fee</div>
                <div style={{ fontWeight: 800, color: theme.navy }}>{formatCurrency(order.shippingFee)}</div>
              </div>
            </div>
            {(order.name || order.address) ? (
              <div style={{ marginTop: 16, ...mutedTextStyle, fontSize: 13 }}>
                {order.name ? `${order.name} - ` : ""}
                {[order.address, order.city, order.state, order.pinCode].filter(Boolean).join(", ")}
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};


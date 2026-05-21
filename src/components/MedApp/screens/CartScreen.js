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

export const CartScreen = ({ setCurrentPage, appState }) => {
  const { cart = {}, setCart } = appState;
  const cartEntries = Object.entries(cart || {});
  const totalItems = cartEntries.reduce((sum, [, item]) => sum + item.qty, 0);
  const totalPrice = cartEntries.reduce((sum, [, item]) => sum + (item.product.price || 0) * item.qty, 0);

  const changeQty = (key, delta) => {
    setCart((previousCart) => {
      const current = previousCart[key];
      if (!current) {
        return previousCart;
      }

      const nextQty = current.qty + delta;
      if (nextQty <= 0) {
        const nextCart = { ...previousCart };
        delete nextCart[key];
        return nextCart;
      }

      return {
        ...previousCart,
        [key]: {
          ...current,
          qty: nextQty,
        },
      };
    });
  };

  return (
    <div style={style.screen}>
      <PageHeader title="Cart" onBack={() => setCurrentPage("products:Capsules")} uppercase />
      <div style={{ ...layout.narrowContent, padding: "20px 0 40px" }}>
        {cartEntries.length === 0 ? (
          <div style={{ background: theme.white, padding: 28, borderRadius: 24, textAlign: "center", color: theme.grayText, boxShadow: theme.shadow.sm }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: theme.navy, marginBottom: 6 }}>Your cart is empty</div>
            Add items from the product list to see them here.
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {cartEntries.map(([key, item]) => (
              <div
                key={key}
                style={{
                  ...surfaceCardStyle,
                  padding: 18,
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  justifyContent: "space-between",
                }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 800, color: theme.navy, marginBottom: 6 }}>{item.product.productName}</div>
                  <div style={{ display: "flex", gap: 14, flexWrap: "wrap", color: theme.grayText, fontSize: 13 }}>
                    <span>{formatCurrency(item.product.price)} each</span>
                    <span>{item.qty} unit(s)</span>
                    <span>{formatCurrency((item.product.price || 0) * item.qty)} total</span>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <button
                    onClick={() => changeQty(key, -1)}
                    style={{ width: 36, height: 36, borderRadius: 14, border: `1px solid ${theme.grayBorder}`, background: theme.white, color: theme.navy, cursor: "pointer", fontSize: 18 }}
                  >
                    −
                  </button>
                  <span style={{ minWidth: 30, textAlign: "center", fontWeight: 700, fontSize: 15 }}>{item.qty}</span>
                  <button
                    onClick={() => changeQty(key, 1)}
                    style={{ width: 36, height: 36, borderRadius: 14, border: `1px solid ${theme.grayBorder}`, background: theme.white, color: theme.navy, cursor: "pointer", fontSize: 18 }}
                  >
                    +
                  </button>
                </div>
              </div>
            ))}

            <div style={{ ...surfaceCardStyle, padding: 22, display: "grid", gridTemplateColumns: "1fr auto", gap: 16, alignItems: "center" }}>
              <div>
                <div style={{ color: theme.grayText, fontSize: 13, marginBottom: 4 }}>Order summary</div>
                <div style={{ fontSize: 20, fontWeight: 800, color: theme.navy }}>{totalItems} items</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 13, color: theme.grayText }}>Total price</div>
                <div style={{ fontSize: 20, fontWeight: 800, color: theme.navy }}>{formatCurrency(totalPrice)}</div>
              </div>
            </div>

            <button
              onClick={() => alert("Checkout is not implemented yet.")}
              style={{
                width: "100%",
                borderRadius: 18,
                border: "none",
                padding: "16px 20px",
                background: theme.greenGradient,
                color: theme.white,
                fontWeight: 700,
                fontSize: 15,
                cursor: "pointer",
                boxShadow: theme.shadow.md,
              }}
            >
              Proceed to checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};


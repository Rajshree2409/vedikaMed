import React, { useState } from "react";
import {
  Icon,
  PageHeader,
  theme,
  style,
  layout,
} from "../components.js";
import {
  cancelOrder,
  updateStoredOrderStatus,
} from "../api.js";
import {
  primaryButtonStyle,
  surfaceCardStyle,
  mutedTextStyle,
  formatCurrency,
  InlineMessage,
  getErrorMessage,
} from "./shared.js";

export const OrderConfirmationScreen = ({ setCurrentPage, appState, orderData, mode = "confirmation" }) => {
  const [isCancelling, setIsCancelling] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [showItemNames, setShowItemNames] = useState(false);
  const [message, setMessage] = useState("");
  const [messageTone, setMessageTone] = useState("muted");

  // Generate a simple order ID based on timestamp
  const orderId = orderData?.orderId || "ORD" + Date.now().toString().slice(-8);
  const orderDate = orderData?.createdAt ? new Date(orderData.createdAt).toLocaleString() : new Date().toLocaleString();
  const isHistoryView = mode === "details";
  const summaryItems = orderData?.items?.length ? orderData.items : (orderData?.raw?.Items ? orderData.raw.Items : []);
  const deliveryAddress = orderData?.deliveryAddress || orderData?.raw?.deliveryAddress || null;

  const handleCancelOrder = async () => {
    setIsCancelling(true);

    try {
      if (!orderData?.orderId) {
        throw new Error("Order ID is missing.");
      }

      await cancelOrder(orderData.orderId);
      updateStoredOrderStatus(orderData.orderId, "Cancelled");
      setMessage("Order cancelled successfully.");
      setMessageTone("success");

      setTimeout(() => {
        setCurrentPage("home");
      }, 2000);
    } catch (error) {
      setMessage(getErrorMessage ? getErrorMessage(error, "Unable to cancel order. Please try again.") : "Unable to cancel order. Please try again.");
      setMessageTone("error");
    } finally {
      setIsCancelling(false);
    }
  };

  if (!orderData) {
    return (
      <div style={style.screen}>
        <PageHeader title="Order Confirmation" onBack={() => setCurrentPage("home")} uppercase />
        <div style={{ ...layout.narrowContent, padding: "20px 0" }}>
          <InlineMessage tone="error">Order details not found.</InlineMessage>
        </div>
      </div>
    );
  }

  return (
    <div style={style.screen}>
      <PageHeader title={isHistoryView ? "Order Details" : "Order Confirmed!"} onBack={() => setCurrentPage(isHistoryView ? "orders" : "home")} uppercase />
      <div style={{ ...layout.narrowContent, padding: "16px 0 24px", display: "flex", flexDirection: "column", gap: 18 }}>
        {/* Success Message */}
        <div style={{ ...surfaceCardStyle, padding: 20, textAlign: "center", background: "rgba(16, 185, 129, 0.1)", borderLeft: `4px solid ${theme.green}` }}>
          <div style={{ fontSize: 24, fontWeight: 800, color: theme.green, marginBottom: 8 }}>✓</div>
          <div style={{ fontSize: 16, fontWeight: 700, color: theme.navy, marginBottom: 4 }}>{isHistoryView ? "Order Details" : "Order Confirmed!"}</div>
          <div style={{ fontSize: 13, color: theme.grayText }}>{isHistoryView ? "Review all recorded details for this order." : "Your order has been successfully placed"}</div>
        </div>

        {/* Order Details */}
        <div style={{ ...surfaceCardStyle, padding: 18 }}>
          <div style={{ fontWeight: 700, fontSize: 15, color: theme.navy, marginBottom: 12 }}>
            Order Details
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <div>
              <div style={{ fontSize: 12, color: theme.grayText, marginBottom: 4 }}>Order ID</div>
              <div style={{ fontWeight: 700, color: theme.navy, fontSize: 14 }}>{orderId}</div>
            </div>
            <div>
              <div style={{ fontSize: 12, color: theme.grayText, marginBottom: 4 }}>Order Date</div>
              <div style={{ fontWeight: 700, color: theme.navy, fontSize: 14 }}>{orderDate}</div>
            </div>
            <div>
              <div style={{ fontSize: 12, color: theme.grayText, marginBottom: 4 }}>Payment Method</div>
              <div style={{ fontWeight: 700, color: theme.navy, fontSize: 14 }}>Cash on Delivery</div>
            </div>
            <div>
              <div style={{ fontSize: 12, color: theme.grayText, marginBottom: 4 }}>Status</div>
              <div style={{ fontWeight: 700, color: (orderData?.orderStatus || "Confirmed").toLowerCase().includes("cancel") ? theme.red : theme.green, fontSize: 14 }}>{orderData?.orderStatus || "Confirmed"}</div>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div style={{ ...surfaceCardStyle, padding: 18 }}>
          <button
            type="button"
            onClick={() => setShowItemNames((prev) => !prev)}
            style={{
              width: "100%",
              border: "none",
              background: "transparent",
              textAlign: "left",
              padding: 0,
              cursor: "pointer",
            }}
          >
            <div style={{ fontWeight: 700, fontSize: 15, color: theme.navy, marginBottom: 4 }}>
              Items Ordered
            </div>
            <div style={{ fontSize: 13, color: theme.grayText, marginBottom: 4 }}>
              {summaryItems.length} product line(s) • {summaryItems.reduce((sum, item) => sum + (item.quantity || item.Quantity || item.qty || item.Qty || 1), 0)} item(s) ordered
            </div>
            <div style={{ fontSize: 12, color: theme.blue, fontWeight: 700 }}>
              {showItemNames ? "Tap to hide product names" : "Tap to view product names"}
            </div>
          </button>

          {showItemNames && summaryItems && summaryItems.length > 0 ? (
            <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 12 }}>
              {summaryItems.map((item, index) => {
                const name = item.productName || item.ProductName || item.Name || `Item ${index + 1}`;
                const qty = item.quantity || item.Quantity || item.qty || 1;
                const rate = item.rate || item.Rate || item.Price || item.UnitPrice || 0;
                const total = item.total || item.Total || item.Amount || (Number(qty) * Number(rate));
                const productId = item.productId || item.ProductId || item.ProductID || item.Id || "";
                const brand = item.brandName || item.BrandName || item.Brand || "";
                const category = item.categoryName || item.CategoryName || item.Category || "";

                return (
                  <div
                    key={index}
                    style={{
                      border: "1px solid #e5e7eb",
                      borderRadius: 14,
                      padding: 12,
                      background: "#fff",
                      display: "flex",
                      flexDirection: "column",
                      gap: 8,
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start" }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 800, color: theme.navy, fontSize: 14, marginBottom: 4 }}>{name}</div>
                        {productId ? <div style={{ fontSize: 12, color: theme.grayText }}>Product ID: {productId}</div> : null}
                        {brand ? <div style={{ fontSize: 12, color: theme.grayText }}>Brand: {brand}</div> : null}
                        {category ? <div style={{ fontSize: 12, color: theme.grayText }}>Category: {category}</div> : null}
                      </div>
                      <div style={{ textAlign: "right", fontWeight: 800, color: theme.green, whiteSpace: "nowrap" }}>
                        {formatCurrency(total)}
                      </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 8 }}>
                      <div style={{ ...surfaceCardStyle, padding: 10, background: "#f8fafc" }}>
                        <div style={{ fontSize: 11, color: theme.grayText, textTransform: "uppercase", letterSpacing: 0.4 }}>Quantity</div>
                        <div style={{ fontWeight: 700, color: theme.navy, fontSize: 14 }}>{qty}</div>
                      </div>
                      <div style={{ ...surfaceCardStyle, padding: 10, background: "#f8fafc" }}>
                        <div style={{ fontSize: 11, color: theme.grayText, textTransform: "uppercase", letterSpacing: 0.4 }}>Rate</div>
                        <div style={{ fontWeight: 700, color: theme.navy, fontSize: 14 }}>{formatCurrency(rate)}</div>
                      </div>
                      <div style={{ ...surfaceCardStyle, padding: 10, background: "#f8fafc" }}>
                        <div style={{ fontSize: 11, color: theme.grayText, textTransform: "uppercase", letterSpacing: 0.4 }}>Total</div>
                        <div style={{ fontWeight: 700, color: theme.navy, fontSize: 14 }}>{formatCurrency(total)}</div>
                      </div>
                      <div style={{ ...surfaceCardStyle, padding: 10, background: "#f8fafc" }}>
                        <div style={{ fontSize: 11, color: theme.grayText, textTransform: "uppercase", letterSpacing: 0.4 }}>Status</div>
                        <div style={{ fontWeight: 700, color: (orderData?.orderStatus || "Confirmed").toLowerCase().includes("cancel") ? theme.red : theme.green, fontSize: 14 }}>{orderData?.orderStatus || "Confirmed"}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : null}
        </div>

        {/* Delivery Address */}
        {deliveryAddress ? (
          <div style={{ ...surfaceCardStyle, padding: 18 }}>
            <div style={{ fontWeight: 700, fontSize: 15, color: theme.navy, marginBottom: 12 }}>
              Delivery Address
            </div>
            <div style={{ ...mutedTextStyle }}>
              <div style={{ fontWeight: 700, color: theme.navy, marginBottom: 6 }}>
                {deliveryAddress.name} • {deliveryAddress.addressType || "Home"}
              </div>
              <div style={{ marginBottom: 4, fontSize: 14, color: theme.navy }}>
                {deliveryAddress.mobileNumber}
              </div>
              <div style={{ marginBottom: 4 }}>
                {deliveryAddress.address}
              </div>
              {deliveryAddress.location && (
                <div style={{ marginBottom: 4 }}>
                  Landmark: {deliveryAddress.location}
                </div>
              )}
              <div style={{ marginBottom: 4 }}>
                {deliveryAddress.city}
                {deliveryAddress.district ? `, ${deliveryAddress.district}` : ""}
              </div>
              <div style={{ marginBottom: 4 }}>
                {deliveryAddress.state} - {deliveryAddress.pinCode}
              </div>
              <div style={{ marginTop: 8, fontSize: 12, color: theme.grayText }}>
                Saved address details shown above
              </div>
            </div>
          </div>
        ) : null}

        {/* Price Summary */}
        <div style={{ ...surfaceCardStyle, padding: 18 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 16 }}>
            <div>
              <div style={{ color: theme.grayText, fontSize: 13 }}>Total Items</div>
              <div style={{ fontSize: 16, fontWeight: 800, color: theme.navy }}>
                {summaryItems ? summaryItems.reduce((sum, item) => sum + (item.quantity || item.Quantity || 1), 0) : 0}
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ color: theme.grayText, fontSize: 13 }}>Total Amount</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: theme.green }}>
                {formatCurrency(orderData.totalAmount)}
              </div>
            </div>
          </div>
        </div>

        {message ? <InlineMessage tone={messageTone}>{message}</InlineMessage> : null}

        {/* Action Buttons */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 8 }}>
          <button
            onClick={() => setCurrentPage("orders")}
            style={{
              ...primaryButtonStyle,
              background: theme.blue,
            }}
          >
            View All Orders
          </button>

          {!showCancelConfirm ? (
            <button
              onClick={() => setShowCancelConfirm(true)}
              style={{
                width: "100%",
                borderRadius: 18,
                border: `2px solid ${theme.red}`,
                padding: "16px 20px",
                background: theme.white,
                color: theme.red,
                fontWeight: 700,
                fontSize: 15,
                cursor: "pointer",
              }}
            >
              Cancel Order
            </button>
          ) : (
            <div style={{ ...surfaceCardStyle, padding: 16, background: "#fef2f2" }}>
              <div style={{ color: theme.red, fontWeight: 700, marginBottom: 12 }}>
                Are you sure you want to cancel this order?
              </div>
              <div style={{ display: "flex", gap: 12 }}>
                <button
                  onClick={() => setShowCancelConfirm(false)}
                  style={{
                    flex: 1,
                    borderRadius: 12,
                    border: "1px solid #e2e8f0",
                    padding: "12px",
                    background: theme.white,
                    color: theme.navy,
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  No, Keep It
                </button>
                <button
                  onClick={handleCancelOrder}
                  disabled={isCancelling}
                  style={{
                    flex: 1,
                    borderRadius: 12,
                    border: "none",
                    padding: "12px",
                    background: theme.red,
                    color: theme.white,
                    fontWeight: 700,
                    cursor: "pointer",
                    opacity: isCancelling ? 0.7 : 1,
                  }}
                >
                  {isCancelling ? "Cancelling..." : "Yes, Cancel"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

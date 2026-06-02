import React, { useState } from "react";
import {
  Icon,
  PageHeader,
  theme,
  style,
  layout,
} from "../components.js";
import {
  primaryButtonStyle,
  surfaceCardStyle,
  mutedTextStyle,
  formatCurrency,
  InlineMessage,
} from "./shared.js";

export const OrderConfirmationScreen = ({ setCurrentPage, appState, orderData }) => {
  const [isCancelling, setIsCancelling] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [message, setMessage] = useState("");
  const [messageTone, setMessageTone] = useState("muted");

  // Generate a simple order ID based on timestamp
  const orderId = orderData?.orderId || "ORD" + Date.now().toString().slice(-8);
  const orderDate = orderData?.createdAt ? new Date(orderData.createdAt).toLocaleString() : new Date().toLocaleString();

  const handleCancelOrder = async () => {
    setIsCancelling(true);

    try {
      // In a real app, you would call an API to cancel the order
      // For now, we'll just show a success message and navigate back to home
      setMessage("Order cancelled successfully.");
      setMessageTone("success");

      // Navigate back to home after a brief delay
      setTimeout(() => {
        setCurrentPage("home");
      }, 2000);
    } catch (error) {
      setMessage("Unable to cancel order. Please try again.");
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
      <PageHeader title="Order Confirmed!" onBack={() => setCurrentPage("home")} uppercase />
      <div style={{ ...layout.narrowContent, padding: "16px 0 24px", display: "flex", flexDirection: "column", gap: 18 }}>
        {/* Success Message */}
        <div style={{ ...surfaceCardStyle, padding: 20, textAlign: "center", background: "rgba(16, 185, 129, 0.1)", borderLeft: `4px solid ${theme.green}` }}>
          <div style={{ fontSize: 24, fontWeight: 800, color: theme.green, marginBottom: 8 }}>✓</div>
          <div style={{ fontSize: 16, fontWeight: 700, color: theme.navy, marginBottom: 4 }}>Order Confirmed!</div>
          <div style={{ fontSize: 13, color: theme.grayText }}>Your order has been successfully placed</div>
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
              <div style={{ fontWeight: 700, color: theme.green, fontSize: 14 }}>Confirmed</div>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div style={{ ...surfaceCardStyle, padding: 18 }}>
          <div style={{ fontWeight: 700, fontSize: 15, color: theme.navy, marginBottom: 12 }}>
            Items Ordered
          </div>
          {orderData.items && orderData.items.length > 0 ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {orderData.items.map((item, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingBottom: 12,
                    borderBottom: index < orderData.items.length - 1 ? "1px solid #e2e8f0" : "none",
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, color: theme.navy, marginBottom: 4 }}>
                      {item.productName}
                    </div>
                    <div style={{ fontSize: 13, color: theme.grayText }}>
                      Qty: {item.quantity}
                    </div>
                  </div>
                  <div style={{ textAlign: "right", fontWeight: 700, color: theme.navy }}>
                    {formatCurrency(item.total)}
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </div>

        {/* Delivery Address */}
        {orderData.deliveryAddress ? (
          <div style={{ ...surfaceCardStyle, padding: 18 }}>
            <div style={{ fontWeight: 700, fontSize: 15, color: theme.navy, marginBottom: 12 }}>
              Delivery Address
            </div>
            <div style={{ ...mutedTextStyle }}>
              <div style={{ fontWeight: 700, color: theme.navy, marginBottom: 6 }}>
                {orderData.deliveryAddress.name} • {orderData.deliveryAddress.addressType || "Home"}
              </div>
              <div style={{ marginBottom: 4, fontSize: 14, color: theme.navy }}>
                {orderData.deliveryAddress.mobileNumber}
              </div>
              <div style={{ marginBottom: 4 }}>
                {orderData.deliveryAddress.address}
              </div>
              {orderData.deliveryAddress.location && (
                <div style={{ marginBottom: 4 }}>
                  Landmark: {orderData.deliveryAddress.location}
                </div>
              )}
              <div style={{ marginBottom: 4 }}>
                {orderData.deliveryAddress.city}
                {orderData.deliveryAddress.district ? `, ${orderData.deliveryAddress.district}` : ""}
              </div>
              <div style={{ marginBottom: 4 }}>
                {orderData.deliveryAddress.state} - {orderData.deliveryAddress.pinCode}
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
                {orderData.items ? orderData.items.reduce((sum, item) => sum + item.quantity, 0) : 0}
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

import React, { useEffect, useState } from "react";
import {
  PageHeader,
  theme,
  style,
  layout,
} from "../components.js";
import {
  fetchOrders,
} from "../api.js";
import {
  surfaceCardStyle,
  mutedTextStyle,
  getErrorMessage,
  formatCurrency,
  InlineMessage,
} from "./shared.js";

export const OrdersScreen = ({ appState, setCurrentPage }) => {
  const { session } = appState;
  const [orders, setOrders] = useState([]);

  const getProductCountLabel = (order) => {
    const fromItems = (order.items || order.raw?.Items || []).reduce((sum, item) => sum + (item.Quantity || item.quantity || item.qty || item.Qty || 1), 0);
    const fallback = order.totalQty || order.numberOfProducts || fromItems || 0;

    return fallback > 1 ? `${fallback} products` : `${fallback} product`;
  };
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

  return (
    <div style={style.screen}>
      <PageHeader title="Order History" onBack={() => setCurrentPage("home")} uppercase />
      <div style={{ ...layout.narrowContent, padding: "16px 0 24px", display: "flex", flexDirection: "column", gap: 14 }}>
        {isLoading ? (
          <InlineMessage>Loading your order history...</InlineMessage>
        ) : null}

        {errorMessage ? <InlineMessage tone="error">{errorMessage}</InlineMessage> : null}

        {!isLoading && !errorMessage && !orders.length ? (
          <div style={{ ...surfaceCardStyle, padding: 18, textAlign: "center" }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: theme.navy, marginBottom: 6 }}>No orders yet</div>
            <div style={{ ...mutedTextStyle, fontSize: 13 }}>Your placed orders will appear here.</div>
          </div>
        ) : null}

        {!isLoading && !errorMessage && orders.map((order) => (
          <button
            type="button"
            key={order.orderId || `${order.createdAt}-${order.paidAmount}`}
            onClick={() => setCurrentPage("order:details", order)}
            style={{
              ...surfaceCardStyle,
              padding: 18,
              textAlign: "left",
              cursor: "pointer",
              border: "1px solid #e5e7eb",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start", flexWrap: "wrap" }}>
              <div>
                <div style={{ fontWeight: 800, color: theme.navy }}>Order #{order.orderId || "N/A"}</div>
                <div style={{ fontSize: 13, color: theme.grayText, marginTop: 6 }}>
                  {order.createdAt ? new Date(order.createdAt).toLocaleString() : "Date unavailable"}
                </div>
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
                {order.orderStatus || "Confirmed"}
              </span>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(160px, 100%), 1fr))", gap: 12, marginTop: 16 }}>
              <div>
                <div style={{ fontSize: 12, color: theme.grayText }}>Paid Amount</div>
                <div style={{ fontWeight: 800, color: theme.navy }}>{formatCurrency(order.paidAmount)}</div>
              </div>
              <div>
                <div style={{ fontSize: 12, color: theme.grayText }}>Products</div>
                <div style={{ fontWeight: 800, color: theme.navy }}>{getProductCountLabel(order)}</div>
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

            <div style={{ marginTop: 14, fontSize: 12, color: theme.blue, fontWeight: 700 }}>
              Tap to view full order details →
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};


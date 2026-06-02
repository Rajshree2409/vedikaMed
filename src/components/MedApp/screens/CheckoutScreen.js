import React, { useEffect, useState } from "react";
import {
  Icon,
  PageHeader,
  theme,
  style,
  layout,
} from "../components.js";
import {
  fetchAddresses,
} from "../api.js";
import {
  formInputStyle,
  primaryButtonStyle,
  surfaceCardStyle,
  mutedTextStyle,
  getErrorMessage,
  formatCurrency,
  InlineMessage,
} from "./shared.js";

export const CheckoutScreen = ({ setCurrentPage, appState }) => {
  const { cart = {}, setCart, session } = appState;
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isConfirming, setIsConfirming] = useState(false);
  const [message, setMessage] = useState("");
  const [messageTone, setMessageTone] = useState("muted");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const cartEntries = Object.entries(cart || {});
  const totalItems = cartEntries.reduce((sum, [, item]) => sum + item.qty, 0);
  const totalPrice = cartEntries.reduce(
    (sum, [, item]) => sum + (item.product.price || 0) * item.qty,
    0
  );

  useEffect(() => {
    let isMounted = true;

    const loadAddresses = async () => {
      if (!session?.userId) {
        setCurrentPage("login");
        return;
      }

      setIsLoading(true);

      try {
        const userAddresses = await fetchAddresses(session.userId);

        if (!isMounted) {
          return;
        }

        setAddresses(userAddresses);

        if (userAddresses.length > 0) {
          setSelectedAddressId(userAddresses[0].addressId);
        }
      } catch (error) {
        if (isMounted) {
          setMessage(getErrorMessage(error, "Unable to load saved addresses."));
          setMessageTone("error");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadAddresses();

    return () => {
      isMounted = false;
    };
  }, [session?.userId, setCurrentPage]);

  const handleConfirmOrder = async () => {
    if (!selectedAddressId) {
      setMessage("Please select a delivery address.");
      setMessageTone("error");
      return;
    }

    if (cartEntries.length === 0) {
      setMessage("Your cart is empty.");
      setMessageTone("error");
      return;
    }

    setIsConfirming(true);
    setMessage("");

    try {
      // Build order data
      const selectedAddress = addresses.find(
        (addr) => addr.addressId === selectedAddressId
      );

      const orderData = {
        userId: session.userId,
        items: cartEntries.map(([, item]) => ({
          productId: item.product.productId,
          productName: item.product.productName,
          price: item.product.price,
          quantity: item.qty,
          total: (item.product.price || 0) * item.qty,
        })),
        totalAmount: totalPrice,
        paymentMethod: "COD",
        deliveryAddress: {
          addressId: selectedAddress.addressId,
          name: selectedAddress.name,
          mobileNumber: selectedAddress.mobileNumber,
          address: selectedAddress.address,
          location: selectedAddress.location,
          city: selectedAddress.city,
          district: selectedAddress.district,
          state: selectedAddress.state,
          pinCode: selectedAddress.pinCode,
          addressType: selectedAddress.addressType,
        },
        orderStatus: "Confirmed",
        createdAt: new Date().toISOString(),
      };

      // Clear the cart and show success modal, then redirect to home
      setCart({});
      setShowSuccessModal(true);

      setTimeout(() => {
        setShowSuccessModal(false);
        setCurrentPage("home");
      }, 1800);
    } catch (error) {
      setMessage(getErrorMessage(error, "Unable to confirm order."));
      setMessageTone("error");
    } finally {
      setIsConfirming(false);
    }
  };

  if (isLoading) {
    return (
      <div style={style.screen}>
        <PageHeader title="Checkout" onBack={() => setCurrentPage("cart")} uppercase />
        <div style={{ ...layout.narrowContent, padding: "20px 0" }}>
          <InlineMessage>Loading checkout details...</InlineMessage>
        </div>
      </div>
    );
  }

  return (
    <div style={style.screen}>
      <PageHeader title="Checkout" onBack={() => setCurrentPage("cart")} uppercase />
      <div style={{ ...layout.narrowContent, padding: "16px 0 24px", display: "flex", flexDirection: "column", gap: 18 }}>
        {message ? <InlineMessage tone={messageTone}>{message}</InlineMessage> : null}

        {/* Order Summary */}
        <div style={{ ...surfaceCardStyle, padding: 18 }}>
          <div style={{ fontWeight: 700, fontSize: 15, color: theme.navy, marginBottom: 12 }}>
            Order Summary
          </div>
          {cartEntries.map(([key, item]) => (
            <div
              key={key}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingBottom: 12,
                borderBottom: "1px solid #e2e8f0",
                marginBottom: 12,
              }}
            >
              <div>
                <div style={{ fontWeight: 700, color: theme.navy, marginBottom: 4 }}>
                  {item.product.productName}
                </div>
                <div style={{ fontSize: 13, color: theme.grayText }}>
                  {item.qty} × {formatCurrency(item.product.price)} = {formatCurrency((item.product.price || 0) * item.qty)}
                </div>
              </div>
            </div>
          ))}
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 16, marginTop: 12 }}>
            <div>
              <div style={{ color: theme.grayText, fontSize: 13 }}>Total Items</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: theme.navy }}>{totalItems}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ color: theme.grayText, fontSize: 13 }}>Total Price</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: theme.green }}>{formatCurrency(totalPrice)}</div>
            </div>
          </div>
        </div>

        {/* Delivery Address Selection */}
        <div style={{ ...surfaceCardStyle, padding: 18 }}>
          <div style={{ fontWeight: 700, fontSize: 15, color: theme.navy, marginBottom: 12 }}>
            Delivery Address
          </div>
          {addresses.length === 0 ? (
            <div style={mutedTextStyle}>
              No saved addresses. Please add an address to proceed.
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {addresses.map((address) => (
                <div
                  key={address.addressId}
                  onClick={() => setSelectedAddressId(address.addressId)}
                  style={{
                    border:
                      selectedAddressId === address.addressId
                        ? `2px solid ${theme.green}`
                        : "1px solid #e2e8f0",
                    borderRadius: 16,
                    padding: 14,
                    cursor: "pointer",
                    background:
                      selectedAddressId === address.addressId
                        ? "rgba(16, 185, 129, 0.08)"
                        : theme.white,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                    <div
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: "50%",
                        border: `2px solid ${selectedAddressId === address.addressId ? theme.green : "#cbd5e1"}`,
                        background:
                          selectedAddressId === address.addressId ? theme.green : theme.white,
                        marginTop: 4,
                        flexShrink: 0,
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, color: theme.navy, marginBottom: 4 }}>
                        {address.name}
                      </div>
                      <div style={{ ...mutedTextStyle, fontSize: 13, marginBottom: 6 }}>
                        {address.address}
                        {address.location ? `, ${address.location}` : ""}
                        {address.city ? `, ${address.city}` : ""}
                        {address.district ? `, ${address.district}` : ""}
                        {address.state ? `, ${address.state}` : ""}
                        {address.pinCode ? ` - ${address.pinCode}` : ""}
                      </div>
                      <div style={{ fontSize: 12, color: theme.grayText }}>
                        {address.addressType || "Home"} | {address.mobileNumber}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Payment Method */}
        <div style={{ ...surfaceCardStyle, padding: 18 }}>
          <div style={{ fontWeight: 700, fontSize: 15, color: theme.navy, marginBottom: 12 }}>
            Payment Method
          </div>
          <div
            style={{
              border: `2px solid ${theme.green}`,
              borderRadius: 16,
              padding: 14,
              background: "rgba(16, 185, 129, 0.08)",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div
              style={{
                width: 20,
                height: 20,
                borderRadius: "50%",
                background: theme.green,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: theme.white,
                fontWeight: 700,
                fontSize: 12,
                flexShrink: 0,
              }}
            >
              ✓
            </div>
            <div>
              <div style={{ fontWeight: 700, color: theme.navy }}>
                Cash on Delivery (COD)
              </div>
              <div style={{ fontSize: 13, color: theme.grayText, marginTop: 2 }}>
                Pay when you receive your order
              </div>
            </div>
          </div>
        </div>

        {/* Confirm Order Button */}
        <button
          onClick={handleConfirmOrder}
          disabled={isConfirming || addresses.length === 0}
          style={{
            ...primaryButtonStyle,
            opacity: isConfirming || addresses.length === 0 ? 0.7 : 1,
            marginTop: 8,
          }}
        >
          {isConfirming ? "Confirming..." : `Confirm Order - ${formatCurrency(totalPrice)}`}
        </button>
      </div>
      {showSuccessModal ? (
        <div
          style={{
            position: "fixed",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0,0,0,0.36)",
            zIndex: 9999,
          }}
        >
          <div style={{ background: theme.white, padding: 26, borderRadius: 14, textAlign: "center", minWidth: 260 }}>
            <div style={{ fontSize: 40, color: theme.green, fontWeight: 800 }}>✓</div>
            <div style={{ fontSize: 18, fontWeight: 800, color: theme.navy, marginTop: 8 }}>Order placed successfully</div>
            <div style={{ fontSize: 13, color: theme.grayText, marginTop: 6 }}>Redirecting to home...</div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

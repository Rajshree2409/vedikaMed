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
  fetchWalletData,
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

export const WalletScreen = ({ appState }) => {
  const { session } = appState;
  const [wallet, setWallet] = useState({
    balance: 0,
    history: [],
    name: getSessionName(session),
  });
  const [form, setForm] = useState({
    serverUrl: process.env.REACT_APP_MEDAPP_API_BASE || "https://dummy-server-url.com/api",
    amount: "",
    paymentId: "",
    remarks: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [messageTone, setMessageTone] = useState("muted");

  useEffect(() => {
    let isMounted = true;

    const loadWallet = async () => {
      if (!session?.userId) {
        return;
      }

      setIsLoading(true);

      try {
        const walletData = await fetchWalletData(session.userId);
        if (isMounted) {
          setWallet(walletData);
        }
      } catch (error) {
        if (isMounted) {
          setMessage(getErrorMessage(error, "Unable to load wallet details."));
          setMessageTone("error");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadWallet();

    return () => {
      isMounted = false;
    };
  }, [session?.userId]);

  const updateField = (field, value) => {
    setForm((previousForm) => ({
      ...previousForm,
      [field]: value,
    }));
  };

  const handleWalletSubmit = async () => {
    if (!session?.userId) {
      return;
    }

    if (!form.amount.trim() || Number(form.amount) <= 0 || !form.paymentId.trim()) {
      setMessage("Enter a valid amount and payment reference.");
      setMessageTone("error");
      return;
    }

    setIsSubmitting(true);
    setMessage("");

    try {
      await saveWalletDetailsWithUrl(form.serverUrl, session.userId, form);
      const refreshedWallet = await fetchWalletData(session.userId);
      setWallet(refreshedWallet);
      setForm({
        serverUrl: form.serverUrl,
        amount: "",
        paymentId: "",
        remarks: "",
      });
      setMessage("Wallet entry submitted successfully.");
      setMessageTone("success");
    } catch (error) {
      setMessage(getErrorMessage(error, "Unable to submit wallet entry."));
      setMessageTone("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={style.screen}>
      <div style={{ background: theme.green, padding: "40px 0 30px" }}>
        <div style={{ ...layout.content, display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, flexWrap: "wrap" }}>
            <div>
              <div style={{ color: "#fff", fontSize: "clamp(28px, 5vw, 30px)", fontWeight: 800 }}>{formatCurrency(wallet.balance)}</div>
              <div style={{ color: "#c8f7da", fontSize: 13, marginTop: 4 }}>Available Balance</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
              <span style={{ color: "#c8f7da", fontSize: 12 }}>ID: {session?.userId || "N/A"}</span>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  background: "#1e40af",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontWeight: 800,
                }}
              >
                {createAvatarLabel(wallet.name || getSessionPhone(session))}
              </div>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(88px, 100%), 1fr))", gap: 10 }}>
            {[
              { icon: "send", label: "Reload" },
              { icon: "search", label: "Entries" },
              { icon: "wallet", label: "Balance" },
              { icon: "chevronRight", label: "Topup" },
            ].map((action) => (
              <div
                key={action.label}
                style={{
                  background: "rgba(255,255,255,0.2)",
                  borderRadius: 14,
                  padding: "12px 8px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <Icon name={action.icon} size={22} color="#fff" />
                <span style={{ fontSize: 11, color: "#fff", fontWeight: 600 }}>{action.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ ...layout.content, background: theme.white, borderRadius: "20px 20px 0 0", minHeight: 300, padding: "20px 16px", marginTop: -10 }}>
        {isLoading ? <div style={{ marginBottom: 16 }}><InlineMessage>Loading wallet details...</InlineMessage></div> : null}
        {message ? <div style={{ marginBottom: 16 }}><InlineMessage tone={messageTone}>{message}</InlineMessage></div> : null}

        <div style={{ ...surfaceCardStyle, padding: 18, marginBottom: 20 }}>
          <div style={{ fontWeight: 800, fontSize: 16, color: theme.navy, marginBottom: 12 }}>Manual Wallet Entry</div>
          <div style={{ ...mutedTextStyle, fontSize: 13, marginBottom: 14 }}>Use the original payment reference while adding a wallet credit.</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ ...surfaceCardStyle, padding: "14px 16px", marginBottom: 8, borderRadius: 10 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: theme.navy, marginBottom: 8 }}>Server URL</div>
              <input
                placeholder="https://your-backend.example.com/api"
                value={form.serverUrl}
                onChange={(event) => updateField("serverUrl", event.target.value)}
                style={formInputStyle}
              />
              <div style={{ fontSize: 11, color: theme.grayText, marginTop: 6 }}>
                Enter the backend server URL here. If no real URL is available, a dummy URL will be used for testing.
              </div>
            </div>
            <input placeholder="Amount" value={form.amount} onChange={(event) => updateField("amount", event.target.value.replace(/[^\d.]/g, ""))} style={formInputStyle} />
            <input placeholder="Payment Reference *" value={form.paymentId} onChange={(event) => updateField("paymentId", event.target.value)} style={formInputStyle} />
            <input placeholder="Remarks" value={form.remarks} onChange={(event) => updateField("remarks", event.target.value)} style={formInputStyle} />
            <button
              onClick={handleWalletSubmit}
              disabled={isSubmitting}
              style={{
                ...primaryButtonStyle,
                opacity: isSubmitting ? 0.7 : 1,
              }}
            >
              {isSubmitting ? "Submitting..." : "Submit Wallet Entry"}
            </button>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
          <span style={{ fontWeight: 800, fontSize: 16, color: theme.navy }}>Transactions</span>
          <span style={{ fontSize: 13, color: theme.green, fontWeight: 600 }}>{wallet.history.length} entries</span>
        </div>
        {wallet.history.length ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {wallet.history.map((entry, index) => (
              <div key={`${entry.paymentId || "wallet"}-${index}`} style={{ ...surfaceCardStyle, padding: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start" }}>
                  <div>
                    <div style={{ fontWeight: 700, color: theme.navy }}>{entry.creditOrDebit || "Wallet Entry"}</div>
                    <div style={{ ...mutedTextStyle, fontSize: 13, marginTop: 4 }}>{entry.remarks || "No remarks added"}</div>
                    <div style={{ fontSize: 12, color: theme.grayText, marginTop: 6 }}>{entry.date || "Date unavailable"}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontWeight: 800, color: theme.green }}>{formatCurrency(entry.amount)}</div>
                    <div style={{ fontSize: 12, color: theme.grayText, marginTop: 4 }}>{entry.paymentId || "No reference"}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: 180, color: theme.grayText, fontSize: 14 }}>
            No transactions yet
          </div>
        )}
      </div>
    </div>
  );
};


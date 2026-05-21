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

export const RetailerScreen = ({ setCurrentPage, appState }) => {
  const { session } = appState;
  const [form, setForm] = useState(() => ({
    ...buildInitialRetailerForm(session),
    serverUrl: process.env.REACT_APP_MEDAPP_API_BASE || "https://dummy-server-url.com/api",
  }));
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [existingRetailer, setExistingRetailer] = useState(false);
  const [message, setMessage] = useState("");
  const [messageTone, setMessageTone] = useState("muted");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedVendors, setSelectedVendors] = useState([DEFAULT_VENDOR]);
  const [vendorList, setVendorList] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const loadRetailerData = async () => {
      if (!session?.userId) {
        return;
      }

      setIsLoading(true);
      setMessage("");

      try {
        const [vendors, retailer] = await Promise.all([
          fetchVendorList(),
          fetchRetailerDetails(session.userId).catch(() => null),
        ]);

        if (!isMounted) {
          return;
        }

        const resolvedVendors = vendors.length ? vendors : [DEFAULT_VENDOR];
        setVendorList(resolvedVendors);
        setSelectedVendors((previousSelectedVendors) => {
          const nextSelectedVendors = [pickPreferredVendor(resolvedVendors, DEFAULT_VENDOR)];

          previousSelectedVendors.forEach((vendor) => {
            if (!nextSelectedVendors.some((item) => item.vendorId === vendor.vendorId)) {
              nextSelectedVendors.push(vendor);
            }
          });

          return nextSelectedVendors;
        });

        if (retailer?.shopName) {
          setExistingRetailer(true);
          setForm(buildInitialRetailerForm(session, retailer));
        }
      } catch (error) {
        if (isMounted) {
          setMessage(getErrorMessage(error, "Unable to load retailer details."));
          setMessageTone("error");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadRetailerData();

    return () => {
      isMounted = false;
    };
  }, [session, session?.mobileNumber, session?.name, session?.phoneNumber, session?.userId]);

  const filteredVendors = vendorList.filter((vendor) => {
    const searchSource = `${vendor.vendorName} ${vendor.mobileNumber} ${vendor.city} ${vendor.state}`.toLowerCase();
    return searchSource.includes(searchTerm.toLowerCase()) && !selectedVendors.some((item) => item.vendorId === vendor.vendorId);
  });

  const updateField = (field, value) => {
    setForm((previousForm) => ({
      ...previousForm,
      [field]: value,
    }));
  };

  const addVendorToSelection = (vendor) => {
    setSelectedVendors((previousSelectedVendors) =>
      previousSelectedVendors.some((item) => item.vendorId === vendor.vendorId) ? previousSelectedVendors : [...previousSelectedVendors, vendor]
    );
    setSearchTerm("");
  };

  const removeVendorFromSelection = (vendorId) => {
    if (vendorId === DEFAULT_VENDOR.vendorId) {
      return;
    }

    setSelectedVendors((previousSelectedVendors) => previousSelectedVendors.filter((vendor) => vendor.vendorId !== vendorId));
  };

  const handleSubmit = async () => {
    if (!session?.userId) {
      setCurrentPage("login");
      return;
    }

    if (!form.shopName.trim() || !form.contactName.trim() || !form.shopAddress.trim() || !form.pinCode.trim() || !form.station.trim() || !form.district.trim() || !form.state.trim()) {
      setMessage("Please fill all required retailer fields.");
      setMessageTone("error");
      return;
    }

    if (!form.gstNo.trim() && !form.panNo.trim() && !form.licenseNo.trim()) {
      setMessage("Add at least one of GSTIN, PAN, or License number.");
      setMessageTone("error");
      return;
    }

    if (!selectedVendors.length) {
      setMessage("Select at least one vendor.");
      setMessageTone("error");
      return;
    }

    setIsSaving(true);
    setMessage("");

    try {
      await saveRetailerDetailsWithUrl(form.serverUrl, session.userId, form, selectedVendors);
      setExistingRetailer(true);
      setMessage("Retailer details submitted successfully.");
      setMessageTone("success");
    } catch (error) {
      setMessage(getErrorMessage(error, "Unable to submit retailer details."));
      setMessageTone("error");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div style={style.screen}>
      <PageHeader title="Retailer Details" onBack={() => setCurrentPage("home")} />
      <div style={{ ...layout.narrowContent, padding: "16px 0 24px" }}>
        {isLoading ? <div style={{ marginBottom: 12 }}><InlineMessage>Loading retailer details...</InlineMessage></div> : null}
        {message ? <div style={{ marginBottom: 12 }}><InlineMessage tone={messageTone}>{message}</InlineMessage></div> : null}

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ ...surfaceCardStyle, padding: "18px 20px" }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: theme.navy, marginBottom: 8 }}>Server URL</div>
            <input
              placeholder="https://your-backend.example.com/api"
              value={form.serverUrl}
              onChange={(event) => updateField("serverUrl", event.target.value)}
              style={formInputStyle}
            />
            <div style={{ fontSize: 12, color: theme.grayText, marginTop: 8 }}>
              Enter the backend server URL here. If no real URL is available, a dummy URL will be used for testing.
            </div>
          </div>

          <input placeholder="Shop/Firm Full Name *" value={form.shopName} onChange={(event) => updateField("shopName", event.target.value)} style={formInputStyle} />
          <input placeholder="Owner Name *" value={form.contactName} onChange={(event) => updateField("contactName", event.target.value)} style={formInputStyle} />
          <input placeholder="Shop Address *" value={form.shopAddress} onChange={(event) => updateField("shopAddress", event.target.value)} style={formInputStyle} />
          <input placeholder="Pincode *" value={form.pinCode} onChange={(event) => updateField("pinCode", event.target.value.replace(/\D/g, ""))} style={formInputStyle} />
          <input placeholder="City *" value={form.station} onChange={(event) => updateField("station", event.target.value)} style={formInputStyle} />
          <input placeholder="District *" value={form.district} onChange={(event) => updateField("district", event.target.value)} style={formInputStyle} />
          <input placeholder="State *" value={form.state} onChange={(event) => updateField("state", event.target.value)} style={formInputStyle} />
          <input placeholder="Email Address (Optional)" value={form.email} onChange={(event) => updateField("email", event.target.value)} style={formInputStyle} />
          <input placeholder="Contact Number" value={form.customerMobile} onChange={(event) => updateField("customerMobile", event.target.value.replace(/\D/g, ""))} style={formInputStyle} />
          <input placeholder="GSTIN Number" value={form.gstNo} onChange={(event) => updateField("gstNo", event.target.value)} style={formInputStyle} />
          <input placeholder="PAN Number" value={form.panNo} onChange={(event) => updateField("panNo", event.target.value)} style={formInputStyle} />
          <input placeholder="License No" value={form.licenseNo} onChange={(event) => updateField("licenseNo", event.target.value)} style={formInputStyle} />

          <div style={{ ...surfaceCardStyle, padding: 16 }}>
            <div style={{ fontWeight: 700, color: theme.navy, marginBottom: 10 }}>Select Vendors</div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                borderBottom: "1.5px solid #e5e7eb",
                padding: "8px 0",
                marginBottom: 10,
              }}
            >
              <Icon name="search" size={18} color={theme.blue} />
              <input
                placeholder="Search Vendor"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                style={{ border: "none", outline: "none", flex: 1, minWidth: 0, fontSize: 14, color: theme.navy, paddingLeft: 10, background: "transparent" }}
              />
            </div>

            {selectedVendors.length ? (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: filteredVendors.length ? 14 : 0 }}>
                {selectedVendors.map((vendor) => (
                  <span
                    key={vendor.vendorId}
                    style={{
                      background: "#fff",
                      border: "1.5px solid #e5e7eb",
                      borderRadius: 20,
                      padding: "6px 12px",
                      fontSize: 12,
                      color: theme.navy,
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    {vendor.vendorName}
                    {vendor.vendorId !== DEFAULT_VENDOR.vendorId ? (
                      <button
                        onClick={() => removeVendorFromSelection(vendor.vendorId)}
                        style={{ background: "none", border: "none", color: theme.red, cursor: "pointer", padding: 0, fontWeight: 700 }}
                      >
                        x
                      </button>
                    ) : null}
                  </span>
                ))}
              </div>
            ) : null}

            {filteredVendors.length ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 10, maxHeight: 240, overflowY: "auto" }}>
                {filteredVendors.slice(0, 12).map((vendor) => (
                  <button
                    key={vendor.vendorId}
                    onClick={() => addVendorToSelection(vendor)}
                    style={{
                      background: "#f8fafc",
                      border: "1px solid #e2e8f0",
                      borderRadius: 16,
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: 12,
                      padding: "12px 14px",
                      textAlign: "left",
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 700, color: theme.navy, fontSize: 13 }}>{vendor.vendorName}</div>
                      <div style={{ fontSize: 12, color: theme.grayText }}>
                        {[vendor.city, vendor.state, vendor.mobileNumber].filter(Boolean).join(" | ")}
                      </div>
                    </div>
                    <span style={{ color: theme.green, fontWeight: 700 }}>Add</span>
                  </button>
                ))}
              </div>
            ) : (
              <div style={{ ...mutedTextStyle, fontSize: 13 }}>{searchTerm ? "No vendor matched your search." : "Search to add more vendors."}</div>
            )}
          </div>

          <button
            onClick={handleSubmit}
            disabled={isSaving}
            style={{
              ...primaryButtonStyle,
              fontSize: 16,
              marginTop: 8,
              opacity: isSaving ? 0.7 : 1,
            }}
          >
            {isSaving ? "Submitting..." : existingRetailer ? "Update" : "Register"}
          </button>
        </div>
      </div>
    </div>
  );
};

/* eslint-disable no-unused-vars */
const LegacyLabTestScreen = ({ appState, setCurrentPage }) => {
  const { session, vendor } = appState;
  const [labTests, setLabTests] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const healthCheckupPackages = [
    {
      id: 1,
      name: "Full Body Checkup",
      description: "Comprehensive health screening",
      price: 1500,
      tests: 45,
      image: "https://images.unsplash.com/photo-1579154204601-01d430751fb3?w=300&h=300&fit=crop",
    },
    {
      id: 2,
      name: "Cardiac Checkup",
      description: "Heart health screening",
      price: 1200,
      tests: 8,
      image: "https://images.unsplash.com/photo-1631217314830-4e6b21efb692?w=300&h=300&fit=crop",
    },
    {
      id: 3,
      name: "Diabetes Checkup",
      description: "Blood sugar monitoring",
      price: 400,
      tests: 5,
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=300&h=300&fit=crop",
    },
    {
      id: 4,
      name: "Liver Checkup",
      description: "Liver function tests",
      price: 800,
      tests: 6,
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=300&h=300&fit=crop",
    },
    {
      id: 5,
      name: "Kidney Checkup",
      description: "Kidney function panel",
      price: 700,
      tests: 5,
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=300&h=300&fit=crop",
    },
    {
      id: 6,
      name: "Thyroid Checkup",
      description: "Thyroid function test",
      price: 500,
      tests: 3,
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=300&h=300&fit=crop",
    },
    {
      id: 7,
      name: "Blood Count",
      description: "CBC & related tests",
      price: 350,
      tests: 12,
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=300&h=300&fit=crop",
    },
    {
      id: 8,
      name: "Allergy Panel",
      description: "Comprehensive allergy screening",
      price: 1800,
      tests: 20,
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=300&h=300&fit=crop",
    },
    {
      id: 9,
      name: "Pregnancy Checkup",
      description: "Prenatal health screening",
      price: 2000,
      tests: 15,
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=300&h=300&fit=crop",
    },
  ];

  return (
    <div style={style.screen}>
      <div style={{ ...layout.content, padding: "20px 0 24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 28 }}>
          <button
            onClick={() => setCurrentPage("home")}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 8,
              display: "flex",
              alignItems: "center",
              color: theme.green,
            }}
          >
            <Icon name="back" size={24} color={theme.green} />
          </button>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: theme.navy, margin: 0 }}>Book Lab Tests</h1>
        </div>

        <div style={{ marginBottom: 24 }}>
          <div style={{ ...surfaceCardStyle, padding: "16px 20px" }}>
            <div style={{ fontWeight: 700, color: theme.navy, marginBottom: 6 }}>Popular Health Checkup</div>
            <div style={{ fontSize: 13, color: theme.grayText }}>Book trusted lab tests from home</div>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 14,
            marginBottom: 24,
          }}
        >
          {healthCheckupPackages.map((pkg) => (
            <div
              key={pkg.id}
              style={{
                ...surfaceCardStyle,
                overflow: "hidden",
                cursor: "pointer",
                transition: "all 0.3s ease-in-out",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = theme.shadow.md;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = theme.shadow.sm;
              }}
            >
              <div
                style={{
                  width: "100%",
                  aspectRatio: "1",
                  overflow: "hidden",
                  background: theme.grayLight,
                  marginBottom: 12,
                }}
              >
                <img
                  src={pkg.image}
                  alt={pkg.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "8px 8px 0 0",
                  }}
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              </div>
              <div style={{ padding: "0 12px 12px" }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: theme.navy, marginBottom: 4 }}>{pkg.name}</div>
                <div style={{ fontSize: 12, color: theme.grayText, marginBottom: 8 }}>
                  {pkg.tests} tests included
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 16, fontWeight: 800, color: theme.green }}>₹{pkg.price}</span>
                  <button
                    onClick={() => {
                      alert(`Booked ${pkg.name}. A collection agent will contact you soon.`);
                    }}
                    style={{
                      background: theme.greenLight,
                      border: "none",
                      borderRadius: 8,
                      color: theme.green,
                      cursor: "pointer",
                      padding: "6px 12px",
                      fontSize: 12,
                      fontWeight: 700,
                      transition: "all 0.2s ease-in-out",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = theme.green;
                      e.currentTarget.style.color = theme.white;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = theme.greenLight;
                      e.currentTarget.style.color = theme.green;
                    }}
                  >
                    Book
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => alert("Showing all available lab tests")}
          style={{
            width: "100%",
            background: theme.greenGradient,
            border: "none",
            borderRadius: 12,
            color: theme.white,
            cursor: "pointer",
            padding: 16,
            fontSize: 16,
            fontWeight: 700,
            marginBottom: 24,
            transition: "all 0.2s ease-in-out",
            boxShadow: theme.shadow.md,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = theme.shadow.lg;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = theme.shadow.md;
          }}
        >
          See All Tests
        </button>
      </div>
    </div>
  );
};
/* eslint-enable no-unused-vars */


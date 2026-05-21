import React, { useEffect, useState } from "react";
import { BottomNav, Sidebar } from "./components";
import {
  DEFAULT_VENDOR,
  readStoredPendingOtp,
  readStoredSession,
  readStoredVendor,
  writeStoredPendingOtp,
  writeStoredSession,
  writeStoredVendor,
} from "./api";
import {
  LoginScreen,
  OtpScreen,
  HomeScreen,
  SearchScreen,
  OrdersScreen,
  LabTestScreen,
  DoctorAppointmentsScreen,
  DoctorAppointmentScreen,
  WalletScreen,
  ChatScreen,
  ProfileScreen,
  ProfileEditScreen,
  AccountsScreen,
  AddAddressScreen,
  LogoutScreen,
  RetailerScreen,
  AboutScreen,
  PrivacyScreen,
  ContactScreen,
  ProductListScreen,
  CartScreen,
} from "./screens";

const BOTTOM_NAV_PAGES = new Set(["home", "search", "orders", "wallet", "chat"]);

export default function App() {
  const [session, setSession] = useState(() => readStoredSession());
  const [vendor, setVendor] = useState(() => readStoredVendor() || DEFAULT_VENDOR);
  const [pendingOtp, setPendingOtp] = useState(() => readStoredPendingOtp());
  const [cart, setCart] = useState({});
  const [currentPage, setCurrentPage] = useState(() => (readStoredSession()?.userId ? "home" : "login"));
  const [activeTab, setActiveTab] = useState("home");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    writeStoredSession(session);
  }, [session]);

  useEffect(() => {
    writeStoredVendor(vendor || DEFAULT_VENDOR);
  }, [vendor]);

  useEffect(() => {
    writeStoredPendingOtp(pendingOtp);
  }, [pendingOtp]);

  useEffect(() => {
    if (!session?.userId) {
      setCurrentPage("login");
      setActiveTab("home");
    }
  }, [session]);

  const navigate = (page) => {
    setCurrentPage(page);

    if (BOTTOM_NAV_PAGES.has(page)) {
      setActiveTab(page);
    }
  };

  const handleLogout = () => {
    setPendingOtp(null);
    setSession(null);
    setVendor(DEFAULT_VENDOR);
    setSidebarOpen(false);
    setActiveTab("home");
    setCurrentPage("login");
  };

  const appState = {
    pendingOtp,
    session,
    cart,
    setCart,
    setPendingOtp,
    setSession,
    setVendor,
    vendor,
  };

  const screenProps = {
    appState,
    setCurrentPage: navigate,
  };

  const renderScreen = () => {
    if (currentPage.startsWith("products:")) {
      const category = currentPage.split(":")[1];
      return <ProductListScreen {...screenProps} initialCategory={category} />;
    }

    if (currentPage.startsWith("doctor-appointment:")) {
      const doctorId = currentPage.split(":")[1];
      return <DoctorAppointmentScreen {...screenProps} doctorId={doctorId} />;
    }

    switch (currentPage) {
      case "login":
        return <LoginScreen {...screenProps} />;
      case "otp":
        return <OtpScreen {...screenProps} />;
      case "home":
        return <HomeScreen {...screenProps} setSidebarOpen={setSidebarOpen} />;
      case "search":
        return <SearchScreen {...screenProps} />;
      case "orders":
        return <OrdersScreen {...screenProps} />;
      case "lab-test":
        return <LabTestScreen {...screenProps} />;
      case "doctor-appointments":
        return <DoctorAppointmentsScreen {...screenProps} />;
      case "wallet":
        return <WalletScreen {...screenProps} />;
      case "chat":
        return <ChatScreen {...screenProps} />;
      case "profile":
        return <ProfileScreen {...screenProps} />;
      case "edit_profile":
        return <ProfileEditScreen {...screenProps} />;
      case "accounts":
        return <AccountsScreen {...screenProps} />;
      case "add_address":
        return <AddAddressScreen {...screenProps} />;
      case "logout":
        return <LogoutScreen {...screenProps} onLogout={handleLogout} />;
      case "retailer":
        return <RetailerScreen {...screenProps} />;
      case "cart":
        return <CartScreen {...screenProps} />;
      case "about":
        return <AboutScreen {...screenProps} />;
      case "privacy":
        return <PrivacyScreen {...screenProps} />;
      case "contact":
        return <ContactScreen {...screenProps} />;
      default:
        return <HomeScreen {...screenProps} setSidebarOpen={setSidebarOpen} />;
    }
  };

  const hideBottomNav =
    ["login", "otp", "profile", "edit_profile", "add_address", "logout", "retailer", "about", "privacy", "contact"].includes(currentPage) ||
    currentPage.startsWith("products:") ||
    currentPage.startsWith("doctor-appointment:");

  return (
    <div style={{ background: "#e8eef5", minHeight: "100vh" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700;800&display=swap" rel="stylesheet" />
      <div
        style={{
          fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
          width: "100%",
          minHeight: "100vh",
          background: "radial-gradient(circle at top left, rgba(15,157,138,0.08), transparent 22%), linear-gradient(180deg, #f8fafc 0%, #eef3f8 100%)",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          overflowX: "hidden",
        }}
      >
        <Sidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          session={session}
          setCurrentPage={(page) => {
            navigate(page);
            setSidebarOpen(false);
          }}
        />
        {renderScreen()}
        {!hideBottomNav && <BottomNav active={activeTab} setActive={navigate} />}
      </div>
    </div>
  );
}

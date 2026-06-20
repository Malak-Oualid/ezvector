import  { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import AboutPage from "./pages/AboutPage";
import OrderPage from "./pages/OrderPage";
import OrdersListPage from "./pages/OrdersListPage";
import AuthPage from "./pages/AuthPage";
import ProfilePage from "./pages/ProfilePage";
import AccountPage from "./pages/AccountPage";
import ServicesPage from "./pages/ServicesPage";
import UpgradeAccountPage from "./pages/UpgradeAccountPage";
import ConnectionTest from "./components/ConnectionTest";
import CartPage from "./pages/CartPage";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import OrderCancelPage from "./pages/OrderCancelPage";
import FAQPage from "./pages/FAQPage";
import ContactPage from "./pages/ContactPage";
import HowToSubmitOrdersPage from "./pages/HowToSubmitOrdersPage";
import HowToSubmitSamplesPage from "./pages/HowToSubmitSamplesPage";
import HowToStartDropboxPage from "./pages/HowToStartDropboxPage";
import HowToCancelOrderPage from "./pages/HowToCancelOrderPage";
import SyntheticDNACloningPage from "./pages/SyntheticDNACloningPage";
import MultiInsertCloningPage from "./pages/MultiInsertCloningPage";
import MultiSiteMutagenesisPage from "./pages/MultiSiteMutagenesisPage";
import CustomBackboneConstructionPage from "./pages/CustomBackboneConstructionPage";
import DomainMutagenesisPage from "./pages/DomainMutagenesisPage";
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Suspense fallback={<div>Loading…</div>}>
          <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="/orders" element={<OrdersListPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/order/success" element={<OrderSuccessPage />} />
          <Route path="/order/cancel" element={<OrderCancelPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/upgrade" element={<UpgradeAccountPage />} />
          <Route path="/test" element={<ConnectionTest />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/synthetic-dna-cloning" element={<SyntheticDNACloningPage />} />
          <Route path="/services/multi-insert-cloning" element={<MultiInsertCloningPage />} />
          <Route path="/services/multi-site-mutagenesis" element={<MultiSiteMutagenesisPage />} />
          <Route path="/services/custom-backbone-construction" element={<CustomBackboneConstructionPage />} />
          <Route path="/services/domain-mutagenesis" element={<DomainMutagenesisPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/how-to/submit-orders" element={<HowToSubmitOrdersPage />} />
          <Route path="/how-to/submit-samples" element={<HowToSubmitSamplesPage />} />
          <Route path="/how-to/start-dropbox" element={<HowToStartDropboxPage />} />
          <Route path="/how-to/cancel-order" element={<HowToCancelOrderPage />} />
          <Route path="*" element={<div>404</div>} />
        </Routes>
      </Suspense>
    </BrowserRouter>
    </CartProvider>
  );
}

export default App;
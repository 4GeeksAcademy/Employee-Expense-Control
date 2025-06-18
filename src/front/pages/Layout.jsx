import { Outlet, useLocation } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

export const Layout = () => {
  const { pathname } = useLocation();

  // Rutas en las que NO queremos mostrar Navbar/Footer
  const noNavRoutes = ["/login", "/signup", "/forgot-password", "/reset-password"];
  const hideNav = noNavRoutes.includes(pathname.toLowerCase());

  return (
    <ScrollToTop>
      {!hideNav && <Navbar />}
      <Outlet />
      {!hideNav && <Footer />}
    </ScrollToTop>
  );
};

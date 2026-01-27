import Home from "../pages/Home/Home";
import Services from "../pages/Services/Services";
import ServiceDetail from "../pages/ServiceDetail/ServiceDetail";
import Booking from "../pages/Booking/Booking";
import Summary from "../pages/Summary/Summary";

import { Routes, Route } from "react-router-dom";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/services" element={<Services />} />
      <Route path="/services/:id" element={<ServiceDetail />} />
      <Route path="/booking" element={<Booking />} />
      <Route path="/summary" element={<Summary />} />
    </Routes>
  );
}

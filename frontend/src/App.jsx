import { BrowserRouter, Routes, Route } from "react-router-dom";
import Directory from "./pages/Directory";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Platform from "./pages/Platform";
import CancelAppointment from "./pages/CancelAppointment";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Directory />} />
          <Route path="/login" element={<Login />} />
          <Route path="/turno/:token" element={<CancelAppointment />} />

          {/* Panel del local (ADMIN y EMPLOYEE) */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={["ADMIN", "EMPLOYEE"]}>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* Panel del dueño de la plataforma */}
          <Route
            path="/plataforma"
            element={
              <ProtectedRoute allowedRoles={["SUPER_ADMIN"]}>
                <Platform />
              </ProtectedRoute>
            }
          />

          {/* Página de reservas de cada local: /mi-peluqueria (los slugs reservados se validan en el backend) */}
          <Route path="/:slug" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

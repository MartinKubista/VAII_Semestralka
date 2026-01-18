import { Header } from "./components/Header";
import { Routes, Route } from "react-router-dom";

import { HomePage } from "./pages/home/HomePage";
import { LoginPage } from "./pages/login/LoginPage";
import { RegisterPage } from "./pages/register/RegisterPage";
import { AddItemPage } from "./pages/addItem/AddItemPage";
import { ProfilePage } from "./pages/profile/ProfilePage";
import { ItemDetailPage } from "./pages/itemDetail/ItemDetailPage";
import { ChangePassword } from "./pages/profile/ChangePasswordPage";
import { ChangeProfile } from "./pages/profile/ChangeProfilePage";

import { AdminPage } from "./pages/admin/AdminPage";

import { ProtectedRoute } from "./routes/ProtectedRoute";
import { AdminRoute } from "./routes/AdminRoute";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/item/:id" element={<ItemDetailPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/add-item"
          element={
            <ProtectedRoute>
              <AddItemPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile/:id"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/changePassword"
          element={
            <ProtectedRoute>
              <ChangePassword />
            </ProtectedRoute>
          }
        />

        <Route
          path="/changeProfile"
          element={
            <ProtectedRoute>
              <ChangeProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminPage />
            </AdminRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
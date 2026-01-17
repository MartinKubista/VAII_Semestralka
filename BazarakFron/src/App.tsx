
import { Header } from "./components/Header.tsx"
import { HomePage} from "./pages/home/HomePage.tsx"
import { LoginPage } from "./pages/login/LoginPage.tsx"
import { RegisterPage } from "./pages/register/RegisterPage.tsx"
import { AddItemPage } from "./pages/addItem/AddItemPage.tsx"
import { ProfilePage } from "./pages/profile/ProfilePage.tsx"
import {ItemDetailPage} from "./pages/itemDetail/ItemDetailPage.tsx"
import { ChangePassword } from "./pages/profile/ChangePasswordPage.tsx"
import { Routes, Route } from "react-router-dom"

function App() {

  return (
    <>
      <Header/>
      <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/register" element={<RegisterPage />}></Route>
          <Route path="/add-item" element={<AddItemPage />}></Route>
          <Route path="/profile/:id" element={<ProfilePage />}></Route>
          <Route path="/item/:id" element={<ItemDetailPage />} />
          <Route path="/changePassword" element={<ChangePassword />} />
      </Routes>
    </>
  )
}

export default App

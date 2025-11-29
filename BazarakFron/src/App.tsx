import { useState } from "react"
import { Header } from "./components/Header.tsx"
import { HomePage} from "./pages/home/HomePage.tsx"
import { LoginPage } from "./pages/login/LoginPage.tsx"
import { RegisterPage } from "./pages/register/RegisterPage.tsx"
import { AddItemPage } from "./pages/addItem/AddItemPage.tsx"
import { ProfilePage } from "./pages/profile/ProfilePage.tsx"
import { Routes, Route } from "react-router-dom"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header/>
      <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/register" element={<RegisterPage />}></Route>
          <Route path="/add-item" element={<AddItemPage />}></Route>
          <Route path="/profil" element={<ProfilePage />}></Route>
      </Routes>
    </>
  )
}

export default App

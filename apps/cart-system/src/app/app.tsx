import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Cart from "./pages/Cart"; 

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<Navigate to="/cart" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
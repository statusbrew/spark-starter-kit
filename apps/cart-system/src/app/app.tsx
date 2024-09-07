import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Cart from "./pages/Cart"; 
import BarCode from "./pages/BarCode";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/cart" element={<Cart />} />
        <Route path="/barcode" element={<BarCode />} />
        <Route path="*" element={<Navigate to="/cart" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

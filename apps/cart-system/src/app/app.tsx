import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Cart from "./pages/Cart"; 
import CustomerOrders from "./pages/CustomerOrders";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/cart" element={<Cart />} />
        <Route path="/order/:customerId" element={<CustomerOrders />} />
        <Route path="*" element={<Navigate to="/cart" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

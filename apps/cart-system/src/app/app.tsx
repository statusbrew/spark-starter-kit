import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Cart from "./pages/Cart"; 
import CustomerOrders from "./pages/CustomerOrders";
import Landing from "./pages/Landing";
import About from "./component/About";
import Contact from "./component/Contact";


export function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Landing />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order/:customerId" element={<CustomerOrders />} />
        <Route path="/about" element={<About  />} /> {/* Passing filePath */}
        <Route path="/contact" element={<Contact  />} /> {/* Passing filePath */}

        {/* <Route path="/landing" element={<Landing/>} /> */}
        <Route path="*" element={<Navigate to="/cart" />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;

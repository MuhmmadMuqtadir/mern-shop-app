import React, { useState } from "react";
import axios from "axios";
import BarcodeScannerComponent from "react-qr-barcode-scanner";

function Shopkeeper() {
  const [form, setForm] = useState({
    barcode: "",
    name: "",
    price: "",
    quantity: "",
    category: "",
    expiryDate: ""
  });

  const [scanning, setScanning] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔹 Handle scanning
  const handleScan = async (err, result) => {
    if (result) {
      const scannedCode = result.text;
      setForm({ ...form, barcode: scannedCode });
      setScanning(false);

      // 🔹 Try to autofill product if already exists in DB
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${scannedCode}`);
        setForm({
          barcode: res.data.barcode,
          name: res.data.name,
          price: res.data.price,
          quantity: res.data.quantity,
          category: res.data.category,
          expiryDate: res.data.expiryDate ? res.data.expiryDate.substring(0, 10) : ""
        });
        alert("Product already exists. Fields auto-filled.");
      } catch {
        // If product not found, let shopkeeper fill manually
        alert("New product. Please enter details.");
      }
    }
  };

  // 🔹 Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/products/add", form);
      alert(res.data.message);
      setForm({ barcode: "", name: "", price: "", quantity: "", category: "", expiryDate: "" });
    } catch (err) {
      console.error(err);
      alert("Error adding product");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>📦 Shopkeeper Portal</h2>

      {!scanning && (
        <button onClick={() => setScanning(true)} style={{ marginBottom: "15px" }}>
          📷 Scan Barcode
        </button>
      )}

      {scanning && (
        <div>
          <BarcodeScannerComponent
            width={500}
            height={300}
            onUpdate={handleScan}
          />
          <button onClick={() => setScanning(false)}>❌ Stop Scanning</button>
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
        <input type="text" name="barcode" placeholder="Barcode" value={form.barcode} onChange={handleChange} required /><br/>
        <input type="text" name="name" placeholder="Product Name" value={form.name} onChange={handleChange} required /><br/>
        <input type="number" name="price" placeholder="Price" value={form.price} onChange={handleChange} required /><br/>
        <input type="number" name="quantity" placeholder="Quantity" value={form.quantity} onChange={handleChange} required /><br/>
        <input type="text" name="category" placeholder="Category" value={form.category} onChange={handleChange} /><br/>
        <input type="date" name="expiryDate" value={form.expiryDate} onChange={handleChange} /><br/>
        <button type="submit">Add / Update Product</button>
      </form>
    </div>
  );
}

export default Shopkeeper;

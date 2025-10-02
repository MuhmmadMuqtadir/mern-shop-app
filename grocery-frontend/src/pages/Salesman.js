import React, { useState } from "react";
import axios from "axios";
import BarcodeScannerComponent from "react-qr-barcode-scanner";

function Salesman() {
  const [barcode, setBarcode] = useState("");
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const handleScan = async (err, result) => {
    if (result) {
      setBarcode(result.text);
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${result.text}`);
        setProduct(res.data);
      } catch (error) {
        console.error(error);
        alert("Product not found");
      }
    }
  };

  const handleSale = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/sales/sell", {
        barcode,
        quantitySold: quantity
      });
      alert(res.data.message);
      setProduct(null);
      setBarcode("");
      setQuantity(1);
    } catch (err) {
      console.error(err);
      alert("Error recording sale");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>💳 Salesman Portal</h2>
      
      <BarcodeScannerComponent
        width={500}
        height={300}
        onUpdate={handleScan}
      />

      {product && (
        <div style={{ marginTop: "20px" }}>
          <h3>Product Found</h3>
          <p>Name: {product.name}</p>
          <p>Price: Rs. {product.price}</p>
          <p>Stock Left: {product.quantity}</p>
          <input
            type="number"
            value={quantity}
            min="1"
            max={product.quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
          <button onClick={handleSale}>Confirm Sale</button>
        </div>
      )}
    </div>
  );
}

export default Salesman;

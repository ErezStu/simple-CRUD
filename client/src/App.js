import React, { useEffect, useState } from "react";
import axios from "axios";

import "./App.css";

function App() {
  const [productName, setpPoductName] = useState("");
  const [amount, setAmount] = useState(0);
  const [productList, setProductList] = useState([]);
  const [newProductName, setNewProductName] = useState("");

  const addHandler = () => {
    axios.post("http://localhost:3001/insert", {
      productName,
      amount,
    });
  };

  useEffect(() => {
    axios.get("http://localhost:3001/read").then((response) => {
      setProductList(response.data);
    });
  }, []);

  const updateHandler = (id) => {
    axios.put("http://localhost:3001/update", {
      id,
      newProductName,
    });
  };

  const deleteHandler = (id) => {
    axios.delete(`http://localhost:3001/delete/${id}`);
  };

  return (
    <div className="App">
      <h1>CRUD APP WITH MERN</h1>
      <label>Product Name:</label>
      <input type="text" onChange={(e) => setpPoductName(e.target.value)} />
      <label>Amount:</label>

      <input type="number" onChange={(e) => setAmount(e.target.value)} />
      <button onClick={addHandler}>ADD TO LIST</button>
      <hr />
      <h1>Product List</h1>
      {productList.map((product, i) => (
        <div key={i}>
          <h1>{product.productName}</h1>
          <h4>{product.amount}</h4>
          <input
            type="text"
            placeholder="new food name"
            onChange={(e) => setNewProductName(e.target.value)}
          />
          <button onClick={() => updateHandler(product._id)}>Update</button>
          <button onClick={() => deleteHandler(product._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;

import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AllProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    function getProducts() {
      axios.get("http://localhost:8070/Product/")
        .then((res) => {
          console.log(res.data); // Assuming the data is in res.data
          setProducts(res.data); // Set the products state with fetched data
        })
        .catch((err) => {
          alert(err.message);
        });
    }

    getProducts();
  }, []);

  return (
    <div className="container">
      <table >
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Expire Date</th>
            <th>Update</th> {/* New column for update button */}
            <th>Delete</th> {/* New column for delete button */}
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>{product.price}</td>
              <td>{product.quantity}</td>
              <td>{product.expireDate}</td>
              <td>
                <button >Update</button>  {/* onClick={() => handleUpdate(product)}*/}
              </td>
              <td>
                <button >Delete</button>  {/* onClick={() => handleDelete(product._id)}*/}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

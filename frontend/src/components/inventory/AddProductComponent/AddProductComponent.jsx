import React, { useEffect, useState } from 'react';
import './addProductComponent.css';
import config from '../../../config';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from '../../../firebase'

function AddProductComponent() {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [Manufactured_price, setManufactured_price] = useState('');
  const [discount, setDiscount] = useState('');
  const [quantity, setQuantity] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [expireDate, setExpireDate] = useState('');
  const [manufactureDate, setManufactureDate] = useState('');
  const [productImg, setProductImg] = useState(undefined);
  const [inputs, setInputs] = useState({});
  const [image, setImage] = useState('');

  useEffect(() => {
    productImg && uploadFile(productImg, "imgUrl");
  }, [productImg]);

  const uploadFile = (file, fileType) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, 'images/' + fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
  


  // Listen for state changes, errors, and completion of the upload.
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
      }
    }, 
    (error) => {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case 'storage/unauthorized':
          // User doesn't have permission to access the object
          break;
        case 'storage/canceled':
          // User canceled the upload
          break;
  
        // ...
  
        case 'storage/unknown':
          // Unknown error occurred, inspect error.serverResponse
          break;
      }
    }, 
    () => {
      // Upload completed successfully, now we can get the download URL
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log('DownloadURL - ', downloadURL);
        setImage(downloadURL);
        console.log('Uploaded img URL - ', image);
      });
    }
  );

  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    const newProduct = {
      name,
      category,
      description,
      price,
      Manufactured_price,
      discount,
      quantity,
      image,
      ingredients,
      expireDate,
      manufactureDate,
    };

    try {
      const response = await fetch(`${config.BASE_URL}/productNew/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });
      if (response.ok) {
        alert('Product added successfully!');
        setName('');
        setCategory('');
        setDescription('');
        setPrice('');
        setManufactured_price('');
        setDiscount('');
        setQuantity('');
        setIngredients('');
        setExpireDate('');
        setManufactureDate('');
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="staff-inventory-new-product-add-form-allContent">
      <form onSubmit={handleSubmit}>
        <div className="staff-inventory-new-product-add-form-group staff-inventory-new-product-add-row">
          <label htmlFor="name" className="staff-inventory-new-product-add-label">Name:</label>
          <div className="staff-inventory-new-product-add-input">
            <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
        </div>
        <div className="staff-inventory-new-product-add-form-group staff-inventory-new-product-add-row">
          <label htmlFor="category" className="staff-inventory-new-product-add-label">Category:</label>
          <div className="staff-inventory-new-product-add-input">
            <select id="category" value={category} onChange={(e) => setCategory(e.target.value)} required>
              <option value="">Select Category</option>
              <option value="Hair Care">Hair Care</option>
              <option value="Face and Body Care">Face and Body Care</option>
              <option value="Pain and Safety">Pain and Safety</option>
              <option value="Others">Others</option>
            </select>
          </div>
        </div>
        <div className="staff-inventory-new-product-add-form-group staff-inventory-new-product-add-row">
          <label htmlFor="description" className="staff-inventory-new-product-add-label">Description:</label>
          <div className="staff-inventory-new-product-add-input">
            <textarea className="form-control" id="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
          </div>
        </div>
        <div className="staff-inventory-new-product-add-form-group staff-inventory-new-product-add-row">
          <label htmlFor="price" className="staff-inventory-new-product-add-label">Price:</label>
          <div className="staff-inventory-new-product-add-input">
            <input type="number" className="form-control" id="price" value={price} onChange={(e) => setPrice(e.target.value)} required />
          </div>
        </div>
        <div className="staff-inventory-new-product-add-form-group staff-inventory-new-product-add-row">
          <label htmlFor="Manufactured_price" className="staff-inventory-new-product-add-label">Manufactured Price:</label>
          <div className="staff-inventory-new-product-add-input">
            <input type="number" className="form-control" id="Manufactured_price" value={Manufactured_price} onChange={(e) => setManufactured_price(e.target.value)} required />
          </div>
        </div>
        <div className="staff-inventory-new-product-add-form-group staff-inventory-new-product-add-row">
          <label htmlFor="discount" className="staff-inventory-new-product-add-label">Discount:</label>
          <div className="staff-inventory-new-product-add-input">
            <input type="number" className="form-control" id="discount" value={discount} onChange={(e) => setDiscount(e.target.value)} />
          </div>
        </div>
        <div className="staff-inventory-new-product-add-form-group staff-inventory-new-product-add-row">
          <label htmlFor="quantity" className="staff-inventory-new-product-add-label">Quantity:</label>
          <div className="staff-inventory-new-product-add-input">
            <input type="number" className="form-control" id="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
          </div>
        </div>
        <div className="staff-inventory-new-product-add-form-group staff-inventory-new-product-add-row">
          <label htmlFor="ingredients" className="staff-inventory-new-product-add-label">Ingredients:</label>
          <div className="staff-inventory-new-product-add-input">
            <input type="text" className="form-control" id="ingredients" value={ingredients} onChange={(e) => setIngredients(e.target.value)} required />
          </div>
        </div>
        <div className="staff-inventory-new-product-add-form-group staff-inventory-new-product-add-row">
          <label htmlFor="expireDate" className="staff-inventory-new-product-add-label">Expire Date:</label>
          <div className="staff-inventory-new-product-add-input">
            <input type="date" className="form-control" id="expireDate" value={expireDate} onChange={(e) => setExpireDate(e.target.value)} required />
          </div>
        </div>
        <div className="staff-inventory-new-product-add-form-group staff-inventory-new-product-add-row">
          <label htmlFor="manufactureDate" className="staff-inventory-new-product-add-label">Manufacture Date:</label>
          <div className="staff-inventory-new-product-add-input">
            <input type="date" className="form-control" id="manufactureDate" value={manufactureDate} onChange={(e) => setManufactureDate(e.target.value)} required />
          </div>
        </div>

        <div className="staff-inventory-new-product-add-form-group staff-inventory-new-product-add-row">
          <label htmlFor="manufactureDate" className="staff-inventory-new-product-add-label">Image:</label>
          <div className="staff-inventory-new-product-add-input">
            <input type="file" accept='image/' className="form-control" id="manufactureDate" onChange={(e) => setProductImg((prev) => e.target.files[0])} />
          </div>
        </div>

        <div className="staff-inventory-new-product-add-form-group staff-inventory-new-product-add-row">
          <div className="staff-inventory-new-product-add-input staff-inventory-new-product-add-offset">
            <button type="submit" className="btn btn-primary staff-inventory-new-product-add-button">Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddProductComponent;

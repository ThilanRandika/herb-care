import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Container, Form, Alert } from "react-bootstrap";
import config from "../../config";

const CreatePackage = () => {
  // State variables for form inputs and messages
  const [name, setName] = useState("");
  const [images, setImages] = useState([]);
  const [description, setDescription] = useState("");
  const [defaultPrice, setDefaultPrice] = useState("");
  const [selectedDefaultServices, setSelectedDefaultServices] = useState([]);
  const [selectedAddOnServices, setSelectedAddOnServices] = useState([]);
  const [defaultServices, setDefaultServices] = useState([]);
  const [addOnServices, setAddOnServices] = useState([]);
  const [hotelName, setHotelName] = useState("");
  const [hotelLocation, setHotelLocation] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch services from backend on component mount
  useEffect(() => {
    axios
      .get(`${config.BASE_URL}/services`)
      .then((response) => {
        // Separate default and add-on services
        const defaultServices = response.data.filter(
          (service) => service.isDefault
        );
        const addOnServices = response.data.filter(
          (service) => !service.isDefault
        );
        setDefaultServices(defaultServices);
        setAddOnServices(addOnServices);
      })
      .catch((error) => console.error("Error fetching services:", error));
  }, []);

  // Handle checkbox change for selecting services
  const handleCheckboxChange = (serviceId, isDefault) => {
    if (isDefault) {
      setSelectedDefaultServices((prevServices) =>
        prevServices.includes(serviceId)
          ? prevServices.filter((id) => id !== serviceId)
          : [...prevServices, serviceId]
      );
    } else {
      setSelectedAddOnServices((prevServices) =>
        prevServices.includes(serviceId)
          ? prevServices.filter((id) => id !== serviceId)
          : [...prevServices, serviceId]
      );
    }
  };

  // Render checkboxes for services
  const renderServices = (services, isDefault) => {
    return services.map((service) => (
      <Form.Check
        key={service._id}
        type="checkbox"
        id={`${isDefault ? "defaultService" : "addOnService"}-${service._id}`}
        label={service.name}
        checked={
          isDefault
            ? selectedDefaultServices.includes(service._id)
            : selectedAddOnServices.includes(service._id)
        }
        onChange={() => handleCheckboxChange(service._id, isDefault)}
        className="mb-2"
      />
    ));
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Create package object
    const packageData = {
      name,
      images,
      description,
      defaultPrice: parseFloat(defaultPrice),
      defaultServices: selectedDefaultServices,
      addOnServices: selectedAddOnServices,
      hotelName,
      hotelLocation,
      // Add any other package fields here
    };

    // Send package data to backend to create package
    axios
      .post(`${config.BASE_URL}/packages`, packageData)
      .then((response) => {
        setSuccessMessage("Package created successfully");
        setErrorMessage("");
        // Reset form fields
        setName("");
        setImages([]);
        setDescription("");
        setDefaultPrice("");
        setSelectedDefaultServices([]);
        setSelectedAddOnServices([]);
        setHotelName("");
        setHotelLocation("");
        // Optionally, redirect to package details page or another route
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.status === 400 &&
          error.response.data.error ===
            "Package with the same name already exists."
        ) {
          // Package name already exists, set error message
          setSuccessMessage("");
          setErrorMessage(error.response.data.error);
        } else {
          setSuccessMessage("");
          setErrorMessage("Package already exists.");
          console.error("Error creating package:", error);
        }
      });
  };

  return (
    <Container className="mt-5">
      {/* Form for creating a package */}
      <h2 className="mb-4">Create Package</h2>
      {/* Success and error messages */}
      {successMessage && (
        <Alert variant="success" className="mb-4">
          {successMessage}
        </Alert>
      )}
      {errorMessage && (
        <Alert variant="danger" className="mb-4">
          {errorMessage}
        </Alert>
      )}
      {/* Package creation form */}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Package Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mt-2" controlId="images">
          <Form.Label>Images (Comma-separated URLs)</Form.Label>
          <Form.Control
            type="text"
            value={images.join(",")}
            onChange={(e) => setImages(e.target.value.split(","))}
          />
        </Form.Group>
        <Form.Group className="mt-2" controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mt-2" controlId="defaultPrice">
          <Form.Label>Default Price ($)</Form.Label>
          <Form.Control
            type="number"
            value={defaultPrice}
            onChange={(e) => setDefaultPrice(e.target.value)}
          />
        </Form.Group>
        {/* Default services */}
        <Form.Group className="mt-4" controlId="defaultServices">
          <Form.Label style={{ fontWeight: "bold" }}>
            Default Services
          </Form.Label>
          {renderServices(defaultServices, true)}
        </Form.Group>
        {/* Add-on services */}
        <Form.Group className="mt-4" controlId="addOnServices">
          <Form.Label style={{ fontWeight: "bold" }}>
            Add-On Services
          </Form.Label>
          {renderServices(addOnServices, false)}
        </Form.Group>
        <Form.Group className="mt-4" controlId="hotelName">
          <Form.Label>Hotel Name</Form.Label>
          <Form.Control
            type="text"
            value={hotelName}
            onChange={(e) => setHotelName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mt-2" controlId="hotelLocation">
          <Form.Label>Hotel Location</Form.Label>
          <Form.Control
            type="text"
            value={hotelLocation}
            onChange={(e) => setHotelLocation(e.target.value)}
          />
        </Form.Group>
        {/* Submit button */}
        <Button className="mt-4 mb-4" variant="primary" type="submit">
          Create Package
        </Button>
      </Form>
    </Container>
  );
};

export default CreatePackage;

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Button,
  Card,
  Row,
  Col,
  Modal,
  Form,
} from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import Header from "./Header";
import config from "../../config";

const ManageServices = () => {
  const [services, setServices] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newService, setNewService] = useState({
    category: "",
    name: "",
    description: "",
    price: 0,
    isDefault: false,
  });
  const [selectedService, setSelectedService] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get(`${config.BASE_URL}/services`);
      setServices(response.data);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  const handleAddService = async () => {
    try {
      await axios.post(`${config.BASE_URL}/services`, newService);
      setShowAddModal(false);
      setNewService({
        category: "",
        name: "",
        description: "",
        price: 0,
        isDefault: false,
      });
      fetchServices();
    } catch (error) {
      console.error("Error adding service:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewService((prevService) => ({
      ...prevService,
      [name]: value,
    }));
  };

  const handleCloseAddModal = () => setShowAddModal(false);

  const handleEditService = (service) => {
    setSelectedService(service);
    setShowEditModal(true);
  };

  const handleSaveEdit = async () => {
    try {
      await axios.patch(
        `${config.BASE_URL}/services/${selectedService._id}`,
        selectedService
      );
      setShowEditModal(false);
      fetchServices();
    } catch (error) {
      console.error("Error updating service:", error);
    }
  };

  const handleCloseEditModal = () => setShowEditModal(false);

  const handleDeleteService = async () => {
    try {
      await axios.delete(
        `${config.BASE_URL}/services/${selectedService._id}`
      );
      fetchServices();
      handleCloseDeleteModal();
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  };

  const handleCloseDeleteModal = () => setShowDeleteModal(false);

  return (
    <Container>
      <Header />
      <Container className="mt-4">
        <Button
          variant="primary"
          className="mb-3"
          onClick={() => setShowAddModal(true)}
        >
          Add Service
        </Button>
        <Row xs={1} md={2} lg={3} className="g-4">
          {services.map((service) => (
            <Col key={service._id}>
              <Card className="p-3" style={{ width: "300px", height: "275px" }}>
                <Card.Body>
                  <Card.Title>{service.name}</Card.Title>
                  <hr className="my-2" />
                  <Card.Subtitle className="mb-2 text-muted">
                    Category: {service.category}
                  </Card.Subtitle>
                  <hr className="my-2" />
                  <Card.Text>{service.description}</Card.Text>
                  <hr className="my-2" />
                  <Card.Text className="text-primary mb-2">
                    <strong>Price:</strong> ${service.price}
                  </Card.Text>
                  <div className="d-flex justify-content-end">
                    <FaEdit
                      className="me-2 text-warning"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleEditService(service)}
                    />
                    <FaTrash
                      className="text-danger"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setSelectedService(service);
                        setShowDeleteModal(true);
                      }}
                    />
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      {/* Add Service Modal */}
      <Modal show={showAddModal} onHide={handleCloseAddModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Service</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                name="category"
                value={newService.category}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={newService.name}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={newService.description}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="price">
              <Form.Label>Price ($)</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={newService.price}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddService}>
            Add Service
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Edit Service Modal */}
      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Manage Services</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                name="category"
                value={selectedService?.category}
                onChange={(e) =>
                  setSelectedService({
                    ...selectedService,
                    category: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={selectedService?.name}
                onChange={(e) =>
                  setSelectedService({
                    ...selectedService,
                    name: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={selectedService?.description}
                onChange={(e) =>
                  setSelectedService({
                    ...selectedService,
                    description: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group controlId="price">
              <Form.Label>Price ($)</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={selectedService?.price}
                onChange={(e) =>
                  setSelectedService({
                    ...selectedService,
                    price: e.target.value,
                  })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveEdit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Delete Service Modal */}
      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Service</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this service?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteService}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ManageServices;

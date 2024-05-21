import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  Button,
  Container,
  Row,
  Col,
  Modal,
  Form,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import Header from "./Header";

const EditPackages = () => {
  const [packages, setPackages] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState({});
  const [editedPackage, setEditedPackage] = useState({});
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deletePackageId, setDeletePackageId] = useState(null);

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const response = await axios.get("http://localhost:8070/packages");
      setPackages(response.data);
    } catch (error) {
      console.error("Error fetching packages:", error);
    }
  };

  const handleViewDetails = (pkg) => {
    setSelectedPackage(pkg);
    setShowDetails(true);
  };

  const handleCloseDetails = () => setShowDetails(false);

  const handleEditPackage = (pkg) => {
    setSelectedPackage(pkg);
    setEditedPackage({ ...pkg });
    setShowEdit(true);
  };

  const handleCloseEdit = () => setShowEdit(false);

  const handleSaveEdit = async () => {
    try {
      await axios.patch(
        `http://localhost:8070/packages/${selectedPackage._id}`,
        editedPackage
      );
      setShowEdit(false);
      fetchPackages();
    } catch (error) {
      console.error("Error updating package:", error);
    }
  };

  const handleDeletePackage = (pkgId) => {
    setDeletePackageId(pkgId);
    setShowDeleteConfirm(true);
  };

  const handleCloseDeleteConfirm = () => setShowDeleteConfirm(false);

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:8070/packages/${deletePackageId}`);
      setShowDeleteConfirm(false);
      fetchPackages();
    } catch (error) {
      console.error("Error deleting package:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedPackage((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Container>
      <Header />
      <Container>
        <h2 className="mb-4 mt-4">Edit Packages</h2>
        <Row xs={1} md={2} lg={3} className="g-4">
          {packages.map((pkg) => (
            <Col key={pkg._id}>
              <Card style={{ width: "20rem", height: "30rem" }}>
                <Card.Img variant="top" src={pkg.images[0]} />
                <Card.Body>
                  <Card.Title>{pkg.name}</Card.Title>
                  <Card.Text className="mb-3">{pkg.description}</Card.Text>
                  <Card.Text>
                    <strong>Price:</strong> ${pkg.defaultPrice}
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <Link to="#">
                    <FaEye
                      onClick={() => handleViewDetails(pkg)}
                      className="me-2"
                    />
                  </Link>
                  <Link to="#">
                    <FaEdit
                      onClick={() => handleEditPackage(pkg)}
                      className="me-2"
                    />
                  </Link>
                  <Link to="#">
                    <FaTrash onClick={() => handleDeletePackage(pkg._id)} />
                  </Link>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
        <Modal show={showDetails} onHide={handleCloseDetails}>
          <Modal.Header closeButton>
            <Modal.Title>Package Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Name: {selectedPackage.name}</p>
            <p>Description: {selectedPackage.description}</p>
            {/* Add other package details here */}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseDetails}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={showEdit} onHide={handleCloseEdit}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Package</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={editedPackage.name || ""}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  value={editedPackage.description || ""}
                  onChange={handleInputChange}
                />
              </Form.Group>
              {/* Add other form fields here */}
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseEdit}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSaveEdit}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={showDeleteConfirm} onHide={handleCloseDeleteConfirm}>
          <Modal.Header closeButton>Confirm Deletion</Modal.Header>
          <Modal.Body>Are you sure you want to delete this package?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseDeleteConfirm}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleConfirmDelete}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </Container>
  );
};

export default EditPackages;

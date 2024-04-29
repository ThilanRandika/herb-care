import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const ViewPackages = () => {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    // Fetch packages from backend on component mount
    axios
      .get("http://localhost:8070/packages")
      .then((response) => {
        setPackages(response.data);
      })
      .catch((error) => console.error("Error fetching packages:", error));
  }, []);

  return (
    <Container>
      <Header />
      <Container className="mt-5">
        <h2 className="mb-4">All Packages</h2>
        <Row>
          {packages.map((Package) => (
            <Col key={Package._id} md={4} className="mb-4">
              <Card>
                <Card.Img variant="top" src={Package.images[0]} />
                <Card.Body>
                  <Card.Title>{Package.name}</Card.Title>
                  <Card.Text>{Package.description}</Card.Text>
                  <Card.Text>
                    <strong>Price:</strong> ${Package.defaultPrice}
                  </Card.Text>
                  {/* Link to package details page */}
                  <Link to={`/packages/${Package._id}`}>
                    <Button variant="primary">View Details</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </Container>
  );
};

export default ViewPackages;

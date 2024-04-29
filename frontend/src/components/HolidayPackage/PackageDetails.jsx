import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Header from "./Header";
import { Container, Row, Col, Card, Button, ListGroup } from "react-bootstrap";

const PackageDetails = () => {
  const { id } = useParams();
  const [packageDetails, setPackageDetails] = useState(null);
  const [defaultServices, setDefaultServices] = useState([]);
  const [addOnServices, setAddOnServices] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8070/packages/${id}`)
      .then((response) => {
        setPackageDetails(response.data);
        // Fetch default services related to the package
        return Promise.all(
          response.data.defaultServices.map((serviceId) =>
            axios.get(`http://localhost:8070/services/${serviceId}`)
          )
        );
      })
      .then((responses) => {
        setDefaultServices(responses.map((res) => res.data));
        // Fetch add-on services related to the package
        return Promise.all(
          packageDetails.addOnServices.map((serviceId) =>
            axios.get(`http://localhost:8070/services/${serviceId}`)
          )
        );
      })
      .then((responses) => {
        setAddOnServices(responses.map((res) => res.data));
      })
      .catch((error) =>
        console.error("Error fetching package details:", error)
      );
  }, [id]);

  return (
    <Container>
      <Header />
      {packageDetails && (
        <Container className="mt-5">
          <h2>{packageDetails.name}</h2>
          <Row className="mt-4">
            <Col md={6}>
              <Card>
                <Card.Img variant="top" src={packageDetails.images[0]} />
                <Card.Body>
                  <Card.Text>{packageDetails.description}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card>
                <Card.Body>
                  <Card.Text>
                    <strong>Price:</strong> ${packageDetails.defaultPrice}
                  </Card.Text>
                  <div className="mb-4">
                    <h5>Default Services:</h5>
                    <ListGroup variant="flush">
                      {defaultServices.map((service) => (
                        <ListGroup.Item key={service._id}>
                          {service.name}
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </div>
                  <div className="mb-4">
                    <h5>Add-On Services:</h5>
                    <ListGroup variant="flush">
                      {addOnServices.map((service) => (
                        <ListGroup.Item key={service._id}>
                          {service.name}
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </div>
                  <Button variant="primary" className="mt-3">
                    Book Now
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      )}
    </Container>
  );
};

export default PackageDetails;

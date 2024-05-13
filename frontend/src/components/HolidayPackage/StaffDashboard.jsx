import React, { useState } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { FaSuitcase, FaUtensils, FaCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const StaffDashboard = () => {
  const [showPackages, setShowPackages] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const [showBookings, setShowBookings] = useState(false);

  const handlePackageManagementClick = () => {
    setShowPackages(true);
    setShowServices(true);
    setShowBookings(true);
  };

  return (
    <Container fluid>
      <Row className="bg-primary text-white py-3 mb-3">
        <Col className="text-center">
          <h1>Holiday Staff Dashboard</h1>
        </Col>
      </Row>
      <Row>
        <Col md={3} className="bg-light p-3 mt-3">
          <Button
            variant="info"
            className="w-100 mb-3"
            onClick={handlePackageManagementClick}
          >
            Holiday Package Management
          </Button>
          {/* Add other buttons for side panel as needed */}
        </Col>
        <Col md={8} className="p-3">
          <Container>
            <Row>
              <Col md={4}>
                {showPackages && (
                  <Link to="/ManagePackages" className="text-decoration-none">
                    <Card
                      className="mb-3 custom-card"
                      style={{ width: "100%", height: "100%" }}
                    >
                      <Card.Header className="bg-primary text-white">
                        <FaSuitcase /> Holiday Packages
                      </Card.Header>
                      <Card.Body>
                        <p>
                          List of holiday packages will be displayed here...
                        </p>
                      </Card.Body>
                    </Card>
                  </Link>
                )}
              </Col>
              <Col md={4}>
                {showServices && (
                  <Link to="/manageServices" className="text-decoration-none">
                    <Card
                      className="mb-3 custom-card"
                      style={{ width: "100%", height: "100%" }}
                    >
                      <Card.Header className="bg-success text-white">
                        <FaUtensils /> Holiday Services
                      </Card.Header>
                      <Card.Body>
                        <p>
                          List of holiday services will be displayed here...
                        </p>
                      </Card.Body>
                    </Card>
                  </Link>
                )}
              </Col>
              <Col md={4}>
                {showBookings && (
                  <Link to="/holiday-bookings" className="text-decoration-none">
                    <Card
                      className="mb-3 custom-card"
                      style={{ width: "100%", height: "100%" }}
                    >
                      <Card.Header className="bg-warning text-white">
                        <FaCalendarAlt /> Holiday Bookings
                      </Card.Header>
                      <Card.Body>
                        <p>
                          List of holiday bookings will be displayed here...
                        </p>
                      </Card.Body>
                    </Card>
                  </Link>
                )}
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default StaffDashboard;

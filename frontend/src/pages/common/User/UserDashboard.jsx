import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import './UserDashboard.css';
import Footer from '../../../components/common/footer/footer'

function StaffMainDashboard() {
  return (
    <>
      {[false].map((expand) => (
        <Navbar key={expand} expand={expand} className="bg-custom mb-3">
          <Container fluid>
            <Navbar.Brand as={Link} to="/" className="UDB_home">
              Home
            </Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  User Dashboard
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <div className="d-flex align-items-center">
                  <img
                    src="https://img.icons8.com/bubbles/100/000000/user.png" // Change the image URL here
                    className="img-radius me-3"
                    alt="User-Profile-Image"
                  />
                  <div>
                    <h6 className="text-white">Harshsna</h6> {/* Change the name here */}
                    <p className="text-muted">Customer</p>
                  </div>
                </div><br></br>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <NavDropdown
                    title="Order History"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                    data-bs-theme="dark"
                  >
                    <NavDropdown.Item as={Link} to="/myOrders" className="UDB_ProOrder">
                      Product Orders
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/DisplayGiftPackageUser" className="UDB_GiftOrd">
                      Gift Package Orders
                    </NavDropdown.Item>
                  </NavDropdown>

                  <Nav.Link as={Link} to="" className="UDB_HolBookHis">Holiday Package Booking History</Nav.Link>

                  <NavDropdown
                    title="Consultation History"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                    data-bs-theme="dark"
                  >
                    <NavDropdown.Item as={Link} to="../consultation/myConsultations/myOngoingConsultations" className="UDB_profeedHis">My Consultation</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="../consultation/refunds/myRefunds" className="UDB_GiftPafeedHis">Consultation Refunds</NavDropdown.Item>
                  </NavDropdown>

                  <Nav.Link as={Link} to="/Feedback&Complains/DisplayComplaintsUser" className="UDB_compHis">Complaints History</Nav.Link>

                  <NavDropdown
                    title="Feedback History"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                    data-bs-theme="dark"
                  >
                    <NavDropdown.Item as={Link} to="/Feedback&Complains/DisplayFeedbackUser" className="UDB_profeedHis">Product Feedbacks</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/Feedback&Complains/DisplayFeedbackGiftPackageUser" className="UDB_GiftPafeedHis">Gift Package Feedbacks</NavDropdown.Item>
                  </NavDropdown>

                  <Nav.Link as={Link} to="/Login" className="UDB_LOGOUT">LogOut</Nav.Link>
                </Nav>
                {/* Your existing Form and Button elements */}
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
      <div className="page-content page-container" id="page-content">
        <div className="padding">
          <div className="row justify-content-left UDBP_USER">
          <div className="col-sm-4 mb-3 user-profile">  
              <div className="col-xl-6 col-md-12">
                <div className="card user-card-full UDBP_CARDAA">
                  <div className="row m-l-0 m-r-0">
                    <div className="col-sm-4 bg-custom-profile mb-3 user-profile UDBP_incardX">
                      <div className="card-block text-center text-white">
                        <div className="m-b-25">
                          <img src="https://img.icons8.com/bubbles/100/000000/user.png" className="img-radius" alt="User-Profile-Image"></img> {/* Change the image URL here */}
                        </div>
                        <h6 className="f-w-600">Harshana</h6> {/* Change the name here */}
                        <p>Customer</p>
                        <i className=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                      </div>
                    </div>
                    <div className="col-sm-8">
                      <div className="card-block">
                        <h6 className="m-b-20 p-b-5 b-b-default f-w-600">Information</h6>
                        <div className="row">
                          <div className="col-sm-6">
                            <p className="m-b-10 f-w-600">Name</p>
                            <h6 className="text-muted f-w-400">Harshana</h6> {/* Change the name here */}
                          </div>
                          <div className="col-sm-6">
                            <p className="m-b-10 f-w-600">Address</p>
                            <h6 className="text-muted f-w-400">No-58 Malabe, Colombo</h6>
                          </div>
                          <div className="col-sm-6">
                            <p className="m-b-10 f-w-600">Email</p>
                            <h6 className="text-muted f-w-400">john.doe@example.com</h6> {/* Change the email here */}
                          </div>
                          <div className="col-sm-6">
                            <p className="m-b-10 f-w-600">Phone</p>
                            <h6 className="text-muted f-w-400">0765764354</h6> {/* Change the phone number here */}
                          </div>
                        </div>
                        <h6 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">Projects</h6>
                        <div className="row">
                          <div className="col-sm-6">
                            <p className="m-b-10 f-w-600">Orders</p>
                            <h6 className="text-muted f-w-400">10</h6> {/* Change the order count here */}
                          </div>
                          <div className="col-sm-6">
                            <p className="m-b-10 f-w-600">Bookings</p>
                            <h6 className="text-muted f-w-400">3</h6> {/* Change the booking count here */}
                          </div>
                          <div className="col-sm-6">
                            <p className="m-b-10 f-w-600">Feedbacks</p>
                            <h6 className="text-muted f-w-400">24</h6> {/* Change the feedback count here */}
                          </div>
                          <div className="col-sm-6">
                            <p className="m-b-10 f-w-600">Consultation Appointment</p>
                            <h6 className="text-muted f-w-400">4</h6> {/* Change the appointment count here */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}

export default StaffMainDashboard;



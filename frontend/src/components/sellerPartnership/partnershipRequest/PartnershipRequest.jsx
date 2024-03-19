import React from 'react';
import "./partnershipRequest.css";


function PartnershipRequest(props) {
  return (props.trigger) ? (
    <>
    
    <div className='popup'>
        <div className="popup-inner">
            <button className="close-btn" onClick={() => props.setPopupVisible(false)}>close</button>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous"></link>
            <form>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Your Name</label>
                    <input type="text" className="form-control" id="exampleInputName1" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Company Name</label>
                    <input type="text" className="form-control" id="exampleInputName2"  />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Company Discription</label>
                    <textarea type="textArea" className="form-control" id="exampleInputDescription1"  />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Address</label>
                    <input type="text" className="form-control" id="exampleInputAddress1"  />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Contact Number</label>
                    <input type="phone" className="form-control" id="exampleInputPhoneNUmber1"  />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Company  Website (Optional)</label>
                    <input type="text" className="form-control" id="exampleInputEmail1"  />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Tax Id</label>
                    <input type="text" className="form-control" id="exampleInputEmail1"  />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    </div>

    </>
  ) : null; // Changed to null to avoid rendering empty div
}

export default PartnershipRequest;

import React from 'react';
import './sellerProfile.css';

function SellerProfile() {
  return (
    <>
    <div>SellerProfile</div>
    <div className="seller-profile-container light-style flex-grow-1 container-p-y">
        <h4 className="font-weight-bold py-3 mb-4">
            Account settings
        </h4>
        <div className="card overflow-hidden">
            <div className="row no-gutters row-bordered row-border-light">
                <div className="col-md-3 pt-0">
                    <div className="list-group list-group-flush seller-profile-account-settings-links">
                        <a className="list-group-item list-group-item-action active" data-toggle="list"
                            href="#seller-profile-account-general">General</a>
                        <a className="list-group-item list-group-item-action" data-toggle="list"
                            href="#seller-profile-account-change-password">Change password</a>
                        <a className="list-group-item list-group-item-action" data-toggle="list"
                            href="#seller-profile-account-info">Info</a>
                        <a className="list-group-item list-group-item-action" data-toggle="list"
                            href="#seller-profile-account-social-links">Social links</a>
                    </div>
                </div>
                <div className="col-md-9">
                    <div className="tab-content">
                        <div className="tab-pane fade active show" id="seller-profile-account-general">
                            <div className="card-body media align-items-center">
                                <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt
                                    className="d-block seller-profile-ui-w-80"/>
                                <div className="media-body ml-4">
                                    <label className="btn btn-outline-primary">
                                        Upload new photo
                                        <input type="file" className="seller-profile-account-settings-fileinput"/>
                                    </label> &nbsp;
                                    <button type="button" className="btn btn-default md-btn-flat">Reset</button>
                                    <div className="text-light small mt-1">Allowed JPG, GIF or PNG. Max size of 800K</div>
                                </div>
                            </div>
                            <hr className="border-light m-0"/>
                            <div className="card-body">
                                <div className="form-group">
                                    <label className="form-label">Username</label>
                                    <input type="text" className="form-control mb-1" value="nmaxwell"/>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Name</label>
                                    <input type="text" className="form-control" value="Nelle Maxwell"/>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">E-mail</label>
                                    <input type="text" className="form-control mb-1" value="nmaxwell@mail.com"/>
                                    <div className="alert alert-warning mt-3">
                                        Your email is not confirmed. Please check your inbox.<br/>
                                        <a href="javascript:void(0)">Resend confirmation</a>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Company</label>
                                    <input type="text" className="form-control" value="Company Ltd."/>
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane fade" id="seller-profile-account-change-password">
                            <div className="card-body pb-2">
                                <div className="form-group">
                                    <label className="form-label">Current password</label>
                                    <input type="password" className="form-control"/>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">New password</label>
                                    <input type="password" className="form-control"/>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Repeat new password</label>
                                    <input type="password" className="form-control"/>
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane fade" id="seller-profile-account-info">
                            <div className="card-body pb-2">
                                <div className="form-group">
                                    <label className="form-label">Bio</label>
                                    <textarea className="form-control"
                                        rows="5">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nunc arcu, dignissim sit amet sollicitudin iaculis, vehicula id urna. Sed luctus urna nunc. Donec fermentum, magna sit amet rutrum pretium, turpis dolor molestie diam, ut lacinia diam risus eleifend sapien. Curabitur ac nibh nulla. Maecenas nec augue placerat, viverra tellus non, pulvinar risus.</textarea>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Birthday</label>
                                    <input type="text" className="form-control" value="May 3, 1995"/>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Country</label>
                                    <select className="custom-select">
                                        <option>USA</option>
                                        <option selected>Canada</option>
                                        <option>UK</option>
                                        <option>Germany</option>
                                        <option>France</option>
                                    </select>
                                </div>
                            </div>
                            <hr className="border-light m-0"/>
                            <div className="card-body pb-2">
                                <h6 className="mb-4">Contacts</h6>
                                <div className="form-group">
                                    <label className="form-label">Phone</label>
                                    <input type="text" className="form-control" value="+0 (123) 456 7891"/>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Website</label>
                                    <input type="text" className="form-control" value=""/>
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane fade" id="seller-profile-account-social-links">
                            
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
        <div className="text-right mt-3">
            <button type="button" className="btn btn-primary">Save changes</button>&nbsp;
            <button type="button" className="btn btn-default">Cancel</button>
        </div>
    </div>
        
    </>
  );
}

export default SellerProfile;

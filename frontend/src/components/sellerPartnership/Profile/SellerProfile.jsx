import React, { useContext } from 'react';
import { AuthContext } from "../../../context/AuthContext";
import './sellerProfile.css';

function SellerProfile() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <div className="seller-profile-title">SellerProfile</div>
      <div className="seller-profile-container">
        <h4 className="font-weight-bold py-3 mb-4">
          Account settings
        </h4>
        <div className="seller-profile-card">
          <div className="row no-gutters row-bordered row-border-light">
            <div className="col-md-3 pt-0">
              <div className="seller-profile-card-body">
                <div className="seller-profile-avatar-container">
                  <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="Profile" className="seller-profile-avatar" />
                </div>
                <div className="seller-profile-info">
                  <label className="seller-profile-btn">
                    Upload
                    <input type="file" className="seller-profile-account-settings-fileinput" style={{ display: 'none' }} />
                  </label>
                  &nbsp;
                  <button type="button" className="seller-profile-btn seller-profile-reset-btn">Reset</button>
                  <div className="seller-profile-hint">Allowed JPG, GIF or PNG. Max size of 800K</div>
                </div>
              </div>

              <div className="list-group list-group-flush seller-profile-account-settings-links">
                <a className="list-group-item list-group-item-action active" data-toggle="list" href="#seller-profile-account-general">General</a>
                <a className="list-group-item list-group-item-action" data-toggle="list" href="#seller-profile-account-change-password">Change password</a>
                <a className="list-group-item list-group-item-action" data-toggle="list" href="#seller-profile-account-info">Info</a>
                <a className="list-group-item list-group-item-action" data-toggle="list" href="#seller-profile-account-social-links">Social links</a>
              </div>
            </div>
            <div className="col-md-9">
              <div className="tab-content">
                <div className="tab-pane fade active show" id="seller-profile-account-general">
                  
                  <hr className="border-light m-0"/>
                  <div className="seller-profile-card-body">
                    <div className="seller-profile-form-group">
                      <label className="seller-profile-label">Username</label>
                      <input type="text" className="seller-profile-input" value={user.sellerId}/>
                    </div>
                    <div className="seller-profile-form-group">
                      <label className="seller-profile-label">Name</label>
                      <input type="text" className="seller-profile-input" value={user.seller_name}/>
                    </div>
                    <div className="seller-profile-form-group">
                      <label className="seller-profile-label">E-mail</label>
                      <input type="text" className="seller-profile-input" value={user.email}/>
                      <div className="seller-profile-alert">
                        Your email is not confirmed. Please check your inbox.<br/>
                        <a href="javascript:void(0)">Resend confirmation</a>
                      </div>
                    </div>
                    <div className="seller-profile-form-group">
                      <label className="seller-profile-label">Company</label>
                      <input type="text" className="seller-profile-input" value={user.company}/>
                    </div>
                  </div>
                </div>
                <div className="tab-pane fade" id="seller-profile-account-change-password">
                  <div className="seller-profile-card-body pb-2">
                    <div className="seller-profile-form-group">
                      <label className="seller-profile-label">Current password</label>
                      <input type="password" className="seller-profile-input"/>
                    </div>
                    <div className="seller-profile-form-group">
                      <label className="seller-profile-label">New password</label>
                      <input type="password" className="seller-profile-input"/>
                    </div>
                    <div className="seller-profile-form-group">
                      <label className="seller-profile-label">Repeat new password</label>
                      <input type="password" className="seller-profile-input"/>
                    </div>
                  </div>
                </div>
                <div className="tab-pane fade" id="seller-profile-account-info">
                  <div className="seller-profile-card-body pb-2">
                    <div className="seller-profile-form-group">
                      <label className="seller-profile-label">Company Description</label>
                      <textarea className="seller-profile-textarea" rows="5">{user.company_discription}</textarea>
                    </div>
                    <div className="seller-profile-form-group">
                      <label className="seller-profile-label">Tax ID</label>
                      <input type="text" className="seller-profile-input" value={user.tax_id}/>
                    </div>
                    <div className="seller-profile-form-group">
                      <label className="seller-profile-label">Address</label>
                      <input type="text" className="seller-profile-input" value={user.address}/>
                    </div>
                  </div>
                  <hr className="border-light m-0"/>
                  <div className="seller-profile-card-body pb-2">
                    <h6 className="mb-4">Contacts</h6>
                    <div className="seller-profile-form-group">
                      <label className="seller-profile-label">Phone</label>
                      <input type="text" className="seller-profile-input" value={user.contact_num}/>
                    </div>
                    <div className="seller-profile-form-group">
                      <label className="seller-profile-label">Website</label>
                      <input type="text" className="seller-profile-input" value={user.website}/>
                    </div>
                  </div>
                </div>
                <div className="tab-pane fade" id="seller-profile-account-social-links">
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="seller-profile-text-right mt-3">
          <button type="button" className="seller-profile-button seller-profile-button-primary">Save changes</button>&nbsp;
          <button type="button" className="seller-profile-button seller-profile-button-secondary">Cancel</button>
        </div>
      </div>
    </>
  );
}

export default SellerProfile;

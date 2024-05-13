import { useState } from 'react';
import './footer.css';
import { Link } from 'react-router-dom';

function footer() {

  return (
    <>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.1/css/all.min.css" integrity="sha256-2XFplPlrFClt0bIdPgpz8H7ojnk10H69xRqd9+uTShA=" crossorigin="anonymous" />
<section class="deneb_cta">
	<div class="container">
		<div class="cta_wrapper FOTERRR">
			<div class="row align-items-center">
				<div class="col-lg-7">
					<div class="cta_content foot_upConlet_fot_aaadddd">
						<h3>Send us your concerns</h3>
						<p>Send your ideas regarding our Ceylon Herb Care products and services. <br></br>Feel free to send any feedback or complaint.</p>
					</div>
				</div>
				<div class="col-lg-5">
					<div class="button_box">
                    <Link to="/contactUs" className="btn btn-white">Send Us</Link>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
<div>
<footer class="deneb_footer">
<div className="widget_wrapper" style={{backgroundImage: 'url(http://demo.tortoizthemes.com/deneb-html/deneb-ltr/assets/images/footer_bg.png)'}}>
		<div class="container">
			<div class="row">
				<div class="col-lg-4 col-md-6 col-12">
					<div class="widget widegt_about">
						<div class="widget_title fot_imaaaaa">
                        <img src={require('../../../Images/logo/HerbCare Logo.png')} className="img-fluid" alt="" />
						</div>
						<p>Quisque orci nisl, viverra et sem ac, tincidunt egestas massa. Morbi est arcu, hendrerit ac vehicula condimentum, euismod nec tortor praesent consequat urna.</p>
						<ul class="social FOT_icooo">
							<li><a href="https://www.facebook.com/share/h9eurd5GtKgYZXrw/?mibextid=AEUHqQ"><i class="fab fa-facebook-f"></i></a></li>
							<li><a href="ceylonherbcare.lk@gmail.com"><i class="far fa-envelope"></i></a></li>
							<li><a href="#"><i class="fab fa-instagram"></i></a></li>
						</ul>
					</div>
				</div>
				<div class="col-lg-4 col-md-6 col-sm-12">
					<div class="widget widget_link">
						<div class="widget_title">
							<h4>Links</h4>
						</div>
						<ul>
                            <li><Link to="#">About Us</Link></li>
							<li><Link to="/contactUs">Contact Us</Link></li>
							<li><Link to="#">Privacy Policy</Link></li>
                            <li><Link to="#">Support</Link></li>
						</ul>
					</div>
				</div>
				<div class="col-lg-4 col-md-6 col-sm-12">
					<div class="widget widget_contact">
						<div class="widget_title">
							<h4>Contact Us</h4>
						</div>
						<div class="contact_info">
							<div class="single_info">
								<div class="icon">
									<i class="fas fa-phone-alt"></i>
								</div>
								<div class="info">
									<p><a href="tel:+94112 413 779">+94 112-413-779</a></p>
									<p><a href="tel:+94777272284">+94 777-272-284</a></p>
								</div>
							</div>
							<div class="single_info">
								<div class="icon">
									<i class="fas fa-envelope"></i>
								</div>
								<div class="info">
									{/* <p><a href="mailto:info@deneb.com">info@deneb.com</a></p> */}
									<p><a href="ceylonherbcare.lk@gmail.com">ceylonherbcare.lk@gmail.com</a></p>
								</div>
							</div>
							<div class="single_info">
								<div class="icon">
									<i class="fas fa-map-marker-alt"></i>
								</div>
								<div class="info fot_add">
									<p>379/9 kuruduwatte,Walivita,Kaduwela.<span> Malabe, Sri Lanka.</span></p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="copyright_area">
		<div class="container">
			<div class="row">
				<div class="col-lg-12">
					<div class="copyright_text">
						<p>Copyright &copy; 2024 All rights reserved.</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</footer>
</div>
    </>
  )
}

export default footer
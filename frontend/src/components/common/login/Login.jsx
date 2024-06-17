import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import "./login.css"; // Updated filename to follow convention
import companyLogo from '../../../Images/logo/HerbCare Logo.png';
import config from "../../../config";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  axios.defaults.withCredentials = true;

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(`${config.BASE_URL}/auth/login`, credentials);
      console.log(res.data.user);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.user });
      console.log(res.data.redirect);
      navigate(res.data.redirect);
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response });
    }
  };

  return (
    <>
    <div className='user-register'>
    <div className="register-header">
        <img src={companyLogo} alt="Company Logo" className="company-logo" />
    </div>
    <div className="login-container"> {/* Updated class name */}
      <div className="login-form"> {/* Updated class name */}
        <input
          type="text"
          placeholder="Username"
          id="username"
          onChange={handleChange}
          className="login-input" 
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          onChange={handleChange}
          className="login-input" 
        />
        <button disabled={loading} onClick={handleClick} className="login-button"> {/* Updated class name */}
          Login
        </button>
        {error && <span className="error-message">{error.message}</span>} {/* Updated class name */}
      </div>
    </div>
    <br />
    <h6 className='user-register-login'>Do not have an Account? <Link className='user-register-login' to={'/register'}> Sign up</Link></h6>
    </div>
    </>
  );
};

export default Login;

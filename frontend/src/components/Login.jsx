import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './css/Login.css';
import { useEffect, useState } from 'react';

const Login = ({ setIsAdmin, setIsLoggedIn}) => {
  const [poruka, setPoruka] = useState('');
  useEffect(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setIsAdmin(false);
    setIsLoggedIn(false);
  }, [])
  
  const navigate = useNavigate();
  const login = () => {
    axios
      .post("http://localhost:8080/api/v1/auth/login", {
        username: document.getElementById("username").value,
        password: document.getElementById("password").value,
      })
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);
        setIsAdmin(response.data.role==="ADMIN")
        setIsLoggedIn(true);
        // setIsLoggedIn(true);
        // setIsAdmin(response.data.role==="ADMIN")
        // navigate(`/movies`);
        navigate('/');
      })
      .catch((error) => {
        console.error(error);
        setPoruka('Pogrešno korisničko ime ili šifra');
      });
  };

  return (
    <div className="center-content">
      <div className="login-form">
        <div className="form-group">
          <label style={{ color: "black" }}>Korisnicko ime: </label>
          <input
            type="text"
            className="form-control"
            id="username"
            style={{ width: "260px", marginLeft: "20px", margin: "0px" }}
          />
        </div>
        <div className="form-group">
          <label style={{ color: "black" }}>Lozinka: </label>
          <input
            type="password"
            className="form-control"
            id="password"
            style={{ width: "260px", marginLeft: "20px", margin: "0px" }}
          />
        </div>
        <div className="btn-container">
          <button
            type="submit"
            className="btn-login"
            id="login"
            style={{ margin: "10px", marginLeft: '75px' }}
            onClick={() => login()}
          >
            Prijavi se
          </button>
          
        </div><h1 style={{ color: 'red' }}>{poruka}</h1>
      </div>
    </div>
  );
};

export default Login;

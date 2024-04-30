import { useState } from 'react';
import Navbar from '../components/shared/Navbar';
import './Login.css'
import { login } from '../helper/Api/AuthApi';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { addData } from '../Redux/Slices/userSlice';
import Spinner from '../components/shared/Spinner'
import Cookies from 'universal-cookie';


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setpassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const Cookie = new Cookies();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handelLogin = async () => {
    if (username == "" || password == "") {
      setErrorMessage("Username or Password can't be empty.");
      return;
    }
    setIsLoading(true);
    try {
      const res = await login({ username, password });
      if (res.isAuthenticated) {
        dispatch(addData(
          {
            id: res.userName,
            token: res.token,
            refreshToken: res.refreshToken,
            role: res.roles
          }
        ))
        console.log(res);
        navigate("/studenthome");
      } else {
        setErrorMessage(res.message);
      }
    } finally {
      setIsLoading(false);
    }

  }

  return (
    <div>
      <Navbar />
      <div className='login'>
        <div className="login-container">
          <div className="south-text">
            <h1>South Valley University</h1>
          </div>
          <form>
            <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" /><br /><br />
            <input type="password" name="password" value={password} onChange={(e) => setpassword(e.target.value)} placeholder="Password" /><br /><br />
            {
              isLoading ? "" :
                <button className='login-btn' type="button" onClick={handelLogin}>Login</button>
            }
          </form>
          {
            isLoading ? <Spinner /> :
              <div className="error-message" >{errorMessage}</div>
          }
        </div>
      </div>
    </div>
  );
};

export default Login;

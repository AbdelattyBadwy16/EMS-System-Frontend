import { useEffect, useState } from 'react';
import Navbar from '../components/shared/Navbar';
import './Login.css'
import { UserLogin } from '../helper/Api/AuthApi';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { addData } from '../Redux/Slices/userSlice';
import Spinner from '../components/shared/Spinner'
import Cookies from 'universal-cookie';
import { Helmet } from 'react-helmet-async';
import { addFacultyData } from '../Redux/Slices/FacultySlice';


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setpassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const Cookie = new Cookies();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addData(
      {
        id: "",
        token: "",
        refreshToken: "",
        role: []
      }
    ))
    dispatch(addFacultyData(
      {
        id: "",
        name: "",
        
      }
    ))
    Cookie.remove("Bearer");
  }, [])

  const handelLogin = async () => {
    if (username == "" || password == "") {
      setErrorMessage("Check Username Or Password!!");
      return;
    }
    setIsLoading(true);
    try {
      const res = await UserLogin({ username, password });
      if (res.isAuthenticated) {
        dispatch(addData(
          {
            id: res.userName,
            token: res.token,
            refreshToken: res.refreshToken,
            role: res.roles
          }
        ))
        Cookie.set("Refresh", res.refreshToken);
        Cookie.set("Bearer", res.token);
        switch (res.roles[0]) {
          case "Student":
            navigate("/studenthome");
            break;
          case "Observers":
            navigate("/staffhome");
            break;
          case "Invigilators":
            navigate("/staffhome");
            break;
          case "FacultyAdmin":
            navigate("/facultyhome");
            break;
          case "GlobelAdmin":
            navigate("/studenthome");
            break;
        }

      } else {
        setErrorMessage(res.message);
      }
    } finally {
      setIsLoading(false);
    }

  }

  return (
    <div>
      <Helmet>
        <title>EMS South Valley University</title>
      </Helmet>
      <Navbar />
      <div className='login'>
        <div className="login-container">
          <div className="south-text ">
            <h1 >تسجيل الدخول </h1>
          </div>
          <form>
            <input type="text"  name="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="اسم المستخدم" />
            <input type="password" name="password" value={password} onChange={(e) => setpassword(e.target.value)} placeholder="كلمة المرور" />
            {
              isLoading ? "" :
                <button className='login-btn' type="button" onClick={handelLogin}>تسجيل الدخول</button>
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

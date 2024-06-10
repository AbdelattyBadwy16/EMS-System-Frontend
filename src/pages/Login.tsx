import { useEffect, useState } from 'react';
import Navbar from '../components/shared/Navbar';
import './Login.css'
import { ResetPassword, SendEmail, UserLogin } from '../helper/Api/AuthApi';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { addData } from '../Redux/Slices/userSlice';
import Spinner from '../components/shared/Spinner'
import Cookies from 'universal-cookie';
import { Helmet } from 'react-helmet-async';
import { addFacultyData } from '../Redux/Slices/FacultySlice';


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setpassword] = useState("-1");
  const [isAdmin, setIsAdmin] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [reset, setReset] = useState(false);
  const [okReset, setOkReset] = useState(false);
  const [Email, setEmail] = useState("");
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

  const handelReset = async () => {
    if (username == "") {
      setErrorMessage("Username Must't be empty!!");
      return;
    }
    setErrorMessage("");
    setIsLoading(true);
    try {
      const res = await SendEmail(username);
      setOkReset(true);
      Cookie.set("user", username);
      setEmail(res);
    } finally {
      setIsLoading(false);
    }

  }

  const hanelChange = () => {
    if (isAdmin) {
      setIsAdmin(false);
      setpassword("-1");
    }
    else {
      setIsAdmin(true);
      setpassword("");
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
          <div className="south-text">
            {
              okReset ? "" :
                reset ? <h1>اعادة تعيين كلمة السر</h1> :
                  <h1 >تسجيل الدخول </h1>
            }
          </div>

          {
            okReset ?
              <div>
                <h1>تم ارسال رابط اعادة تعيين كلمة السر على الايميل الخاص بك</h1>
                <h1>{Email}</h1>
              </div> :
              <form>
                <div>
                  <input className='w-full' type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="اسم المستخدم" />
                  {
                    !isAdmin || reset ? "" :
                      <div className=''>
                        <input className='w-full' type="password" name="password" value={password} onChange={(e) => setpassword(e.target.value)} placeholder="كلمة المرور" />
                        {
                          <h2 onClick={() => setReset(true)} className='w-full mt-5 hover:text-red-50 text-[20px] cursor-pointer'>نسيت كلمة السر ؟</h2>
                        }
                      </div>
                  }
                  {
                    reset ? "" :
                      <div className='mt-3 w-[80%] text-end'>
                        <label className='mr-2 text-[20px] font-bold text-black'>مسئول</label>
                        <input onChange={() => hanelChange()} type='checkbox'></input>
                      </div>
                  }
                </div>
                {
                  isLoading ? "" :
                    <>
                      {
                        reset ?
                          <button className='login-btn' type="button" onClick={handelReset}>ارسل كلمة السر</button>
                          :
                          <button className='login-btn' type="button" onClick={handelLogin}>تسجيل الدخول</button>
                      }
                    </>
                }
              </form>
          }
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

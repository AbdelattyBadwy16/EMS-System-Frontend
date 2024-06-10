import React, { ChangeEvent, useEffect, useState } from 'react';
import './changepass.css';
import { ChangePasswordAsync, ResetPasswordOTP } from '../helper/Api/AuthApi';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router';
import { getRole } from '../Redux/Slices/userSlice';
import { useSelector } from 'react-redux';
import Cookies from 'universal-cookie';

interface resetPass {
  nid: any,
  newPassword: string,
  confirmPassword: string
}
const ResetPassword = () => {

  const [oldPassword, setOldPassword] = useState<any>();
  const [newPassword, setNewPassword] = useState<any>();
  const [confirmPassword, setConfirmPassword] = useState<any>();
  const [errorMessage, setErrorMessage] = useState<any>();
  const Cookie = new Cookies();
  const nid = Cookie.get("user");
  const [newReq, setNewReq] = useState<resetPass>({ nid, newPassword, confirmPassword })
  const nav = useNavigate();
  const role = useSelector(getRole);
  useEffect(() => {
    if (role == "Student") {
      nav("/studenthome")
    } else if (role == "Observers" || role == "Invigilators") {
      nav("/staffhome")
    }
  }, [])
  const changePassword = async () => {
    console.log(newReq);
    if ( !newPassword || !confirmPassword) {
      setErrorMessage('من فضلك لا تترك حقل فارغ');
    } else if (newPassword !== confirmPassword) {
      setErrorMessage('كلمة المرور الجديدة وتاكيد كلمة المرور غير متطابقين');
    } else {
      setErrorMessage("");
      setOldPassword("-1"); 
      setNewReq({ nid, newPassword, confirmPassword });
      console.log(newReq);
      const res = await ResetPasswordOTP(newReq);
      
      setErrorMessage(res.message);
      // nav("/login");
    }
  };



  return (
    <>
      <Helmet>
        <title>اعادة تعيين كلمة السر</title>
      </Helmet>
      <div className="bottom-right-box"></div>
      <div className="bottom-left-box"></div>
      <div className="top-right-box"></div>
      <div className="bottom-right-border"></div>
      <div className="bottom-left-border"></div>
      <div className="top-right-border"></div>
      <div className="pass-container">
        <h1>اعادة تعيين كلمة السر</h1>
        <form>
          <input className='inp-pass' type="password" name="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="كلمة السر الجديدة" /><br /><br />
          <input className='inp-pass' type="password" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="تأكيد كلمة السر " /><br /><br />
          <button className='pass-btn' type="button" onClick={changePassword}>حفظ</button>
        </form>
        {errorMessage && <div className="error-message text-[18px] font-bold">{errorMessage}</div>}
      </div>
    </>
  );
};

export default ResetPassword;

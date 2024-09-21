import React, { ChangeEvent, useEffect, useState } from 'react';
import './changepass.css';
import { ChangePasswordAsync } from '../helper/Api/AuthApi';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router';
import { getRole } from '../Redux/Slices/userSlice';
import { useSelector } from 'react-redux';

interface changePass {
  oldPassword: string,
  newPassword: string,
  confirmPassword: string
}
const ChangePassword = () => {

  const [oldPassword, setOldPassword] = useState<any>();
  const [newPassword, setNewPassword] = useState<any>();
  const [confirmPassword, setConfirmPassword] = useState<any>();
  const [errorMessage, setErrorMessage] = useState<any>();
  const [newReq, setNewReq] = useState<changePass>({ oldPassword, newPassword, confirmPassword })
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
    if (!oldPassword || !newPassword || !confirmPassword) {
      setErrorMessage('من فضلك لا تترك حقل فارغ');
    } else if (newPassword !== confirmPassword) {
      setErrorMessage('كلمة المرور الجديدة وتاكيد كلمة المرور غير متطابقين');
    } else {
      setErrorMessage("");
      const id = 
      setNewReq({ oldPassword, newPassword, confirmPassword });
      const res = await ChangePasswordAsync(newReq);
      setErrorMessage(res);
    }
  };



  return (
    <>
      <Helmet>
        <title>تغيير كلمة السر</title>
      </Helmet>
      <div className="bottom-right-box"></div>
      <div className="bottom-left-box"></div>
      <div className="top-right-box"></div>
      <div className="bottom-right-border"></div>
      <div className="bottom-left-border"></div>
      <div className="top-right-border"></div>
      <div className="pass-container">
        <h1>تغيير كلمة السر</h1>
        <form>

          <input className='inp-pass' type="password" name="oldPassword" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} placeholder="كلمة السر القديمة" /><br /><br />
          <input className='inp-pass' type="password" name="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="كلمة السر الجديدة" /><br /><br />
          <input className='inp-pass' type="password" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="تأكيد كلمة السر " /><br /><br />
          <button className='pass-btn' type="button" onClick={changePassword}>حفظ</button>
        </form>
        {errorMessage && <div className="error-message text-[18px] font-bold">{errorMessage}</div>}
      </div>
    </>
  );
};

export default ChangePassword;

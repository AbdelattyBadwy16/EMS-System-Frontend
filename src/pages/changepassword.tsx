import React, { ChangeEvent, useState } from 'react';
import uniLogo from "../assets/uniLogo.png";
import './changepass.css';
import Navbar from '../components/shared/Navbar';

const ChangePassword = () => {

  const [formData, setFormData] = useState({
    username: '',
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
    errorMessage: ''
  });

  const { oldPassword, newPassword, confirmPassword, errorMessage } = formData;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const changePassword = () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      setFormData({ ...formData, errorMessage: 'Please enter all fields' });
    } else if (newPassword !== confirmPassword) {
      setFormData({ ...formData, errorMessage: 'New password and confirm password do not match' });
    } else {
      setFormData({ ...formData, errorMessage: '' });
    }
  };

  return (
    <>
      <div className="bottom-right-box"></div>
      <div className="bottom-left-box"></div>
      <div className="top-right-box"></div>
      <div className="bottom-right-border"></div>
      <div className="bottom-left-border"></div>
      <div className="top-right-border"></div>


      <div className="pass-container">
        <h1>تغيير كلمة السر</h1>
        <form>

          <input type="password" name="oldPassword" value={oldPassword} onChange={handleChange} placeholder="كلمة السر القديمه" /><br /><br />
          <input type="password" name="newPassword" value={newPassword} onChange={handleChange} placeholder="كلمة السر الجديده" /><br /><br />
          <input type="password" name="confirmPassword" value={confirmPassword} onChange={handleChange} placeholder="تأكيد كلمة السر " /><br /><br />
          <button className='pass-btn' type="button" onClick={changePassword}>حفظ</button>
        </form>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </div>
    </>
  );
};

export default ChangePassword;

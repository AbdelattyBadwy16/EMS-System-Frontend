import React, { ChangeEvent, useState } from 'react';
import './changepass.css';
const ChangePassword = () => {

  const [oldPassword, setOldPassword] = useState<any>();
  const [newPassword, setNewPassword] = useState<any>();
  const [confirmPassword, setConfirmPassword] = useState<any>();
  const [errorMessage, setErrorMessage] = useState<any>();
  const changePassword = () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      setErrorMessage('من فضلك لا تترك حقل فارغ');
    } else if (newPassword !== confirmPassword) {
      setErrorMessage('كلمة المرور الجديدة وتاكيد كلمة المرور غير متطابقين');
    } else {
      setErrorMessage("");
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

          <input type="password" name="oldPassword" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} placeholder="كلمة السر القديمه" /><br /><br />
          <input type="password" name="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="كلمة السر الجديده" /><br /><br />
          <input type="password" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="تأكيد كلمة السر " /><br /><br />
          <button className='pass-btn' type="button" onClick={changePassword}>حفظ</button>
        </form>
        {errorMessage && <div className="error-message text-[18px] font-bold">{errorMessage}</div>}
      </div>
    </>
  );
};

export default ChangePassword;

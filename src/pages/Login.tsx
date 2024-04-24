import React, { ChangeEvent, useState } from 'react';
import uniLogo from "../assets/uniLogo.png";

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    errorMessage: ''
  });

  const { username, password, errorMessage } = formData;

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const loginfun = () => {
    // Implement your login logic here
    // For now, let's just show an error message if username or password is empty
    if (!username || !password) {
      setFormData({ ...formData, errorMessage: 'Please enter both username and password' });
    } else {
      // Clear error message if both username and password are provided
      setFormData({ ...formData, errorMessage: '' });
      // Implement your actual login logic here
    }
  };

  return (
    <>
      <div className="navbar">
        <nav className="bg-navColor"> {/* Corrected class name */}
          <div className="my-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="flex flex-1 items-center justify-center sm:justify-start">
                <h2 className="text-white text-4xl font-futura font-normal">
                  |EMS|
                </h2>
              </div>
              <div className="mx-auto flex flex-1 items-center justify-center sm:justify-end">
                <h2 className="text-white text-2xl font-gesstwo font-medium">
                  جامعة جنوب الوادي
                </h2>
                <img
                  className="size-24 flex sm:justify-end"
                  src={uniLogo}
                  alt=""
                />
              </div>
            </div>
          </div>
        </nav>
      </div>

      <div className="login-container">
      
        <div className="south-text">
          <h1>South Vally Universty</h1>
          </div>
        
     
          <form>
            <input type="text" name="username" value={username} onChange={handleInputChange} placeholder="Username" /><br /><br />
            <input type="password" name="password" value={password} onChange={handleInputChange} placeholder="Password" /><br /><br />
            <button type="button" onClick={loginfun}>Login</button>
          </form>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
        </div>
    </>
  );
};

export default Login;

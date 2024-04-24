import { ChangeEvent, useState } from 'react';
import Navbar from '../components/shared/Navbar';
import './Login.css'

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
    <div className='login'>
      <Navbar />
      <div className="login-container">
        <div className="south-text">
          <h1>South Vally Universty</h1>
        </div>
        <form>
          <input type="text" name="username" value={username} onChange={handleInputChange} placeholder="Username" /><br /><br />
          <input type="password" name="password" value={password} onChange={handleInputChange} placeholder="Password" /><br /><br />
          <button className='login-btn' type="button" onClick={loginfun}>Login</button>
        </form>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </div>
    </div>
  );
};

export default Login;

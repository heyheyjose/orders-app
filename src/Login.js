import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Container } from 'semantic-ui-react';
import { updateAuth } from './state/actions';
import AppHeader from './components/Header';
import Footer from './components/Footer';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const dispatch = useDispatch();

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const validCredentials = username === 'test@gouspack.com' && password === 'gouspack';

    if (validCredentials) {
      dispatch(updateAuth(true));
      history.push('/orders');
    } else {
      dispatch(updateAuth(false));
      window.alert('Username or password is incorrect. Please try again.');
      setUsername('');
      setPassword('');
    }
  };

  return (
    <Container fluid className="app-wrapper">
      <AppHeader title="Login" />
      <div className="app-content">
        <form onSubmit={handleLogin}>
          <div className="user-box">
          <label htmlFor="username">Username</label>
            <input
              type="email"
              name="username"
              required
              onChange={handleUsername}
              value={username}
            />
          </div>
          <div className="user-box">
          <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              minLength="8"
              required
              onChange={handlePassword}
              value={password}
            />
          </div>
          <input type="submit" value="Submit" />
        </form>
      </div>
      <Footer />
    </Container>
  );
}

export default Login;

import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Container, Form, Button, Checkbox } from 'semantic-ui-react';
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
      <div className="app-content login-wrapper">
        <Form onSubmit={handleLogin} className="login-form">
          <Form.Field>
            <input
              type="email"
              placeholder="Username"
              required
              onChange={handleUsername}
              value={username}
            />
          </Form.Field>
          <Form.Field>
            <input
              type="password"
              placeholder="Password"
              minLength="8"
              required
              onChange={handlePassword}
              value={password}
            />
          </Form.Field>
          <Form.Field>
            <Checkbox label="I agree to the Terms and Conditions" />
          </Form.Field>
          <Button primary type="submit">Submit</Button>
        </Form>
      </div>
      <Footer />
    </Container>
  );
}

export default Login;

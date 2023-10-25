import { createSignal } from "solid-js";
import axios from "axios";
import "./login.css";

export default function Login() {
  const [username, setUsername] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [error, setError] = createSignal("");

  const authUrl = import.meta.env.BACKEND_URL
    ? `${import.meta.env.BACKEND_URL}/auth`
    : "http://localhost:8080/auth";

  const redirectUrl = import.meta.env.URL
    ? import.meta.env.URL
    : "http://localhost:8000";

  const handleUsername = ({ target }) => {
    setUsername(target.value);
  };

  const handlePassword = ({ target }) => {
    setPassword(target.value);
  };

  const handleEnter = (event) => {
    const buttonEl = document.querySelector("#login-button");
    if (event.key === "Enter") buttonEl.click();
  };

  const handleSubmit = () => {
    axios
      .post(authUrl, {
        username: username(),
        password: password(),
      })
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("token", res.data);
          window.location.href = redirectUrl;
        } else {
          throw res;
        }
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  };

  return (
    <div class="login">
      <h1>Log In</h1>
      <div class="border">
        <input
          placeholder="Username"
          onInput={handleUsername}
          onKeyDown={handleEnter}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          onInput={handlePassword}
          onKeyDown={handleEnter}
        />
        <br />
        <button id="login-button" onClick={handleSubmit}>
          Log in
        </button>
        <p class="error-message">{error()}</p>
      </div>
    </div>
  );
}

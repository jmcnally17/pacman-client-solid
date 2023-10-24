import { createSignal } from "solid-js";
import axios from "axios";
import "./signup.css";
import { Profanity, ProfanityOptions } from "@2toad/profanity";

export default function Signup() {
  const [username, setUsername] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [error, setError] = createSignal("");

  const usersUrl = import.meta.env.REACT_APP_BACKEND_URL
    ? `${import.meta.env.REACT_APP_BACKEND_URL}/users`
    : "http://localhost:8080/users";

  const authUrl = import.meta.env.REACT_APP_BACKEND_URL
    ? `${import.meta.env.REACT_APP_BACKEND_URL}/auth`
    : "http://localhost:8080/auth";

  const redirectUrl = import.meta.env.REACT_APP_URL
    ? import.meta.env.REACT_APP_URL
    : "http://localhost:8000";

  const options = new ProfanityOptions();
  options.wholeWord = false;
  const profanity = new Profanity(options);

  const handleUsername = ({ target }) => {
    setUsername(target.value);
  };

  const handlePassword = ({ target }) => {
    setPassword(target.value);
  };

  const handleEnter = (event) => {
    const buttonEl = document.querySelector("#signup-button");
    if (event.key === "Enter") buttonEl.click();
  };

  const handleSubmit = () => {
    let nameError = document.getElementById("error-message");
    if (username().includes(" ")) {
      nameError.innerText = "Username cannot contain any spaces";
    } else if (username().length < 3 || username().length > 15) {
      nameError.innerText = "Username must be 3-15 characters long";
    } else if (profanity.exists(username())) {
      nameError.innerText = "No profanity!";
    } else if (password().length < 8) {
      nameError.innerText = "Password must be at least 8 characters long";
    } else {
      axios
        .post(usersUrl, {
          username: username(),
          password: password(),
        })
        .then((res) => {
          if (res.status === 201) {
            login();
          } else {
            throw res;
          }
        })
        .catch((err) => setError(err.response.data.message));
    }
  };

  const login = () => {
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
      .catch((err) => setError(err.response.data.message));
  };

  return (
    <div class="signup">
      <h1>Sign Up</h1>
      <div class="border">
        <input
          placeholder="Username"
          onChange={handleUsername}
          onKeyDown={handleEnter}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          onChange={handlePassword}
          onKeyDown={handleEnter}
        />
        <br />
        <button id="signup-button" onClick={handleSubmit}>
          Sign up
        </button>
        <p class="error-message" id="error-message">
          {error()}
        </p>
      </div>
    </div>
  );
}

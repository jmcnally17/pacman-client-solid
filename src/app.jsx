import { createSignal, onMount, Show } from "solid-js";
import { Navigate, Route, Routes } from "@solidjs/router";
import axios from "axios";
import "./App.css";
import Main from "./components/main/main";
import Login from "./components/login/login";
import Signup from "./components/signup/signup";
import Footer from "./components/footer/footer";

export default function App() {
  const [user, setUser] = createSignal();

  const authUrl = import.meta.env.BACKEND_URL
    ? `${import.meta.env.BACKEND_URL}/auth`
    : "http://localhost:8080/auth";

  onMount(() => {
    if (localStorage.getItem("token")) {
      axios
        .get(authUrl, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((res) => {
          setUser(res.data.user);
        });
    }
  });

  return (
    <div class="App">
      <div id="subRoot">
        <Routes>
          <Route path="/" component={<Main user={user()} />} />
          <Route
            path="/login"
            component={
              <Show when={user()} fallback={<Login />}>
                <Navigate href={"/"} />
              </Show>
            }
          />
          <Route
            path="/signup"
            component={
              <Show when={user()} fallback={<Signup />}>
                <Navigate href={"/"} />
              </Show>
            }
          />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

/* @refresh reload */
import { render } from "solid-js/web";
import { Route, Router, Routes } from "@solidjs/router";

import "./index.css";
import Footer from "./components/footer/footer";
import Main from "./components/main/main";

const root = document.getElementById("root");

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    "Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?"
  );
}

render(
  () => (
    <div>
      <Router>
        <Routes>
          <Route path="/" component={Main} />
        </Routes>
      </Router>
      <Footer />
    </div>
  ),
  root
);

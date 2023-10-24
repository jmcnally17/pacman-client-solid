import { cleanup, render } from "@solidjs/testing-library";
import Login from "./login";
import { describe, expect, it, afterEach } from "vitest";
import "@testing-library/jest-dom";

describe("Login", () => {
  afterEach(cleanup);

  it("has the header", () => {
    const { getByText } = render(() => <Login />);
    expect(getByText("Log in")).toBeInTheDocument();
  });

  it("has the username and password input fields", () => {
    const { getByRole } = render(() => <Login />);
    expect(
      getByRole("textbox", { placeholder: "Username" })
    ).toBeInTheDocument();
    expect(
      getByRole("textbox", { placeholder: "Password" })
    ).toBeInTheDocument();
  });

  it("has the submit button to log in", () => {
    const { getByRole } = render(() => <Login />);
    expect(getByRole("button", { text: "Log in" })).toBeInTheDocument();
  });
});

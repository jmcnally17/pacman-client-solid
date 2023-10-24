import { cleanup, render } from "@solidjs/testing-library";
import Signup from "./signup";
import { describe, expect, it, afterEach } from "vitest";
import "@testing-library/jest-dom";

describe("Signup", () => {
  afterEach(cleanup);

  it("has the header", () => {
    const { getByText } = render(() => <Signup />);
    expect(getByText("Sign up")).toBeInTheDocument();
  });

  it("has the username and password input fields", () => {
    const { getByRole } = render(() => <Signup />);
    expect(
      getByRole("textbox", { placeholder: "Username" })
    ).toBeInTheDocument();
    expect(
      getByRole("textbox", { placeholder: "Password" })
    ).toBeInTheDocument();
  });

  it("has the submit button to register", () => {
    const { getByRole } = render(() => <Signup />);
    expect(getByRole("button", { text: "Sign up" })).toBeInTheDocument();
  });
});

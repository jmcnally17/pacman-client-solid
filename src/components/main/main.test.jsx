import { cleanup, render } from "@solidjs/testing-library";
import Main from "./main";
import { describe, expect, it, afterEach } from "vitest";
import "@testing-library/jest-dom";

describe("Main", () => {
  const user = { username: "Pingu" };

  afterEach(cleanup);

  it("has the header", () => {
    const { getByText } = render(() => <Main />);
    expect(getByText("Welcome to Pac-Man!")).toBeInTheDocument();
  });

  it("has the signup and login buttons", () => {
    const { getByTestId } = render(() => <Main />);

    const signup = getByTestId("signup-button");
    expect(signup).toBeInTheDocument();
    expect(signup).toHaveTextContent("Sign up");

    const login = getByTestId("login-button");
    expect(login).toBeInTheDocument();
    expect(login).toHaveTextContent("Log in");
  });

  it("does not have the logout button", () => {
    const { queryByTestId } = render(() => <Main />);

    const logout = queryByTestId("logout-button");
    expect(logout).not.toBeInTheDocument();
  });

  it("has the sign up instructions", () => {
    const { getByText } = render(() => <Main />);
    expect(
      getByText("Make an account to submit your score onto the leaderboard!")
    ).toBeInTheDocument();
  });

  it("has the play button", () => {
    const { getByTestId } = render(() => <Main />);

    const play = getByTestId("play-button");
    expect(play).toBeInTheDocument();
    expect(play).toHaveTextContent("Play");
  });

  it("has the game instructions", () => {
    const { getByText } = render(() => <Main />);

    const instructions =
      "Use the directional keys to move Pac-Man around the board while avoiding" +
      " the ghosts as best you can. Pick up a power up and then attack the ghosts! Eat all the pellets" +
      " on the board to level up. Press esc to pause and unpause the game at any time. (For mobile and" +
      " tablet users, a D-pad will appear below the board for you to move Pac-Man around)";
    expect(getByText(instructions)).toBeInTheDocument();
  });

  it("has a different header when a user is logged in", () => {
    const { getByText } = render(() => <Main user={user} />);
    expect(getByText("Welcome back Pingu!")).toBeInTheDocument();
  });

  it("has the logout button when a user is logged in", () => {
    const { getByTestId } = render(() => <Main user={user} />);

    const logout = getByTestId("logout-button");
    expect(logout).toBeInTheDocument();
    expect(logout).toHaveTextContent("Log out");
  });

  it("does not have the signup and login buttons when a user is logged in", () => {
    const { queryByTestId } = render(() => <Main user={user} />);

    const signup = queryByTestId("signup-button");
    expect(signup).not.toBeInTheDocument();

    const login = queryByTestId("login-button");
    expect(login).not.toBeInTheDocument();
  });

  it("does not have the signup instructions when a user is logged in", () => {
    const { queryByText } = render(() => <Main user={user} />);

    expect(
      queryByText("Make an account to submit your score onto the leaderboard!")
    ).not.toBeInTheDocument();
  });
});

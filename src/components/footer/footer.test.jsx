import { cleanup, render } from "@solidjs/testing-library";
import Footer from "./footer";
import { describe, expect, it, afterEach } from "vitest";
import "@testing-library/jest-dom";

describe("Footer", () => {
  afterEach(cleanup);

  it("contains the footer text", () => {
    const { getByTestId } = render(() => <Footer />);
    expect(getByTestId("footer-text")).toHaveTextContent(
      "This project was created by Joe McNally and stored on GitHub. " +
        "A big thank you to Namco for creating Pac-Man in 1980."
    );
  });

  it("contains the link to the GitHub profile", () => {
    const { getByRole } = render(<Footer />);
    const profileLinkEl = getByRole("link", { name: "Joe McNally" });
    expect(profileLinkEl).toHaveAttribute(
      "href",
      "https://github.com/jmcnally17"
    );
    expect(profileLinkEl).toHaveTextContent("Joe McNally");
  });

  it("contains the link to the GitHub repo", () => {
    const { getByRole } = render(<Footer />);
    const githubRepoEl = getByRole("link", { name: "GitHub" });
    expect(githubRepoEl).toHaveAttribute(
      "href",
      "https://github.com/jmcnally17/pacman-client-solid"
    );
    expect(githubRepoEl).toHaveTextContent("GitHub");
  });
});

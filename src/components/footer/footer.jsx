import "./footer.css";

export default function Footer() {
  return (
    <footer>
      <p class="footer-text" data-testid="footer-text">
        This project was created by{" "}
        <a href="https://github.com/jmcnally17">Joe McNally</a> and stored on{" "}
        <a href="https://github.com/jmcnally17/pacman-client-solid">GitHub</a>. A big thank
        you to Namco for creating Pac-Man in 1980.
      </p>
    </footer>
  );
}

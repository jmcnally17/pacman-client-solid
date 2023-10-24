import { createSignal, onMount, Show } from "solid-js";
import "./main.css";
import { Howl } from "howler";

export default function Main(props) {
  const [theme] = createSignal(new Howl({
    src: ["/audio/title_theme.wav"],
    loop: true,
    volume: 0.3,
  }));

  onMount(() => {
    theme().play();
    window.addEventListener("keydown", (event) => {
      if (["ArrowUp", "ArrowDown"].includes(event.code)) {
        event.preventDefault();
      }
    });
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const header = () => {
    return (
      <Show when={props.user} fallback={<h1>Welcome to Pac-Man!</h1>}>
        <h1>Welcome back {props.user.username}!</h1>
      </Show>
    );
  };

  const buttons = () => {
    return (
      <Show
        when={props.user}
        fallback={
          <div>
            <a href="/login">
              <button class="login-button" data-testid="login-button">Log in</button>
            </a>
            <a href="/signup">
              <button class="signup-button" data-testid="signup-button">Sign up</button>
            </a>
          </div>
        }
      >
        <button class="logout-button" data-testid="logout-button" onClick={handleLogout}>
          Log out
        </button>
      </Show>
    );
  };

  const signupInstructions = () => {
    return (
      <Show when={!props.user}>
        <p class="signup-instructions">
          Make an account to submit your score onto the leaderboard!
        </p>
      </Show>
    );
  };

  return (
    <div class="main" id="main">
      {header()}
      {buttons()}
      <br />
      <br />
      <img
        class="title-gif"
        src="https://media4.giphy.com/media/42rO49pxzaMnK/giphy.gif?cid=790b76116dc1bedf27887938cbe8df55b210b12f842af0e9&rid=giphy.gif&ct=g"
        alt="Pac-Man gif"
      />
      {signupInstructions()}
      <div class="register">
        <button class="play-button" id="play-button" data-testid="play-button">
          Play
        </button>
      </div>
      <p class="name-error" id="name-error" />
      <p class="instructions">
        Use the directional keys to move Pac-Man around the board while avoiding
        the ghosts as best you can. Pick up a power up and then attack the
        ghosts! Eat all the pellets on the board to level up. Press esc to pause
        and unpause the game at any time. (For mobile and tablet users, a D-pad
        will appear below the board for you to move Pac-Man around)
      </p>
    </div>
  );
}

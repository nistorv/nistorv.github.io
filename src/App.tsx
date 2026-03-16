import { CircleNav } from "./components/CircleNav";
import { navLinkedIn, navGithub, navEmail } from "./util/navigation";

import backgroundImage from "./assets/background.jpg";

function App() {
  return (
    <div
      className="w-screen h-screen flex justify-center items-center"
      style={{
        background: `url(${backgroundImage})`,
        backgroundSize: "cover",
      }}
    >
      <CircleNav
        name="Vlad Nistor"
        onLinkedInClick={navLinkedIn}
        onGithubClick={navGithub}
        onEmailClick={navEmail}
        onMoreClick={() => {
          alert("coming soon");
        }}
      />
    </div>
  );
}

export default App;

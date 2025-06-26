import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";
import { IconButton } from "./components/IconButton";

function App() {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-slate-100">
      <div className="bg-white px-5 p-10 rounded-xl shadow-md">
        <h1 className="text-4xl mx-10 text-center">Vlad Nistor</h1>
        <p className="max-w-2xl flex text-center mx-5 py-2">
          {" "}
          Second-year computer science student @ University of Canterbury
        </p>
        <div className="flex flex-row justify-center divide-x divide-slate-600">
          <IconButton href="https://www.linkedin.com/in/nistorv/">
            <FaLinkedin size={24} />
          </IconButton>
          <IconButton href="https://github.com/nistorv">
            <FaGithub size={24} />
          </IconButton>
          <IconButton href="mailto:nistorv@proton.me">
            <FaEnvelope size={24} />
          </IconButton>
        </div>
      </div>
    </div>
  );
}

export default App;

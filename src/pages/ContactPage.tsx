import { useNavigate } from "react-router-dom";
import { CircleNav } from "../components/CircleNav";
import { navLinkedIn, navGithub, navEmail } from "../util/navigation";

export function ContactPage() {
  const navigate = useNavigate();

  return (
    <CircleNav
      title="Contact"
      buttons={[
        { label: "LinkedIn", onClick: navLinkedIn },
        { label: "Github", onClick: navGithub },
        { label: "Back", onClick: () => navigate("/") },
        { label: "E-mail", onClick: navEmail },
      ]}
    />
  );
}

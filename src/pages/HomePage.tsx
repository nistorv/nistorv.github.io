import { useNavigate } from "react-router-dom";
import { CircleNav } from "../components/CircleNav";

export function HomePage() {
  const navigate = useNavigate();

  return (
    <CircleNav
      name="Vlad Nistor"
      buttons={[
        { label: "Projects", onClick: () => navigate("/projects") },
        { label: "Gallery", onClick: () => navigate("/gallery") },
        { label: "TBD", onClick: () => {} },
        { label: "Contact", onClick: () => navigate("/contact") },
      ]}
    />
  );
}

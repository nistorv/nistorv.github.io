import { useNavigate } from "react-router-dom";
import { CircleNav } from "../components/CircleNav";

export function HomePage() {
  const navigate = useNavigate();

  return (
    <CircleNav
      title="Vlad Nistor"
      isName={true}
      buttons={[
        { label: "Projects", onClick: () => navigate("/projects") },
        { label: "Contact", onClick: () => navigate("/contact") },
      ]}
    />
  );
}

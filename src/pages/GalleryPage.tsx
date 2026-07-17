import { useNavigate } from "react-router-dom";
import { CircleNav } from "../components/CircleNav";

export function GalleryPage() {
  const navigate = useNavigate();

  return (
    <CircleNav
      name="Gallery"
      buttons={[
        { label: "TBD", onClick: () => {} },
        { label: "TBD", onClick: () => {} },
        { label: "Back", onClick: () => navigate("/") },
        { label: "TBD", onClick: () => {} },
      ]}
    />
  );
}

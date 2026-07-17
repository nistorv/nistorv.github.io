import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CircleNav } from "../components/CircleNav";

export function HomePage() {
  const navigate = useNavigate();

  return (
    <motion.div
      layoutId="circle-nav"
      transition={{ layout: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } }}
    >
      <CircleNav
        title="Vlad Nistor"
        isName={true}
        buttons={[
          { label: "Projects", onClick: () => navigate("/projects") },
          { label: "Contact", onClick: () => navigate("/contact") },
        ]}
      />
    </motion.div>
  );
}

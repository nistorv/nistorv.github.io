import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CircleNav } from "../components/CircleNav";
import { ProjectCard, type ProjectData } from "../components/ProjectCard";
import { navGithub } from "../util/navigation.ts";

const projectModules = import.meta.glob("../content/projects/*.json", { eager: true });
const projects = (Object.values(projectModules) as ProjectData[])
  .sort((a, b) => a.priority - b.priority);

export function ProjectsPage() {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-start w-full h-full py-4">
      <div className="flex flex-col items-center w-1/3 min-w-[420px]">
        <div className="z-10 relative">
          <motion.div
            layoutId="circle-nav"
            transition={{ layout: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } }}
          >
            <CircleNav
              title="Projects"
              buttons={[
                { label: "Github", onClick: navGithub },
                { label: "Back", onClick: () => navigate("/") },
              ]}
            />
          </motion.div>
        </div>
        <motion.div
          initial={{ maxHeight: 0 }}
          animate={{
            maxHeight: "calc(100vh - 135px - 2rem)",
            transition: { duration: 0.5, delay: 0.45, ease: [0.4, 0, 0.2, 1] },
          }}
          exit={{
            maxHeight: 0,
            transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
          }}
          className="w-full -mt-[135px] overflow-hidden"
        >
          <div className="max-h-[calc(100vh-135px-2rem)] bg-white/20 backdrop-blur-xl border-2 border-white/30 rounded-2xl overflow-y-auto scrollbar-hide">
            <div className="flex flex-col gap-4 px-6 pb-8 pt-[141px]">
              {projects.map((p) => (
                <ProjectCard key={p.title} project={p} />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
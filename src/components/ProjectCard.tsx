import Markdown from "react-markdown";
import { FaGithub } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";

export interface ProjectData {
  title: string;
  description: string;
  technologies: string[];
  links: {
    github: string | false;
    live: string | false;
  };
  projectPurpose: string | false;
  priority: number;
}

export interface ProjectCardProps {
  project: ProjectData;
}

export function ProjectCard(props: ProjectCardProps) {
  const techLine = props.project.projectPurpose
    ? `${props.project.technologies.join(" · ")} · ${props.project.projectPurpose}` :
    props.project.technologies.join(" · ");

  return (
    <div className="bg-white/30 border-2 border-white/40 rounded-xl p-4 backdrop-blur-sm flex gap-4">
      <div className="flex-1">
        <h3 className="text-slate-800 font-semibold text-lg">{props.project.title}</h3>
        <div className="text-slate-600 text-sm mt-1 [&_a]:underline [&_a]:text-slate-700 [&_a:hover]:text-indigo-800">
          <Markdown>{props.project.description}</Markdown>
        </div>
        <p className="text-slate-600 text-xs mt-2">{techLine}</p>
      </div>
      <div className="flex flex-col gap-2 justify-start pt-1">
        {props.project.links.github && (
          <a href={props.project.links.github} className="text-slate-500 hover:text-slate-800">
            <FaGithub size={20} />
          </a>
        )}
        {props.project.links.live && (
          <a href={props.project.links.live} className="text-slate-500 hover:text-slate-800">
            <FiExternalLink size={20} />
          </a>
        )}
      </div>
    </div>
  );
}
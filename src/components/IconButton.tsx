export interface IconButtonProps {
  href: string;
  children?: React.ReactNode;
}

export function IconButton(props: IconButtonProps) {
  return (
    <a
      className="flex justify-center items-center px-4 py-2 text-slate-800 hover:bg-slate-800 hover:text-white"
      href={props.href}
    >
      {props.children}
    </a>
  );
}

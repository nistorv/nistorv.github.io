export interface IconButtonProps {
  href: string;
  children?: React.ReactNode;
}

export function IconButton(props: IconButtonProps) {
  return (
    <a className="flex justify-center items-center px-4 py-2" href={props.href}>
      {props.children}
    </a>
  );
}

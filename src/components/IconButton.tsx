export interface IconButtonProps {
  href: string;
  children?: React.ReactNode;
}

export function IconButton(props: IconButtonProps) {
  return (
    <a className="p-2 flex justify-center items-center" href={props.href}>
      {props.children}
    </a>
  );
}

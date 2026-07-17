import backgroundImage from "../assets/background.jpg";

export interface PageLayoutProps {
  children: React.ReactNode;
}

export function PageLayout(props: PageLayoutProps) {
  return (
    <div
      className="w-screen h-screen flex justify-center items-center"
      style={{
        background: `url(${backgroundImage})`,
        backgroundSize: "cover",
      }}
    >
      {props.children}
    </div>
  );
}

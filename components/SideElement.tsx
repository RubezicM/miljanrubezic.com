import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  orientation: string;
};

const SideElement = ({ orientation, children }: Props) => {
  return (
    <div
      className={`${orientation === "left" ? "left-[40px] right-[auto]" : "right-[40px] left-[auto]"} w-[40px] fixed bottom-0 z-10 side-line lg:block hidden`}
    >
      {children}
    </div>
  );
};

export default SideElement;

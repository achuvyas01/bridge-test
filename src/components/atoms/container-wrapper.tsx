import React from "react";
import { cn } from "@/lib/utils";

const ContainerWrapper = ({
  children,
  className,
  removeBoxShadow,
}: {
  children: React.ReactNode;
  className?: string;
  removeBoxShadow?: boolean;
}) => {
  const styles = removeBoxShadow
    ? {}
    : {
        boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.3)",
      };
  return (
    <div
      className={cn(
        "max-w-[646px] w-full lg:h-[497px] mx-auto bg-secondary border border-border2 rounded-[10px] px-2 lg:px-5 pt-6 pb-7",
        className
      )}
      style={styles}
    >
      {children}
    </div>
  );
};

export default ContainerWrapper;

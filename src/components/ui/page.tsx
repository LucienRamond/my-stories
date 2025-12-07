import type { ReactNode } from "react";

export default function Page({
  children,
  style,
}: {
  children: ReactNode;
  title?: string;
  style?: string;
}) {
  return (
    <div
      className={`pt-[100px] lg:max-w-[90%] lg:min-w-[500px] mx-auto w-full grid justify-center ${style}`}
    >
      {children}
    </div>
  );
}

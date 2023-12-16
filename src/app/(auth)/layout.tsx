import { FC, ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return <div className=" flex  items-center justify-center p-5 h-[90vh] bg-gradient-to-r from-black">{children}</div>;
};

export default AuthLayout;

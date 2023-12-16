import { FC, ReactNode } from "react";
import { Button } from "./ui/button";
import { signIn, useSession } from "next-auth/react";


interface GoogleSignInButtonProps {
  children: ReactNode;
}

const GoogleSignInButton: FC<GoogleSignInButtonProps> = ({ children }) => {
  const { data: session } = useSession();
  const loginWithGoogle = () => signIn("google",{callbackUrl: 'http://localhost:3000/'});
  return (
    <Button className="w-full flex items-center bg-white hover:bg-gray-100 text-gray-700 font-semibold py-2 px-4 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    onClick={loginWithGoogle}>
     
      {children}
    </Button>
  );
};

export default GoogleSignInButton;

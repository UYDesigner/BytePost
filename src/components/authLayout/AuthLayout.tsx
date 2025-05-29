import { useEffect, useState, type ReactNode } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import type { RootState } from "../../store/store";


interface ProtectedProps {
  children: ReactNode;
  authentication?: boolean;
}

const Protected = ({ children, authentication = true }: ProtectedProps) => {
  const navigate = useNavigate()
  const [loading, setLoader] = useState(true)
  const authStatus = useSelector((state: RootState) => state.auths.status);

  // useEffect(() => {
  //   if (authentication !== authStatus) {
  //     navigate(authentication ? "/login" : "/");
  //   }
  //   setLoader(false);
  // }, [authStatus, navigate, authentication]);
  useEffect(() => {
    const isAllowed = authentication === authStatus;

    if (!isAllowed) {
      const redirectPath = authentication ? "/login" : "/";
      navigate(redirectPath);
    }

    setLoader(false);
  }, [authStatus, navigate, authentication]);


  if (loading) return <div>Loading...</div>;

  return <>{children}</>;
}

export default Protected 
import { createContext, useState } from "react";
export const NavCtx = createContext(null);
export const NavContext = ({ children }) => {
  const [page, setPage] = useState("mint");
  return (
    <NavCtx.Provider value={{ page, setPage }}>{children}</NavCtx.Provider>
  );
};

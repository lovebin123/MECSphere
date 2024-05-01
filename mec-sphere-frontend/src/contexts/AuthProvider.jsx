import React, { useState } from "react";
import AuthContext from "../contexts/AuthContext";

const AuthProvider = ({ children }) => {
  const [User, setUser] = useState({
    id: "",
    name: "",
    token: null,
    role: "",
    email: "",
    status: false,
    friends: [],
    lastname: "",
    user: {},
    year: "",
    branch: "",
  });

  return (
    <AuthContext.Provider value={{ User, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

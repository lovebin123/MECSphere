import React from "react";

const AuthContext = React.createContext({
    User: {
        id: "",
        name: "",
        token: null,
        status: false,
        role:"",
        email: "",
        friends:[],
        lastname:"",
        user:{},
        year:"",
        branch:""

    },
    setUser: () => {} // Default setter function
});

export default AuthContext;

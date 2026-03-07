import React from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";

const NotFound = () => {
    const {user} = useAuth()
  const navigate = useNavigate();

  const handleRedirect = ()=>{
    if(user.role === "admin"){
        return navigate("/dashboard")
    }else{
       return navigate('/')
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
      <h1 className="text-9xl font-black text-gray-100 absolute z-0 select-none">
        404
      </h1>
      <div className="z-10 space-y-4">
        <h2 className="text-3xl font-bold text-gray-800">
          Oops! Page Not Found
        </h2>
        <p className="text-gray-500 max-w-md mx-auto">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
        <button
          onClick={handleRedirect}
          className="bg-black text-white px-8 py-3 rounded-xl font-bold hover:bg-gray-800 transition-all shadow-lg active:scale-95"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;

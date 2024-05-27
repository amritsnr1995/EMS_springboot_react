import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

const Header = () => {
  const navigator = useNavigate();
  
  function returnHome(){
    navigator("/employees")
  }
  return (
    
      <nav className="navbar navbar-dark bg-dark container p-3">
        <a class="navbar-brand" onClick={returnHome}  style={{cursor: "pointer"}}>
          EMS
        </a>
      </nav>
    
  );
};

export default Header;

import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const clientId = "786545111668-385qko482e89qbce9r7hcnfi7hn7nr5r.apps.googleusercontent.com";

  return (
    <div style={{ 
      height: "100vh", 
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center", 
      backgroundColor: "lightblue", 
      color: "white", 
      textAlign: "center"
    }}>
      <div style={{ maxWidth: "500px", padding: "20px", borderRadius: "10px" }}>
        <h1 style={{color: "black"}}>TaskBuddy</h1>
        <p>Streamline your workflow and track progress effortlessly with our all-in-one task management app</p>
        
        <GoogleOAuthProvider clientId={clientId}>
          <GoogleLogin
            onSuccess={(response) => {
              const decoded = jwtDecode(response.credential);
              console.log("User Info:", decoded);

              localStorage.setItem("user", JSON.stringify(decoded));

              navigate("/dashboard");
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        </GoogleOAuthProvider>
      </div>
    </div>
  );
};

export default Login;

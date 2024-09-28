import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Logo from "../assets/logo.svg";
import { Context } from "../context/Context";

const Login = () => {
  const { setToken, users, setIsAdmin, setUser, setUsers } = useContext(Context);
  const [loading, setLoading] = useState(false);

  function handleLogin(e) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    if (data.tel === "997235430" && data.password === "5430") {
      toast.success("Welcome Admin Mardonbek!");
      setTimeout(() => {
        setIsAdmin(true);
        setUser({ name: "Mardonbek", tel: "997235430", isAdmin: true });
        setUsers(
            [...users, {
                name: "Mardonbek",
                tel: "997235430",
                password:"5430",
                isAdmin: true
            }]
        )
        setToken("997235430");
        setLoading(false);
      }, 500);
      return;
    }

    const user = users.find(
      (user) => user.tel === data.tel && user.password === data.password
    );

    const userByTel = users.find((user) => user.tel === data.tel);

    if (user) {
      toast.success(`Welcome, ${user.name}!`);
      setTimeout(() => {
        setIsAdmin(user.isAdmin); 
        setUser(user); 
        setToken(user.tel); 
        setLoading(false);
      }, 500);
    } else if (userByTel) {
      toast.error("Incorrect password! Please try again.");
      setLoading(false);
    } else {
      toast.error("User not found! Please check your phone number.");
      setLoading(false);
    }
  }

  return (
    <div className="w-full">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="max-w-[450px] mx-auto w-full flex flex-col justify-center mt-[60px]">
        <img src={Logo} alt="Logo" width={50} height={41} />
        <h1 className="text-3xl font-bold my-9">Log in to Twitter</h1>
        <form onSubmit={handleLogin} className="flex flex-col" autoComplete="off">
          <input
            type="tel"
            name="tel"
            className="rounded-[6px] border border-gray-400 outline-none py-[23px] px-5"
            placeholder="Phone number"
            required
            aria-label="Phone number"
          />
          <input
            type="password"
            name="password"
            className="rounded-[6px] border border-gray-400 outline-none my-[25px] py-[23px] px-5"
            placeholder="Password"
            required
            aria-label="Password"
            minLength={4}
          />
          <button
            className="bg-[#1DA1F2] hover:bg-[#1DA1F2]/70 text-white font-bold py-[18px] rounded-full"
            disabled={loading}
          >
            {loading ? "Logging In..." : "Log In"}
          </button>
          <div className="flex items-center justify-between mt-[40px]">
            <p className="text-sm text-[#1DA1F2] hover:text-[#1DA1F2]/80">
              Forgot password?
            </p>
            <Link to="/sign-up" className="text-[#1DA1F2] hover:text-[#1DA1F2]/80">
              Don't have an account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

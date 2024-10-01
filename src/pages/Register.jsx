import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.svg";
import { Context } from "../context/Context";
import toast, { Toaster } from "react-hot-toast";

const Register = () => {
  const { users, setUsers } = useContext(Context); 
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()

  function handleRegister(e) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    if (!data.name || !data.tel || !data.password) {
      toast.error("All fields are required!");
      setLoading(false);
      return;
    }

    const userExists = users.some((user) => user.tel === data.tel);
    if (userExists.tel === data.tel) {
      toast.error("User with this phone number already exists!");
      setLoading(false);
      return;
    }
    if (userExists.password === data.password) {
        toast.error("User with this password already exists!");
        setLoading(false);
        return;
    }

    const registrationTime = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const newUser = {
      name: data.name,
      tel: data.tel,
      password: data.password,
      isAdmin: false,
      registrationTime: registrationTime

    };
    setUsers([...users, newUser]);
    toast.success(`Account created successfully! Welcome, ${data.name}.`);

    setTimeout(() => {
      setLoading(false);
      navigate("/");
    }, 500);
  }

  return (
    <div className="w-full">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="max-w-[450px] mx-auto w-full flex flex-col justify-center mt-[40px]">
        <img src={Logo} alt="Logo" className="mx-auto" width={40} height={33} />
        <h1 className="text-[30px] font-bold mt-[43px] mb-9">
          Create an account
        </h1>
        <form onSubmit={handleRegister} className="flex flex-col" autoComplete="off">
          <input
            type="text"
            name="name"
            className="rounded-[6px] border border-gray-400 outline-none py-[23px] px-5"
            placeholder="Name"
            required
            aria-label="Name"
          />
          <input
            type="tel"
            name="tel"
            className="rounded-[6px] border border-gray-400 outline-none my-[25px] py-[23px] px-5"
            placeholder="Phone number"
            required
            aria-label="Phone number"
          />
          <input
            type="password"
            name="password"
            className="rounded-[6px] border border-gray-400 outline-none mb-[25px] py-[23px] px-5"
            placeholder="Password"
            required
            aria-label="Password"
            minLength={4} // Example password length validation
          />
          <button
            className="bg-[#1DA1F2] hover:bg-[#1DA1F2]/70 text-white font-bold py-[18px] rounded-full"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
          <div className="flex items-center justify-end mt-[40px]">
            <Link to="/" className="text-[#1DA1F2] hover:text-[#1DA1F2]/80">
              Have an account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;

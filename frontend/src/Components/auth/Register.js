import React, { useState } from "react";
import { API_LEVEL, BASE_URL } from "../../config";
import axios from "../../utils/axios";

export default function Register() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const newForm = new FormData();

   
    newForm.append("name", name);
    newForm.append("email", email);
    newForm.append("password", password);

       axios
       .post(`${API_LEVEL}/auth/create-user`, newForm, config)
      .then((res) => {
        // toast.success(res.data.message);
        setName("");
        setEmail("");
        setPassword("");
        
      })
      .catch((error) => {
        // toast.error(error.response.data.message);
      });
  };

  return (
    <div className="w-[60%] sm:w-[90%]  m-2 sm:m-auto sm:mt-20 lg:scale-100 md:mt-[2rem]">
        <form onSubmit={handleSubmit}>
      <h1 className="text-white/90 text-blue-500 text-[28px] font-bold mt-10 brightness-[300%]">
        Register New Account!
      </h1>
      <p className="text-white/80 text-[18px] mt-5 font-montserrat">
        Access to the most powerfull tool in the entire design and web
        industrytool in the entire design and web
      </p>
      <div class="relative w-full mt-10">
        <input
          type="text"
          onChange={(e)=> setName(e.target.value)}
          class="bg-midnight rounded-sm placeholder:text-white py-4 px-4 w-full text-white border-none outline-none"
          placeholder="Enter Full Name"
        />
      </div>
      <div class="relative w-full flex:col gap-10">
        <input
          type="text"
          onChange={(e)=> setEmail(e.target.value)}
          class="bg-midnight mt-5 rounded-sm placeholder:text-white py-4 px-4 w-full text-white border-none outline-none"
          placeholder="Email address"
        />
        <input
          type="password"
          onChange={(e)=> setPassword(e.target.value)}
          class="bg-midnight mt-5 rounded-sm placeholder:text-white py-4 px-4 w-full text-white border-none outline-none"
          placeholder="Enter Password"
        />
      </div>
      <button type="submit" className="text-center rounded-md mt-10 py-3 px-4 bg-tahiti w-full font-robotomono text-white m-auto ">
        Register
      </button>
      </form>
    </div>
  );
}

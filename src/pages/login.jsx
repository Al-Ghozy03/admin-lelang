import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import img from "../images/13015.jpg";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().required(),
  })
  .required();

export default function Login() {
  let navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [loading, setLoading] = useState(false);
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      let url = "http://localhost:8000/admin/login";
      let respon = await axios.post(url, data);
      setLoading(false);
      localStorage.setItem("token", respon.data.token);
      return navigate("/dashboard", { replace: true });
    } catch (er) {
      setLoading(true);
      if (er.response.data.message === "password salah") {
        setLoading(false);
        return Swal.fire({
          title: "Gagal",
          text: er.response.data.message,
          icon: "error",
          confirmButtonColor: "#FF9900",
        });
      }
      if (er.response.data.message === "email salah") {
        setLoading(false);
        return Swal.fire({
          title: "Gagal",
          text: er.response.data.message,
          icon: "error",
          confirmButtonColor: "#FF9900",
        });
      }
      setLoading(false);
      localStorage.setItem("token", er.response.data.token);
      Swal.fire({
        title: "Gagal",
        text: er.response.data.message,
        icon: "error",
        confirmButtonColor: "#FF9900",
        showCancelButton: true,
        confirmButtonText: "Verifikasi email mu",
      }).then((result) => {
        if (result.isConfirmed) return navigate("/verifikasi");
      });
    }
  };
  const [show, setShow] = useState(false);
  return (
    <React.Fragment>
      <div className="flex px-10 py-32 space-x-6">
        <img src={img} alt={img} className="h-96" />
        <div className="w-full">
          <h1 className="text-4xl font-semibold mb-10">Login</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              {...register("email")}
              type="email"
              className="outline-none border h-11 rounded-md w-full pl-3"
              placeholder="Email"
            />
            <p className="text-red-500 text-xs my-2">{errors.email?.message}</p>

            <input
              {...register("password")}
              type={show ? "text" : "password"}
              className="outline-none border h-11 rounded-md w-full pl-3"
              placeholder="Password"
            />
            <button
              onClick={() => setShow(!show)}
              type="button"
              className="relative bottom-4 right-9"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-5 w-5 absolute ${!show ? "text-gray-500" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </button>
            <p className="text-red-500 text-xs mt-3">
              {errors.password?.message}
            </p>
            <p className="text-gray-400 text-xs mb-4 text-right">
              Lupa password
            </p>
            <button
              type="submit"
              className="bg-[#FEB21D] w-full text-white py-2 rounded-md shadow-md hover:bg-[#FFA900]"
            >
              {loading ? "loading" : "Login"}
            </button>
          </form>
          <p className="text-xs mt-4">
            Don't have an account?{" "}
            <Link to="/register" className="text-[#FF9900]">
              Register
            </Link>
          </p>
        </div>
      </div>
    </React.Fragment>
  );
}

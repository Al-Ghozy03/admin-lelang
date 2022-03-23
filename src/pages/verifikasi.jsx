import axios from "axios";
import jwtDecode from "jwt-decode";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Padding from "../component/padding";
import img from "../images/2710477.jpg";

export default function Verifikasi() {
  let { id } = jwtDecode(localStorage.getItem("token"));
  const { handleSubmit, register } = useForm();
  let navigate = useNavigate();
  async function verifikasi(data) {
    try {
      let url = `http://localhost:8000/admin/verifikasi/${id}`;
      await axios.post(url, data);
      Swal.fire({
        title: "Berhasil",
        text: "Berhasil verifikasi",
        icon: "success",
        confirmButtonColor: "#FF9900",
      });
      navigate("/dashboard");
    } catch (er) {
      Swal.fire({
        title: "Gagal",
        text: er.response.data.message,
        icon: "error",
        confirmButtonColor: "#FF9900",
      });
    }
  }

  return (
    <React.Fragment>
      <Padding>
        <div className="flex mt-14 space-x-32">
          <img src={img} alt={img} style={{ height: "27rem" }} />
          <div className="w-full">
            <h1 className="text-3xl capitalize mb-6 font-semibold">
              verify your account
            </h1>
            <form onSubmit={handleSubmit(verifikasi)}>
              <input
                {...register("token")}
                type="text"
                className="bg-gray-100 pl-4 rounded w-full h-10 outline-none"
                placeholder="Input your token"
              />
              <div className="flex space-x-14 mt-5">
                <button className="bg-[#FEB21D] w-1/2 text-white py-2 rounded-md shadow-md hover:bg-[#FFA900]">
                  Verify
                </button>
                <button
                  type="button"
                  className="bg-gray-400 w-1/2 text-white py-2 rounded-md shadow-md hover:bg-gray-500"
                >
                  Resend
                </button>
              </div>
            </form>
          </div>
        </div>
      </Padding>
    </React.Fragment>
  );
}

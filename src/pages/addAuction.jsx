import React from "react";
import { useNavigate } from "react-router-dom";
import img from "../images/13015.jpg";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { baseUrl, token } from "../api/get";
import CurrencyInput from "react-currency-input-field";
const schema = yup
  .object({
    namaBarang: yup.string().required(),
    tanggal: yup.date().required(),
    jam: yup.string().required(),
    hargaAwal: yup.string().required(),
    kategori: yup.string().required(),
    deskripsi: yup.string().required(),
  })
  .required();

export default function AddAuction() {
  let navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  let price = 0;
  const onSubmit = async (data) => {
    try {
      data.hargaAwal = parseInt(price)
      let url = `${baseUrl}/barang/post`;
      const formData = new FormData();
      formData.append("namaBarang", data.namaBarang);
      formData.append("tanggal", data.tanggal);
      formData.append("jam", data.jam);
      formData.append("hargaAwal", data.hargaAwal);
      formData.append("deskripsi", data.deskripsi);
      formData.append("kategori", data.kategori);
      formData.append("fotoBarang", data.fotoBarang[0]);
      await axios.post(url, formData, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      Swal.fire({
        title: "Berhasil",
        text: "Berhasil membuat lelang",
        icon: "success",
        confirmButtonColor: "#FF9900",
      });
      navigate("/list-items", { replace: true });
    } catch (er) {
      Swal.fire({
        title: "Gagal",
        text: er.response.data.message,
        icon: "error",
        confirmButtonColor: "#FF9900",
      });
    }
  };
  return (
    <React.Fragment>
      <div className="flex px-10 py-24 space-x-6">
        <img src={img} alt={img} className="h-96" />
        <div className="w-full">
          <h1 className="text-4xl font-semibold mb-10">Add Items</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              {...register("namaBarang")}
              type="text"
              className="outline-none border h-11 rounded-md w-full pl-3 mt-3"
              placeholder="Nama barang"
            />
            <p className="text-red-500 text-xs mt-2">
              {errors.namaBarang?.message}
            </p>
            <input
              {...register("tanggal")}
              type="date"
              className="outline-none border h-11 rounded-md w-full pl-3 mt-3"
            />
            <p className="text-red-500 text-xs mt-2">
              {errors.tanggal?.message}
            </p>
            <input
              {...register("jam")}
              type="time"
              className="outline-none border h-11 rounded-md w-full pl-3 mt-3"
              placeholder="Email"
            />
            <p className="text-red-500 text-xs mt-2">{errors.jam?.message}</p>
            {/* <input
              {...register("hargaAwal")}
              type="number"
              className="outline-none border h-11 rounded-md w-full pl-3 mt-3"
              placeholder="Harga, ex: 100000"
            /> */}
             <CurrencyInput
             {...register("hargaAwal")}
              className="outline-none border h-11 rounded-md w-full pl-3 mt-3"
              placeholder="Please enter a number"
              prefix="Rp. "
              defaultValue={0}
              decimalsLimit={2}
              onValueChange={(value)=>price = value}
            />
            <p className="text-red-500 text-xs mt-3">
              {errors.hargaAwal?.message}
            </p>
            <input
              {...register("kategori")}
              type="text"
              className="outline-none border h-11 rounded-md w-full pl-3 mt-3"
              placeholder="Kategori, ex: gaming,computer"
            />
            <p className="text-red-500 text-xs mt-2">
              {errors.kategori?.message}
            </p>
            <textarea
              {...register("deskripsi")}
              className="border outline-none resize-none w-full h-40 px-4 py-3 rounded-md"
            ></textarea>
            <p className="text-red-500 text-xs mt-3">
              {errors.deskripsi?.message}
            </p>
            <input type="file" required {...register("fotoBarang")} />
            <button className="bg-[#FEB21D] w-full text-white py-2 rounded-md shadow-md hover:bg-[#FFA900]">
              Add
            </button>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
}

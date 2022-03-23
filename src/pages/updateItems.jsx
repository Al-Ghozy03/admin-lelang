/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

export default function UpdateItems() {
  let { id } = useParams();
  let navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [data, setData] = useState([]);

  async function getData() {
    let url = `${baseUrl}/barang/detail/${id}`;
    let res = await axios.get(url, {
      headers: { authorization: `Bearer ${token}` },
    });
    setData(res?.data?.data?.rows);
  }
  let price = 0;
  const onSubmit = async (data) => {
    try {
      data.hargaAwal = parseInt(price);
      let url = `${baseUrl}/barang/update/${id}`;
      const formData = new FormData();
      formData.append("namaBarang", data.namaBarang);
      formData.append("tanggal", data.tanggal);
      formData.append("jam", data.jam);
      formData.append("hargaAwal", data.hargaAwal);
      formData.append("kategori", data.kategori);
      formData.append("deskripsi", data.deskripsi);
      formData.append(
        "fotoBarang",
        data.fotoBarang.length === 1 ? data.fotoBarang[0] : data.fotoBarang
      );

      await axios.put(url, formData, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      Swal.fire({
        title: "Berhasil",
        text: "Berhasil update lelang",
        icon: "success",
        confirmButtonColor: "#FF9900",
      });
      navigate("/list-items", { replace: true });
    } catch (er) {
      console.log(er);
      Swal.fire({
        title: "Gagal",
        text: er.response,
        icon: "error",
        confirmButtonColor: "#FF9900",
      });
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <React.Fragment>
      <div className="flex px-10 py-24 space-x-6">
        <img src={img} alt={img} className="h-96" />
        <div className="w-full">
          <h1 className="text-4xl font-semibold mb-10">Update Items</h1>
          {data.map((i, key) => (
            <form key={key} onSubmit={handleSubmit(onSubmit)}>
              <input
                {...register("namaBarang", { value: i?.namaBarang })}
                type="text"
                className="outline-none border h-11 rounded-md w-full pl-3 mt-3"
                placeholder="Nama barang"
              />
              <p className="text-red-500 text-xs mt-2">
                {errors.namaBarang?.message}
              </p>
              <input
                {...register("tanggal", { value: i.tanggal.substring(0, 10) })}
                type="date"
                className="outline-none border h-11 rounded-md w-full pl-3 mt-3"
                placeholder="Username"
              />
              <p className="text-red-500 text-xs mt-2">
                {errors.tanggal?.message}
              </p>

              <input
                {...register("jam", { value: i?.jam })}
                type="time"
                className="outline-none border h-11 rounded-md w-full pl-3 mt-3"
                placeholder="Email"
              />
              <p className="text-red-500 text-xs mt-2">{errors.jam?.message}</p>

              <CurrencyInput
                {...register("hargaAwal", { value: i.hargaAwal })}
                className="outline-none border h-11 rounded-md w-full pl-3 mt-3"
                placeholder="Please enter a number"
                prefix="Rp. "
                defaultValue={i.hargaAwal}
                decimalsLimit={2}
                onValueChange={(value) => (price = value)}
              />

              <p className="text-red-500 text-xs mt-3">
                {errors.hargaAwal?.message}
              </p>
              <input
                {...register("kategori", { value: i.kategori })}
                type="text"
                className="outline-none border h-11 rounded-md w-full pl-3 mt-3"
                placeholder="Nama barang"
              />
              <p className="text-red-500 text-xs mt-2">
                {errors.namaBarang?.message}
              </p>
              <textarea
                {...register("deskripsi", { value: i?.deskripsi })}
                className="border outline-none resize-none w-full h-40 px-4 py-3 rounded-md"
              ></textarea>
              <p className="text-red-500 text-xs mt-3">
                {errors.deskripsi?.message}
              </p>
              <img src={i.fotoBarang} className="mb-4 h-32" alt="" />
              <input
                type="file"
                {...register("fotoBarang", { value: i.fotoBarang })}
              />
              <button className="bg-[#FEB21D] w-full text-white py-2 rounded-md shadow-md mt-4 hover:bg-[#FFA900]">
                Update
              </button>
            </form>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
}

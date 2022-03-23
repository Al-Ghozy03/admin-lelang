import React from "react";
import { useQuery } from "react-query";
import Header from "../component/header";
import Padding from "../component/padding";
import { baseUrl, detailSchedule, token } from "../api/get";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
const convertRupiah = require("rupiah-format");

export default function DetailSchedule() {
  let { id } = useParams();
  let navigate = useNavigate();

  const { data } = useQuery("detail", () => detailSchedule(id), {
    refetchInterval: 2000,
  });
  const month = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Augustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  async function updateStatus() {
    try {
      let url = `${baseUrl}/lelang/update/${id}`;
      await axios.put(
        url,
        { status: "opened" },
        { headers: { authorization: `Bearer ${token}` } }
      );
      navigate(`/penawaran/${id}`);
    } catch (er) {
      console.log(er);
    }
  }

  return (
    <React.Fragment>
      <Header />
      <Padding>
        {data?.map((i, detail) => (
          <div key={detail} className="mt-20 flex space-x-20">
            <div
              className="w-2/3 rounded-md h-96 bg-gray-300 bg-cover"
              style={{ backgroundImage: `url(${i.fotoBarang})` }}
            ></div>
            <div className="w-2/3">
              <h2 className="text-2xl mb-6 font-semibold">{i.namaBarang}</h2>
              <p className="text-sm">{i.deskripsi}</p>
              <h2 className="text-2xl mb-6 font-semibold mt-6">Informasi</h2>
              <p>
                Dimulai pada{" "}
                <span className="font-semibold">
                  {i.jam.substring(0, 5)} WIB, {new Date(i.tanggal).getDate()}{" "}
                  {month[new Date(i.tanggal).getMonth()]}{" "}
                  {new Date(i.tanggal).getFullYear()}
                </span>
              </p>
              <p>
                Harga awal{" "}
                <span className="font-semibold">
                  {convertRupiah.convert(i.hargaAwal)}
                </span>
              </p>
              <p>
                Status{" "}
                <span className="font-semibold capitalize">{i.status}</span>
              </p>
            </div>
            <div className="">
              <button
                onClick={updateStatus}
                className="bg-[#FEB21D] text-white px-5 py-1 rounded-md"
              >
                {i.status === "closed" ? "Open" : "go"}
              </button>
            </div>
          </div>
        ))}
      </Padding>
    </React.Fragment>
  );
}

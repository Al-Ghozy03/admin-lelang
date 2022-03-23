import React from "react";
import Padding from "../component/padding";
import top from "../images/top-rated.png";
import Header from "../component/header";
import { useQuery } from "react-query";
import { baseUrl, detailSchedule, penawaran, token } from "../api/get";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
const { convert } = require("rupiah-format");

export default function Penawaran() {
  let { id } = useParams();
  const { data } = useQuery("penawar", () => penawaran(id), {
    refetchInterval: 3000,
  });
  const detail = useQuery("detail", () => detailSchedule(id), {
    refetchInterval: 3000,
  });
  let navigate = useNavigate();
  async function updateStatus() {
    try {
      let url = `${baseUrl}/lelang/update/${id}`;
      await axios.put(
        url,
        { status: "closed" },
        { headers: { authorization: `Bearer ${token}` } }
      );
      navigate(`/schedule/detail/${id}`);
    } catch (er) {
      console.log(er);
    }
  }
  return (
    <React.Fragment>
      <Header />
      <Padding>
        {detail?.data?.map((i, key) => (
          <div key={key} className="mt-20 flex flex-col">
            <div className="flex  space-x-14">
              <div
                style={{ backgroundImage: `url(${i.fotoBarang})` }}
                className="w-2/3 rounded-md h-96 bg-gray-300 bg-cover"
              ></div>
              <div className="w-2/4">
                <h3 className="text-3xl font-semibold mb-5">
                  Penawaran tertinggi
                </h3>
                {data?.map((j, key) => (
                  <div key={key}>
                    {key === 0 ? (
                      <Top
                        photo={j.photoProfile}
                        key={key}
                        price={convert(j.penawaranHarga)}
                      />
                    ) : (
                      <List
                        img={j.photoProfile}
                        count={key + 1}
                        price={convert(j.penawaranHarga)}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
            <h1 className="text-2xl font-semibold mt-5">{i.namaBarang}</h1>
            <button
              onClick={updateStatus}
              className="bg-[#FEB21D] text-white w-32 px-5 py-1 rounded-md"
            >
              {i.status === "opened" ? "Close" : "Back"}
            </button>
          </div>
        ))}
      </Padding>
    </React.Fragment>
  );
}

function List({ count, id, price, img }) {
  return (
    <React.Fragment>
      <div className="flex items-center px-6 mb-5">
        <div
          style={{ backgroundImage: `url(${img})` }}
          className="h-10 bg-cover w-10 rounded-full bg-red-500"
        ></div>
        <p className="text-lg font-medium ml-4 mr-5">{count}</p>
        <h3 className="text-xl font-medium">
          {price.substring(0, price.length - 3)}
        </h3>
      </div>
    </React.Fragment>
  );
}

function Top({ price, photo }) {
  return (
    <React.Fragment>
      <div className="h-20 w-2/3 mb-4 bg-gradient-to-r from-[#FFA722] to-[#FFD200] rounded-lg flex items-center px-6">
        <div
          style={{ backgroundImage: `url(${photo})` }}
          className="h-12 bg-cover w-12 rounded-full bg-red-500"
        ></div>
        <img src={top} alt={top} className="h-14" />
        <h2 className="text-2xl ml-3 text-white font-semibold">
          {price.substring(0, price.length - 3)}
        </h2>
      </div>
    </React.Fragment>
  );
}

/* eslint-disable eqeqeq */
import React, { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { getItems } from "../../api/get";
import Header from "../../component/header";
import Padding from "../../component/padding";
import Table from "../../component/table";
import ValueItems from "../../component/valueItems";
const convertRupiah = require("rupiah-format");

export default function ListItems() {
  let navigate = useNavigate();
  const [page, Setpage] = useState(1);
  const { data } = useQuery("items", () => getItems(5, page), {
    refetchInterval: 3000,
  });
  return (
    <React.Fragment>
      <Header />
      <Padding>
        <div className="mt-20">
          <button
            onClick={() => navigate("add-auction", { replace: true })}
            className="flex space-x-5 float-right mb-10 border-2 px-5 py-2 rounded-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              />
            </svg>
            <p>Create Auction</p>
          </button>
          <div className="h-screen w-full bg-white rounded-xl shadow-2xl">
            <div className="px-10 py-7">
              <table className="w-full">
                <tbody>
                  <tr>
                    <th className="text-left">
                      <Table title={"no"} />
                    </th>
                    <th className="text-left">
                      <Table title={"nama item"} />
                    </th>
                    <th className="text-left">
                      <Table title={"harga awal"} />
                    </th>
                    <th className="text-left">
                      <Table title={"photo"} />
                    </th>
                  </tr>
                  {data?.data?.rows?.length === 0
                    ? "kosong"
                    : data?.data?.rows?.map((i, key) => (
                        <ValueItems
                          count={key + 1}
                          key={key}
                          id={i.id}
                          namaBarang={i.namaBarang}
                          hargaAwal={convertRupiah.convert(i.hargaAwal)}
                          img={i.fotoBarang}
                        />
                      ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-center space-x-6">
              <button
                disabled={data?.pagination?.pageActive == 1 ? true : false}
                className={`border-2 px-5 ${
                  data?.pagination?.pageActive == 1 ? "opacity-30" : ""
                }`}
                onClick={() => Setpage(page - 1)}
              >
                Prev
              </button>
              <p>{data?.pagination?.pageActive}</p>
              <button
                className="border-2 px-5"
                onClick={() => {
                  Setpage(page + 1);
                }}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </Padding>
    </React.Fragment>
  );
}

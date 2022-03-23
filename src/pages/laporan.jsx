import React from "react";
import { useQuery } from "react-query";
import { convert } from "rupiah-format";
import { laporan } from "../api/get";
import Header from "../component/header";
import Padding from "../component/padding";
import Table from "../component/table";

export default function Laporan() {
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
  const { data } = useQuery("report", () => laporan(), {
    refetchInterval: 2000,
  });
  return (
    <React.Fragment>
      <Header />
      <Padding>
        <div className="mt-20">
          <table className="w-full">
            <tbody>
              <tr>
                <th className="text-left">
                  <Table title={"no"} />
                </th>
                <th className="text-left">
                  <Table title={"barang"} />
                </th>
                <th className="text-left">
                  <Table title={"tanggal"} />
                </th>
                <th className="text-left">
                  <Table title={"petugas"} />
                </th>
                <th className="text-left">
                  <Table title={"foto barang"} />
                </th>
                <th className="text-left">
                  <Table title={"pemenang"} />
                </th>
                <th className="text-left">
                  <Table title={"harga akhir"} />
                </th>
              </tr>
              {data?.map((i, report) => {
                let date = new Date(i.tanggal);
                return (
                  <tr key={report}>
                    <td>{report + 1}</td>
                    <td>{i.namaBarang}</td>
                    <td>{date.getDate()} {month[date.getMonth()]} {date.getFullYear()}</td>
                    <td>{i.username_officer}</td>
                    <td>
                      <img src={i.fotoBarang} alt={i.fotoBarang} className="h-20" />
                    </td>
                    <td>{i.name}</td>
                    <td>{convert(i.hargaAkhir).substring(0,convert(i.hargaAkhir).length-3)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Padding>
    </React.Fragment>
  );
}

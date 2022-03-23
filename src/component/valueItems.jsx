import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../api/get";

export default function ValueItems({ namaBarang, hargaAwal, img, id, count }) {
  let navigate = useNavigate();
  async function deleteItems() {
    try {
      let url = `${baseUrl}/barang/delete/${id}`;
      await axios.delete(url, {
        headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
      });
    } catch (er) {
      console.log(er);
    }
  }

  return (
    <React.Fragment>
      <tr>
        <td className="py-2 ">
          <p>{count}</p>
        </td>
        <td className="py-2 ">
          <p>{namaBarang}</p>
        </td>
        <td className="py-2 ">
          <p>{hargaAwal}</p>
        </td>
        <td className="py-2 ">
          <div
            className="h-20 w-40 bg-gray-300 bg-cover"
            style={{
              backgroundImage: `url(${img})`,
            }}
          ></div>
        </td>
        <td className="py-2 ">
          <button onClick={() => navigate(`update/${id}`)}>
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
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </button>
        </td>
        <td className="py-2 ">
          <button onClick={deleteItems}>
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
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </td>
      </tr>
    </React.Fragment>
  );
}

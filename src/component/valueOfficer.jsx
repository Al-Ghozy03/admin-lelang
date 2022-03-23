import axios from "axios";
import React from "react";
import { baseUrl } from "../api/get";

export default function ValueOfficer({ name, username, email, img, id,count }) {
  async function deleteOfficer() {
    try {
      let url = `${baseUrl}/admin/delete/${id}`;
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
          <p>{name}</p>
        </td>
        <td className="py-2 ">
          <p>{username}</p>
        </td>
        <td className="py-2 ">
          <p>{email}</p>
        </td>
        <td className="py-2 ">
          <div
            className="h-10 w-10 bg-gray-300 rounded-full bg-cover"
            style={{
              backgroundImage: `url(${img})`,
            }}
          ></div>
        </td>
        <td className="py-2 ">
          <button onClick={deleteOfficer}>
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

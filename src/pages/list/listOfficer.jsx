import React from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { getOfficer } from "../../api/get";
import Header from "../../component/header";
import Padding from "../../component/padding";
import Table from "../../component/table";
import ValueOfficer from "../../component/valueOfficer";

export default function ListOfficer() {
  const navigate = useNavigate();
  const { data } = useQuery("officers", () => getOfficer(), {
    refetchInterval: 3000,
  });
  return (
    <React.Fragment>
      <Header />
      <Padding>
        <div className="mt-20">
          <button
            onClick={() => navigate("add-officer")}
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
            <p>Add Officer</p>
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
                      <Table title={"name"} />
                    </th>
                    <th className="text-left">
                      <Table title={"username"} />
                    </th>
                    <th className="text-left">
                      <Table title={"email"} />
                    </th>
                    <th className="text-left">
                      <Table title={"photo"} />
                    </th>
                  </tr>
                  {data?.map((i, key) => (
                    <ValueOfficer
                    count={key+1}
                      key={key}
                      id={i.id}
                      name={i.name}
                      username={i.username}
                      email={i.email}
                      img={i.photoProfile}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Padding>
    </React.Fragment>
  );
}

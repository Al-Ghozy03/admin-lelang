import React from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { getUsers, getOfficer } from "../api/get";
import Card from "../component/card";
import Header from "../component/header";
import Padding from "../component/padding";

export default function Dashboard() {
  

  const { data } = useQuery("user", () => getUsers(), { refetchInterval: 3000 });
  const officerLength = useQuery("officer", () => getOfficer(), {
    refetchInterval: 3000,
  });
  let navigate = useNavigate();
  return (
    <React.Fragment>
      <Header />
      <Padding>
        <div className="mt-20">
          <div className="grid grid-cols-3 gap-6">
            <Card
              title={"users"}
              count={`${data?.rows?.length} users`}
              bg="bg-gradient-to-r from-[#11998E] to-[#38EF7D]"
              route="/list-user"
            />
            <Card
              title={"auction schedules"}
              route="/schedule"
              count={"10 schedules"}
              bg="bg-gradient-to-r from-[#5B86E5] to-[#36D1DC]"
            />
            <Card
              title={"Laporan"}
              route="/list-laporan"
              count={"10 reports"}
              bg="bg-gradient-to-r from-[#FF512F] to-[#F09819]"
            />
            <Card
              title={"officers"}
              route="/list-officer"
              bg="bg-gradient-to-r from-[#CB2D3E] to-[#EF473A]"
              count={`${officerLength.data?.length} officers`}
            />
            <Card
              title={"list items"}
              route="/list-items"
              count={"10 items"}
              bg="bg-gradient-to-r from-[#7474BF] to-[#348AC7]"
            />
          </div>
          <button
            onClick={() => {
              localStorage.clear("token");
              navigate("/login", { replace: true });
            }}
            className="flex items-center text-xs float-right mt-10"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 "
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            logout
          </button>
        </div>
      </Padding>
    </React.Fragment>
  );
}

import React from "react";
import { useQuery } from "react-query";
import { getUsers } from "../../api/get";
import Header from "../../component/header";
import Padding from "../../component/padding";
import Table from "../../component/table";
import ValueUsers from "../../component/valueUser";

export default function ListUsers() {

  const { data } = useQuery("users", () => getUsers(), {
    refetchInterval: 3000,
  });
  return (
    <React.Fragment>
      <Header />
      <Padding>
        <div className="mt-20">
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
                  {data?.rows?.map((i, key) => (
                    <ValueUsers
                      count={data?.count}
                      key={key}
                      id={i.id}
                      name={i.name}
                      username={i.username}
                      email={i.email}
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

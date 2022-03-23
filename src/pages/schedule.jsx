import React from "react";
import { useQuery } from "react-query";
import { getSchedule } from "../api/get";
import CardSchedule from "../component/cardSchedule";
import Header from "../component/header";
import Padding from "../component/padding";

export default function Schedule() {
  const { data } = useQuery("schedule", () => getSchedule(), {
    refetchInterval: 2000,
  });
  
  return (
    <React.Fragment>
      <Header />
      <Padding>
        <div className="mt-20 grid grid-cols-3 gap-4">
          {data?.map((i, schedule) => <CardSchedule key={schedule} id={i.id} title={i.namaBarang} time={i.jam} status={i.status}/>)}
        </div>
      </Padding>
    </React.Fragment>
  );
}

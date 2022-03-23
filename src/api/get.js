import axios from "axios";

export let baseUrl = "http://localhost:8000";
export let token = localStorage.getItem("token");

export async function getUsers() {
  try {
    let url = "http://localhost:8000/user/list";
    let respon = await axios.get(url, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return respon.data.data;
  } catch (er) {}
}

export async function getOfficer() {
  try {
    let url = `${baseUrl}/admin/list-officer`;
    let res = await axios.get(url, {
      headers: { authorization: `Bearer ${token}` },
    });
    return res.data.data.rows;
  } catch (er) {
    console.log(er);
  }
}

export async function getItems(pageSize, page) {
  try {
    let url = `${baseUrl}/barang/all?pageSize=${pageSize}&page=${page}`;
    let res = await axios.get(url, {
      headers: { authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (er) {
    console.log(er);
  }
}
export async function getSchedule() {
  try {
    let url = `${baseUrl}/lelang/schedule`;
    let res = await axios.get(url, {
      headers: { authorization: `Bearer ${token}` },
    });
    return res.data.data;
  } catch (er) {
    console.log(er);
  }
}

export async function detailSchedule(id) {
  try {
    let url = `${baseUrl}/lelang/schedule/${id}`;
    let res = await axios.get(url, {
      headers: { authorization: `Bearer ${token}` },
    });
    return res.data.data;
  } catch (er) {
    console.log(er);
  }
}
export async function detailItem(id) {
  try {
    let url = `${baseUrl}/barang/detail/${id}`;
    let res = await axios.get(url, {
      headers: { authorization: `Bearer ${token}` },
    });
    console.log(res.data.data.rows);
    return res.data.data.rows;
  } catch (er) {
    console.log(er);
  }
}

export async function penawaran(id) {
  try {
    let url = `${baseUrl}/lelang/history/${id}`;
    let res = await axios.get(url, {
      headers: { authorization: `Bearer ${token}` },
    });
    return res.data.data;
  } catch (er) {
    console.log(er);
  }
}

export async function laporan() {
  try {
    let url = `${baseUrl}/lelang/report`;
    let res = await axios.get(url, {
      headers: { authorization: `Bearer ${token}` },
    });
    return res.data.data;

  } catch (er) {}
}

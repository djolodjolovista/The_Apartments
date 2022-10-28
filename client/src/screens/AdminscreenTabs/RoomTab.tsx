import React, { useState, useEffect } from "react";
import Loader from "../../components/Loader";
import { api } from "../Utils/ApiRequests";
import "./RoomTab.css";

interface RoomsType {
  _id: any;
  name: string;
  city: string;
  type: string;
  rentperday: number;
  maxcount: number;
  phonenumber: string;
}
const RoomTab = () => {
  const [rooms, setRooms] = useState<RoomsType[]>([]);
  const [rangevalue, setRangevalue] = useState<number>();
  const [duplicaterooms, setDuplicaterooms] = useState<RoomsType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>();
  const [sort, setSort] = useState<boolean>(true);
  //  let data: React.SetStateAction<RoomsType[]> = [];
  let data: RoomsType[] = [];
  async function fetchData() {
    try {
      //const data = (await req.getAllRooms).data//ovaj api imamo vec za homescreen tako da ne moramo praviti na backendu samo taj iskoristimo
      data = (await api.getAllRooms()).data;

      setRooms(data);
      setDuplicaterooms(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(true);
    }
  }

  function sortRooms(data: RoomsType[]) {
    let num = [];
    if (sort === true) {
      num = [...data].sort((a, b) => a.rentperday - b.rentperday);
      setSort(false);
    } else {
      num = [...data].sort((a, b) => b.rentperday - a.rentperday);
      setSort(true);
    }
    setRooms(num);
  }

  function handleChange(e: any, data: RoomsType[]) {
    let num = [];

    num = data.filter((room) => room.rentperday <= e.target.value);
    setRooms(num);
    setRangevalue(e.target.value);
  }

  useEffect(() => {
    fetchData();

    // eslint-disable-next-line
  }, []);

  return (
    <div className="row">
      <div className="col-md-12">
        <h1>Sobe</h1>
        {loading && <Loader />}
        <div>
          <label htmlFor="customRange2" className="form-label">
            Cijena
          </label>
          <input
            type="range"
            defaultValue="0"
            onChange={(e) => handleChange(e, duplicaterooms)}
            className="form-range"
            min="0"
            step="10"
            max="200"
            id="customRange2"
          ></input>
          <h4>{rangevalue}€</h4>
        </div>

        <table className="table table-bordered table-dark">
          <thead className="bs">
            <tr>
              <th>ID sobe</th>
              <th>Naziv</th>
              <th>Mjesto</th>
              <th>Tip</th>
              <th
                id="priceSort"
                style={{ whiteSpace: "nowrap" }}
                onClick={() => sortRooms(rooms)}
              >
                Cijena po danu
              </th>
              <th style={{ whiteSpace: "nowrap" }}>Kapacitet</th>
              <th style={{ whiteSpace: "nowrap" }}>Broj tel</th>
            </tr>
          </thead>
          <tbody>
            {rooms.length &&
              rooms.map((room) => {
                return (
                  <tr>
                    <td>{room._id}</td>
                    <td>{room.name}</td>
                    <td>{room.city}</td>
                    <td style={{ whiteSpace: "nowrap" }}>{room.type}</td>
                    <td style={{ whiteSpace: "nowrap" }}>
                      {room.rentperday.toFixed(2)} €
                    </td>
                    <td style={{ whiteSpace: "nowrap" }}>{room.maxcount}</td>
                    <td>{room.phonenumber}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RoomTab;

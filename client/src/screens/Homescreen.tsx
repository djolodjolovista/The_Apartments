import React, { useState, useEffect, useMemo } from "react";
//@ts-ignore
import Room from "../components/Room";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { DatePicker, Space, TimePicker } from "antd";
import "antd/dist/antd.css"; //importovanje css-a za date picker
import moment from "moment";
import "./HomeScreen.css";
import { RoomType } from "./AdminscreenTabs/AddRoomTab";
import useFetch from "../hooks/useFetch";
import { Type } from "../enums/TypeFilterEnums";
import useDisableElement from "../hooks/useDisableElement";

export interface RoomsType extends RoomType {
  id_: any;
  currentbookings: [
    {
      bookingid: any;
      fromdate: string;
      todate: string;
      userid: string;
      status: string;
    }
  ];
}

const { RangePicker } = DatePicker;

function Homescreen() {
  const [rooms, setRooms] = useState<RoomsType[]>([]);
  const [loading, setLoading] =
    useState<boolean>(); /**kada je api request pokrenut loading=true, kada je zavrsen loading=false */
  const [error, setError] = useState<boolean>();
  const [cityroom, setCityroom] = useState<string[]>([]);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [fromdate, setFromdate] = useState<string>();
  const [todate, setTodate] = useState<string>();
  const [duplicaterooms, setDuplicaterooms] = useState<RoomsType[]>([]); //stvaramo drugi niz soba jer cemo taj filtrirati u zavisnosti da li je neka soba bukirana

  // tip staviti u enum
  const [type, setType] = useState(Type.all); //za type filter inicijalno postavljen na all

  const [city, setCity] = useState("none");

  //const selectElement = useRef<HTMLSelectElement>(null);
  //const typeFilter = useRef<HTMLSelectElement>(null);
  const typeFilter = useDisableElement();
  const cityFilter = useDisableElement();

  /*const disableSelectCity = (state: boolean) => {
    selectElement!.current!.disabled = state;
  }*/

  /*const disableTypeFilter = (state: boolean) => {
    typeFilter!.current!.disabled = state;
  }*/
  const data: RoomsType[] = useFetch();

  const expensiveCalculation = (num = 0) => {
    console.log("Calculating...");

    for (let i = 0; i < 1000000000; i++) {
      return (num += 1);
    }
  };

  //SIMULACIJA ZA useMemo()
  const calculation = useMemo(expensiveCalculation, []);
  //const calculation = expensiveCalculation();

  async function fetchData(data: RoomsType[]) {
    try {
      setLoading(true); /**API request je pokrenut */

      //const data = (await axios.get("/api/rooms/getallrooms")).data;

      setRooms(data);
      setDuplicaterooms(data);

      setLoading(false); /**API request je zavrsen */
      //document.getElementById("select-list")?.setAttribute("disabled", "disabled")//filter type disabled dok se ne odabere datum
      //document.getElementById("city-filter")?.setAttribute("disabled", "disabled")//search filter disabled dok se datum ne odabere
      //disableTypeFilter(true);
      typeFilter.disableElement(true);
      cityFilter.disableElement(true);
      // disableSelectCity(true);
    } catch (error) {
      setError(true);
      console.log(error);
      setLoading(
        false
      ); /**ako se desi error u toku izvrsenja axios.get nece se ivrsiti setRooms i setLoading */
    }
  }
  useEffect(() => {
    fetchData(data);
    //eslint-disable-next-line
  }, [data]);

  function filterByDate(dates: any) {
    //dates je niz koji ima dva datuma 'start date' i 'to date'

    // const uniqueRooms = new Set(...rooms)
    /* var temp: string[] = []
    rooms.forEach(element => {
      if(!temp.includes(element.city))
      {
        temp.push(element.city)
      }
    })*/
    const uniqueRooms: string[] = Array.from(
      new Set(rooms.map((item: RoomsType) => item.city))
    ); //unique values of an array
    //setCityroom(temp);
    setCityroom(uniqueRooms);
    // console.log(temp)
    console.log(cityroom);
    //document.getElementById("select-list")?.removeAttribute("disabled")//kad odaberemo datum omoguci filter type
    // document.getElementById("city-filter")?.removeAttribute("disabled")//kad odaberemo datum omoguci city filter
    // disableTypeFilter(false);
    typeFilter.disableElement(false);
    cityFilter.disableElement(false);
    //disableSelectCity(false); //kad odaberemo datum omoguci city filter
    filterByType(Type.all); //kad promijenimo datum da vraca filter type na 'all'

    setFromdate(moment(dates[0]).format("DD-MM-YYYY")); //podesen format za 'start date' on je na indeksu 0
    setTodate(moment(dates[1]).format("DD-MM-YYYY")); //za 'to date'
    //moramo sad info o datumu proslijediti room komponenti, a to cemo prikazati u bookingscreen
    //const list = document.getElementById("select-list") as HTMLSelectElement
    //list.disabled = false;
    //document.getElementById("select-list")!.disable = false

    var temprooms = [];
    var avaliability = 0;
    for (const room of duplicaterooms) {
      avaliability = 0;
      if (room.currentbookings.length > 0) {
        for (const booking of room.currentbookings) {
          //checking between-provjera da li je dates između datuma from date i to date (f-ja isBetween zahtijeva format 'YYYY-MM-DD'!!!)
          if (
            !moment(moment(dates[0]).format("YYYY-MM-DD")).isBetween(
              moment(booking.fromdate, "DD-MM-YYYY").format("YYYY-MM-DD"),
              moment(booking.todate, "DD-MM-YYYY").format("YYYY-MM-DD")
            ) &&
            !moment(moment(dates[1]).format("YYYY-MM-DD")).isBetween(
              moment(booking.fromdate, "DD-MM-YYYY").format("YYYY-MM-DD"),
              moment(booking.todate, "DD-MM-YYYY").format("YYYY-MM-DD")
            ) &&
            !moment(
              moment(booking.fromdate, "DD-MM-YYYY").format("YYYY-MM-DD")
            ).isBetween(
              moment(dates[0], "DD-MM-YYYY").format("YYYY-MM-DD"),
              moment(dates[1], "DD-MM-YYYY").format("YYYY-MM-DD")
            ) &&
            !moment(
              moment(booking.todate, "DD-MM-YYYY").format("YYYY-MM-DD")
            ).isBetween(
              moment(dates[0], "DD-MM-YYYY").format("YYYY-MM-DD"),
              moment(dates[1], "DD-MM-YYYY").format("YYYY-MM-DD")
            )
          ) {
            //provjera da li je dates jednak from date i to date
            if (
              moment(dates[0]).format("DD-MM-YYYY") !== booking.fromdate &&
              moment(dates[0]).format("DD-MM-YYYY") !== booking.todate &&
              moment(dates[1]).format("DD-MM-YYYY") !== booking.fromdate &&
              moment(dates[1]).format("DD-MM-YYYY") !== booking.todate
            ) {
              avaliability++;
            }
          }
        }
      }
      if (
        avaliability === room.currentbookings.length ||
        (room.currentbookings.length as Number) === 0
      ) {
        // ===0
        temprooms.push(room);
        avaliability = 0;
      }

      setRooms(temprooms); //prikazace samo slobodne sobe
      setDuplicaterooms(temprooms);
      setCity("none");
      setDisabled(true);
    }
  }

  function filterBySearch(e: any) {
    var temprooms = [];
    setCity(e);

    if (e === "none") {
      if (type !== Type.all) {
        temprooms = duplicaterooms.filter(
          (room) => room.type.toLowerCase() === type.toLowerCase()
        );
        setRooms(temprooms);
      } else if (type === Type.all) {
        setRooms(duplicaterooms);
      }
    } else {
      temprooms = duplicaterooms.filter(
        (room) => room.city.toLowerCase() === e.toLowerCase()
      );
      if (type !== Type.all) {
        temprooms = temprooms.filter(
          (room) => room.type.toLowerCase() === type.toLowerCase()
        );
      }
      setRooms(temprooms);
    }
  }

  function filterByType(e: any) {
    setType(e); //da prikaze u polju da li je ukljucen filter delux,non-delux ili all
    var temprooms = [];
    if (e === Type.delux) {
      temprooms = duplicaterooms.filter(
        (room) => room.type.toLowerCase() === e.toLowerCase()
      ); //ovo room je kao neka pomocna promjenjiva

      if (city !== "none") {
        temprooms = temprooms.filter((room) =>
          room.city.toLowerCase().includes(city.toLowerCase())
        );
      }
      setRooms(temprooms);
    } else if (e === Type.nondelux) {
      temprooms = duplicaterooms.filter(
        (room) => room.type.toLowerCase() === e.toLowerCase()
      ); //ovo room je kao neka pomocna promjenjiva
      if (city !== "none") {
        temprooms = temprooms.filter((room) =>
          room.city.toLowerCase().includes(city.toLowerCase())
        );
        setRooms(temprooms);
      } else {
        setRooms(temprooms);
      }
    } else if (e === Type.all) {
      if (city !== "none") {
        temprooms = duplicaterooms.filter((room) =>
          room.city.toLowerCase().includes(city.toLowerCase())
        );
        setRooms(temprooms);
      } else {
        setRooms(duplicaterooms);
      }
    }
  }
  /**className od div-ova je iz bootstrap */
  /**Prvo provjeravamo Loading pa rooms pa ako nije nista od toga true onda tek error da izbaci !(kad ubacimo filter search brisemo error) */
  /**.map()-koristimo da kreiramo listu od JSX elemenata */

  return (
    <div className="container">
      <div className="row mt-5 bs">
        <div
          className="col-md-3 mt-1 mb-1"
          style={{ display: "flex", alignItems: "center" }}
        >
          <RangePicker
            disabled={disabled}
            allowClear={false}
            format="DD-MM-YYYY"
            onChange={filterByDate}
          />
        </div>
        <div
          className="col-md-4 mt-1 mb-1"
          style={{ display: "flex", alignItems: "center" }}
        >
          <select
            ref={cityFilter.element}
            className="form-control"
            id="city-filter"
            value={city}
            onChange={(e) => {
              filterBySearch(e.target.value);
            }}
          >
            <option value="none">Mjesto</option>
            {cityroom &&
              cityroom.map((room, index) => {
                return (
                  <option key={index} value={room}>
                    {room}
                  </option>
                );
              })}
          </select>
        </div>

        <div
          className="col-md-3 mt-1 mb-1"
          style={{ display: "flex", alignItems: "center" }}
        >
          <select
            ref={typeFilter.element}
            className="form-control"
            id="select-list"
            value={type}
            onChange={(e) => {
              filterByType(e.target.value);
            }}
          >
            <option value={Type.all}>Sve</option>
            <option value={Type.delux}>Delux</option>
            <option value={Type.nondelux}>Non-Delux</option>
          </select>
        </div>
        <div
          className="col-md-2 mt-1 mb-1"
          style={{ display: "flex", alignItems: "center" }}
        >
          <button
            className="btn btn-primary w-100"
            onClick={() => {
              window.location.reload();
            }}
          >
            Obriši
          </button>
        </div>
      </div>
      <div className="main-container">
        {loading ? (
          <Loader />
        ) : (
          rooms.map((room) => {
            return (
              <div key={room.id_} className="cards">
                <Room room={room} fromdate={fromdate} todate={todate} />
                <div style={{ marginLeft: "30px" }}>{/*calculation*/}</div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Homescreen;

import axios from "axios";
import { RoomType } from "../AdminscreenTabs/AddRoomTab";

export const api = {
  getAllRooms: () => axios.get("/api/rooms/getallrooms"),

  getAllUsers: () => axios.get("/api/users/getallusers"),

  getAllBookings: () => axios.get("/api/bookings/getallbookings"),

  addNewRoom: (newRoom: RoomType) => axios.post("/api/rooms/addroom", newRoom),
};

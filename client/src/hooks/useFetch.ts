import { useState, useEffect } from "react";
import { api } from "../screens/Utils/ApiRequests";
import { RoomsType } from "../screens/Homescreen";

const useFetch = ():RoomsType[] => {
  const [data, setData] = useState<RoomsType[]>([]);

  const fetchData = async () => {
    try {
      const result: RoomsType[] = (await api.getAllRooms()).data;
      setData(result);
    } catch (error) {
      console.log("Error->", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return data;
};

export default useFetch;

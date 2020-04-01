import { ax } from "./axios-config";

export const getTableData = async (date: Date) => {

  const formattedDate = `${date.getDate() < 10 ? "0" : ""}${date.getDate()}.${
    date.getMonth() + 1 < 10 ? "0" : ""
  }${date.getMonth() + 1}.${date.getFullYear()}`;
  console.log("formattedDate: ", formattedDate);

  return await ax.get(`?date=${formattedDate}`);
};

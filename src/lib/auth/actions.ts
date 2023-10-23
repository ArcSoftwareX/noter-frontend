import axios from "axios";
import { BACKEND_URL } from "../constants";

export const changeAvatar = async (file: Blob) => {
  const formData = new FormData();
  formData.append("file", file);

  const { data } = await axios.put(`${BACKEND_URL}/avatar`, formData, {
    withCredentials: true,
  });

  return data;
};

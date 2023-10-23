import axios from "axios";
import { BACKEND_URL } from "../constants";

export const signIn = async (email: string, password: string) => {
  const { data } = await axios.post(
    `${BACKEND_URL}/auth/login`,
    {
      email,
      password,
    },
    {
      withCredentials: true,
    }
  );

  console.log(data);

  return data;
};

export const signUp = async (
  email: string,
  name: string | null,
  password: string
) => {
  const { data } = await axios.post(
    `${BACKEND_URL}/auth/signup`,
    { email, password, name },
    { withCredentials: true }
  );

  console.log(data);

  return data;
};

export const me = async () => {
  try {
    const { data } = await axios.get(`${BACKEND_URL}/users/@me`, {
      withCredentials: true,
    });

    return data;
  } catch (e) {
    return null;
  }
};

export const signOut = async () => {
  try {
    await axios.post(`${BACKEND_URL}/auth/logout`, undefined, {
      withCredentials: true,
    });
    return true;
  } catch (e) {
    return false;
  }
};

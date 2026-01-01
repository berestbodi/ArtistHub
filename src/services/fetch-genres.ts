import axios from "axios";

const api = axios.create({
  baseURL: "https://sound-wave.b.goit.study/api",
});

export interface Genres {
  _id: string;
  genre: string;
}

export default async function fetchGenres(): Promise<Genres[]> {
  const response = await api.get<Genres[]>("/genres");
  return response.data;
}

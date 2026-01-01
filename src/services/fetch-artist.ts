import axios from "axios";

const api = axios.create({
  baseURL: "https://sound-wave.b.goit.study/api",
});

export interface ArtistItem {
  _id: string;
  strArtist: string;
  strBiographyEN: string;
  strArtistThumb: string;
  genres: string[];
}

export interface ArtistsResponse {
  artists: ArtistItem[];
  page: number;
  limit: number;
  totalArtists: number;
}

export default async function fetchArtist(
  page = 1,
  query?: string,
  genre?: string,
  sort?: string,
  limit = 10
): Promise<ArtistsResponse> {
  const response = await api.get<ArtistsResponse>("/artists", {
    params: {
      page,
      limit,
      ...(query && { name: query }),
      ...(genre && { genre: genre }),
      ...(sort && { sortName: sort }),
    },
  });

  return response.data;
}

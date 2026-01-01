import axios from "axios";

const api = axios.create({
  baseURL: "https://sound-wave.b.goit.study/api",
});

export interface Albums {
  albumsList: AlbumItem[];
  genres: string[];
  intDiedYear: number;
  intFormedYear: number;
  intMembers: string;
  strArtist: string;
  strArtistThumb: string;
  strBiographyEN: string;
  strCountry: string;
  strGender: string;
  strLabel: string;
}

interface AlbumItem {
  _id: string;
  strAlbum: string;
  intYearReleased: string;
  tracks: Tracks[];
}

interface Tracks {
  _id: string;
  strTrack: string;
  strArtist: string;
  intDuration: string;
  movie: string;
}

export default async function fetchArtistById(
  id: string,
  limit: number = 8
): Promise<Albums> {
  const response = await api.get<Albums>(`/artists/${id}/albums`, {
    params: {
      limit: limit,
    },
  });

  return response.data;
}

import axios from "axios";
import type { FeedBackProps } from "../components/FeedbackModal/FeedbackModal";

const api = axios.create({
  baseURL: "https://sound-wave.b.goit.study/api",
});

export interface Feedback {
  _id: string;
  name: string;
  rating: number;
  descr: string;
}

export interface FetshFeedbackProps {
  data: Feedback[];
}

export async function fetchFeedbacks(): Promise<FetshFeedbackProps> {
  const res = await api.get<FetshFeedbackProps>("/feedbacks", {
    params: {
      limit: 10,
    },
  });
  return res.data;
}

interface postFeedbackProps {
  message: string;
}

export async function postFeedback(
  values: FeedBackProps
): Promise<postFeedbackProps> {
  const res = await api.post<postFeedbackProps>("/feedbacks", values);
  return res.data;
}

import useSWR from "swr";
import { API_URL } from "../../lib/consts";
import { axiousGet } from "../swr-hendlers";
import { Message } from "./model";

const endpointURL = `${API_URL}/api/v1/messages`;

const isMessage = (data: any): data is Message =>
  data?.id !== undefined && data?.content !== undefined;

export type GetMessageRes = Message;

export const useGetMessage = (id: string) => {
  const swrResponse = useSWR(`/messages/${id}`, axiousGet<GetMessageRes>);
  if (swrResponse.data !== undefined && !isMessage(swrResponse.data)) {
    console.error(
      `The response of the endpoint with an unexpected type: ${endpointURL}/${id}`
    );
  }
  return swrResponse;
};

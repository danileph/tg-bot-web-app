import useSWR from "swr";
import { API_URL } from "../../lib/consts";
import { axiousGet } from "../swr-hendlers";
import { Message } from "./messages-model";

const endpointURL = `${API_URL}/api/v1/messages`;

const isMessage = (data: any): data is Message =>
  data?.botId !== undefined &&
  data?.name !== undefined &&
  data?.id !== undefined &&
  (data?.message?.text !== undefined || data?.message?.caption !== undefined);

export type GetMessageRes = Message;

export const useGetMessage = (botId: string, id: string) => {
  const swrResponse = useSWR(
    `/posts?botid=${botId}&id=${id}`,
    axiousGet<GetMessageRes>
  );
  if (swrResponse.data !== undefined && !isMessage(swrResponse.data)) {
    console.error(
      `The response of the endpoint with an unexpected type: ${endpointURL}/${id}`
    );
  }
  return swrResponse;
};

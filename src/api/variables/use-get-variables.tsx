import useSWR from "swr";
import { API_URL } from "../../lib/consts";
import { axiousGet } from "../swr-hendlers";

const endpointURL = `${API_URL}/api/v1/variables`;

export type Variable = {
  name: string;
  code: string;
  id: string;
};

export type GetVariablesRes = Variable[];

const isVariable = (data: any): data is Variable =>
  data?.name !== undefined &&
  data?.code !== undefined &&
  data?.id !== undefined;

const isArrayOfVariables = (data: any): data is Variable[] =>
  data instanceof Array && (data.length === 0 || data.every(isVariable));

export const useGetVariables = () => {
  const swrResponse = useSWR(`/variables`, axiousGet<GetVariablesRes>);

  if (swrResponse.data !== undefined && !isArrayOfVariables(swrResponse.data)) {
    console.error(
      `The response of the endpoint with an unexpected type: ${endpointURL}`
    );
  }

  return swrResponse;
};

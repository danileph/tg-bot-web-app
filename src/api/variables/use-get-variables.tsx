import useSWR from "swr";
import { API_URL } from "../../lib/consts";
import { axiousGet } from "../swr-hendlers";
import { Variable } from "./variables-model";
import { useState } from "react";

const endpointURL = `${API_URL}/api/v1/variables`;

export type GetVariablesRes = Variable[];

const isVariable = (data: any): data is Variable =>
  data?.key !== undefined && data?.value !== undefined;

const isArrayOfVariables = (data: any): data is Variable[] =>
  data instanceof Array && (data.length === 0 || data.every(isVariable));

export const useGetVariables = (botId: string) => {
  const swrResponse = useSWR(
    `/substitution?botid=${botId}`,
    axiousGet<GetVariablesRes>
  );

  if (swrResponse.data !== undefined && !isArrayOfVariables(swrResponse.data)) {
    console.error(
      `The response of the endpoint with an unexpected type: ${endpointURL}`
    );
  }

  return swrResponse;
};

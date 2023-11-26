import { api } from "./axios-conf";

export const axiousGet = <Res>(url: string) =>
  api.get(url).then((res) => res.data as Res);

export const axiousPost = <Req, Res>(url: string, { arg }: { arg: Req }) =>
  api.post(url, arg).then((res) => res.data as Res);

export const axiousPut = <Req, Res>(url: string, { arg }: { arg: Req }) =>
  api.put(url, arg).then((res) => res.data as Res);

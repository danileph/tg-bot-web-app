import useSWR, { useSWRConfig } from "swr";
import useSWRMutation from "swr/mutation";
import { axiousPost, axiousPut } from "../swr-hendlers";
import { Message } from "./messages-model";

type PostOrderBody = Omit<Message, "id">;

type PostOrderRes = {};

export const usePutMessage = (id: string) => {
  const { mutate } = useSWRConfig();
  const result = useSWRMutation(
    `/messages/${id}`,
    axiousPut<PostOrderBody, PostOrderRes>
  );
  mutate(`/messages/${id}`);
  return result;
};

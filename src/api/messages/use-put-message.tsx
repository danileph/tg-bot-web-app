import useSWR, { useSWRConfig } from "swr";
import useSWRMutation from "swr/mutation";
import { axiousPost, axiousPut } from "../swr-hendlers";
import { Message } from "./messages-model";

type PostOrderBody = Omit<Message, "id">;

type PostOrderRes = {};

export const usePutMessage = () => {
  const { mutate } = useSWRConfig();
  const result = useSWRMutation(
    `/posts`,
    axiousPut<PostOrderBody, PostOrderRes>
  );
  mutate(`/posts`);
  return result;
};

export type Message = {
  botId: number;
  name: string;
  id: number;
  btns: string;
  message: {
    id: number;
    text: string | null;
    caption: string | null;
    mediaGroupId: any;
    medias: any;
    voice: any;
    videoNote: any;
    entities: any;
  };
};

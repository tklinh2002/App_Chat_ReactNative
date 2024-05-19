export type typeSendMessage = {
  replyMessageId: string;
  content: string;
  attachments: [
    {
      type: string;
      url: string;
      filename: string;
    }
  ];
};

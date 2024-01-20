import { IMessage } from "@/types/messageInterface";
import { apiSlice } from "./apiSlice";

export const messagesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createMessage: builder.mutation<IMessage, IMessage>({
      query: (message) => ({
        url: `/messages`,
        method: "POST",
        body: message,
      }),
      invalidatesTags: ["Messages"],
    }),
    getMessagesByConversation: builder.query<IMessage[], string>({
      query: (conversationId) => ({
        url: `/messages/${conversationId}`,
        method: "GET",
      }),
      providesTags: ["Messages"],
    }),
  }),
});

export const {
  useCreateMessageMutation,
  useLazyGetMessagesByConversationQuery,
} = messagesApiSlice;

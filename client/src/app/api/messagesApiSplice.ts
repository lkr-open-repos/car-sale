import { IMessage } from "@/types/messageInterface";
import { apiSlice } from "./apiSlice";

// Inject messages endpoints into the slice
export const messagesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Create message mutation
    createMessage: builder.mutation<IMessage, Omit<IMessage, "id">>({
      query: (message) => ({
        url: `/messages`,
        method: "POST",
        body: message,
      }),
      invalidatesTags: ["Messages"],
    }),
    // Get messages by conversation query
    getMessagesByConversation: builder.query<IMessage[], string>({
      query: (conversationId) => ({
        url: `/messages/${conversationId}`,
        method: "GET",
      }),
      transformResponse: (res: { messages: IMessage[] }) => res.messages,
      providesTags: ["Messages"],
    }),
  }),
});

export const {
  useCreateMessageMutation,
  useLazyGetMessagesByConversationQuery,
} = messagesApiSlice;

import { IConversation } from "@/types/conversationInterface";
import { apiSlice } from "./apiSlice";

export const conversationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createConversation: builder.mutation<
      IConversation,
      { senderId: string; receiverId: string }
    >({
      query: ({ senderId, receiverId }) => ({
        url: `/conversations`,
        method: "POST",
        body: { senderId, receiverId },
      }),
      // transformResponse: (res: { conversation: IConversation }) =>
      //   res.conversation,
      // invalidatesTags: ["Conversations"],
    }),
    getConversationsByUser: builder.query<IConversation[], string>({
      query: (userId) => ({
        url: `/conversations/${userId}`,
        method: "GET",
      }),
    }),
    getConversationByUsers: builder.query<
      IConversation,
      { firstUserId: string; secondUserId: string }
    >({
      query: ({ firstUserId, secondUserId }) => ({
        url: `/conversations/${firstUserId}/${secondUserId}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateConversationMutation,
  useGetConversationsByUserQuery,
  useLazyGetConversationByUsersQuery,
} = conversationApiSlice;

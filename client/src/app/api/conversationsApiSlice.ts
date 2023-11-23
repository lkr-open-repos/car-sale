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
      invalidatesTags: ["Conversations"],
    }),
    getConversationsByUser: builder.query<IConversation[], string>({
      query: (userId) => ({
        url: `/conversations/${userId}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateConversationMutation,
  useGetConversationsByUserQuery,
  // useLazyGetConversationByUsersQuery,
} = conversationApiSlice;

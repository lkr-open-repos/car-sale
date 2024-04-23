import { IConversation } from "@/types/conversationInterface";
import { apiSlice } from "./apiSlice";

// Inject conversation endpoints into the slice
export const conversationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Create conversation mutation
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
    // Get conversationS(!) by user query
    getConversationsByUser: builder.query<IConversation[], string>({
      query: (userId) => ({
        url: `/conversations/${userId}`,
        method: "GET",
      }),
    }),
    // Get conversation by userS(!) query
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

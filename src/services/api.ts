import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Todo {
  _id: number;
  text: string;
  photoUrl: string;
  completed: boolean;
}
export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl:
      "https://api.elchocrud.pro/api/v1/8716029040287859e3e935fbf30a6e2b/todo/",
  }),
  refetchOnReconnect: true,
  refetchOnFocus: false,
  tagTypes: ["Todo"],
  endpoints: (builder) => ({
    getTodos: builder.query<Todo[], void>({
      query: () => "",
      providesTags: ["Todo"],
    }),
    addTodo: builder.mutation<Todo, Partial<Todo>>({
      query: (todo) => ({
        url: "",
        method: "POST",
        body: todo,
      }),
      invalidatesTags: ["Todo"],
    }),
    updateTodo: builder.mutation<Todo, Partial<Todo>>({
      query: ({ _id, ...rest }) => ({
        url: `${_id}`,
        method: "PUT",
        body: rest,
      }),
      invalidatesTags: ["Todo"],
    }),
    deleteTodo: builder.mutation<{ success: boolean; id: number }, number>({
      query: (id) => ({
        url: `${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Todo"],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = api;

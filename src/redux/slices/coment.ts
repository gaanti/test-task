import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { createComment, deleteComment } from "../../app/api/comment.api";
import { CommentModel } from "../types/CommentModel";

export interface commentSlice {
     comments: CommentModel[];
}

const initialState: commentSlice = {
     comments: [],
};

export interface CommentToCreate {
     description: string
}

export const doCreateComment = createAsyncThunk<CommentModel, { comment: CommentToCreate, item_id: number }, { state: RootState }>(
     "comment/create",
     async (props, thunkAPI) => {
          return createComment(props.comment, props.item_id).then((res) => {
               return res.content;
          });
     },
);
export const doDeleteComment = createAsyncThunk<void, CommentModel, { state: RootState }>(
     "comment/delete",
     async (item, thunkAPI) => {
          deleteComment(item.id);
     },
);

export const commentSlice = createSlice({
     name: "comment",
     initialState,
     reducers: {},
     extraReducers: (builder) => {
     },
});

export const {} = commentSlice.actions;

export default commentSlice.reducer;
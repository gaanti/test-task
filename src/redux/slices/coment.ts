import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Comment } from "../types";
import { RootState } from "../../app/store";
import { createComment, deleteComment } from "../../app/api/comment.api";

export interface commentSlice {
     comments: Comment[];
}

const initialState: commentSlice = {
     comments: [],
};

export const doCreateComment = createAsyncThunk<Comment, { comment: Comment, item_id: number }, { state: RootState }>(
     "comment/create",
     async (props, thunkAPI) => {
          return createComment(props.comment, props.item_id).then((res) => {
               return res.content;
          });
     },
);
export const doDeleteComment = createAsyncThunk<void, Comment, { state: RootState }>(
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
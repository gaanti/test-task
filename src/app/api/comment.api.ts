import { Comment } from "../../redux/types";
import { httpApi } from "./api";

export interface CommentLoadResponse {
     content: Comment[];
}

export interface CommentCreateResponse {
     content: Comment;
}

export interface CommentDeleteResponse {
     content: void;
}

export const createComment = (comment: Comment, item_id: number): Promise<CommentCreateResponse> =>
     httpApi.post<CommentCreateResponse>(`/comment/add/${item_id}`, { comment }).then(({ data }) => data);
export const deleteComment = (item_id: number): Promise<CommentDeleteResponse> =>
     httpApi.delete<CommentDeleteResponse>(`/comment/delete/${item_id}`, {
          data: {
               item_id,
          },
     }).then(({ data }) => data);

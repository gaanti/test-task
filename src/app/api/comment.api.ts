import { httpApi } from "./api";
import { CommentToCreate } from "../../redux/slices/coment";
import { CommentModel } from "../../redux/types/CommentModel";

export interface CommentLoadResponse {
     content: CommentModel[];
}

export interface CommentCreateResponse {
     content: CommentModel;
}

export interface CommentDeleteResponse {
     content: void;
}

export const createComment = (comment: CommentToCreate, item_id: number): Promise<CommentCreateResponse> => {
     return httpApi.post<CommentCreateResponse>(`/comment/add/${item_id}`, { comment }).then(({ data }) => data);
}
export const deleteComment = (item_id: number): Promise<CommentDeleteResponse> =>
     httpApi.delete<CommentDeleteResponse>(`/comment/delete/${item_id}`, {
          data: {
               item_id,
          },
     }).then(({ data }) => data);

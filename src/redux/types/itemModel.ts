import { CommentModel } from "./CommentModel";

export interface ItemModel {
     id: number,
     imageUrl: string,
     name: string,
     count: number,
     size: {
          width: number,
          height: number
     },
     weightInGrams: 200,
     comments: CommentModel[]
}
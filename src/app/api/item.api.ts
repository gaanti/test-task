import { ItemModel } from "../../redux/types";
import { httpApi } from "./api";
import { ItemToCreate } from "../../redux/slices/item";

export interface ItemsLoadResponse {
     content: ItemModel[];
}

export interface ItemCreateResponse {
     content: ItemModel;
}

export interface ItemUpdateResponse {
     content: ItemModel;
}

export interface ItemDeleteResponse {
     content: void;
}

export const loadItems = (): Promise<ItemsLoadResponse> =>
     httpApi.get<ItemsLoadResponse>("/all").then(({ data }) => data);

export const createItem = (item: ItemToCreate): Promise<ItemCreateResponse> =>
     httpApi.post<ItemCreateResponse>("/create", { item }).then(({ data }) => data);

export const updateItem = (item: ItemToCreate, itemId: number): Promise<ItemUpdateResponse> => {
     return httpApi.put<ItemUpdateResponse>(`/edit/${itemId}`, { item }).then(({ data }) => data);
}

export const deleteItem = (item_id: number): Promise<ItemDeleteResponse> =>
     httpApi.delete<ItemDeleteResponse>(`/delete/${item_id}`, {
          data: {
               item_id,
          },
     }).then(({ data }) => data);

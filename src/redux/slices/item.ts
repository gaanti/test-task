import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ItemModel } from "../types";
import { RootState } from "../../app/store";
import { createItem, deleteItem, loadItems, updateItem } from "../../app/api/item.api";
import { doCreateComment } from "./coment";

export interface item {
     items: ItemModel[];
}

const initialState: item = {
     items: [],
};

export interface ItemToCreate {
     imageUrl: string,
     name: string,
     count: number,
     size: {
          width: number,
          height: number
     },
     weightInGrams: number,
}

export const doLoadItems = createAsyncThunk(
     "items/load",
     async () => {
          return loadItems().then((res) => {
               return res.content;
          });
     },
);
export const doCreateItem = createAsyncThunk<ItemModel, ItemToCreate, { state: RootState }>(
     "items/create",
     async (item, thunkAPI) => {
          return createItem(item).then((res) => {
               return res.content;
          });
     },
);
export const doUpdateItem = createAsyncThunk<ItemModel, {itemToCreate: ItemToCreate, item_id:number}, { state: RootState }>(
     "items/update",
     async (props, thunkAPI) => {
          return updateItem(props.itemToCreate, props.item_id).then((res) => {
               return res.content;
          });
     },
);
export const doDeleteItem = createAsyncThunk<void, number, { state: RootState }>(
     "items/delete",
     async (item_id, thunkAPI) => {
          deleteItem(item_id);
     },
);
export const itemSlice = createSlice({
     name: "itemSlice",
     initialState,
     reducers: {},
     extraReducers: (builder) => {
          builder.addCase(doLoadItems.fulfilled, (state, action) => {
               state.items = action.payload;
          });
          builder.addCase(doCreateItem.fulfilled, (state, action) => {
               state.items = [...state.items, action.payload]
          });
     },
});
export const itemsSelector = (state: RootState) => state.items.items;
export const itemReducer = itemSlice.reducer;
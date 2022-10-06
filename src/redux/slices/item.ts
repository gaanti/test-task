import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ItemModel } from "../types";
import { RootState } from "../../app/store";
import { createItem, deleteItem, loadItems, updateItem } from "../../app/api/item.api";

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
export const doUpdateItem = createAsyncThunk<ItemModel, ItemModel, { state: RootState }>(
     "items/update",
     async (item, thunkAPI) => {
          return updateItem(item, item.id).then((res) => {
               return res.content;
          });
     },
);
export const doDeleteItem = createAsyncThunk<void, ItemModel, { state: RootState }>(
     "items/delete",
     async (item, thunkAPI) => { deleteItem(item.id) },
);
export const itemSlice = createSlice({
     name: "itemSlice",
     initialState,
     reducers: {},
     extraReducers: (builder) => {
          builder.addCase(doLoadItems.fulfilled, (state, action)=>{
               state.items = action.payload
          })
     }
});
export const itemsSelector = (state: RootState) => state.items.items;
export const itemReducer = itemSlice.reducer
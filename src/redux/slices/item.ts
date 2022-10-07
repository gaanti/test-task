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
          width: number, height: number
     },
     weightInGrams: number,
}

export const doLoadItems = createAsyncThunk("items/load", async () => {
     return loadItems().then((res) => {
          return res.content;
     });
});
export const doCreateItem = createAsyncThunk<ItemModel, ItemToCreate, { state: RootState }>("items/create", async (item, thunkAPI) => {
     return createItem(item).then((res) => {
          return res.content;
     });
});
export const doUpdateItem = createAsyncThunk<ItemModel, { itemToCreate: ItemToCreate, item_id: number }, { state: RootState }>("items/update", async (props, thunkAPI) => {
     return updateItem(props.itemToCreate, props.item_id).then((res) => {

          return res.content;
     });
});
export const doDeleteItem = createAsyncThunk<any, number, { state: RootState }>("items/delete", async (item_id, thunkAPI) => {
     const response = await deleteItem(item_id);
     return response;
});
export const itemSlice = createSlice({
     name: "itemSlice", initialState, reducers: {
          setItems: (state, action) => {
               state.items = action.payload;
          },
     }, extraReducers: (builder) => {
          builder.addCase(doLoadItems.fulfilled, (state, action) => {
               state.items = action.payload;
          });
     },
});

export const { setItems } = itemSlice.actions;
export const itemsSelector = (state: RootState) => state.items.items;
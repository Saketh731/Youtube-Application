import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {},
  reducers: {
    cacheResults: (state, action) => {
      // Below line of code does not work as Redux toolkit will expect you to mutate the state (But here you are just changing the reference and assigning a new value) as Immer whill know what's update and how to make it Immutable under the hood.
      // state = { ...state, ...action.payload };

      //So do it in either ways like below
      return { ...state, ...action.payload };
      // state = Object.assign(state, action.payload);
    },
  },
});

export const { cacheResults } = searchSlice.actions;
export default searchSlice.reducer;

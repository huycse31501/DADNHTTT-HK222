import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  switches: {}
};

export const areaSlice = createSlice({
  name: "area",
  initialState,
  reducers: {
    setSwitchState: (state, action) => {
      const { id, value } = action.payload;
      state.switches[id] = value;
    },
  },
});

export const { setSwitchState } = areaSlice.actions;
export default areaSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface SrpState {
  correctSrp: string[];
  enteredSrp: string[];
  srpIndex: number;
  passwordsMatch: boolean;
}

const initialState: SrpState = {
  correctSrp: Array(24).fill(""),
  enteredSrp: Array(24).fill(""),
  srpIndex: 0,
  passwordsMatch: false,
};

export const srpStateSlice = createSlice({
  name: "SrpState",
  initialState,
  reducers: {
    setEnteredSrp: (state, action: PayloadAction<string[]>) => {
      state.enteredSrp = action.payload;
    },
    setSrpIndex: (state, action: PayloadAction<number>) => {
      state.srpIndex = action.payload;
    },
    setCorrectSrp: (state, action: PayloadAction<string[]>) => {
      state.correctSrp = action.payload;
    },
  },
});

export const { setEnteredSrp, setSrpIndex, setCorrectSrp } =
  srpStateSlice.actions;

export default srpStateSlice.reducer;

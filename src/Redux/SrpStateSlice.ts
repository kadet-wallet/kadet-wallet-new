import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface SrpState {
  correctSrp: string[];
  enteredSrp: string[];
  enteredSrpIndex: number;
  passwordsMatch: boolean;
}

const initialState: SrpState = {
  correctSrp: Array(24).fill(""),
  enteredSrp: Array(24).fill(""),
  enteredSrpIndex: 0,
  passwordsMatch: false,
};

export const srpStateSlice = createSlice({
  name: "SrpState",
  initialState,
  reducers: {
    setEnteredSrp: (state, action: PayloadAction<string[]>) => {
      state.enteredSrp = action.payload;
    },
    incrementEnteredSrpIndex: (state, _) => {
      state.enteredSrpIndex++;
    },
    setEnteredSrpIndex: (state, action: PayloadAction<number>) => {
      state.enteredSrpIndex = action.payload;
    },
    setCorrectSrp: (state, action: PayloadAction<string[]>) => {
      state.correctSrp = action.payload;
    },
  },
});

export const {
  setEnteredSrp,
  incrementEnteredSrpIndex,
  setEnteredSrpIndex,
  setCorrectSrp,
} = srpStateSlice.actions;

export default srpStateSlice.reducer;

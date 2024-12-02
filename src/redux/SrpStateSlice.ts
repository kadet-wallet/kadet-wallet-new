import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface SrpState {
  correctSrp: string[];
  enteredSrp: string[];
  shuffledSrp: string[];
  srpIndex: number;
  shuffledSrpIndex: number;
}

const initialState: SrpState = {
  correctSrp: Array(24).fill(""),
  enteredSrp: Array(24).fill(""),
  shuffledSrp: Array(24).fill(""),
  srpIndex: 0,
  shuffledSrpIndex: 0,
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
    setShuffledSrpIndex: (state, action: PayloadAction<number>) => {
      state.shuffledSrpIndex = action.payload;
    },
    setCorrectSrp: (state, action: PayloadAction<string[]>) => {
      state.correctSrp = action.payload;
      // console.log(state.correctSrp);
    },
    setShuffledSrp: (state, action: PayloadAction<string[]>) => {
      state.shuffledSrp = action.payload;
      // console.log(state.shuffledSrp);
    },
  },
});

export const {
  setEnteredSrp,
  setSrpIndex,
  setShuffledSrpIndex,
  setCorrectSrp,
  setShuffledSrp,
} = srpStateSlice.actions;

export default srpStateSlice.reducer;

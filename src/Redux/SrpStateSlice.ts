import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {shuffle} from "@/src/utils/shuffle";

export interface SrpState {
  correctSrp: string[];
  enteredSrp: string[];
  shuffledSrp: string[];
  srpIndex: number;
  shuffledSrpIndex: number;
  passwordsMatch: boolean;
}

const initialState: SrpState = {
  correctSrp: Array(24).fill(""),
  enteredSrp: Array(24).fill(""),
  shuffledSrp: Array(24).fill(""),
  srpIndex: 0,
  shuffledSrpIndex: 0,
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
    setShuffledSrpIndex: (state, action: PayloadAction<number>) => {
      state.shuffledSrpIndex = action.payload;
    },
    setCorrectSrp: (state, action: PayloadAction<string[]>) => {
      state.correctSrp = action.payload;
      state.shuffledSrp = shuffle(action.payload);
    },
  },
});

export const { setEnteredSrp, setSrpIndex, setShuffledSrpIndex, setCorrectSrp } =
  srpStateSlice.actions;

export default srpStateSlice.reducer;

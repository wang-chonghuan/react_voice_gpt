import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type State = {
  prompt: undefined | string;
};
const initialState: State = {
  prompt: ''
};

export const promptSlice = createSlice({
  name: 'prompt',
  initialState,
  reducers: {
    updatePromptAction: (state, action: PayloadAction<string | undefined>) => {
      state.prompt = action.payload;
    }
  },
});

export const { updatePromptAction } = promptSlice.actions;

export default promptSlice.reducer;

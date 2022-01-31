import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ThemeState {
  theme: object;
}

const initialState: ThemeState = {
  theme: {}
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    updateTheme: (state, action: PayloadAction<object>) => {
      state.theme = action.payload;
    }
  }
});

export default themeSlice.reducer;

import { createSlice, current } from '@reduxjs/toolkit'

const initialState = {
  currentUser: null,
  error: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.currentUser = null;
      state.error = action.payload;
    },
    signOutSuccess: (state, action) => {
      state.currentUser = null;
      state.error = null;
    },
    signOutFailure: (state, action) => {
      state.error = action.payload;
    },
    userDeleteSuccess: (state, action) => {
      state.currentUser = null;
      state.error = null;
    },

    userDeleteFailure: (state, action) => {
      state.error = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { signInFailure, signInSuccess, signOutFailure, signOutSuccess, userDeleteFailure, userDeleteSuccess } = userSlice.actions

export default userSlice.reducer
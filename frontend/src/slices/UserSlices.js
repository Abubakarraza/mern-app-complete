import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

let initialState = {
  loading: false,
  error: '',
  message: '',
  login: false,
  userDetail: {
    name: '',
  },
};

const fetch2 = async (api, body) => {
  const res = await fetch(api, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  return await res.json();
};
export const getUser = createAsyncThunk('getUser', async () => {
  const res = await fetch('/getData', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  const result = await res.json();
  return result;
});
export const userData = createAsyncThunk('registerUser', async (body) => {
  const result = await fetch2('/signup', body);
  return result;
});
export const signinUser = createAsyncThunk('SigninUser', async (body) => {
  const result = await fetch2('/login', body);
  console.log(result);
  return result;
});
export const logoutUser = createAsyncThunk('logout', async () => {
  const response = await fetch('/logout', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  const result = await response.json();
  return result;
});
const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: {
    // [userData.fulfilled]: (state, {payload:{error,message}}) => {
    //     state.loading = false;
    //     if (error) {
    //         state.error = error;

    //     };
    //     if (message) {
    //         state.message = message;

    //     }
    // },
    // [userData.pending]: (state, {payload:{error,message}}) => {
    //     state.loading = true
    // },
    // [userData.rejected]: (state, action) => {
    //     state.loading = false
    // },
    [userData.fulfilled]: (state, action) => {
      state.loading = false;
      if (action.payload.error) {
        state.error = action.payload.error;
      }
      if (action.payload.message) {
        state.message = action.payload.message;
      }
    },
    [userData.pending]: (state, action) => {
      state.loading = true;
    },
    [signinUser.pending]: (state, action) => {
      state.loading = true;
    },
    [signinUser.fulfilled]: (state, action) => {
      state.loading = false;
      if (action.payload.status === 200) {
        state.login = true;
      }
      if (action.payload.message) {
        state.message = action.payload.message;
      }
      if (action.payload.error) {
        state.error = action.payload.error;
      }
    },
    // [userData.rejected]: (state, action) => {
    //     state.loading = false
    // }
    [getUser.fulfilled]: (state, action) => {
      let value;
      if (action.payload.status == 200) {
        value = true;
      }
      if (action.payload.status == 401) {
        value = false;
      }
      return {
        ...state,
        userDetail: action.payload.message,
        loading: false,
        login: value,
      };
    },
    [getUser.pending]: (state, action) => {
      state.loading = true;
    },
  },
  [logoutUser.fulfilled]: (state, action) => {
    let value;
    if (action.payload.status == 200) {
      value = false;
    } else {
      value = true;
    }
    return {
      ...state,
      login: value,
    };
  },
});
export default UserSlice.reducer;

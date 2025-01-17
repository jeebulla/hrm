// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'
import { LoginUser } from './asyncthunk'
import { notifySuccess } from 'src/@core/components/toasts/notifySuccess'
import { notifyError } from 'src/@core/components/toasts/notifyError'

const initialState = {
  user: null,
  error: '',
  loading: true
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    resetUserState: state => {
      const userData = JSON.parse(localStorage.getItem('loggedInUser'))

      state.user = userData
    },
    toggleLoadingState: (state, action) => {
      state.loading = action.payload
    }
  },
  extraReducers: builder => {
    // builder.addCase(LoginUser.pending, state => {
    //   state.loading = true
    // })
    builder.addCase(LoginUser.fulfilled, (state, action) => {
      const { token, ...restofData } = action.payload.data
      const userRoleObject = restofData?.role

      // state.loading = false
      state.user = restofData

      localStorage.setItem('loggedInUser', JSON.stringify(restofData))
      localStorage.setItem('accessToken', action.payload.data.token)
      notifySuccess('Successfully logged in')
    })
    builder.addCase(LoginUser.rejected, (state, action) => {
      notifyError('Login Error')

      // state.loading = false
      state.error = action.error.message || 'Error Login'
    })
  }
})

export const { resetUserState, toggleLoadingState } = authSlice.actions

export default authSlice.reducer

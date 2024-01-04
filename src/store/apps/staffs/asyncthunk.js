import axios from "axios"
import { notifySuccess } from "../../../@core/components/toasts/notifySuccess"
import { notifyError } from "../../../@core/components/toasts/notifyError"
import { createAsyncThunk } from "@reduxjs/toolkit"


  export const fetchStaffs = createAsyncThunk('staffs/fetchStaffs',
  async (query)=> {
    try {
        const response = await axios.get(`/users`, {
          params: {
            page: query.page,
          }
        })

        return response
    } catch (error) {
      console.log(error, 'errorrrr')

        // notifyError('Error Fetching Salary Items')
    }
  }
  )



  export const editDepartment = createAsyncThunk(
    'department/edit',
    async (vals, id) => {
      try {
        const response = await axios.patch(`department?id=${id}`, vals)

  
        notifySuccess('Department updated successfully')

        return response
  
      } catch (error) {
        console.log(error, 'error')
        notifyError('Error updating department')
      }
    }
  )
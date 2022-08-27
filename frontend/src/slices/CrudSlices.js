import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
let initialState = {
    value: [],
    status: false
};
export const UpdateStudent = createAsyncThunk(
    "updateStudent",
    async (body) => {
        console.log(body._id);
        const res = await fetch(`/updateCrud/${body._id}`, {
            method: "PATCH",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",

            },
            credentials: "include",
            body: JSON.stringify(body)
        });
        const result = await res.json();
        // console.log("🚀 ~ file: CrudSlices.js ~ line 20 ~ result", result)

        return result;

    })
export const DeleteStudent = createAsyncThunk(
    'deleteStudent',
    async (_id) => {
        const res = await fetch(`/remove/${_id}`, {
            method: "delete",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        });
        const result = await res.json();
        return result;
    }
)
export const CreateStudent = createAsyncThunk(
    'Createstudent',
    async (body) => {
        const res = await fetch("/createCrud", {
            method: "Post",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(body)
        }
        )
        const result = await res.json();
        return result
    }
);
export const GetStudent = createAsyncThunk(
    'getStudent',
    async () => {
        const res = await fetch("/getCrud", {
            method: 'get',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: 'include'
        });
        const result = await res.json();
console.log( "result",result.status);
        return result
    }
)
const CrudSlices = createSlice({
    name: "crud",
    initialState,
    reducers: {

    },
    extraReducers: {
        [CreateStudent.fulfilled]: (state, action) => {

            const result = [...state.value, action.payload.message]
            return {
                ...state,
                value: result,
                status:false
            };
        


        },
        [CreateStudent.pending]: (state, action) => {
            state.status = true
        },
        [GetStudent.fulfilled]: (state, action) => {
            console.log(action.payload.message);

            return { ...state,
                 value: action.payload.message,
                status:false }


        },
        [GetStudent.pending]: (state, action) => {
             state.status = true
        },
        [DeleteStudent.fulfilled]: (state, action) => {
            const removedStudent = state.value.filter((item) => {
                return item._id !== action.payload.message;
            });
            return {
                ...state,
                value: removedStudent,
                status:false
            }
        },
        [DeleteStudent.pending]: (state, action) => {
            state.status = true
        },
        [UpdateStudent.fulfilled]: (state, action) => {
            const updateStudent = state.value.map((item) => {
                if (item._id === action.payload.message._id) {
                    return action.payload.message;
                } else {
                    return item
                }


            })
            return {
                ...state,
                value: updateStudent,
                status: false
            }

        },
        [UpdateStudent.pending]: (state, action) => {
            state.status = true
        }
    },


});
export default CrudSlices.reducer;
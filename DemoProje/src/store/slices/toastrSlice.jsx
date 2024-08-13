import { createSlice } from '@reduxjs/toolkit';

const dataSlice = createSlice({
    name: 'form',
    initialState: {
        open: false,
        mesaj: [],
        color: "primary"
    },
    reducers: {
        setOpen(state, action) {
            state.open = action.payload;
        },
        setMesaj(state, action) {
            state.mesaj = action.payload;
        },
        setColor(state, action) {
            state.color = action.payload;
        }
    },
});

export const { setOpen, setColor, setMesaj } =
    dataSlice.actions;
export const toastrReducer = dataSlice.reducer;

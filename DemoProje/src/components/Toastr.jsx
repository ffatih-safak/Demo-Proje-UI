import React from 'react';
import Snackbar from '@mui/joy/Snackbar';
import { useState } from 'react';
import { useSessionToastrOpen, useSessionToastrColor, useSessionToastrMessage } from '../network/useSession';
import { setOpen } from '../store/slices/toastrSlice';
import { useDispatch } from 'react-redux';

function Toastr() {
    const dispatch = useDispatch();
    const toastrOpen = useSessionToastrOpen();
    const color = useSessionToastrColor();
    const message = useSessionToastrMessage();
    return (
        <div>
            <Snackbar
                color={color}
                variant="solid"
                open={toastrOpen}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right"
                }}
                autoHideDuration={5000}
                onClose={() => dispatch(setOpen(false))}
            >
                {message}
            </Snackbar>
        </div>
    )
}

export default Toastr;

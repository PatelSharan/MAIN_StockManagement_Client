import React from 'react'
import { ToastContainer, toast } from 'react-toastify';

const ToastSuccess = () => {
    return (
        toast.success(data.message, {
            position: "top-right",
            autoClose: 500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            onClose: () => {
                router.push('/');
            }
        })
    )
}

export default ToastSuccess
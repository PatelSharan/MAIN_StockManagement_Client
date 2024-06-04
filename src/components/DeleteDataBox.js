import React from 'react'

const DeleteDataBox = ({ toggleDeleteDataBoxBtn }) => {
    return (
        <>
            <div className="fixed top-0 left-0 h-screen w-screen m-auto z-20">
                <div className="backdrop-blur h-screen flex  flex-col justify-center items-center ">
                    <div className="px-5 bg-white text-black max-h-[85vh] w-[90vw] sm:w-[50vw] m-auto rounded-lg border shadow-md ">
                        {/* Close Box Btn */}
                        <div className="w-full flex justify-between items-center py-3">
                            <p className="text-xl font-serif text-center w-full">DELETE DATA</p>
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" viewBox="0 0 16 16" className="text-gray-600 hover:text-black cursor-pointer">
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" onClick={toggleDeleteDataBoxBtn} />
                            </svg>
                        </div>

                        <div className='text-xs mb-2'>Want To Delete This Row ! </div>

                        {/* Delete Row */}
                        <div className="relative shadow-md rounded-lg overflow-x-scroll max-h-[85vh]  scrollbar-corner-rounded-full scrollbar-thin scrollbar-thumb-gray-300  scrollbar-track-transparent ">
                            <table className="w-full text-xs sm:text-sm text-gray-500 border ">
                                <thead className="h-12 text-xs bg-black text-white uppercase border sticky -top-1">
                                    <tr className='border'>
                                        <th scope="col" className="px-6 py-3 border sm:min-w-56 min-w-40">
                                            Date
                                        </th>
                                        <th scope="col" className="px-6 py-3 border sm:min-w-56 min-w-40 ">
                                            Item Name
                                        </th>
                                        <th scope="col" className="px-6 py-3 border sm:min-w-56 min-w-40">
                                            Vehical No.
                                        </th>
                                        <th scope="col" className="px-6 py-3 border sm:min-w-56 min-w-40">
                                            Product Weight (KG)
                                        </th>
                                        <th scope="col" className="px-6 py-3 border sm:min-w-56 min-w-40">
                                            Price Per KG (₹)
                                        </th>
                                        <th scope="col" className="px-6 py-3 border sm:min-w-56 min-w-40">
                                            Total Amount(₹)
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border text-center hover:bg-gray-100">
                                        <th scope="row" className="px-6 py-3 font-medium text-black whitespace-nowrap border">
                                            13-4-24
                                        </th>
                                        <td className="px-6 py-3 border">
                                            Potato
                                        </td>
                                        <td className="px-6 py-3 border uppercase">
                                            GJ02AL9999
                                        </td>
                                        <td className="px-6 py-3 border">
                                            99
                                        </td>
                                        <td className="px-6 py-3 border">
                                            10
                                        </td>
                                        <td className="px-6 py-3 border">
                                            990
                                        </td>
                                    </tr>
                                </tbody>
                            </table >
                        </div >

                        {/* button part */}
                        <div className="text-center flex space-x-2 py-3">
                            <button type="submit" className="MainBtnBlack w-full py-2">DELETE</button>
                            <button type="submit" className="MainBtnRed w-full py-2" onClick={toggleDeleteDataBoxBtn}>CANCLE</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DeleteDataBox
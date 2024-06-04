import React from 'react'

const AddDataBox = ({ toggleAddDataBoxBtn, AddDatagno, AddDatagtype, AddDatagw, AddDatatw, AddDatanw, AddDatatq, AddDataaq, AddDatarmks, handleInputs, postData }) => {


    return (
        <>
            <div className="fixed top-0 left-0 h-screen w-screen m-auto z-20">
                <div className="backdrop-blur h-screen flex  flex-col justify-center items-center ">

                    <div className="px-5 bg-white text-black max-h-[85vh] w-[90vw] sm:w-[50vw] overflow-y-scroll scrollbar-corner-rounded-full scrollbar-thin scrollbar-thumb-gray-300  scrollbar-track-transparent m-auto rounded-lg border shadow-md ">
                        <div className="w-full mb-2 flex justify-between items-center py-3">
                            <p className="text-xl font-serif text-center w-full">ADD DATA</p>
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" viewBox="0 0 16 16" className="text-gray-600 hover:text-black cursor-pointer">
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" onClick={toggleAddDataBoxBtn} />
                            </svg>
                        </div>
                        <div className="space-y-3">
                            <div className="">
                                <label htmlFor="gno" className="block mb-1 text-xs">gno</label>
                                <input type="text" id="gno" name='gno' value={AddDatagno} onChange={handleInputs} className="bg-transparent border  text-gray-900 text-sm w-full p-2 focus:border-blue-500 outline-none " placeholder="John" required />
                            </div>
                            <div className="">
                                <label htmlFor="gtype" className="block mb-1 text-xs">gtype</label>
                                <input type="text" id="gtype" name='gtype' value={AddDatagtype} onChange={handleInputs} className="bg-transparent border  text-gray-900 text-sm w-full p-2 focus:border-blue-500 outline-none " placeholder="John" required />
                            </div>
                            <div className="">
                                <label htmlFor="gw" className="block mb-1 text-xs">gw</label>
                                <input type="number" id="gw" name='gw' value={AddDatagw} onChange={handleInputs} className="bg-transparent border  text-gray-900 text-sm w-full p-2 focus:border-blue-500 outline-none " placeholder="John" required />
                            </div>
                            <div className="">
                                <label htmlFor="tw" className="block mb-1 text-xs">tw</label>
                                <input type="number" id="tw" name='tw' value={AddDatatw} onChange={handleInputs} className="bg-transparent border  text-gray-900 text-sm w-full p-2 focus:border-blue-500 outline-none " placeholder="John" required />
                            </div>
                            <div className="">
                                <label htmlFor="nw" className="block mb-1 text-xs">nw</label>
                                <input type="number" id="nw" name='nw' value={AddDatanw} onChange={handleInputs} className="bg-transparent border  text-gray-900 text-sm w-full p-2 focus:border-blue-500 outline-none " placeholder="John" required />
                            </div>
                            <div className="">
                                <label htmlFor="tq" className="block mb-1 text-xs">tq</label>
                                <input type="number" id="tq" name='tq' value={AddDatatq} onChange={handleInputs} className="bg-transparent border  text-gray-900 text-sm w-full p-2 focus:border-blue-500 outline-none " placeholder="John" required />
                            </div>
                            <div className="">
                                <label htmlFor="aq" className="block mb-1 text-xs">aq</label>
                                <input type="number" id="aq" name='aq' value={AddDataaq} onChange={handleInputs} className="bg-transparent border  text-gray-900 text-sm w-full p-2 focus:border-blue-500 outline-none " placeholder="John" required />
                            </div>
                            <div className="">
                                <label htmlFor="rmks" className="block mb-1 text-xs">rmks</label>
                                <input type="text" id="rmks" name='rmks' value={AddDatarmks} onChange={handleInputs} className="bg-transparent border  text-gray-900 text-sm w-full p-2 focus:border-blue-500 outline-none " placeholder="John" required />
                            </div>

                        </div>
                        {/* button part */}
                        <div className="text-center flex space-x-2 py-3">
                            <button type="submit" className="MainBtnBlack w-full py-2" onClick={postData}>ADD</button>
                            <button type="submit" className="MainBtnRed w-full py-2" onClick={toggleAddDataBoxBtn}>CANCLE</button>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default AddDataBox
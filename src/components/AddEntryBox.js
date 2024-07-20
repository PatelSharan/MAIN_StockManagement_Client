import React from 'react'

const AddEntryBox = ({ toggleAddEntryBoxBtn, handleInputs, postData, AddEntrychno, AddEntrymarko, AddEntrykeeper, AddEntrycontact, AddEntryvillage, AddEntrytaluka, AddEntrydistrict, AddEntrycategory, AddEntryproduct, AddEntryvarient, AddEntryfname, AddEntryvehicle }) => {
    return (
        <>
            <div className="fixed top-0 left-0 h-screen w-screen m-auto z-20">
                <div className="backdrop-blur h-screen flex  flex-col justify-center items-center ">

                    <div className="px-5 bg-white text-black max-h-[85vh] w-[90vw] sm:w-[50vw] overflow-y-scroll scrollbar-corner-rounded-full scrollbar-thin scrollbar-thumb-gray-300  scrollbar-track-transparent m-auto rounded-lg border shadow-md ">
                        <div className="w-full mb-2 flex justify-between items-center py-3">
                            <p className="text-xl font-serif text-center w-full">ADD ENTRY</p>
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" viewBox="0 0 16 16" className="text-gray-600 hover:text-black cursor-pointer">
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" onClick={toggleAddEntryBoxBtn} />
                            </svg>
                        </div>
                        <div className="space-y-3">
                            <div className="">
                                <label htmlFor="chno" className="block mb-1 text-xs">Challan No</label>
                                <input type="number" id="chno" name='chno' value={AddEntrychno} onChange={handleInputs} className="bg-transparent border  text-gray-900 text-sm w-full p-2 focus:border-blue-500 outline-none " placeholder="Enter Challan No" required />
                            </div>
                            <div className="">
                                <label htmlFor="marko" className="block mb-1 text-xs">Marko</label>
                                <input type="text" id="marko" name='marko' value={AddEntrymarko} onChange={handleInputs} className="bg-transparent border  text-gray-900 text-sm w-full p-2 focus:border-blue-500 outline-none " placeholder="Enter Marko" required />
                            </div>
                            <div className="">
                                <label htmlFor="keeper" className="block mb-1 text-xs">Name Of Keeper</label>
                                <input type="text" id="keeper" name='keeper' value={AddEntrykeeper} onChange={handleInputs} className="bg-transparent border  text-gray-900 text-sm w-full p-2 focus:border-blue-500 outline-none " placeholder="Enter Name Of Keeper" required />
                            </div>
                            <div className="">
                                <label htmlFor="contact" className="block mb-1 text-xs">Contact No</label>
                                <input type="number" id="contact" name='contact' value={AddEntrycontact} onChange={handleInputs} className="bg-transparent border  text-gray-900 text-sm w-full p-2 focus:border-blue-500 outline-none " placeholder="Enter Contact No" required />
                            </div>
                            <div className="">
                                <label htmlFor="village" className="block mb-1 text-xs">Village</label>
                                <input type="text" id="village" name='village' value={AddEntryvillage} onChange={handleInputs} className="bg-transparent border  text-gray-900 text-sm w-full p-2 focus:border-blue-500 outline-none " placeholder="Enter Village" required />
                            </div>
                            <div className="">
                                <label htmlFor="taluka" className="block mb-1 text-xs">Taluka</label>
                                <input type="text" id="taluka" name='taluka' value={AddEntrytaluka} onChange={handleInputs} className="bg-transparent border  text-gray-900 text-sm w-full p-2 focus:border-blue-500 outline-none " placeholder="Enter Taluka" required />
                            </div>
                            <div className="">
                                <label htmlFor="district" className="block mb-1 text-xs">District</label>
                                <input type="text" id="district" name='district' value={AddEntrydistrict} onChange={handleInputs} className="bg-transparent border  text-gray-900 text-sm w-full p-2 focus:border-blue-500 outline-none " placeholder="Enter District" required />
                            </div>
                            <div className="">
                                <label htmlFor="category" className="block mb-1 text-xs">Category</label>
                                <input type="text" id="category" name='category' value={AddEntrycategory} onChange={handleInputs} className="bg-transparent border  text-gray-900 text-sm w-full p-2 focus:border-blue-500 outline-none " placeholder="Enter Category" required />
                            </div>
                            <div className="">
                                <label htmlFor="product" className="block mb-1 text-xs">Product</label>
                                <input type="text" id="product" name='product' value={AddEntryproduct} onChange={handleInputs} className="bg-transparent border  text-gray-900 text-sm w-full p-2 focus:border-blue-500 outline-none " placeholder="Enter Product" required />
                            </div>
                            <div className="">
                                <label htmlFor="varient" className="block mb-1 text-xs">Varient</label>
                                <input type="text" id="varient" name='varient' value={AddEntryvarient} onChange={handleInputs} className="bg-transparent border  text-gray-900 text-sm w-full p-2 focus:border-blue-500 outline-none " placeholder="Enter Varient" required />
                            </div>
                            <div className="">
                                <label htmlFor="fname" className="block mb-1 text-xs">Farmer Name</label>
                                <input type="text" id="fname" name='fname' value={AddEntryfname} onChange={handleInputs} className="bg-transparent border  text-gray-900 text-sm w-full p-2 focus:border-blue-500 outline-none " placeholder="Enter Farmer Name" required />
                            </div>
                            <div className="">
                                <label htmlFor="vehicle" className="block mb-1 text-xs">Vehicle Detail</label>
                                <input type="number" id="vehicle" name='vehicle' value={AddEntryvehicle} onChange={handleInputs} className="bg-transparent border  text-gray-900 text-sm w-full p-2 focus:border-blue-500 outline-none " placeholder="Enter Vehicle Detail" required />
                            </div>

                        </div>
                        {/* button part */}
                        <div className="text-center flex space-x-2 py-3">
                            <button type="submit" className="MainBtnRed w-full py-2" onClick={toggleAddEntryBoxBtn}>CANCLE</button>
                            <button type="submit" className="MainBtnBlack w-full py-2" onClick={postData}>ADD</button>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default AddEntryBox
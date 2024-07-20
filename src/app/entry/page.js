'use client'
import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify'
import LoadingContext from "@/contexts/loading/LoadingContext";
import Loading from "@/components/Loading";
import LoginContext from "@/contexts/login/logincontext";
import AddEntryBox from "@/components/AddEntryBox";
import DeleteEntryBox from "@/components/DeleteEntryBox";
import EditEntryBox from "@/components/EditEntryBox";

export default function Home() {

    const loadingContext = useContext(LoadingContext)
    const loginContext = useContext(LoginContext)

    //Hosted backend api 
    const backEndurl = 'http://localhost:1000'

    //local backend api
    // const backEndurl = 'http://192.168.43.120:1000'

    const [addEntryBox, setAddEntryBox] = useState(false)
    const [editDataBox, setEditDataBox] = useState(false)
    const [deleteEntryBox, setDeleteEntryBox] = useState(false)

    //getting all Data in this state
    const [allEntry, setAllEntry] = useState([])
    const [addDataEntry, setAddDataEntry] = useState({ chno: "", marko: "", keeper: "", contact: "", village: "", taluka: "", district: "", category: "", product: "", varient: "", fname: "", vehicle: "" })
    const [editedDataEntry, setEditedDataEntry] = useState({ id: "", chno: "", marko: "", keeper: "", contact: "", village: "", taluka: "", district: "", category: "", product: "", varient: "", fname: "", vehicle: "" })
    const [deletedDataEntry, setDeletedDataEntry] = useState({ id: "", chno: "", marko: "", keeper: "", contact: "", village: "", taluka: "", district: "", category: "", product: "", varient: "", fname: "", vehicle: "" })

    const toggleAddEntryBoxBtn = () => {
        { addEntryBox ? setAddEntryBox(false) : setAddEntryBox(true) }
    }

    const toggleEditEntryBoxBtn = () => {
        { editDataBox ? setEditDataBox(false) : setEditDataBox(true) }
        setEditedDataEntry({ id: '' })
    }

    const toggleDeleteEntryBoxBtn = () => {
        { deleteEntryBox ? setDeleteEntryBox(false) : setDeleteEntryBox(true) }
        setDeletedDataEntry({ id: '' })
    }


    const handleInputs = (e) => {
        const { name, value } = e.target;
        setAddDataEntry((prevData) => ({
            ...prevData,
            [name]: name === 'chno' || name === 'contact' || name === 'vehicle' ? parseFloat(value) : value,
        }));
    };


    //setting default value to pass in getAllEntry Function
    const _id = 'tryingtopass'
    const limit = 50;
    const page = 0;

    // Fetch All Data
    const getAllEntry = async () => {
        loadingContext.setIsLoading(true)
        try {
            const jwtToken = localStorage.getItem('token');

            const res = await fetch(`${backEndurl}/api/v1/entries/fetchAll`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `jwt ${jwtToken}`
                },
                body: JSON.stringify({ _id, limit, page })
            })
            const data = await res.json();
            const mainData = await data.data  //getting mainData from data
            { mainData && setAllEntry(mainData) }

            // getting only original Date of Creatation and return in object to display user
            mainData.map((data) => {
                const dateObj = data.createdAt
                const newDateObject = new Date(dateObj);
                const year = newDateObject.getFullYear();
                const month = newDateObject.getMonth() + 1; // Add 1 to get the actual month (1-12)
                const day = newDateObject.getDate();
                const formattedDate = `${day}-${month}-${year}`;
                return data.createdAt = formattedDate
            })


        }
        catch (error) {
            console.error(error.message)
        }
        finally {
            loadingContext.setIsLoading(false)
        }
    }

    // Fetching all Data when page refresh
    useEffect(() => {
        getAllEntry()
    }, []);


    const deleteData = (id) => {
        try {
            const dataToDelete = allEntry.find((data) => data._id === id)
            setDeletedDataEntry({
                id: dataToDelete._id,
                chno: dataToDelete.chno,
                marko: dataToDelete.marko,
                keeper: dataToDelete.keeper,
                contact: dataToDelete.contact,
                village: dataToDelete.village,
                taluka: dataToDelete.taluka,
                district: dataToDelete.district,
                category: dataToDelete.category,
                product: dataToDelete.product,
                varient: dataToDelete.varient,
                fname: dataToDelete.fname,
                vehicle: dataToDelete.vehicle,
                createdAt: dataToDelete.createdAt
            })
        } catch (error) {
            console.error(error)
        }
    }

    // Delete Data 
    const saveDeleteChanges = async (id) => {
        try {
            const jwtToken = localStorage.getItem('token');
            const { id } = deletedDataEntry
            const res = await fetch(`${backEndurl}/api/v1/entries/delete?_id=${id}`, {
                method: "DELETE",
                headers: {
                    'Authorization': `jwt ${jwtToken}`
                }
            })
            const data = await res.json()
            let newAllData = allEntry.filter((data) => { return data._id !== id })
            newAllData.map((data) => {
                return data._id
            })
            setAllEntry(newAllData)
            setDeletedDataEntry({ id: "", chno: "", marko: "", keeper: "", contact: "", village: "", taluka: "", district: "", category: "", product: "", varient: "", fname: "", vehicle: "" })
            toast.success(data.message, {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light"
            })
        }
        catch (error) {
            console.error(error)
        }
    }


    const editData = (id) => {
        try {
            const dataToEdit = allEntry.find((data) => data._id === id)
            setEditedDataEntry({
                id: dataToEdit._id,
                chno: dataToEdit.chno,
                marko: dataToEdit.marko,
                keeper: dataToEdit.keeper,
                contact: dataToEdit.contact,
                village: dataToEdit.village,
                taluka: dataToEdit.taluka,
                district: dataToEdit.district,
                category: dataToEdit.category,
                product: dataToEdit.product,
                varient: dataToEdit.varient,
                fname: dataToEdit.fname,
                vehicle: dataToEdit.vehicle
            })
        } catch (error) {
            console.error(error)
        }
    }

    const handleInputChange = (e) => {
        setEditedDataEntry({
            ...editedDataEntry,
            [e.target.name]: e.target.value
        });
    }

    const saveEditChanges = async (e) => {
        const jwtToken = localStorage.getItem('token');
        e.preventDefault()
        const { id, chno, marko, keeper, contact, village, taluka, district, category, product, varient, fname, vehicle } = editedDataEntry
        try {
            const res = await fetch(`${backEndurl}/api/v1/entries/update/${id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `jwt ${jwtToken}`
                },
                body: JSON.stringify({
                    chno, marko, keeper, contact, village, taluka, district, category, product, varient, fname, vehicle
                })
            })
            const data = await res.json()
            if (res.ok) {
                const updatedData = { ...editedDataEntry }
                const updatedDatas = allEntry.map((data) => {
                    if (data._id === updatedData.id) {
                        return { ...data, ...updatedData }
                    }
                    return data
                })
                setAllEntry(updatedDatas)
                setEditedDataEntry({ id: "", chno: "", marko: "", keeper: "", contact: "", village: "", taluka: "", district: "", category: "", product: "", varient: "", fname: "", vehicle: "" })
                toast.success(data.message, {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light"
                })
            }
        } catch (error) {
            console.error(error)
        }
    }

    // Posting data Entry
    const postData = async (e) => {
        loadingContext.setIsLoading(true)
        e.preventDefault()
        let { chno, marko, keeper, contact, village, taluka, district, category, product, varient, fname, vehicle } = addDataEntry

        // getting jwtToken 
        const jwtToken = localStorage.getItem('token');

        if (chno == "" || marko == "" || keeper == "" || contact == "" || village == "" || taluka == "" || district == "" || category == "" || product == "" || varient == "" || fname == "" || vehicle == "") {
            toast.error("Please Fill Details Properly!", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            getAllEntry() // calling getAllEntry Function After Data Added
        }
        else {
            // posting data Res
            const res = await fetch(`${backEndurl}/api/v1/entries/add`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `jwt ${jwtToken}`
                },
                body: JSON.stringify({
                    chno, marko, keeper, contact, village, taluka, district, category, product, varient, fname, vehicle
                })
            })
            const data = await res.json()
            getAllEntry() // calling getAllEntry Function After Data Added
            if (data.success === true) {
                toast.success(data.message, {
                    position: "top-right",
                    autoClose: 500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light"
                });
                localStorage.setItem('token', jwtToken)
                setAddDataEntry({ chno: "", marko: "", keeper: "", contact: "", village: "", taluka: "", district: "", category: "", product: "", varient: "", fname: "", vehicle: "" })
                setAddEntryBox(false)
            } else {
                toast.error(data.message, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        }
    }

    return (
        <>
            {loadingContext.isLoading ? <Loading message={'Loading...'} /> :
                <>
                    {loginContext.isLoggedIn ?
                        (<div>
                            <div className='w-full px-2 my-2 '>
                                <div className="text-right">
                                    <button className='MainBtnBlack rounded-md text-xs px-3 py-2' onClick={toggleAddEntryBoxBtn}>ADD ENTRY</button>
                                </div>
                            </div>
                            <div className="relative shadow-md rounded-lg overflow-x-scroll max-h-[85vh] mx-2 scrollbar-corner-rounded-full scrollbar-thin scrollbar-thumb-gray-300  scrollbar-track-transparent ">


                                {/* Fetching all the data and displaying to user  */}
                                < table className="w-full text-xs sm:text-sm text-gray-500 border ">
                                    <thead className="h-12 text-xs bg-black text-white uppercase border sticky -top-1">
                                        <tr className='border'>
                                            <th scope="col" className="px-6 py-3 border sm:min-w-56 min-w-40">
                                                Date
                                            </th>
                                            <th scope="col" className="px-6 py-3 border sm:min-w-56 min-w-40">
                                                Challan No
                                            </th>
                                            <th scope="col" className="px-6 py-3 border sm:min-w-56 min-w-40 ">
                                                Marko
                                            </th>
                                            <th scope="col" className="px-6 py-3 border sm:min-w-56 min-w-40">
                                                Name Of Keeper
                                            </th>
                                            <th scope="col" className="px-6 py-3 border sm:min-w-56 min-w-40">
                                                Contact No
                                            </th>
                                            <th scope="col" className="px-6 py-3 border sm:min-w-56 min-w-40">
                                                Village
                                            </th>
                                            <th scope="col" className="px-6 py-3 border sm:min-w-56 min-w-40">
                                                Taluka
                                            </th>
                                            <th scope="col" className="px-6 py-3 border sm:min-w-56 min-w-40">
                                                District
                                            </th>
                                            <th scope="col" className="px-6 py-3 border sm:min-w-56 min-w-40">
                                                Category
                                            </th>
                                            <th scope="col" className="px-6 py-3 border sm:min-w-56 min-w-40">
                                                Product
                                            </th>
                                            <th scope="col" className="px-6 py-3 border sm:min-w-56 min-w-40">
                                                Varient
                                            </th>
                                            <th scope="col" className="px-6 py-3 border sm:min-w-56 min-w-40">
                                                Farmer Name
                                            </th>
                                            <th scope="col" className="px-6 py-3 border sm:min-w-56 min-w-40">
                                                Vehicle Detail
                                            </th>
                                            <th scope="col" className="px-6 py-3 border sm:min-w-56 min-w-56">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    {allEntry.length > 0 && (
                                        <tbody>
                                            {
                                                allEntry.map((dataItem) => (
                                                    <tr key={dataItem._id} className="border text-center hover:bg-gray-100">
                                                        <th scope="row" className="px-6 py-3 font-medium text-black whitespace-nowrap border">
                                                            {dataItem.createdAt}
                                                        </th>
                                                        <td className="px-6 py-3 border">
                                                            {dataItem.chno}
                                                        </td>
                                                        <td className="px-6 py-3 border uppercase">
                                                            {dataItem.marko}
                                                        </td>
                                                        <td className="px-6 py-3 border">
                                                            {dataItem.keeper}
                                                        </td>
                                                        <td className="px-6 py-3 border">
                                                            {dataItem.contact}
                                                        </td>
                                                        <td className="px-6 py-3 border">
                                                            {dataItem.village}
                                                        </td>
                                                        <td className="px-6 py-3 border">
                                                            {dataItem.taluka}
                                                        </td>
                                                        <td className="px-6 py-3 border">
                                                            {dataItem.district}
                                                        </td>
                                                        <td className="px-6 py-3 border">
                                                            {dataItem.category}
                                                        </td>
                                                        <td className="px-6 py-3 border">
                                                            {dataItem.product}
                                                        </td>
                                                        <td className="px-6 py-3 border">
                                                            {dataItem.varient}
                                                        </td>
                                                        <td className="px-6 py-3 border">
                                                            {dataItem.fname}
                                                        </td>
                                                        <td className="px-6 py-3 border">
                                                            {dataItem.vehicle}
                                                        </td>
                                                        <td className="px-6 py-3 border space-x-2">
                                                            <button className='MainBtnGreen text-xs rounded-md min-w-16'
                                                                onClick={() => { editData(dataItem._id) }}>EDIT</button>
                                                            <button className='MainBtnRed text-xs rounded-md min-w-16'
                                                                onClick={() => { deleteData(dataItem._id) }}>DELETE</button>
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    )}
                                </ table>
                            </div >

                            {/* If no data */}
                            {!allEntry.length > 0 &&
                                <div className="my-3">
                                    <p className="text-xs text-center my-1">NO ENTRY TO DISPLAY, PLEASE ADD DATA.</p>
                                </div>
                            }
                        </div>) :
                        (<div className='h-[80vh] flex flex-col justify-center items-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                            </svg>
                            <div className='my-4 px-4'>
                                <p>Please ! Login To Add Data</p>
                            </div>
                            <Link href={'/login'}><button className='text-white bg-black border-2 border-black py-2 focus:outline-none hover:bg-white hover:text-black text-xs w-24 hover:-translate-y-2 duration-200 ease-in-out'>Login</button></Link>
                        </div>
                        )}
                </>
            }


            {/* Add Data Box  */}
            {
                addEntryBox &&
                <AddEntryBox
                    toggleAddEntryBoxBtn={toggleAddEntryBoxBtn}
                    AddEntrychno={addDataEntry.chno}
                    AddEntrymarko={addDataEntry.marko}
                    AddEntrykeeper={addDataEntry.keeper}
                    AddEntrycontact={addDataEntry.contact}
                    AddEntryvillage={addDataEntry.village}
                    AddEntrytaluka={addDataEntry.taluka}
                    AddEntrydistrict={addDataEntry.district}
                    AddEntrycategory={addDataEntry.category}
                    AddEntryproduct={addDataEntry.product}
                    AddEntryvarient={addDataEntry.varient}
                    AddEntryfname={addDataEntry.fname}
                    AddEntryvehicle={addDataEntry.vehicle}
                    // AddEntryvehicle={addDataEntry.vehicle}
                    handleInputs={handleInputs}
                    postData={postData}
                />
            }


            {
                editedDataEntry.id &&
                <EditEntryBox
                    toggleEditEntryBoxBtn={toggleEditEntryBoxBtn}
                    editedDataEntrychno={editedDataEntry.chno}
                    editedDataEntrymarko={editedDataEntry.marko}
                    editedDataEntrykeeper={editedDataEntry.keeper}
                    editedDataEntrycontact={editedDataEntry.contact}
                    editedDataEntryvillage={editedDataEntry.village}
                    editedDataEntrytaluka={editedDataEntry.taluka}
                    editedDataEntrydistrict={editedDataEntry.district}
                    editedDataEntrycategory={editedDataEntry.category}
                    editedDataEntryproduct={editedDataEntry.product}
                    editedDataEntryvarient={editedDataEntry.varient}
                    editedDataEntryfname={editedDataEntry.fname}
                    editedDataEntryvehicle={editedDataEntry.vehicle}
                    handleInputChange={handleInputChange}
                    saveEditChanges={saveEditChanges}
                />
            }

            {
                deletedDataEntry.id &&
                <DeleteEntryBox
                    toggleDeleteEntryBoxBtn={toggleDeleteEntryBoxBtn}
                    deletedDataEntry={deletedDataEntry}
                    saveDeleteChanges={saveDeleteChanges}
                />
            }

            <ToastContainer />
        </>
    );

}
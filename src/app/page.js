'use client'
import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify'
import AddDataBox from "@/components/AddDataBox";
import EditDataBox from "@/components/EditDataBox";
import DeleteDataBox from "@/components/DeleteDataBox";
import LoadingContext from "@/contexts/loading/LoadingContext";
import Loading from "@/components/Loading";
import LoginContext from "@/contexts/login/logincontext";

export default function Home() {

  const loadingContext = useContext(LoadingContext)
  const loginContext = useContext(LoginContext)

  //Hosted backend api 
  // const backEndurl = 'http://localhost:1000'

  //local backend api
  const backEndurl = 'http://192.168.43.120:1000'

  const [addDataBox, setAddDataBox] = useState(false)
  const [editDataBox, setEditDataBox] = useState(false)
  const [deleteDataBox, setDeleteDataBox] = useState(false)

  //getting all Data in this state
  const [allData, setAllData] = useState([])
  const [addData, setAddData] = useState({ gno: "", gtype: "", gw: "", tw: "", nw: "", tq: "", aq: "", rmks: "" })
  const [editedData, setEditedData] = useState({ id: "", gno: "", gtype: "", gw: "", tw: "", nw: "", tq: "", aq: "", rmks: "" })
  const [deletedData, setDeletedData] = useState({ id: "", gno: "", gtype: "", gw: "", tw: "", nw: "", tq: "", aq: "", rmks: "" })

  const toggleAddDataBoxBtn = () => {
    { addDataBox ? setAddDataBox(false) : setAddDataBox(true) }
  }

  const toggleEditDataBoxBtn = () => {
    { editDataBox ? setEditDataBox(false) : setEditDataBox(true) }
    setEditedData({ id: '' })
  }

  const toggleDeleteDataBoxBtn = () => {
    { deleteDataBox ? setDeleteDataBox(false) : setDeleteDataBox(true) }
    setDeletedData({ id: '' })
  }


  const handleInputs = (e) => {
    const { name, value } = e.target;
    setAddData((prevData) => ({
      ...prevData,
      [name]: name === 'gw' || name === 'tw' || name === 'nw' || name === 'tq' || name === 'aq' ? parseFloat(value) : value,
    }));
  };


  //setting default value to pass in getAllData Function
  const _id = 'tryingtopass'
  const limit = 50;
  const page = 0;

  // Fetch All Data
  const getAllData = async () => {
    loadingContext.setIsLoading(true)
    try {
      const jwtToken = localStorage.getItem('token');

      const res = await fetch(`${backEndurl}/api/v1/wbs/fetchAll`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `jwt ${jwtToken}`
        },
        body: JSON.stringify({ _id, limit, page })
      })
      const data = await res.json();
      const mainData = await data.data  //getting mainData from data
      { mainData && setAllData(mainData) }

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
    getAllData()
  }, []);


  const deleteData = (id) => {
    try {
      const dataToDelete = allData.find((data) => data._id === id)
      setDeletedData({
        id: dataToDelete._id,
        gno: dataToDelete.gno,
        gtype: dataToDelete.gtype,
        gw: dataToDelete.gw,
        tw: dataToDelete.tw,
        nw: dataToDelete.nw,
        tq: dataToDelete.tq,
        aq: dataToDelete.aq,
        rmks: dataToDelete.rmks,
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
      const { id } = deletedData
      const res = await fetch(`${backEndurl}/api/v1/wbs/delete?_id=${id}`, {
        method: "DELETE",
        headers: {
          'Authorization': `jwt ${jwtToken}`
        }
      })
      const data = await res.json()
      let newAllData = allData.filter((data) => { return data._id !== id })
      newAllData.map((data) => {
        return data._id
      })
      setAllData(newAllData)
      setDeletedData({ id: "", gno: "", gtype: "", gw: "", tw: "", nw: "", tq: "", aq: "", rmks: "" })
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
      const dataToEdit = allData.find((data) => data._id === id)
      setEditedData({
        id: dataToEdit._id,
        gno: dataToEdit.gno,
        gtype: dataToEdit.gtype,
        gw: dataToEdit.gw,
        tw: dataToEdit.tw,
        nw: dataToEdit.nw,
        tq: dataToEdit.tq,
        aq: dataToEdit.aq,
        rmks: dataToEdit.rmks
      })
    } catch (error) {
      console.error(error)
    }
  }

  const handleInputChange = (e) => {
    setEditedData({
      ...editedData,
      [e.target.name]: e.target.value
    });
  }

  const saveEditChanges = async (e) => {
    const jwtToken = localStorage.getItem('token');
    e.preventDefault()
    const { id, gno, gtype, gw, tw, nw, tq, aq, rmks } = editedData
    try {
      const res = await fetch(`${backEndurl}/api/v1/wbs/update/${id}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `jwt ${jwtToken}`
        },
        body: JSON.stringify({
          gno, gtype, gw, tw, nw, tq, aq, rmks
        })
      })
      const data = await res.json()
      if (res.ok) {
        const updatedData = { ...editedData }
        const updatedDatas = allData.map((data) => {
          if (data._id === updatedData.id) {
            return { ...data, ...updatedData }
          }
          return data
        })
        setAllData(updatedDatas)
        setEditedData({ id: "", gno: "", gtype: "", gw: "", tw: "", nw: "", tq: "", aq: "", rmks: "" })
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
    let { gno, gtype, gw, tw, nw, tq, aq, rmks } = addData

    // converting gno into captital letter
    gno = gno.toUpperCase()
    rmks = rmks.toUpperCase()
    // getting jwtToken 
    const jwtToken = localStorage.getItem('token');

    // posting data Res
    const res = await fetch(`${backEndurl}/api/v1/wbs/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `jwt ${jwtToken}`
      },
      body: JSON.stringify({
        gno, gtype, gw, tw, nw, tq, aq, rmks
      })
    })
    const data = await res.json()
    getAllData() // calling getAllData Function After Data Added
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
      setAddData({ gno: "", gtype: "", gw: "", tw: "", nw: "", tq: "", aq: "", rmks: "" })
      setAddDataBox(false)
      // loginContext.login();
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

  return (
    <>
      {loadingContext.isLoading ? <Loading message={'Loading...'} /> :
        <>
          {loginContext.isLoggedIn ?
            (<div>
              <div className='w-full px-2 my-2 '>
                <div className="text-right">
                  <button className='MainBtnBlack rounded-md text-xs px-3 py-2' onClick={toggleAddDataBoxBtn}>ADD DATA</button>
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
                      <th scope="col" className="px-6 py-3 border sm:min-w-56 min-w-40 ">
                        Gadi No.
                      </th>
                      <th scope="col" className="px-6 py-3 border sm:min-w-56 min-w-40">
                        Gadi Type
                      </th>
                      <th scope="col" className="px-6 py-3 border sm:min-w-56 min-w-40">
                        Gross Weight
                      </th>
                      <th scope="col" className="px-6 py-3 border sm:min-w-56 min-w-40">
                        Tare Weight
                      </th>
                      <th scope="col" className="px-6 py-3 border sm:min-w-56 min-w-40">
                        Net Weight
                      </th>
                      <th scope="col" className="px-6 py-3 border sm:min-w-56 min-w-40">
                        Total Quantity
                      </th>
                      <th scope="col" className="px-6 py-3 border sm:min-w-56 min-w-40">
                        Actual Quantity
                      </th>
                      <th scope="col" className="px-6 py-3 border sm:min-w-56 min-w-40">
                        Remarks
                      </th>
                      <th scope="col" className="px-6 py-3 border sm:min-w-56 min-w-56">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  {allData.length > 0 && (
                    <tbody>
                      {
                        allData.map((dataItem) => (
                          <tr key={dataItem._id} className="border text-center hover:bg-gray-100">
                            <th scope="row" className="px-6 py-3 font-medium text-black whitespace-nowrap border">
                              {dataItem.createdAt}
                            </th>
                            <td className="px-6 py-3 border">
                              {dataItem.gno}
                            </td>
                            <td className="px-6 py-3 border uppercase">
                              {dataItem.gtype}
                            </td>
                            <td className="px-6 py-3 border">
                              {dataItem.gw}
                            </td>
                            <td className="px-6 py-3 border">
                              {dataItem.tw}
                            </td>
                            <td className="px-6 py-3 border">
                              {dataItem.nw}
                            </td>
                            <td className="px-6 py-3 border">
                              {dataItem.tq}
                            </td>
                            <td className="px-6 py-3 border">
                              {dataItem.aq}
                            </td>
                            <td className="px-6 py-3 border">
                              {dataItem.rmks}
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
              {!allData.length > 0 &&
                <div className="my-3">
                  <p className="text-xs text-center my-1">NO DATA TO DISPLAY, PLEASE ADD DATA.</p>
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
        addDataBox &&
        <AddDataBox
          toggleAddDataBoxBtn={toggleAddDataBoxBtn}
          AddDatagno={addData.gno}
          AddDatagtype={addData.gtype}
          AddDatagw={addData.gw}
          AddDatatw={addData.tw}
          AddDatanw={addData.nw}
          AddDatatq={addData.tq}
          AddDataaq={addData.aq}
          AddDatarmks={addData.rmks}
          handleInputs={handleInputs}
          postData={postData}
        />
      }


      {
        editedData.id &&
        <EditDataBox
          toggleEditDataBoxBtn={toggleEditDataBoxBtn}
          editedDatagno={editedData.gno}
          editedDatagtype={editedData.gtype}
          editedDatagw={editedData.gw}
          editedDatatw={editedData.tw}
          editedDatanw={editedData.nw}
          editedDatatq={editedData.tq}
          editedDataaq={editedData.aq}
          editedDatarmks={editedData.rmks}
          handleInputChange={handleInputChange}
          saveEditChanges={saveEditChanges}
        />
      }

      {
        deletedData.id &&
        <DeleteDataBox
          toggleDeleteDataBoxBtn={toggleDeleteDataBoxBtn}
          deletedData={deletedData}
          saveDeleteChanges={saveDeleteChanges}
        />
      }

      <ToastContainer />
    </>
  );

}

'use client'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify'
import AddDataBox from "@/components/AddDataBox";
import EditDataBox from "@/components/EditDataBox";
import DeleteDataBox from "@/components/DeleteDataBox";
import { useState, useEffect } from "react";

export default function Home() {

  //Hosted backend api 
  const backEndurl = 'http://localhost:1000'

  //local backend api
  // const backEndurl = 'http://192.168.84.39:1000'

  const [addDataBox, setAddDataBox] = useState(false)

  const [editDataBox, setEditDataBox] = useState(false)
  const [deleteDataBox, setDeleteDataBox] = useState(false)

  const toggleAddDataBoxBtn = () => {
    { addDataBox ? setAddDataBox(false) : setAddDataBox(true) }
  }

  const toggleEditDataBoxBtn = () => {
    { editDataBox ? setEditDataBox(false) : setEditDataBox(true) }
  }

  const toggleDeleteDataBoxBtn = () => {
    { deleteDataBox ? setDeleteDataBox(false) : setDeleteDataBox(true) }
  }

  //getting all Data in this state
  const [allData, setAllData] = useState([])

  const [addData, setAddData] = useState({
    gno: "",
    gtype: "",
    gw: "",
    tw: "",
    nw: "",
    tq: "",
    aq: "",
    rmks: ""
  })

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setAddData((prevData) => ({
      ...prevData,
      [name]: name === 'gw' || name === 'tw' || name === 'nw' || name === 'tq' || name === 'aq' ? parseFloat(value) : value,
    }));
  };


  // Fetch All Data
  const getAllData = async (url) => {
    const jwtToken = localStorage.getItem('token');
    try {
      const res = await fetch(url, {
        // method: "GET",
        headers: {
          'Authorization': `jwt ${jwtToken}`
        }
      })
      // const data = await res.json()
      // { data && setAllData(data) }  // if there is data then setting in setAllData

      console.log('res is : ', res)
    } catch (error) {
      console.error(error.message)
    }
  }

  // Fetching all Data when page refresh
  useEffect(() => {
    getAllData(`${backEndurl}/api/v1/wbs/fetchAll`)
  }, [])


  // Posting data Entry
  const postData = async (e) => {
    e.preventDefault()
    const { gno, gtype, gw, tw, nw, tq, aq, rmks } = addData

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
    console.log(data)

    if (data.success === true) {
      console.log("toast is : ", data.message)
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
      setAddData({
        gno: "",
        gtype: "",
        gw: "",
        tw: "",
        nw: "",
        tq: "",
        aq: "",
        rmks: ""
      })
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
      <div className='w-full px-2 my-2 '>
        {/* <p className="text-xs">Taken Delivery Data Entry Here.</p> */}
        <div className="text-right">
          <button className='MainBtnBlack rounded-md text-xs px-3 py-2' onClick={toggleAddDataBoxBtn}>ADD DATA</button>
        </div>
      </div>
      <div className="relative shadow-md rounded-lg overflow-x-scroll max-h-[85vh] mx-2 scrollbar-corner-rounded-full scrollbar-thin scrollbar-thumb-gray-300  scrollbar-track-transparent ">
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
              <th scope="col" className="px-6 py-3 border sm:min-w-56 min-w-56">
                Actions
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
              <td className="px-6 py-3 border space-x-2">
                <button className='MainBtnGreen text-xs rounded-md min-w-16'
                  onClick={toggleEditDataBoxBtn}>EDIT</button>
                <button className='MainBtnRed text-xs rounded-md min-w-16'
                  onClick={toggleDeleteDataBoxBtn}>DELETE</button>
              </td>
            </tr>
          </tbody>
        </table >
      </div >


      {/* Add Data Box  */}
      {addDataBox &&
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

      {editDataBox &&
        <EditDataBox
          toggleEditDataBoxBtn={toggleEditDataBoxBtn} />
      }

      {deleteDataBox &&
        <DeleteDataBox
          toggleDeleteDataBoxBtn={toggleDeleteDataBoxBtn}
        />
      }

      <ToastContainer />
    </>
  );
}

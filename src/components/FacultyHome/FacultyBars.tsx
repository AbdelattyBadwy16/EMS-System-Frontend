import React, { useRef, useState } from 'react'
import TableRow from './TableRow';
import ReactToPrint from "react-to-print";
import { FaPrint } from 'react-icons/fa';
interface BarDetails {
  title: string,
  number: number,
  data: []
}


const FacultyBars = (Detail: BarDetails) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const componentRef = useRef<any>();
  const toggleSlide = () => {
    setIsExpanded(!isExpanded);
  };



  return (
  

  
        <div className=" tt-table">
          <div className="bg-customGray rounded-2xl py-6  ">
            <h2 className="mr-5 font-gesstwo text-gray-500 font-medium text-4xl">
              {Detail.title}
              <span className="  px-1 ml-2 float-right rounded-b	">
                [{Detail.number}]
              </span>
            </h2>
            <div
              onClick={toggleSlide}
              className="relative float-left bottom-10 left-12 "
            >
              {isExpanded ? (
                <i className="bx bx-chevron-up text-gray-500 text-5xl"></i>
              ) : (
                <i className="bx bx-chevron-down text-gray-500 text-5xl "></i>
              )}
            </div>
          </div>
        

        {/*Table*/}

        {isExpanded && (
          <div className="container  pb-5">
            <table ref={componentRef} className='w-full border border-navColor rounded-md font-gesstwo overflow-x-auto'>
              <thead className='text-21 bg-stone-800 text-neutral-200 text-center rounded'>
                <tr>
                  <td className='w-1/8 p-1'>المكان</td>
                  <td className='w-1/8 p-1'>الفترة</td>
                  <td className='w-1/8 p-1'>التوقيت</td>
                  <td className='w-1/8 p-1'>اليوم</td>
                  <td className='w-1/8 p-1' >التاريخ</td>
                  <td className='w-1/8 p-1' >اللجنة</td>
                  <td className='w-1/8 p-1 '>المقرر</td>
                </tr>
              </thead>
              <tbody className='text-18 text-center'>
                {
                  Detail.data.map((com: any, index) => (<TableRow rowData={com} index={index} />
                  ))}
              </tbody>
            </table>
            <ReactToPrint
              trigger={() => <div className="flex justify-end mt-5 ">
                <button className="btn-print gap-3 bg-black text-white flex items-center px-4 py-1 rounded hover:bg-gray-800 ">
                  <p>طباعة</p>
                  <FaPrint className="mr-2" />
                </button>
              </div>}
              content={() => componentRef.current}
            />
          </div>
        )}
      </div>


  )
}

export default FacultyBars

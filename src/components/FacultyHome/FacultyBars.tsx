import React, { useState } from 'react'
import TableRow from './TableRow';


interface BarDetails {
  title: string,
  number: number,
  data: []
}


const FacultyBars = (Detail: BarDetails) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSlide = () => {
    setIsExpanded(!isExpanded);
  };



  return (
    <div>

      <div>
        <div className="m-6">
          <div className="bg-customGray rounded-2xl py-6  ">
            <h2 className="mr-5 font-gesstwo text-gray-500 font-medium text-4xl">

              {Detail.title}
              <span className="border-4 border-borderColor  px-1 ml-2 mr-2  float-right rounded-b	">
                {Detail.number}
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
        </div>

        {/*Table*/}

        {isExpanded && (
          <div className="container  mx-auto px-12 grid">
            {/* <div className="border border-gray-500 rounded-b-lg">
              <div className="grid grid-cols-8 divide-x text-center bg-gray-800 text-white rounded-b-lg py-3">
                <div>اللجنة</div>
                <div>المكان</div>
                <div>التوقيت</div>
                <div>الفتره</div>
                <div>اليوم</div>
                <div>التاريخ</div>
                <div>المقرر</div>
                <div>القسم</div>
              </div>
              {
                Detail.data.map((item) => <TableRow rowData={item} />)
              }
            </div> */}
            <table className='w-full border border-navColor rounded-md font-gesstwo overflow-x-auto'>
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
          </div>
        )}
      </div>




    </div>
  )
}

export default FacultyBars

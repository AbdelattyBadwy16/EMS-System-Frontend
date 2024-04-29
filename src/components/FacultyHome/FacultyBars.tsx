import React, { useState } from 'react'


interface BarDetails {
    title: string,
    number: number,
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
                <div className="border border-gray-500 rounded-b-lg">
                  <div className="grid grid-cols-7 divide-x text-center bg-gray-800 text-white rounded-b-lg py-3">
                    <div>اللجنة</div>
                    <div>المكان</div>
                    <div>التوقيت</div>
                    <div>الفتره</div>
                    <div>اليوم</div>
                    <div>التاريخ</div>
                    <div>المقرر</div>
                  </div>

                  <div className="flex justify-center text-center  rounded-lg ">
                    <div className="w-1/6 bg-tableColor rounded-lg m-3 p-3">
                      <p>1</p>
                      <br />
                    </div>
                    <div className="w-1/6 bg-tableColor rounded-lg m-3 p-3">
                      <p>2</p>
                      <br />
                    </div>
                    <div className="w-1/6 bg-tableColor rounded-lg m-3 p-3">
                      <p>3</p>
                      <br />
                    </div>
                    <div className="w-1/6 bg-tableColor rounded-lg m-3 p-3">
                      <p>3</p>
                      <br />
                    </div>
                    <div className="w-1/6 bg-tableColor rounded-lg m-3 p-3">
                      <p>5</p>
                      <br />
                    </div>
                    <div className="w-1/6 bg-tableColor rounded-lg m-3 p-3">
                      <p>6</p>
                      <br />
                    </div>
                    <div className="w-1/6 bg-tableColor rounded-lg m-3 p-3">
                      <p>7</p>
                      <br />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>




    </div>
  )
}

export default FacultyBars

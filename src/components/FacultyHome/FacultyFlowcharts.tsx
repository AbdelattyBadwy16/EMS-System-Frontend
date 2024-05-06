import { useEffect, useState } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { GetCommitesStaticForLevels, GetCommitesStaticForLevelsForCurrentDay } from '../../helper/Api/FacultyApi';
import { useSelector } from 'react-redux';
import { getgetFacultyId } from '../../Redux/Slices/FacultySlice';
import { motion } from 'framer-motion'


const FacultyFlowcharts = () => {


  const [data, setData] = useState<any>([]);
  const [dataForDay, setDataDay] = useState<any>([]);
  const facultyId = useSelector(getgetFacultyId);


  useEffect(() => {
    async function fetch() {
      let res;
      try {
        res = await GetCommitesStaticForLevels(facultyId);
        setData(res);
      } finally {

      }
    }
    fetch();
  }, [])

  useEffect(() => {
    async function fetch() {
      let res;
      try {
        res = await GetCommitesStaticForLevelsForCurrentDay(facultyId);
        setDataDay(res);
      } finally {

      }
    }
    fetch();
  }, [])

  // for first chart
  const COLORS = ['#4caf50', '#d84b4b', '#1e1e1e', '#a5a5a5'];

  const formatTooltipValue = (value: any) => {
    if (value <= 2)
      return `${value} لجنة`;
    else return `${value} لجان`;
  };

  // for second chart
  const cx = 150;
  const cy = 200;
  const iR = 50;
  const oR = 100;


  return (
    <motion.div className='w-full xl:flex justify-center mt-8 flex'>

      {/*pei flowchart*/}
      <motion.div
        variants={{
          hidden: { x: -100, opacity: 0 },
          visible: {
            x: 0,
            opacity: 1,
            transition: {
              delay: 0.5,
              duration: 0.5,
            },
          },
        }}
        className='w-11/12 h-80 xl:mx-24 bg-customGray rounded-2xl text-end flex sm:ml-10 justify-between '>
        <div className='w-[70%]'>
          <h1 className='mt-5 font-bold text-[25px] text-end'>لجان الفرق / المستويات</h1>
          {
            data.length ?
              <ResponsiveContainer className=" flex justify-center items-center" width="100%" height="100%">
                <PieChart width={1000} height={400}>
                  <Pie
                    data={data}
                    cx={170}
                    cy={120}
                    innerRadius={5}
                    outerRadius={100}
                    fill="#8884d8"
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {data.map((entry: any, index: any) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={formatTooltipValue}
                    cursor={{ fill: "transparent" }}
                  />
                </PieChart>
              </ResponsiveContainer>
              : <p className='text-[30px] font-bold text-end mt-20 mr-3 text-red-500 underline '>لا يوجد لجان بعد</p>
          }
        </div>

        <ul className='text-end flex flex-col mr-5 justify-center gap-5 mt-20'>
          {
            data.map((item: any, index: any) => <li className={`font-bold text-[20px] text-[${COLORS[index]}]`}>{item.name}-</li>)
          }
        </ul>
      </motion.div>


      {/*bar flowchart*/}

      <div className='w-11/12 h-80 xl:mx-24 bg-customGray rounded-2xl text-end flex sm:ml-10 justify-between '>
        <div className='w-[70%]'>
          <h1 className='mt-5 font-bold text-[25px] text-end'>عدد اللجان المفعلة اليوم</h1>
          {
            dataForDay.length ?
              <>
                <ResponsiveContainer className=" flex justify-center items-center" width="100%" height="100%">
                  <PieChart width={400} height={500}>
                    <Pie
                      dataKey="value"
                      startAngle={180}
                      endAngle={0}
                      data={dataForDay}
                      cx={cx}
                      cy={cy}
                      innerRadius={iR}
                      outerRadius={oR}
                      fill="#8884d8"
                      stroke="none"
                    >
                      {dataForDay.map((entry: any, index: any) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index]} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={formatTooltipValue}
                      cursor={{ fill: "transparent" }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </> : <p className='text-[30px] font-bold text-end mt-20 mr-3 text-red-500 underline '>لا يوجد لجان اليوم</p>
          }
        </div>
        <ul className='text-end flex flex-col mr-5 justify-center gap-5 mt-20'>
          {
            dataForDay.map((item: any, index: number) => <li className={`font-bold text-[20px] text-[${COLORS[index]}]`}>{item.name}-</li>)
          }
        </ul>

      </div>
    </motion.div >


  )
}

export default FacultyFlowcharts

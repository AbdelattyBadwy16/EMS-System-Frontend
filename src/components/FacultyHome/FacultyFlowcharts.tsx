import { Bar } from '@nivo/bar';
import React, { useEffect, useState } from 'react'
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Legend, Tooltip, YAxis, XAxis, BarChart, CartesianGrid } from 'recharts';
import { GetCommitesStaticForLevels, GetCommitesStaticForLevelsForCurrentDay } from '../../helper/Api/FacultyApi';
import { useSelector } from 'react-redux';
import { getgetFacultyId } from '../../Redux/Slices/FacultySlice';

interface render {
  cx: number,
  cy: number,
  midAngle: number,
  innerRadius: number,
  outerRadius: number,
  percent: number,
  index: number

}


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
  const COLORS = ['#4caf50', '#d84b4b', '#313131', '#a5a5a5'];
  const RADIAN = Math.PI / 180;

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
  const value = 50;

  const needle = (value: any, data: any, cx: any, cy: any, iR: any, oR: any, color: any) => {
    let total = 0;
    data.forEach((v: any) => {
      total += v.value;
    });
    const ang = 180.0 * (1 - value / total);
    const length = (iR + 2 * oR) / 3;
    const sin = Math.sin(-RADIAN * ang);
    const cos = Math.cos(-RADIAN * ang);
    const r = 5;
    const x0 = cx + 5;
    const y0 = cy + 5;
    const xba = x0 + r * sin;
    const yba = y0 - r * cos;
    const xbb = x0 - r * sin;
    const ybb = y0 + r * cos;
    const xp = x0 + length * cos;
    const yp = y0 + length * sin;

    return [
      <circle cx={x0} cy={y0} r={r} fill={color} stroke="none" />,
      <path d={`M${xba} ${yba}L${xbb} ${ybb} L${xp} ${yp} L${xba} ${yba}`} stroke="#none" fill={color} />,
    ];
  };

  return (

    <div className='w-full xl:flex justify-center mt-8 flex'>

      {/*pei flowchart*/}
      <div className='w-11/12 h-80 xl:mx-24 bg-customGray rounded-2xl text-end flex sm:ml-10 justify-between '>
        <div className='w-[70%]'>
          <h1 className='mt-5 font-bold text-[25px] text-end'>لجان الفرق / المستويات</h1>
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
        </div>
        <ul className='text-end flex flex-col mr-5 justify-center gap-5 mt-20'>
          {
            data.map((item: any, index: any) => <li className={`font-bold text-[20px] text-[${COLORS[index]}]`}>{item.name}-</li>)
          }
        </ul>
      </div>


      {/*bar flowchart*/}

      <div className='w-11/12 h-80 xl:mx-24 bg-customGray rounded-2xl text-end flex sm:ml-10 justify-between '>
        <div className='w-[70%]'>
          <h1 className='mt-5 font-bold text-[25px] text-end'>عدد اللجان المفعلة اليوم</h1>
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
              {needle(value, data, cx, cy, iR, oR, '#d0d000')}
              <Tooltip
                formatter={formatTooltipValue}
                cursor={{ fill: "transparent" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <ul className='text-end flex flex-col mr-5 justify-center gap-5 mt-20'>
          {
            dataForDay.map((item: any, index: any) => <li className={`font-bold text-[20px] text-[${COLORS[index]}]`}>{item.name}-</li>)
          }
        </ul>
      </div>
    </div>


  )
}

export default FacultyFlowcharts

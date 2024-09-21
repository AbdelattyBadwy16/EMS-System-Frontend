import React from 'react'
import { GetCommiteDate } from '../../helper/Constant';
import { useNavigate } from 'react-router';
import Cookies from 'universal-cookie';

function TableRow(rowData: any) {

    const date = new Date(rowData.rowData.c.date);
    const newDate = `${date.getDate()}-${date.getUTCMonth() + 1}-${date.getFullYear()}`;
    const newDay = GetCommiteDate(rowData?.rowData?.c?.day);
    const nav = useNavigate();
    const Cookie = new Cookies();
    function handelClick(){
        Cookie.set("commiteId",rowData.rowData.c.id);
        nav("/commite")
    }
    return (
        <tr onClick={()=>handelClick()} key={rowData.index} className={rowData.index % 2 !== 0 ? ' bg-neutral-200 cursor-pointer' : 'cursor-pointer'}>
            <td className='w-1/8 p-2 td-table'>{rowData.rowData.c.place}</td>
            <td className='w-1/8 p-2 td-table'>{rowData.rowData.c.interval}</td>
            <td className='w-1/8 p-2 td-table'>{`${rowData.rowData.c.from} - ${rowData.rowData.c.to}`}</td>
            <td className='w-1/8 p-2 td-table'>{newDay}</td>
            <td className='w-1/8 p-2 td-table'>{newDate}</td>
            <td className='w-1/8 p-2 td-table'>{rowData.rowData.c.name}</td>
            <td className='w-1/8 p-2 td-table'>{rowData.rowData.c.subjectName}</td>
        </tr>
    )
}

export default TableRow

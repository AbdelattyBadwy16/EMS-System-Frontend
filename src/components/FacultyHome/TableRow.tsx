import React from 'react'
import { GetCommiteDate } from '../../helper/Constant';

function TableRow(rowData: any) {

    const date = new Date(rowData.rowData.c.date);
    const newDate = `${date.getDate()}-${date.getUTCMonth() + 1}-${date.getFullYear()}`;
    const newDay = GetCommiteDate(rowData?.rowData?.c?.day);

    return (
        <tr key={rowData.index} className={rowData.index % 2 !== 0 ? ' bg-neutral-200' : ''}>
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

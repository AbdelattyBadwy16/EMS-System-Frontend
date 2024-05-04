import React from 'react'
import { GetCommiteDate } from '../../helper/Constant';

function TableRow(rowData: any) {
    console.log(rowData);

    const date = new Date(rowData.rowData.c.date);
    console.log(rowData.rowData)
    const newDate = `${date.getDate()}-${date.getUTCMonth() + 1}-${date.getFullYear()}`;
    const newDay = GetCommiteDate(rowData?.rowData?.c?.day);


    return (
        <div className="flex justify-center text-center  rounded-lg ">
            <div className="w-1/6 bg-tableColor rounded-lg m-3 p-3">
                <p>{rowData?.rowData?.c?.name}</p>
                <br />
            </div>
            <div className="w-1/6 bg-tableColor rounded-lg m-3 p-3">
                <p>{rowData?.rowData?.c?.place}</p>
                <br />
            </div>
            <div className="w-1/6 bg-tableColor rounded-lg m-3 p-3">
                <p>{`${rowData?.rowData?.c?.to}-${rowData?.rowData?.c?.from}`}</p>
                <br />
            </div>
            <div className="w-1/6 bg-tableColor rounded-lg m-3 p-3">
                <p>{rowData?.rowData?.c?.interval}</p>
                <br />
            </div>
            <div className="w-1/6 bg-tableColor rounded-lg m-3 p-3">
                <p>{newDay}</p>
                <br />
            </div>
            <div className="w-1/6 bg-tableColor rounded-lg m-3 p-3">
                <p>{newDate}</p>
                <br />
            </div>
            <div className="w-1/6 bg-tableColor rounded-lg m-3 p-3">
                <p>{rowData?.rowData?.c?.subjectName}</p>
                <br />
            </div>
            <div className="w-1/6 bg-tableColor rounded-lg m-3 p-3">
                <p>{rowData?.rowData?.c?.facultyNode}</p>
                <br />
            </div>
        </div>
    )
}

export default TableRow

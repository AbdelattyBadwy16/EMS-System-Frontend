import React from 'react'



const SelectBtn = (option: any) => {
    return (
        <select
            className="p-3  border-2 rounded-xl border-borderColor text-gray-700 font-gesstwo font-bold text-lg"
            id=""
        >
            {
                option.option.map((title : any) =>
                    <option className=" text-fontColor font-medium bg-black  text-white ">{title}</option>
                )
            }

        </select>
    )
}

export default SelectBtn
const AddCommitte = () => {
  return (
    <>
      <div
        className=" px-2 sm:px-6 lg:px-20 w-full font-gesstwo "
        style={{ direction: "rtl" }}
      >
        <form className="shadow rounded-xl mt-10 p-7 grid grid-cols-1 lg:grid-cols-3 gap-5 ">
          <select
            className="p-3  border-2 rounded-xl border-borderColor text-gray-700 font-gesstwo font-bold text-lg"
            name="اللائحة"
            id=""
          >
            <option className=" text-fontColor font-medium bg-black  text-white "> اللائحة</option>
            <option className=" text-fontColor font-medium bg-black text-white">الساعات المعتمدة</option>

          </select>
          <select
            className="p-3 border-2	 rounded-xl border-borderColor text-gray-700 font-gesstwo font-bold text-lg "
            name=""
            id=""
          >
            <option>نوع الدراسة</option>
          </select>
          <select
            className="p-3 border-2	 rounded-xl border-borderColor text-gray-700 font-gesstwo font-bold text-lg"
            name=""
            id=""
          >
            <option>القسم</option>
          </select>
          <select
            className="p-3 border-2	 rounded-xl border-borderColor text-gray-700 font-gesstwo font-bold text-lg"
            name=""
            id=""
          >
            <option>المستوى/الفرقة</option>
          </select>
          <select
            className="p-3 border-2	 rounded-xl border-borderColor text-gray-700 font-gesstwo font-bold text-lg"
            name=""
            id=""
          >
            <option>المقرر</option>
          </select>
          <select
            className="p-3 border-2	 rounded-xl border-borderColor text-gray-700 font-gesstwo font-bold text-lg"
            name=""
            id=""
          >
            <option>اليوم</option>
          </select>
          <select
            className="p-3 border-2	 rounded-xl border-borderColor text-gray-700 font-gesstwo font-bold text-lg"
            name=""
            id=""
          >
            <option>التاريخ</option>
          </select>
          <select
            className=" p-3 border-2	 rounded-xl border-borderColor text-gray-700 font-gesstwo font-bold text-lg"
            name=""
            id=""
          >
            <option>الفترة</option>
          </select>
          <div className="flex flex-1">
            <input
              className=" border-2 rounded-xl border-borderColor text-center text-fontColor font-medium	ml-3	"
              type="number"
              name=""
              id=""
              placeholder="من"
            />
            <input
              className=" border-2 rounded-xl border-borderColor text-center mr-5 text-fontColor font-medium	"
              type="number"
              name=""
              id=""
              placeholder="الي"
            />
          </div>

          <select
            className="col-span-2 p-3 border-2 rounded-xl border-borderColor text-gray-700 font-gesstwo font-bold text-lg"
            name=""
            id=""
          >
            <option className="text-fontColor">مكان اللجنة</option>
          </select>

        <div className="flex flex-1">
        <input
            className=" border-2 rounded-xl border-borderColor text-center text-fontColor font-medium	ml-3 	"
            type="number"
            name=""
            id=""
            placeholder="رقم اللجنة"
          />
          <input
            className="border-2 rounded-xl border-borderColor text-center text-fontColor font-medium mr-5  "
            type=""
            name=""
            id=""
            placeholder="حالة اللجنة"
          />
        </div>


          <button className="bg-btnColor text-white rounded-lg p-2.5 w-28 mt-8	">
            اضافة
            <span className="mr-1 text-iconColor text-base">
              <i className="bx bx-bookmark"></i>
            </span>
          </button>
          <div></div>
          <div className="mr-40 mt-8">
            <button className="bg-btnColor text-white rounded-lg	p-2.5 w-28 ml-4 ">
              حفظ الجدول
              <span className="mr-1 text-iconColor text-base">
                <i className="bx bx-save"></i>
              </span>
            </button>
            <button className="bg-logoutBtnColor text-white rounded-lg	p-2.5 w-28">
              ازالة
              <span className="mr-1">
                <i className="bx bx-trash"></i>
              </span>
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddCommitte;

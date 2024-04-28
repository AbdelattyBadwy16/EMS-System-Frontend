
const PageNotFound = () => {

    return (
        <div className="w-full h-full overflow-hidden overscroll-none hide-scrollbar bg-white min-h-screen grid items-center justify-center mt-0 -mb-5">
            <img className="flex flex-auto overflow-hidden rounded-full w-50 h-25 mt-5  justify-center  items-center pb-0" src="/src/assets/pagenotfound3.png" alt="NotFoundPhoto"></img>
            <div className="text-center mb-20 -mt-20">
                <p className="text-5xl font-bold text-PageNotFoundcolor font-gesstwo tracking-wide mt-0 pt-0  ">404</p>
                <h1 className="text-3xl font-bold text-PageNotFoundcolor font-gesstwo mt-0">Page not found</h1>
                <p className=" text-lg text-PageNotFoundcolor font-gesstwo mt-0">Sorry, we could not find the page you are looking for...</p>
                <div className="mt-10 -mb-5">
                    <a href="/studenthome" className=" text-white rounded-lg text-sm px-5 py-2.5 dark:bg-PageNotFoundcolor dark:hover:bg-gray-400 font-geDinkum">Go back home</a>
                </div>
            </div>
        </div>
    )
}

export default PageNotFound




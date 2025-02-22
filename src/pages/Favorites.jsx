function Favorites() {
  return (
    <div className="bg-[#F2F7FD] dark:bg-gray-900 min-h-screen p-5">
      <div className="container mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-6 dark:text-white">My Favorites</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Sample Favorite Book Card */}
            <div className="border rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <img
                className="w-full h-48 object-cover rounded-t-lg"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk86g2NSvNtrKR6IKrgyl5hkUoPlHQcQpQZQ&s"
                alt="Book Cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg">The Fire Hunter</h3>
                <p className="text-gray-600">by Rieko Hinata</p>
                <div className="mt-4 flex justify-between items-center">
                  <button className="text-red-500 hover:text-red-600">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="currentColor">
                      <path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Z"/>
                    </svg>
                  </button>
                  <button className="text-blue-500 hover:text-blue-600">
                    Read Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Favorites; 
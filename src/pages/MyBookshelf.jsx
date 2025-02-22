function MyBookshelf() {
  return (
    <div className="bg-[#F2F7FD] dark:bg-gray-900 min-h-screen p-5">
      <div className="container mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-6 dark:text-white">My Bookshelf</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Sample Book Card */}
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
                  <span className="text-sm text-gray-500">Progress: 45%</span>
                  <button className="text-blue-500 hover:text-blue-600">
                    Continue Reading
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

export default MyBookshelf; 
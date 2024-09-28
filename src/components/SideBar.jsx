import React from 'react'

const SideBar = () => {
    const trends = [
        { title: "Revolution", tweets: "50.4K Tweets" },
        { title: "Revolution", tweets: "50.4K Tweets" },
        { title: "Revolution", tweets: "50.4K Tweets" },
      ]
    
      const recommendations = [
        { name: "Mushtariy", handle: "@Mushtar565266" },
        { name: "Shuhratbek", handle: "@mrshukhrat" },
      ]
  return (
    <div className="w-[25%] sticky top-0 right-0 h-screen px-[20px]">
        <div>
            <input type="text" className='my-[20px] bg-[#F7F9F9] w-full py-2 px-4 outline-none rounded text-[#5C6C79]'  placeholder='Search Twitter'/>
        </div>
      <div className="mb-6 bg-[#F7F9F9] rounded-lg">
        <h2 className="text-lg font-bold">Trends for you</h2>
        {trends.map((trend, index) => (
          <div key={index} className="flex justify-between items-center my-2">
            <div>
              <p className="text-sm font-semibold">{trend.title}</p>
              <p className="text-xs text-gray-500">{trend.tweets}</p>
            </div>
            <button className="text-gray-500">•••</button>
          </div>
        ))}
        <button className="text-blue-500 text-sm">Show more</button>
      </div>

      <div className='bg-[#F7F9F9] rounded-lg'>
        <h2 className="text-lg font-bold mb-2">You might like</h2>
        {recommendations.map((user, index) => (
          <div key={index} className="flex justify-between items-center my-2">
            <div>
              <p className="font-semibold">{user.name}</p>
              <p className="text-xs text-gray-500">{user.handle}</p>
            </div>
            <button className="bg-gray-600 text-white font-bold px-4 py-1 rounded-full">
              Follow
            </button>
          </div>
        ))}
        <button className="text-blue-500 text-sm">Show more</button>
      </div>

      {/* Footer Section */}
      <div className="mt-4 text-xs text-gray-500">
        <p>Terms of Service</p>
        <p>Privacy Policy</p>
        <p>Cookie Policy</p>
        <p>Ads Info</p>
        <p>More</p>
        <p>© 2021 Twitter, Inc.</p>
      </div>
    </div>
  )
}

export default SideBar
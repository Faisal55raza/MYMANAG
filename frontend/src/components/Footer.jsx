
const Footer = () => {
  return (
    <>
      <div className="mt-8 w-full bg-black px-8 md:px-[300px] py-8 flex md:flex-row flex-col items-start justify-between text-sm md:text-md space-y-4 md:space-y-0">
        <div className="flex flex-col text-white">
          <p className="hover:text-gray-400">Featured Blogs</p>
          <p className="hover:text-gray-400">Most Viewed</p>
          <p className="hover:text-gray-400">Readers Choice</p>
        </div>

        <div className="flex flex-col text-white">
          <p className="hover:text-gray-400">Forum</p>
          <p className="hover:text-gray-400">Support</p>
          <p className="hover:text-gray-400">Recent Posts</p>
        </div>

        <div className="flex flex-col text-white">
          <p className="hover:text-gray-400">Privacy Policy</p>
          <p className="hover:text-gray-400">About Us</p>
          <p className="hover:text-gray-400">Terms & Conditions</p>
          <p className="hover:text-gray-400">Terms of Service</p>
        </div>

        <div className="flex flex-col text-white">
          <p className="hover:text-gray-400">Facebook</p>
          <p className="hover:text-gray-400">Instagram</p>
          <p className="hover:text-gray-400">Twitter</p>
          <p className="hover:text-gray-400">LinkedIn</p>
        </div>
      </div>
      <p className="py-2 pb-6 text-center text-white bg-black text-sm">All Rights Reserved @Blogopedia 2023</p>
    </>
  )
}

export default Footer
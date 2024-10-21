export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-800 p-6">
      <h1 className="text-4xl font-bold mb-4 text-center">
        Find Your Next Dream Opportunity/Candidate
      </h1>
      <p className="text-lg text-gray-600 max-w-2xl text-center mb-8">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam velit autem consectetur amet reiciendis quo ipsam! Ea pariatur officia expedita, eos quos magnam explicabo incidunt sed, iste rerum nisi saepe?
      </p>
      <div className="flex flex-row space-x-4">
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition duration-300">
          Sign Up
        </button>
        <button className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition duration-300">
          Log In
        </button>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center py-6 px-4 sm:p-8 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-[92%] w-full sm:max-w-md bg-white p-5 sm:p-8 rounded-2xl shadow-2xl">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          My Portrait Application
        </h1>
        
        <p className="mb-6 sm:mb-8 text-center text-gray-600 text-sm sm:text-base">
          {'Visit a client\'s personal web interface by navigating to /{clientId}'}
        </p>
      </div>
    </main>
  );
}

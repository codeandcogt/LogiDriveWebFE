import { Page404Icon } from "@/components";

export const Page404 = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
      <div className="bg-white rounded-lg shadow-2xl overflow-hidden max-w-4xl w-full">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 p-8 flex flex-col justify-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
            <p className="text-xl text-gray-600">Oops! Page Not Found</p>
            <p className="mt-4 text-gray-500">
              The page you are looking for might have been removed, had its name
              changed, or is temporarily unavailable.
            </p>
            <a
              href="/home"
              className="mt-6 inline-block bg-orange-400 text-white px-6 py-2 rounded-full hover:bg-orange-800 transition-colors duration-300"
            >
              Go Home
            </a>
          </div>
          <div className="md:w-1/2 bg-gray-100 flex items-center justify-center p-8">
            <Page404Icon />
          </div>
        </div>
      </div>
    </div>
  );
};

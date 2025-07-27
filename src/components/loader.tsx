import { Bot } from "lucide-react";

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="text-center space-y-6">
        {/* Logo/Icon */}
        <div className="mx-auto w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center animate-pulse">
          <Bot className="h-8 w-8 text-white" />
        </div>

        {/* Spinner */}
        <div className="relative">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin mx-auto"></div>
        </div>

        {/* Loading Text */}
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            מאתחל צ'אט חכם
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            מכין הכל עבורך...
          </p>
        </div>

        {/* Loading Dots Animation */}
        <div className="flex justify-center gap-1">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
          <div
            className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
            style={{ animationDelay: "0.1s" }}
          ></div>
          <div
            className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
        </div>
      </div>
    </div>
  );
};
export default Loader;

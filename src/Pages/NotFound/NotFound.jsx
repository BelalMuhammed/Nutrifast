import { useNavigate } from "react-router-dom";
import Button from "../../Components/shared/Buttons/Button";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-[120px] md:text-[160px] font-bold text-blue-600 animate-bounce">
        404
      </h1>
      <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-800">
        Page Not Found
      </h2>
      <p className="text-gray-500 mb-8 max-w-md">
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>

      <Button
        text="Go Back Home"
        onClick={() => navigate("/")}
        className="px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-blue-700 transition duration-300 shadow-md"
      />
    </div>
  );
}

import { Link } from "react-router-dom";

const Success = () => {
  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-slate-50/50 py-10 px-4">
      {/* SUCCESS CARD CONTAINER */}
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-xl shadow-slate-200/50">
        
        {/* GREEN CELEBRATION ICON CONTAINER */}
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 animate-bounce">
          <svg
            className="h-8 w-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        {/* MESSAGING HEADERS */}
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl mb-3">
          Payment Successful! 🎉
        </h1>
        
        <p className="text-base text-slate-500 leading-relaxed mb-8">
          Thank you for your purchase. Your premium order has been processed and placed successfully.
        </p>

        {/* ROUTING CONTROL BUTTON */}
        <Link to="/" className="inline-block w-full">
          <button className="w-full rounded-xl bg-blue-600 py-3.5 text-center text-sm font-semibold text-white shadow-sm shadow-blue-600/10 hover:bg-blue-700 hover:shadow-md active:scale-[0.98] transition-all duration-200">
            Back To Home
          </button>
        </Link>
        
      </div>
    </div>
  );
};

export default Success;
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(form);
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-slate-50/50 py-12 px-4 sm:px-6 lg:px-8">
      {/* AUTH CARD CONTAINER */}
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/50">
        
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 mb-6">
          Register
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* FULL NAME FIELD */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700">
              Full Name
            </label>
            <input
              type="text"
              value={form.fullName}
              required
              placeholder="John Doe"
              className="w-full rounded-xl border border-slate-200 bg-transparent px-4 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none transition-all duration-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10"
              onChange={(e) =>
                setForm({
                  ...form,
                  fullName: e.target.value,
                })
              }
            />
          </div>

          {/* EMAIL FIELD */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700">
              Email Address
            </label>
            <input
              type="email"
              value={form.email}
              required
              placeholder="name@company.com"
              className="w-full rounded-xl border border-slate-200 bg-transparent px-4 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none transition-all duration-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10"
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value,
                })
              }
            />
          </div>

          {/* PASSWORD FIELD */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700">
              Password
            </label>
            <input
              type="password"
              value={form.password}
              required
              placeholder="••••••••"
              className="w-full rounded-xl border border-slate-200 bg-transparent px-4 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none transition-all duration-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10"
              onChange={(e) =>
                setForm({
                  ...form,
                  password: e.target.value,
                })
              }
            />
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={isLoading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 text-center text-sm font-semibold text-white shadow-sm shadow-blue-600/10 hover:bg-blue-700 hover:shadow-md active:scale-[0.98] transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isLoading ? (
              <>
                <svg
                  className="h-5 w-5 animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />

                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>

                Creating Account...
              </>
            ) : (
              "Register"
            )}
          </button>
        </form>

        {/* FOOTER SWITCH LINK */}
        <p className="mt-6 text-center text-sm text-slate-500">
          Already have an account?{" "}
          <Link 
            to="/login" 
            className="font-semibold text-blue-600 hover:text-blue-700 transition-colors duration-150"
          >
            Login
          </Link>
        </p>
        
      </div>
    </div>
  );
};

export default Register;
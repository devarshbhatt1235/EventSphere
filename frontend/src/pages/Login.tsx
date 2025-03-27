import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogIn } from "lucide-react";
import { useAuth } from "../AuthContext";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setErrorMessage(null);

    try {
      const response = await fetch("http://localhost:8080/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Invalid credentials");

      const { token } = await response.json();
      login(token);
      setMessage("Logged in successfully!");
      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      setErrorMessage("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 px-6">
      <div className="sm:w-full sm:max-w-md mx-auto">
        <div className="flex justify-center">
          <LogIn className="h-12 w-12 text-purple-600" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>

        {message && <p className="mt-2 text-center text-sm text-green-600">{message}</p>}
        {errorMessage && <p className="mt-2 text-center text-sm text-red-600">{errorMessage}</p>}

        <p className="mt-2 text-center text-sm text-gray-600">
          Or <Link to="/register" className="font-medium text-purple-600 hover:text-purple-500">create a new account</Link>
        </p>
      </div>

      <div className="mt-8 sm:w-full sm:max-w-md mx-auto">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-purple-500"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-purple-500"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="w-full py-2 text-white bg-purple-600 hover:bg-purple-700 rounded-md">
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

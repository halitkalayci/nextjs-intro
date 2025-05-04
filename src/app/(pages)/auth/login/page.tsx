"use client"
import { useState } from "react"

export default function LoginPage() {
    // Two way data binding
    const [email,setEmail] = useState<string>("");
    const [password,setPassword] = useState<string>("");

    const handleSubmit = async () => {
        console.log(email,password)

        const response = await fetch("/api/auth/login", {body: JSON.stringify({email,password}), method:'POST'})

        const json = await response.json();
        console.log(json);
    }

    return  <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-lg">
    <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Login to Your Account</h2>
    <form className="space-y-5">
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700" >Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="you@example.com" />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="password" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="••••••••" />
      </div>

      <button onClick={handleSubmit} type="button" className="cursor-pointer w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">Login</button>
    </form>

    <p className="text-center text-sm text-gray-600 mt-4">Don't have an account?
      <a href="#" className="text-blue-600 hover:underline">Sign up</a>
    </p>
  </div>
  </div>
}
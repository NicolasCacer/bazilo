"use client";
import { useState, FormEvent } from "react";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { useAuth } from "@/context/AuthContext";
import axiosClient from "@/lib/axios";
import { AxiosError } from "axios";

type FormData = {
  username: string;
  password: string;
};

type Errors = {
  username?: string;
  password?: string;
};

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { login } = useAuth();

  const validate = (): boolean => {
    const newErrors: Errors = {};
    if (!formData.username) {
      newErrors.username = "username is required.";
    }
    if (!formData.password) {
      newErrors.password = "Password is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await axiosClient.post("/login", {
        displayName: formData.username,
        password: formData.password,
      });

      Swal.fire({
        icon: "success",
        showConfirmButton: false,
        timer: 800,
        timerProgressBar: true,
      }).then(() => {
        login({ displayName: formData.username });
        setTimeout(() => {
          router.push("/home");
        }, 100);
      });
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      const errorMessage =
        axiosError.response?.data?.message || "Invalid credentials";

      Swal.fire({
        icon: "error",
        title: "Login failed",
        text: errorMessage,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-900 via-teal-800 to-teal-950 flex flex-col justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 w-80 px-6 py-8 rounded-md shadow-md border-2 border-teal-900 bg-white"
      >
        <input
          type="text"
          placeholder="username"
          className="w-full p-2 border bg-white border-teal-900 rounded focus:outline-none focus:ring-2 focus:ring-teal-950 text-black"
          value={formData.username}
          autoComplete="on"
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
        />
        {errors.username && (
          <p className="text-teal-700 text-sm">{errors.username}</p>
        )}

        <div className="flex justify-center items-center">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="border bg-white border-teal-900 rounded-l-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-teal-950 text-black"
            value={formData.password}
            autoComplete="on"
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="py-2 rounded-r-md text-sm text-teal-900 hover:text-teal-700 px-2 bg-white border border-l-0 border-teal-900"
            aria-label="Toggle password visibility"
          >
            {showPassword ? (
              <FaRegEyeSlash size={24} />
            ) : (
              <FaRegEye size={24} />
            )}
          </button>
        </div>
        {errors.password && (
          <p className="text-teal-700 text-sm">{errors.password}</p>
        )}

        <button
          type="submit"
          className="w-full bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 transition uppercase shadow-md"
        >
          login
        </button>
      </form>
    </div>
  );
}

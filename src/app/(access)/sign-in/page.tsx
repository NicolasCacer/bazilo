"use client";
import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";
import Swal from "sweetalert2";

type FormData = {
  email: string;
  password: string;
  username: string;
  birthDate: string;
};

type Errors = {
  email?: string;
  password?: string;
  username?: string;
  birthDate?: string;
};

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    username: "",
    birthDate: "",
  });

  const [errors, setErrors] = useState<Errors>({});
  const [showPassword, setShowPassword] = useState(false);

  const validate = (): boolean => {
    const newErrors: Errors = {};

    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is not valid.";
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
    }

    if (!formData.username) {
      newErrors.username = "Username is required.";
    }

    if (!formData.birthDate) {
      newErrors.birthDate = "Birth date is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/register`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!res.ok) {
        const data = await res.json();
        Swal.fire({
          icon: "error",
          title: "Registration failed",
          text: data?.message || "Something went wrong.",
        });
        return;
      }

      const loginRes = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/login`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            displayName: formData.username,
            password: formData.password,
          }),
        }
      );

      if (!loginRes.ok) {
        Swal.fire({
          icon: "warning",
          title: "Registered but login failed",
          text: "Please login manually.",
        });
        router.push("/login");
        return;
      }

      Swal.fire({
        icon: "success",
        title: "Registration and login successful!",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
      });

      router.push("/home");
    } catch (error) {
      console.error("Registration error:", error);
      Swal.fire({
        icon: "error",
        title: "Network error",
        text: "Could not connect to the server.",
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen justify-center items-center bg-gradient-to-br from-teal-900 via-teal-800 to-teal-950 pt-[90px]">
      <form
        onSubmit={handleSubmit}
        className="w-80 px-6 py-8 rounded-md shadow-md border-2 border-teal-900 bg-white"
      >
        <input
          type="text"
          placeholder="Username"
          className="w-full p-2 bg-white border border-teal-900 rounded focus:outline-none focus:ring-2 focus:ring-teal-500 text-black"
          value={formData.username}
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
            className="border bg-white border-teal-900 rounded-l-md p-2 mt-4 w-full focus:outline-none focus:ring-2 focus:ring-teal-500 text-black"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="py-2 rounded-r-md text-sm text-teal-800 hover:text-teal-500 px-2 mt-4 border border-l-0 border-teal-900 bg-gray-200"
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

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 bg-white mt-4 border border-teal-900 rounded focus:outline-none focus:ring-2 focus:ring-teal-500 text-black"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        {errors.email && (
          <p className="text-teal-700 text-sm">{errors.email}</p>
        )}
        <div className="mt-4">
          <label className="text-teal-950">Birth Date</label>
          <input
            type="date"
            placeholder="Birth Date"
            className="w-full p-2 bg-white border border-teal-900 rounded focus:outline-none focus:ring-2 focus:ring-teal-500 text-black"
            value={formData.birthDate}
            onChange={(e) =>
              setFormData({ ...formData, birthDate: e.target.value })
            }
          />
          {errors.birthDate && (
            <p className="text-teal-700 text-sm">{errors.birthDate}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full mt-4 bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 transition uppercase shadow-md"
        >
          Register
        </button>
      </form>
    </div>
  );
}

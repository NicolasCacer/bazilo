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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      Swal.fire({
        icon: "success",
        title: "Registration successful!",
        showConfirmButton: false,
        timer: 1000,
      });
      router.push("/home");
    }
  };

  return (
    <div className="flex-grow flex flex-col justify-center items-center bg-teal-50">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 w-80 px-6 py-8 rounded-md shadow-md border-2 border-teal-600 bg-white"
      >
        <input
          type="text"
          placeholder="Username"
          className="w-full p-2 border border-teal-400 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
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
            className="border border-teal-400 rounded-l-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-teal-500"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="py-2 rounded-r-md text-sm text-teal-500 hover:text-teal-700 px-2 bg-white border border-l-0 border-teal-400"
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
          className="w-full p-2 border border-teal-400 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        {errors.email && (
          <p className="text-teal-700 text-sm">{errors.email}</p>
        )}

        <input
          type="date"
          placeholder="Birth Date"
          className="w-full p-2 border border-teal-400 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
          value={formData.birthDate}
          onChange={(e) =>
            setFormData({ ...formData, birthDate: e.target.value })
          }
        />
        {errors.birthDate && (
          <p className="text-teal-700 text-sm">{errors.birthDate}</p>
        )}

        <button
          type="submit"
          className="w-full bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 transition uppercase shadow-md"
        >
          Register
        </button>
      </form>
    </div>
  );
}

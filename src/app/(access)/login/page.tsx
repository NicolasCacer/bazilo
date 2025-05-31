"use client";
import { useState, FormEvent } from "react";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

type FormData = {
  email: string;
  password: string;
};

type Errors = {
  email?: string;
  password?: string;
};

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [showPassword, setShowPassword] = useState<boolean>(false);

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
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      Swal.fire({
        icon: "success",
        showConfirmButton: false,
        timer: 800,
        timerProgressBar: true,
      });
      router.push("/home");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-900 via-teal-800 to-teal-950 flex flex-col justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 w-80 px-6 py-8 rounded-md shadow-md border-2 border-teal-900 bg-white"
      >
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border bg-white border-teal-900 rounded focus:outline-none focus:ring-2 focus:ring-teal-950 text-black"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        {errors.email && (
          <p className="text-teal-700 text-sm">{errors.email}</p>
        )}

        <div className="flex justify-center items-center">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="border bg-white border-teal-900 rounded-l-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-teal-950 text-black"
            value={formData.password}
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

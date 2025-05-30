"use client";
import { useState, FormEvent } from "react";
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
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
      });
      router.push("/home");
    }
  };

  return (
    <div className="flex-grow flex flex-col justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 w-80 px-5 py-8 rounded-md shadow-md border-2"
      >
        <input
          type="email"
          placeholder="e-mail"
          className="w-full p-2 border rounded"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

        <div className="flex justify-center items-center">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="border rounded-l-md p-2 w-full"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="py-2 rounded-r-md text-sm text-blue-300 hover:text-blue-600 px-2 bg-white border border-l-0"
          >
            {showPassword ? (
              <FaRegEyeSlash size={24} />
            ) : (
              <FaRegEye size={24} />
            )}
          </button>
        </div>
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password}</p>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition uppercase"
        >
          login
        </button>
      </form>
    </div>
  );
}

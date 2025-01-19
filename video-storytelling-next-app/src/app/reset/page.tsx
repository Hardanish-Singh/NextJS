"use client";

import { useRouter } from "next/navigation";
import { useRef } from "react";
import toast from "react-hot-toast";
import resetPassword from "../../../actions/resetPassword";

const Reset: React.FC = (): React.JSX.Element => {
    const router = useRouter();
    const ref = useRef<HTMLFormElement>(null);

    const resetClientPassword = async (formData: FormData) => {
        const email = formData.get("email") as string;
        if (!email) {
            toast.error("Please enter an email address");
            return;
        }
        const password = formData.get("password") as string;
        const newPassword = formData.get("new-password") as string;
        if (password !== newPassword) {
            toast.error("Passwords do not match");
            return;
        }
        const result = await resetPassword(email, password);
        if (result?.success) {
            toast.success(result.message);
            router.push("/");
        } else {
            toast.error(result.message!);
        }
    };

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <h1 className="mb-2 text-center text-sm font-semibold text-gray-900">Reset your password</h1>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form action={resetClientPassword} className="w-full space-y-6" ref={ref}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 indent-3"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                New Password
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 indent-3"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="new-password" className="block text-sm font-medium leading-6 text-gray-900">
                                Re Enter New Password
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                id="new-password"
                                name="new-password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 indent-3"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-black-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black-600 mt-5"
                            onClick={() => {}}
                        >
                            Reset your password
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Reset;

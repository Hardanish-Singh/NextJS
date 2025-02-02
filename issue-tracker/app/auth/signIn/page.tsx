"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { toast } from "react-hot-toast";

const SignIn: React.FC = (): React.JSX.Element => {
    const router = useRouter();
    const ref = useRef<HTMLFormElement>(null);

    const signInUser = (formData: FormData) => {
        const email = formData.get("email");
        const password = formData.get("password");
        let data = {
            email,
            password,
        };
        signIn("credentials", {
            ...data,
            redirect: false,
        })
            .then((response) => {
                if (response?.error) {
                    toast.error(response.error);
                } else if (response?.ok && !response?.error) {
                    ref?.current?.reset();
                    toast.success("Logged in successfully!");
                    router.push("/");
                }
            })
            .catch(() => {
                console.error("error during signing in user");
            });
    };

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <Image
                        className="mx-auto h-10 w-auto"
                        src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500"
                        alt="Your Company"
                        width="30"
                        height="30"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form ref={ref} className="space-y-6" action={signInUser}>
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
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>
                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-black-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black-600 mt-5"
                            onClick={() => {
                                signIn("google", {
                                    redirect: false,
                                    callbackUrl: `${window.location.origin}`,
                                });
                            }}
                        >
                            Sign in with Google
                        </button>
                    </div>

                    <div className="text-center mt-5">
                        <Link className="text-sm mt-3 text-right" href={"/auth/register"}>
                            Don't have an account? <span className="underline">Register</span>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignIn;

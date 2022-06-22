import React, { useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import PasswordMask from 'react-password-mask';
import { useNavigate } from "react-router-dom"
import { api } from "../api";

const Login = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const InitialRegisterSchema = Yup.object().shape({
        email: Yup.string().required("Email is required"),
        password: Yup.string().max(255).required("Password is required"),
    });

    const createUser = async (values) => {
        setIsLoading(true);
        try {
            const user = await api.post("login", values)
            setIsLoading(false);
            if (user && user?.status === 200) {
                localStorage.setItem("accessToken", user?.data.token);
                navigate("/users");
            }
        } catch (error) {
            setIsLoading(false);
            console.log(error);
            setError("There is An registering your details")
        }
    }

    return (
        <div className="w-full h-full flex">
            <div className=" w-6/12 h-5/6 mx-80 mt-32 border-solid rounded-xl shadow-lg p-5 place-content-center">
                <div className="w-2/3 text-center mx-auto">
                    <h1 className="font-mono text-3xl font-bold">Login</h1>
                </div>
                <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={InitialRegisterSchema}

                    onSubmit={(values, { setSubmitting }) => {
                        // setTimeout(() => {
                        //     alert(JSON.stringify(values, null, 2));
                        //     setSubmitting(false);
                        // }, 400);
                        createUser(values)
                    }}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                        /* and other goodies */
                    }) => (
                        <Form onSubmit={handleSubmit} className="flex justify-center items-center flex-col m-[3%]">
                            <div className="my-4 w-[80%]">
                                <div className="border-2 mx-auto mb-3">
                                    <input
                                        type="email"
                                        name="email"
                                        onChange={handleChange}
                                        placeholder="Enter email"
                                        value={values.email}
                                        className="w-full outline-none p-2 rounded-xl"
                                    />
                                </div>
                                <div className="mx-1 text-red-500">
                                    {errors.email && touched.email && errors.email}
                                </div>
                            </div>
                            <div className="w-[80%] mb-3">
                            <PasswordMask
                                id="password"
                                name="password"
                                placeholder="Enter password"
                                value={values.password}
                                inputStyles={{outline: "none"}}
                                onChange={handleChange}
                                buttonStyles={{ height: 30 }}
                                className="w-full outline-none border-2 mb-4 p-2"
                            />
                            <div className="mx-1 text-red-500">
                                {errors.password && touched.password && errors.password}
                            </div>
                            </div>
                            <div className="w-2/3 text-center mx-auto">
                                <button type="submit" disabled={isLoading} className="w-1/3 bg-green-600 text-white p-3">
                                    {isLoading ? "Loading..." : "Submit"}
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
};

export default Login;
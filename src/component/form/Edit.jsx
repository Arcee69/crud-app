import React, { useState } from 'react';
import { Form, Formik } from "formik"
import * as Yup from "yup";
import { api } from '../../api';


const Edit = ({ toggleModal, details, fetchData }) => {
    const [loading, setLoading] = useState(false);

    const InitialEditSchema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        job: Yup.string().max(255).required("Job is required"),
    });

    const editUser = async (values) => {
        setLoading(true);
        const updateUser = await api.put(`users/${details.id}`, values);
        if (updateUser && updateUser?.status === 200) {
            toggleModal();
            fetchData();
        }
        setLoading(false);
    }

    return (
        <div className="w-full h-full flex bg-gray-400">
            <div className=" w-12/12 h-5/6">
                <div className="w-11/12 text-center items-center">
                    <h1 className="font-mono text-3xl font-bold">Edit</h1>
                </div>
                <Formik
                    initialValues={{ name: '', job: '' }}
                    validationSchema={InitialEditSchema}

                    onSubmit={(values, { setSubmitting }) => {
                        editUser(values)
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
                        <Form onSubmit={handleSubmit} className="px-20 flex justify-center items-center flex-col m-[3%]">
                            <div className="my-4 w-full">
                                <div className="border-2 mx-auto mb-3">
                                    <input
                                        type="name"
                                        name="name"
                                        onChange={handleChange}
                                        placeholder="Enter name"
                                        value={values.name}
                                        className="w-full outline-none p-2"
                                    />
                                </div>
                                <div className="mx-1 text-red-500">
                                    {errors.name && touched.name && errors.name}
                                </div>
                            </div>
                            <div className="mb-3">
                                <input
                                    type="job"
                                    name="job"
                                    onChange={handleChange}
                                    placeholder="Enter job"
                                    value={values.email}
                                    className="w-full outline-none p-2"
                                />
                                <div className="mx-1 text-red-500">
                                    {errors.job && touched.job && errors.job}
                                </div>
                            </div>
                            <div className="w-10/12 flex justify-between mx-auto">
                                <button className='w-4/12 cursor-pointer' onClick={toggleModal}>Cancel</button>
                                <button type="submit" disabled={loading} className="w-6/12 bg-green-600 text-white p-3">
                                    {loading ? "Loading..." : "Update"}
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default Edit
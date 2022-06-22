import React, { useState, useEffect } from 'react';
import { api } from '../api';
import Edit from './form/Edit';
import Delete from "./icons/delete.png";
import edit from "./icons/edit.png";
import add from "./icons/add.png";
import Modal from '../component/modal/Modal';
import Add from './form/Add';

const User = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [fakeData, setFakeData] = useState([]);
    const [page, setPage] = useState(1);
    const [openModal, setOpenModal] = useState(false)
    const [openAddModal, setOpenAddModal] = useState(false)
    const [details, setDetails] = useState(null);

    const fetchData = async () => {
        setIsLoading(true)
        const userData = await api.get("users")
        setFakeData(userData?.data?.data);
        setIsLoading(false)
    }

    const deleteUser = async (item) => {
        setIsLoading(true);
        const filteredData = fakeData.filter(data => data.id !== item.id);
        const removeUser = await api.delete(`users/${item.id}`)
        if (removeUser?.status === 204) {
            setIsLoading(false);
            setFakeData(filteredData);
        }
    }

    const toggleModal = (item) => {
        setDetails(item)
        setOpenModal(!openModal);
    }

    const toggleAddModal = () => {
        setOpenAddModal(!openAddModal);
    }

    useEffect(() => {
        fetchData();
    }, [])

    const data = fakeData.map((item, i) => (
        <>
            <tr className='w-2/3 flex flex-row m-2 justify-between' key={item.id}>
                <td className='w-1/3 flex justify-start'>{item?.first_name}</td>
                <td className='w-1/3 flex justify-start'>{item?.email}</td>
                <td className='flex justify-center'>
                    <button className='w-4' onClick={() => toggleModal(item)}><img src={edit} alt="edit" /></button>
                    <button className='w-4 ml-3' onClick={() => deleteUser(item)}><img src={Delete} alt="delete" /></button>
                </td>
            </tr>
        </>
    ))

    return (
        <>
            <div className='w-full'>
                <div className='w-9/12 flex justify-between mt-8 mr-10'>
                    <div></div>
                    <div className='w-38 p-1 flex bg-blue-500 rounded'>
                        <img src={add} alt="Add" className='w-6' />
                        <button className='font-normal text-white text-base ml-2 cursor-pointer' onClick={() => toggleAddModal()}>Add</button>
                    </div>
                </div>
                <div className="w-7/12 h-3/6 mx-auto mt-28 border-solid rounded-xl shadow-lg p-5">
                    <table className='w-full'>
                        <thead>
                            <tr className='w-3/3 flex flex-row m-2 justify-between'>
                                <th className='w-1/3 flex justify-start'>Name</th>
                                <th className='w-1/3 flex justify-start'>Email</th>
                                <th className='w-1/3 flex justify-start'>Actions</th>
                            </tr>
                        </thead>
                        {isLoading && "loading...."}
                        {!isLoading && (
                            <tbody>{data}</tbody>
                        )}
                    </table>
                </div>
                <Modal
                    isOpen={openModal}
                    toggleModal={toggleModal}
                    className="py-10"
                >
                    <Edit
                        toggleModal={toggleModal}
                        details={details} 
                        fetchData={fetchData}
                    />
                </Modal>
                <Modal
                    isOpen={openAddModal}
                    toggleAddModal={toggleAddModal}
                    className="py-10"
                >
                    <Add
                        toggleAddModal={toggleAddModal}
                        fetchData={fetchData}
                    />
                </Modal>
            </div>
        </>
    )
}

export default User;
import React, { useState } from 'react';
import { createPopper } from '@popperjs/core';
import { Link } from 'react-router-dom';

import { MdKeyboardArrowDown, MdOutlineFileUpload } from 'react-icons/md';
import { HiOutlineViewGridAdd } from 'react-icons/hi';
import ModalFooter from '../modals/modalFooter';
import ModalInputField from '../modals/modalInputField';
import ModalContainer from '../modals/modalcontainer';
import { BsFileEarmarkFill } from 'react-icons/bs';
import { CgFile } from 'react-icons/cg';
import { useDispatch } from 'react-redux';
import { createFolder, createFiles } from '../../store/classroomSlice';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ResourceFilesDropdown = () => {
	// Dropdown
	const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
	const btnDropdownRef = React.createRef();
	const popoverDropdownRef = React.createRef();
	const openDropdownPopover = () => {
		console.log('hey');
		createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
			placement: 'bottom-start',
		});
		setDropdownPopoverShow(true);
	};

	const closeDropdownPopover = () => {
		setDropdownPopoverShow(false);
	};

	// Modal
	const [inputForm1, setInputForm1] = useState({
		folder_name: '',
	});
	const [inputForm2, setInputForm2] = useState({
		file_name: '',
	});
	const [showModal1, setShowModal1] = useState(false);
	const [showModal2, setShowModal2] = useState(false);
	const [showModal3, setShowModal3] = useState(false);

	const { folder_name } = inputForm1;
	const { file_name } = inputForm2;

	const onChange1 = (e) => setInputForm1({ ...inputForm1, [e.target.name]: e.target.value });
	const onChange2 = (e) => setInputForm2({ ...inputForm2, [e.target.name]: e.target.value });

	const [selectedFile, setSelectedFile] = useState(null);
	const dispatch = useDispatch();
	const create_folder = () => {
		dispatch(createFolder(folder_name));
	};
	const create_file = () => {
		dispatch(createFiles(file_name));
	};

	return (
		<>
			<ToastContainer
				position='top-center'
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
			<a
				className='w-36 h-8 flex items-center justify-center rounded-lg bg-white p-1.5 m-0.5  border border-gray-100 shadow-lg hover:border-gray-400'
				href='#pablo'
				ref={btnDropdownRef}
				onClick={(e) => {
					e.preventDefault();
					dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
				}}
			>
				<div className='flex flex-row w-96 justify-between'>
					<div className='flex flex-row items-center justify-start p-2'>
						<HiOutlineViewGridAdd className='justify-start text-xl text-gray-500 ml-1 mr-2' />
						<p class='text-gray-400 text-md justify-between'> Add Files</p>
					</div>
					<div className='flex flex-row items-center justify-between'>
						<p class='text-gray-400 text-md'>
							<MdKeyboardArrowDown />
						</p>
					</div>
				</div>
			</a>
			<div
				ref={popoverDropdownRef}
				className={
					(dropdownPopoverShow ? 'block ' : 'hidden ') +
					'bg-white text-base w-36 z-50 py-2 list-none text-left rounded shadow-lg mt-1 min-w-48 border border-gray-200'
				}
			>
				<div class='flex flex-row justify-between hover:bg-gray-600 hover:text-gray-50 rounded-md mx-1 '>
					<div class='justify-between'>
						<button
							class='text-sm py-2 px-4 font-normal'
							type='button'
							onClick={() => setShowModal1(true)}
						>
							Create Folder
						</button>
					</div>
				</div>

				<div class='flex flex-row justify-between hover:bg-gray-600 hover:text-gray-50 rounded-md mx-1'>
					<div class='justify-between'>
						<button
							class='text-sm py-2 px-4 font-normal'
							type='button'
							onClick={() => {
								setShowModal2(true);
							}}
						>
							Create File
						</button>
					</div>
				</div>
				<div class='flex flex-row justify-between hover:bg-gray-600 hover:text-gray-50 rounded-md mx-1'>
					<div class='justify-between'>
						<button
							class='text-sm py-2 px-4 font-normal'
							type='button'
							onClick={() => setShowModal3(true)}
						>
							Upload File
						</button>
					</div>
				</div>
			</div>

			{/* //Create Folder Modal */}
			{showModal1 ? (
				<ModalContainer title='Create Folder' subtitle='Your journey starts here!'>
					<ModalInputField
						title='Folder Name:'
						name='folder_name'
						value={folder_name}
						onChange={(e) => onChange1(e)}
					/>
					<ModalFooter>
						<button
							className=' text-gray-800 border-2  font-medium tracking-wider uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg  outline-none focus:outline-none mr-1 mb-1 ease-linear duration-150 transition transform hover:-translate-y-1 hover:scale-110'
							type='button'
							onClick={() => {
								setShowModal1(false);
							}}
						>
							Close
						</button>
						<button
							className='bg-purple-800 text-white active:bg-emerald-600 font-medium tracking-wider uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg hover:bg-green-600 outline-none focus:outline-none mr-1 mb-1 ease-linear duration-150 transition transform hover:-translate-y-1 hover:scale-110'
							type='button'
							onClick={() => {
								setShowModal1(false);
								create_folder();
							}}
						>
							Save Changes
						</button>
					</ModalFooter>
				</ModalContainer>
			) : null}

			{/* //Create File Modal */}
			{showModal2 ? (
				<ModalContainer title='Create File' subtitle='Your journey starts here!'>
					<ModalInputField
						title='File Name:'
						name='file_name'
						value={file_name}
						onChange={(e) => onChange2(e)}
					/>
					<ModalFooter>
						<button
							className=' text-gray-800 border-2  font-medium tracking-wider uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg  outline-none focus:outline-none mr-1 mb-1 ease-linear duration-150 transition transform hover:-translate-y-1 hover:scale-110'
							type='button'
							onClick={() => {
								setShowModal2(false);
							}}
						>
							Close
						</button>
						<button
							className='bg-purple-800 text-white active:bg-emerald-600 font-medium tracking-wider uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg hover:bg-green-600 outline-none focus:outline-none mr-1 mb-1 ease-linear duration-150 transition transform hover:-translate-y-1 hover:scale-110'
							type='button'
							onClick={() => {
								setShowModal2(false);
								create_file();
							}}
						>
							Save Changes
						</button>
					</ModalFooter>
				</ModalContainer>
			) : null}

			{/* //Upload File Modal */}
			{showModal3 ? (
				<ModalContainer title='Upload File' subtitle='Your journey starts here!'>
					<div className=' w-full h-36 flex items-center justify-center'>
						<div className='w-72 h-32 flex flex-col justify-between items-center'>
							<input
								id='upload_file'
								type='file'
								value={selectedFile}
								class='hidden'
								onChange={(e) => setSelectedFile(e.target.files[0])}
							/>
							<label
								htmlFor='upload_file'
								class='flex flex-col justify-between items-center mt-2 cursor-pointer'
							>
								<div className='border border-gray-300 border-dashed w-32 h-20 flex items-center justify-center'>
									<MdOutlineFileUpload className='text-2xl text-gray-400' />
								</div>
								<div class='flex flex-row justify-between mt-2'>
									<CgFile className='justify-start text-lg text-gray-500' />
									<p className='justify-between text-sm text-gray-500'>Drag/Upload file</p>
								</div>
							</label>
						</div>
					</div>
					<ModalFooter>
						<button
							className=' text-gray-800 border-2  font-medium tracking-wider uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg  outline-none focus:outline-none mr-1 mb-1 ease-linear duration-150 transition transform hover:-translate-y-1 hover:scale-110'
							type='button'
							onClick={() => {
								setShowModal3(false);
							}}
						>
							Close
						</button>
						<button
							className='bg-purple-800 text-white active:bg-emerald-600 font-medium tracking-wider uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg hover:bg-green-600 outline-none focus:outline-none mr-1 mb-1 ease-linear duration-150 transition transform hover:-translate-y-1 hover:scale-110'
							type='button'
							onClick={() => {
								setShowModal3(false);
								// handleSubmit();
							}}
						>
							Save Changes
						</button>
					</ModalFooter>
				</ModalContainer>
			) : null}
		</>
	);
};

export default ResourceFilesDropdown;

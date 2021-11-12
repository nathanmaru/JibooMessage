import React from 'react';
import { IoClose } from 'react-icons/io5';

export default function Modal({ button1, modal, fields }) {
	const [showModal, setShowModal] = React.useState(false);
	const handleSubmit = () => {
		console.log('hello');
	};
	return (
		<>
			<button
				className='bg-purple-500 text-white font-medium tracking-wider uppercase text-sm px-6 py-3 rounded-xl shadow border-2 border-purple-500 hover:bg-white hover:border-purple-500 hover:text-purple-600 outline-none focus:outline-none mr-1 mb-1 ease-linear duration-150 transition transform hover:-translate-y-1 hover:scale-110'
				type='button'
				onClick={() => setShowModal(true)}
			>
				{modal.title}
			</button>
			{showModal ? (
				<>
					<div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
						<div className='relative w-auto my-6 mx-auto max-w-3xl'>
							{/*content*/}
							<div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
								{/*header*/}
								<div className='flex text-left items-left justify-between p-5 border-b border-solid border-gray-200 rounded-t'>
									<div class='justify-start'>
										<h3 className='text-xl text-gray-600 font-semibold tracking-wider'>
											{modal.title}
										</h3>
										<h5 className='text-sm text-gray-500 font-thin'>{modal.subtitle}</h5>
									</div>

									<div class='justify-between ml-5'>
										<button>
											<IoClose
												class='text-xl text-gray-400'
												onClick={() => setShowModal(false)}
											/>
										</button>
									</div>
								</div>

								{/*body*/}
								<div className='relative p-6 flex-auto'>
									{fields.map((field) => (
										<div className='flex flew-row justify-between mb-7'>
											<div class='justify-start'>
												<h5 className='text-base text-gray-500'>{field.title}</h5>
											</div>

											<div class='justify-between w-64 h-10'>
												<div class='mt-1 flex rounded-md shadow-sm'>
													<input
														type='text'
														name={field.name}
														id={field.id}
														class='shadow-lg rounded-md h-8 border border-gray-300 p-2 flex-1 block w-full sm:text-sm'
														// placeholder="name here ..."
													/>
												</div>
											</div>
										</div>
									))}
								</div>

								{/*footer*/}
								<div className='flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b'>
									<button
										className='bg-purple-800 text-white active:bg-emerald-600 font-medium tracking-wider uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg hover:bg-green-600 outline-none focus:outline-none mr-1 mb-1 ease-linear duration-150 transition transform hover:-translate-y-1 hover:scale-110'
										type='button'
										onClick={() => {
											setShowModal(false);
											handleSubmit();
										}}
									>
										Save Changes
									</button>
								</div>
							</div>
						</div>
					</div>
					<div className='opacity-25 fixed inset-0 z-40 bg-black'></div>
				</>
			) : null}
		</>
	);
}

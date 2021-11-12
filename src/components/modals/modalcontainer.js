import { useState } from 'react';

const ModalContainer = (props) => {
	const [showModal, setShowModal] = useState(false);
	return (
		<>
			<div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
				<div className='flex justify-center items-center w-full my-6 mx-auto max-w-2xl'>
					{/*content*/}
					<div className='border-0 rounded-lg shadow-lg flex flex-col w-full bg-white outline-none focus:outline-none'>
						{/*header*/}
						<div className='flex text-left items-left justify-between p-5 border-b border-solid border-gray-200 rounded-t'>
							<div class='justify-start'>
								<h3 className='text-xl text-gray-600 font-semibold tracking-wider'>
									{props.title}
								</h3>
								<h5 className='text-sm text-gray-500 font-thin'>{props.subtitle}</h5>
							</div>
						</div>
						<div classname='flex flex-col'>{props.children}</div>
					</div>
				</div>
			</div>
			<div className='opacity-30 fixed inset-0 z-40 bg-black'></div>
		</>
	);
};

export default ModalContainer;

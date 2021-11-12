const ModalFooter = (props) => {
	return (
		<div className='flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b space-x-3'>
			{props.children}
		</div>
	);
};

export default ModalFooter;

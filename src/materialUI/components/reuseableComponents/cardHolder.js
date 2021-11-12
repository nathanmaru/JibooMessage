const CardHolder = (props) => {
	return (
		<>
			<div className='flex flex-row flex-wrap w-full items-center  '>{props.children}</div>
		</>
	);
};

export default CardHolder;

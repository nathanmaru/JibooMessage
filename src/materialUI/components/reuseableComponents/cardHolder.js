const CardHolder = (props) => {
	const { tourIdentifier } = props;
	return (
		<>
			<div className={tourIdentifier ? tourIdentifier : ""}>
				<div className="flex flex-row flex-wrap w-full items-center  ">
					{props.children}
				</div>
			</div>
		</>
	);
};

export default CardHolder;

const ModalInputField = (props) => {
	return (
		<div className="flex flew-row justify-between items-center mb-7 m-6 space-x-4">
			<div class="flex flex-row justify-end">
				<h5 className="text-base text-gray-500">{props.title}</h5>
			</div>

			<div class="justify-between w-2/3 h-10">
				<div class="mt-1 flex rounded-md shadow-sm">
					{props.children}
					<input
						type={props.type ? props.type : "text"}
						name={props.name}
						value={props.value}
						class="shadow-lg rounded-md h-8 border border-gray-300 p-2 w-full sm:text-sm"
						onChange={props.onChange}
					/>
				</div>
			</div>
		</div>
	);
};

export default ModalInputField;

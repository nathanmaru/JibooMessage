import React, { useState } from "react";
import ModalContainer from "./modals/modalcontainer";
import ModalFooter from "./modals/modalFooter";
import ModalInputField from "./modals/modalInputField";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { createClassroom } from "../store/classroomSlice";
import { nanoid } from "nanoid";

const WorkspaceBanner = ({ title, subtitle, image, button1, button2 }) => {
	const [inputForm, setInputForm] = useState({ name: "", description: "" });
	const [showModal, setShowModal] = useState(false);
	const dispatch = useDispatch();

	const { name, description } = inputForm;
	const user = useSelector((state) => state.auth.user);

	const onChange = (e) =>
		setInputForm({ ...inputForm, [e.target.name]: e.target.value });

	const handleSubmit = () => {
		const owner = user.id;
		const code = nanoid(8);
		dispatch(createClassroom(name, description, owner, code));
	};

	return (
		<>
			<div
				class="flex bg-cover rounded-lg bg-center text-black py-4 px-8 shadow-md"
				style={{
					backgroundImage:
						"url('https://images.unsplash.com/photo-1483794344563-d27a8d18014e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80')",
				}}
			>
				<div className="flex flex-row w-full justify-between">
					<div class="md:w-1/2 w-full flex flex-row items-center justify-start">
						<div class="">
							<h3 className="text-3xl font-bold tracking-wider">{title} </h3>
							<h5 className="text-sm tracking-wider text-gray-600">
								{subtitle}
							</h5>
						</div>
					</div>

					<div className="flex flex-row items-center justify-between">
						<div class="shadow-md rounded-lg">
							{/* <Modal modal={modal} fields={fields} /> */}
							<button
								className="bg-purple-500 text-white font-medium tracking-wider uppercase text-sm px-6 py-3 rounded-xl shadow border-2 border-purple-500 hover:bg-white hover:border-purple-500 hover:text-purple-600 outline-none focus:outline-none mr-1 mb-1 ease-linear duration-150 transition transform hover:-translate-y-1 hover:scale-110"
								type="button"
								onClick={() => setShowModal(true)}
							>
								{button1}
							</button>
							{showModal ? (
								<ModalContainer
									title="Create Project"
									subtitle="Start your journey here!"
								>
									<ModalInputField
										title="Project Name:"
										name="name"
										value={name}
										onChange={(e) => onChange(e)}
									/>
									<ModalInputField
										title="Description:"
										name="description"
										value={description}
										onChange={(e) => onChange(e)}
									/>

									<ModalFooter>
										<button
											className=" text-gray-800 border-2  font-medium tracking-wider uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg  outline-none focus:outline-none mr-1 mb-1 ease-linear duration-150 transition transform hover:-translate-y-1 hover:scale-110"
											type="button"
											onClick={() => {
												setShowModal(false);
											}}
										>
											Close
										</button>
										<button
											className="bg-purple-800 text-white active:bg-emerald-600 font-medium tracking-wider uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg hover:bg-green-600 outline-none focus:outline-none mr-1 mb-1 ease-linear duration-150 transition transform hover:-translate-y-1 hover:scale-110"
											type="button"
											onClick={() => {
												setShowModal(false);
												handleSubmit();
											}}
										>
											Save Changes
										</button>
									</ModalFooter>
								</ModalContainer>
							) : null}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default WorkspaceBanner;

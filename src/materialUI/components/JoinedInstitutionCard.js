import React from "react";

const JoinedInstitutionCard = ({ item }) => {
	return (
		<>
			{/* <div className="bg-white border-2 border-purple-300 shadow-md h-56 lg:h-72 w-72 mb-2 lg:mb-none rounded-lg cursor-pointer flex flex-col justify-between">
				<div className="justify-start h-2/5">
					<img
						alt="blog"
						src="https://images.unsplash.com/photo-1543505298-b8be9b52a21a?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8aW5zdGl0dXRpb258ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
						className="max-h-40 w-full object-cover rounded-tl-lg rounded-tr-lg"
					/>
				</div>
				<div className="justify-between h-3/5 p-2 rounded-bl-lg rounded-br-lg bg-white">
					<p class="text-gray-800 dark:text-white lg:text-xl font-medium uppercase mt-2 mb-4">
						{item.name}
					</p>

					<div className="mt-4 w-full lg:py-4">
						<p className="text-xs text-gray-400 text-right mt-4">{item.date}</p>
					</div>
				</div>
			</div> */}

			{/* <NavLink to={`${baseURL}/${id}?classroom=${id}`} onClick={() => handleClick(id)}> */}
			<div class="overflow-hidden shadow-lg rounded-lg m-10 h-56 lg:h-72 w-72 max-w-full cursor-pointer border-4 border-purple-200">
				{/* <div class="overflow-hidden shadow-lg rounded-lg h-56 lg:h-72 w-72 md:w-80 max-w-full cursor-pointer border-4 border-purple-200 hover:bg-blue-200 transition transform hover:-translate-y-1 hover:scale-110"> */}
				<div class="hover:to-blue-300">
					<img
						alt="blog"
						src="https://images.unsplash.com/photo-1543505298-b8be9b52a21a?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8aW5zdGl0dXRpb258ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
						class="max-h-40 w-full object-cover"
					/>
				</div>

				<div class="bg-white dark:bg-gray-800 w-full p-4">
					<p class="text-gray-400 text-xs text-right w-full">{item.date}</p>

					<p class="text-gray-800 dark:text-white text-xl font-medium mb-2">
						{item.name}
					</p>
				</div>
			</div>
			{/* </NavLink> */}
		</>
	);
};

export default JoinedInstitutionCard;

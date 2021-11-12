import Table, { AvatarCell, StatusPill, SelectColumnFilter } from "./Table";
import { VscSettings } from "react-icons/vsc";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin5Line } from "react-icons/ri";

export const COLUMNS = [
	{
		Header: "ID",
		accessor: "id",
	},

	{
		Header: "Title",
		accessor: "name",
	},
	{
		Header: "Status",
		accessor: "status",
		Cell: StatusPill,
	},
	{
		Header: "Tags",
		accessor: "tags",
		// Cell: SelectColumnFilter,
	},
	{
		Header: "Modified",
		accessor: "dateUpdated",
	},
	{
		Header: "Assignnee",
		accessor: "assignee_name",
		Cell: ({ value }) => {
			return (
				<div className="flex items-center">
					<div className="flex-shrink-0 h-10 w-10">
						<img
							className="h-10 w-10 shadow-md border border-gray-400 rounded-full"
							src={
								"https://robohash.org/voluptatedebitismaxime.png?size=50x50&set=set1"
							}
							alt=""
						/>
					</div>

					<div className="ml-4">
						<div className="text-sm font-medium text-gray-500">{value}</div>
					</div>
				</div>
			);
		},
	},
	// {
	// 	Header: 'Action',
	// 	// accessor: 'settings',
	// 	Cell: ({ row, column }) => {
	// 		const fileId = row.original.id;
	// 		// console.log(fileId);

	// 		return (
	// 			<div class='flex flex-row justify-between'>
	// 				<button
	// 					type='button'
	// 					className='justify-start text-xl cursor-pointer hover:text-purple-600 text-center'
	// 					onClick={() => {}}
	// 				>
	// 					<FiEdit />
	// 				</button>
	// 				<button
	// 					type='button'
	// 					className='justify-between text-xl cursor-pointer hover:text-purple-600 text-center'
	// 				>
	// 					<RiDeleteBin5Line />
	// 				</button>
	// 			</div>
	// 		);
	// 	},
	// 	idAccessor: 'id',
	// },
];

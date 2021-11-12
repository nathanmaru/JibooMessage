import React, { useMemo } from 'react';
import { useTable, useSortBy, useGlobalFilter, usePagination, useFilters } from 'react-table';
import MOCK_DATA1 from './MOCK_DATA.json';
// import DATA from './Data';
import { COLUMNS } from './Column';
import { classNames } from './Utils';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { BiArrowFromBottom, BiArrowFromTop, BiArrowToLeft, BiArrowToRight } from 'react-icons/bi';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
import { FiEdit } from 'react-icons/fi';
import { RiDeleteBin5Line } from 'react-icons/ri';

function GlobalFilter({ preGlobalFilteredRows, globalFilter, setGlobalFilter, filter, setFilter }) {
	return (
		<label className='flex gap-x-2 items-baseline mr-2 p-1'>
			<span className='text-gray-600'>Search : </span>
			<input
				type='text'
				className='rounded-md  border-2 border-gray-100 shadow-md h-8'
				value={filter || ''}
				onChange={(e) => setFilter(e.target.value)}
			/>
		</label>
	);
}

// Filter for a specific column (i.e. Role)

export function SelectColumnFilter({
	column: { filterValue, setFilter, preFilteredRows, id, render },
}) {
	const options = React.useMemo(() => {
		const options = new Set();
		preFilteredRows.forEach((row) => {
			options.add(row.values[id]);
		});
		return [...options.values()];
	}, [id, preFilteredRows]);

	return (
		<label className='flex gap-x-2 items-baseline'>
			<span className='text-gray-700'>{render('Header')} : </span>
			<select
				className='rounded-md border-2 border-gray-300 shadow-md focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
				name={id}
				id={id}
				value={filterValue}
				onChange={(e) => {
					setFilter(e.target.value || undefined);
				}}
			>
				<option value=''>All</option>
				{options.map((option, i) => (
					<option key={i} value={option}>
						{option}
					</option>
				))}
			</select>
		</label>
	);
}

export function AvatarCell({ value, column, row }) {
	return (
		<div className='flex items-center'>
			<div className='flex-shrink-0 h-10 w-10'>
				<img
					className='h-10 w-10 shadow-md border border-gray-400 rounded-full'
					src={row.original[column.imgAccessor]}
					alt=''
				/>
			</div>

			<div className='ml-4'>
				<div className='text-sm font-medium text-gray-500'>{value}</div>
				<div className='text-sm text-gray-500'>{row.original[column.emailAccessor]}</div>
			</div>
		</div>
	);
}

export function StatusPill({ value }) {
	const status = value ? value.toLowerCase() : 'unknown';

	return (
		<span
			className={classNames(
				'px-3 py-1 uppercase leading-wide font-bold text-xs rounded-full shadow-sm',
				status.startsWith('in review') ? 'bg-yellow-200 text-yellow-800' : null,
				status.startsWith('draft') ? 'bg-gray-200 text-gray-800' : null,
				status.startsWith('approved') ? 'bg-green-200 text-green-800' : null,
				status.startsWith('rejected') ? 'bg-red-200 text-red-800' : null
			)}
		>
			{status}
		</span>
	);
}

export const Table = () => {
	const [tableData, setTableData] = useState(null);
	const columns = useMemo(() => COLUMNS, []);
	const { files: DATA, loadingFiles } = useSelector((state) => state.class);
	// let DATA;
	useEffect(() => {
		if (!loadingFiles) {
			setTableData(DATA);
		}
	}, [loadingFiles]);
	// useEffect(() => {
	// 	console.log('Data Changed', DATA);
	// }, [DATA]);
	// const data = useMemo(() => DATA, [DATA]);

	const {
		getTableProps,
		gettableBodyProps,
		headerGroups,
		page,
		nextPage,
		previousPage,
		canNextPage,
		canPreviousPage,
		pageOptions,
		gotoPage,
		pageCount,
		prepareRow,
		state,
		setGlobalFilter,
	} = useTable(
		{
			columns,
			tableData,
		},
		useFilters,
		useGlobalFilter,
		useSortBy,
		usePagination
	);

	const { globalFilter } = state;
	const { pageIndex } = state;

	return (
		<>
			<div className='sm:flex sm:gap-x-2 mt-3 ml-3 mb-5'>
				<GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
				{/* {headerGroups.map((headerGroup) =>
					headerGroup.headers.map((column) =>
						column.Filter ? (
							<div
								className="mt-2 sm:mt-0 items-baseline h-10 p-2"
								key={column.id}
							>
								{column.render("Filter")}
							</div>
						) : null
					)
				)} */}
				<div className='flex flex-row items-center justify-start ml-auto mr-5 w-24'>
					<div className='w-1/2 flex items-center justify-center'>
						<button
							type='button'
							className='justify-start text-2xl text-gray-600 cursor-pointer hover:text-purple-600 text-center'
							onClick={() => {}}
						>
							<FiEdit />
						</button>
					</div>
					<div className='justify-center w-1/2 flex items-center'>
						<button
							type='button'
							className='justify-between text-2xl text-gray-600 cursor-pointer hover:text-purple-600 text-center'
						>
							<RiDeleteBin5Line />
						</button>
					</div>
				</div>
			</div>
			{/* Table */}
			<div className='overflow-x-auto'>
				<div className='align-middle inline-block min-w-full sm:px-6 lg:px-4'>
					<div className='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg'>
						<table
							{...getTableProps()}
							className='w-full border-2 border-gray-200 max-h-10/12 overflow-y-auto'
						>
							<thead>
								{headerGroups.map((headerGroup) => (
									<tr {...headerGroup.getHeaderGroupProps()}>
										{headerGroup.headers.map((column) => (
											<th
												scope='col'
												className='group px-6 py-3 text-left text-xs font-medium text-gray-600 bg-gray-400 uppercase tracking-wider'
												{...column.getHeaderProps(column.getSortByToggleProps())}
											>
												<div className='flex items-center justify-between'>
													{column.render('Header')}

													<span>
														{column.isSorted ? (
															column.isSortedDesc ? (
																<BiArrowFromTop />
															) : (
																<BiArrowFromBottom />
															)
														) : (
															<BiArrowFromBottom />
														)}
													</span>
												</div>
											</th>
										))}
									</tr>
								))}
							</thead>

							<tbody {...gettableBodyProps} className='bg-white divide-y divide-gray-200'>
								{page.map((row) => {
									prepareRow(row);
									return (
										<tr {...row.getRowProps()}>
											{row.cells.map((cell) => {
												return (
													<td
														{...cell.getCellProps()}
														className='px-6 py-4 whitespace-nowrap'
														role='cell'
													>
														<div className='text-sm text-gray-500'>
															{cell.render('Cell')}
														</div>
													</td>
												);
											})}
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				</div>
			</div>
			){/* Pagination */}
			<div className='py-3 flex items-center justify-between'>
				<div className='hidden sm:flex-1 sm:flex sm:items-center sm:justify-between ml-5'>
					<div className='flex gap-x-2 items-baseline'>
						<span className='text-sm text-gray-700'>
							Page{' '}
							<strong>
								{pageIndex + 1} of {pageOptions.length}
							</strong>{' '}
						</span>
					</div>
				</div>

				<nav
					className='relative z-0 inline-flex rounded-md shadow-sm space-x-1 ml-2 mr-2'
					aria-label='Pagination'
				>
					{/* Go To Page Input  */}
					<div className='hidden sm:flex-1 sm:flex sm:items-center sm:justify-between ml-5'>
						<div className='flex gap-x-2 items-baseline p-2'>
							<span className='text-sm text-gray-700'>
								Go To Page :{' '}
								<input
									type='number'
									onChange={(e) => {
										const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0;
										gotoPage(pageNumber);
									}}
									className='h-6 p-2'
								/>
							</span>
						</div>
					</div>

					{/* Next & Previous Page Buttons  */}
					<button
						className='rounded-l-md relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'
						onClick={() => gotoPage(0)}
						disabled={!canPreviousPage}
					>
						<span className='sr-only'>First</span>
						<BiArrowToLeft className='h-5 w-5 text-gray-400' aria-hidden='true' />
					</button>

					<button
						className='rounded-l-md relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 ml-2 mr-2'
						onClick={() => previousPage()}
						disabled={!canPreviousPage}
					>
						<span className='sr-only'>Previous</span>
						<IoIosArrowBack className='h-5 w-5 text-gray-400' aria-hidden='true' />
					</button>

					<button
						className='rounded-l-md relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'
						onClick={() => nextPage()}
						disabled={!canNextPage}
					>
						<span className='sr-only'>Next</span>
						<IoIosArrowForward className='h-5 w-5 text-gray-400' aria-hidden='true' />
					</button>

					<button
						className='rounded-l-md relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'
						onClick={() => gotoPage(pageCount - 1)}
						disabled={!canNextPage}
					>
						<span className='sr-only'>Last</span>
						<BiArrowToRight className='h-5 w-5 text-gray-400' aria-hidden='true' />
					</button>
				</nav>
			</div>
		</>
	);
};

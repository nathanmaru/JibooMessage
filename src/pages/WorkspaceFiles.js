import React from 'react';
import { Table } from '../components/Table';
import WorkspaceFilesSidebar from '../components/WorkspaceFilesSidebar';
import WorkspaceFilesTop from '../components/WorkspaceFilesTop';

const WorkspaceFiles = () => {
	return (
		<>
			<div class='p-2 flex flex-col justify-between mt-5'>
				<WorkspaceFilesTop />

				<div class='flex flex-row justify-between'>
					<div class='justify-start rounded-md p-2 w-44 border-2 h-72 border-purple-200'>
						<WorkspaceFilesSidebar />
					</div>

					<div class='justify-between rounded-md w-11/12'>{/* <Table /> */}</div>
				</div>
			</div>
		</>
	);
};

export default WorkspaceFiles;

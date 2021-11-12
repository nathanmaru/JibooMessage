import React from 'react';
import ResourceFilesSidebar from '../components/ResourceFilesSidebar';
import ResourceFilesTop from '../components/ResourceFilesTop';
import { Table } from '../components/Table';

const ResourcesFiles = () => {
	return (
		<>
			<div class='flex flex-col justify-between '>
				<ResourceFilesTop />

				<div class='flex flex-row justify-between'>
					<div class='justify-start rounded-md p-2 w-44 border-2 h-72 border-purple-200'>
						<ResourceFilesSidebar />
					</div>

					<div class='justify-between rounded-md w-11/12'>{/* <Table /> */}</div>
				</div>
			</div>
		</>
	);
};

export default ResourcesFiles;

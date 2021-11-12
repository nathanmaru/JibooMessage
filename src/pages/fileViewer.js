// Import the main component
import { Viewer } from '@react-pdf-viewer/core'; // install this library
// Plugins
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'; // install this library
// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
// Worker
import { Worker } from '@react-pdf-viewer/core'; // install this library

import pdfFile from '../assets/pdf/CasptoneManual.pdf';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import queryString from 'query-string';

const FileViewer = ({ location }) => {
	const [defaultPdfFile] = useState(pdfFile);
	const defaultLayoutPluginInstance = defaultLayoutPlugin();
	const { filePath } = queryString.parse(location.search);

	return (
		<div className='flex w-full flex-wrap h-screen overflow-y-auto bg-gray-200 items-center justify-center'>
			{/* show pdf conditionally (if we have one)  */}
			{defaultPdfFile && (
				<>
					<Worker workerUrl='https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js'>
						<Viewer fileUrl={filePath} plugins={[defaultLayoutPluginInstance]} />
					</Worker>
				</>
			)}
		</div>
	);
};

export default FileViewer;

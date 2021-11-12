import 'quill/dist/quill.snow.css';

const QuillEditor = ({ quillRef }) => {
	return (
		<>
			<div className='col-span-2' style={{ minWidth: 500, height: 400 }}>
				<div ref={quillRef} />
			</div>
		</>
	);
};

export default QuillEditor;

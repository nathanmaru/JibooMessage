import React from 'react';

const ProfileManager = (props) => {
	return (
		<>
			<div className='w-full'>
				{props.children}

				{/* <Route path='/workspace/files' component={Maot} />
				<Route path='/workspace/chat' component={Maot} /> */}
			</div>
		</>
	);
};

export default ProfileManager;

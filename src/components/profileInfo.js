import React from 'react';

const ProfileInfo = ({ user }) => {
	const [profile, setProfile] = React.useState();
	React.useEffect(() => {
		if (user) {
			setProfile(user);
		}
	}, [user]);
	return (
		<>
			{profile ? (
				<div class='flex flex-row justify-between w-full p-2 m-2'>
					<div class='justify-start w-1/2 border-r border-gray-200'>
						<div class='flex flex-col justify-between'>
							<div class='justify-start'>
								<div class='flex flex-row justify-between p-2 items-center '>
									<h3 class='justify-start text-gray-800 text-2xl font-semibold '>
										{profile.first_name} {profile.last_name}
									</h3>
									<p class='justify-between text-sm text-gray-400 mr-10'>
										{profile.username}
									</p>
								</div>
							</div>

							<div class='justify-between text-justify text-sm font-thin p-1 ml-1'>
								{profile.about}
							</div>
						</div>
					</div>

					<div class='justify-between text-right w-1/2'>
						<div class='flex flex-col justify-between'>
							<div class='justify-start'>
								<div class='flex flex-row justify-between w-40 ml-auto mr-2 text-gray-400 text-sm mt-1 mb-1'>
									<h3 class='justify-start'>{profile.numFollowing}</h3>
									<h3 class='justify-between font-semibold'>Following</h3>
								</div>
							</div>

							<div class='justify-between'>
								<div class='flex flex-row justify-between w-40 ml-auto mr-2 text-gray-400 text-sm mt-1 mb-1'>
									<h3 class='justify-start'>{profile.numFollowers}</h3>
									<h3 class='justify-between font-semibold'>Followers</h3>
								</div>
							</div>
							<div class='justify-between'>
								<div class='flex flex-row justify-between w-40 ml-auto mr-2 text-gray-400 text-sm mt-1 mb-1'>
									<h3 class='justify-start'>{profile.pubWorks}</h3>
									<h3 class='justify-between font-semibold'>Published Works</h3>
								</div>
							</div>
						</div>
					</div>
				</div>
			) : null}
		</>
	);
};

export default ProfileInfo;

import React, { Component } from 'react';
import { RiImageAddFill } from 'react-icons/ri';

const ProfileBanner = () => {
	const backgroundImg = 'https://www.pngall.com/wp-content/uploads/7/Gallery.png';
	const bgImageHandler = (e) => {
		const reader = new FileReader();

		reader.onload = () => {
			if (reader.readyState === 2) {
				this.setState({ backgroundImg: reader.result });
			}
		};
		reader.readAsDataURL(e.target.files[0]);
	};
	return (
		<>
			<div
				class='flex bg-cover h-36 rounded-lg bg-center text-black py-4 px-8 shadow-md'
				style={{
					backgroundImage: backgroundImg,
				}}
			>
				<div className='flex flex-row w-full justify-between'>
					<div class='md:w-1/2 w-full flex flex-row items-center justify-start'>
						{/* <img src={backgroundImg} alt="bgImg" class="w-20 h-20" /> */}
						dfsgfh
					</div>

					<div class='flex items-center justify-center text-gray-500'>
						<div class='flex flex-row justify-between'>
							<div class='justify-between'>
								<input
									type='file'
									id='input'
									class='hidden'
									accept='image/*'
									onChange={bgImageHandler}
								/>

								<div class='flex flex-row justify-between'>
									<label
										htmlFor='input'
										class='flex flex-row justify-between p-2 cursor-pointer'
									>
										<i class='justify-start text-lg items-baseline mr-2'>
											<RiImageAddFill />
										</i>
										<p class='justify-between text-sm'>Choose your image</p>
									</label>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ProfileBanner;

// export class ProfileBanner extends Component {
// 	state = {
// 		backgroundImg: 'https://www.pngall.com/wp-content/uploads/7/Gallery.png',
// 	};

// 	bgImageHandler = (e) => {
// 		const reader = new FileReader();

// 		reader.onload = () => {
// 			if (reader.readyState === 2) {
// 				this.setState({ backgroundImg: reader.result });
// 			}
// 		};
// 		reader.readAsDataURL(e.target.files[0]);
// 	};

// 	render() {
// 		const { backgroundImg } = this.state;
// 		return (
// 			<>
// 				<div
// 					class='flex bg-cover h-36 rounded-lg bg-center text-black py-4 px-8 shadow-md'
// 					style={{
// 						backgroundImage: { backgroundImg },
// 					}}
// 				>
// 					<div className='flex flex-row w-full justify-between'>
// 						<div class='md:w-1/2 w-full flex flex-row items-center justify-start'>
// 							{/* <img src={backgroundImg} alt="bgImg" class="w-20 h-20" /> */}
// 							dfsgfh
// 						</div>

// 						<div class='flex items-center justify-center text-gray-500'>
// 							<div class='flex flex-row justify-between'>
// 								<div class='justify-between'>
// 									<input
// 										type='file'
// 										id='input'
// 										class='hidden'
// 										accept='image/*'
// 										onChange={this.bgImageHandler}
// 									/>

// 									<div class='flex flex-row justify-between'>
// 										<label
// 											htmlFor='input'
// 											class='flex flex-row justify-between p-2 cursor-pointer'
// 										>
// 											<i class='justify-start text-lg items-baseline mr-2'>
// 												<RiImageAddFill />
// 											</i>
// 											<p class='justify-between text-sm'>Choose your image</p>
// 										</label>
// 									</div>
// 								</div>
// 							</div>
// 						</div>
// 					</div>
// 				</div>
// 			</>
// 		);
// 	}
// }

// export default ProfileBanner;

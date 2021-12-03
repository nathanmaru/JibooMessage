import React from "react";
import landing from "../assets/img/Saly-1.png";
import { FiPlayCircle } from "react-icons/fi";
import frame from "../assets/img/frame-1.png";
import { Link } from "react-router-dom";
import MainNavbar from "../components/mainNavbar";
import { useHistory } from "react-router";

const LandingPage = () => {
	const history = useHistory();

	return (
		<>
			<div class="flex flex-col">
				<MainNavbar />
				<div class="mt-3">
					<div
						class="bg-no-repeat bg-cover dark:bg-gray-800 flex relative z-20 items-center overflow-hidden -mt-3 h-screen "
						style={{
							backgroundImage: `url(${frame})`,
						}}
					>
						<div class="container mx-auto px-6 flex relative py-16">
							<div class="sm:w-2/3 lg:w-2/5 flex flex-col relative z-20">
								<span class="w-20 h-2 bg-gray-800 dark:bg-white mb-12"></span>
								<h1 class="font-bebas-neue uppercase text-6xl sm:text-8xl font-black flex flex-col leading-none dark:text-white text-gray-800">
									Connect
									<span class="text-3xl sm:text-4xl">With your friends</span>
								</h1>
								<p class="text-sm sm:text-base text-gray-700 dark:text-white mt-4">
									Dimension of reality that makes change possible and
									understandable. An indefinite and homogeneous environment in
									which natural events and human existence take place.
								</p>
								<div class="flex mt-8">
									<div className="flex flex-row justify-between uppercase py-2 px-4 rounded-lg bg-purple-800 border-2 border-transparent">
										<Link to="/signup">
											<button class="flex flex-row justify-between">
												<p class="justify-start text-white text-md mr-2">
													Get Started
												</p>
												<i class="justify-between">
													<FiPlayCircle className="items-center text-white mr-2 text-2xl" />
												</i>
											</button>
										</Link>
									</div>
								</div>
							</div>
							<div class="hidden sm:block sm:w-1/3 lg:w-5/6 relative">
								<img src={landing} class="w-5/6 m-auto" alt="landing-page" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default LandingPage;

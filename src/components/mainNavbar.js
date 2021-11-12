import React from 'react'
import { Link } from 'react-router-dom'

import frame from '../assets/img/clean-frame.png'

const MainNavbar = () => {
    return (
        <>
            <div>
                <nav class="dark:bg-gray-800 py-4 h-16"
                    style={{
						backgroundImage:
							`url(${frame})`,
					}}
                >
                    <div class="max-w-7xl mx-auto px-8">
                        <div class="flex items-center justify-between h-7">
                            <div class=" flex items-center">
                                <h5 class="font-bold text-3xl text-purple-800 -mt-2"> meegu.</h5>
                                <div class="hidden md:block">
                                    <div class="ml-10 flex items-baseline space-x-4">
                                        <Link to='/about' class="text-gray-400  hover:text-purple-700 dark:hover:text-white px-3 py-2 rounded-md text-md">
                                            About
                                        </Link>
                                        <Link to='/features' class="text-gray-400  hover:text-purple-700 dark:hover:text-white px-3 py-2 rounded-md text-md">
                                            Features
                                        </Link>
                                        <Link to='/contact-us' class="text-gray-400  hover:text-purple-700 dark:hover:text-white px-3 py-2 rounded-md text-md">
                                            Contact Us
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div class="block">
                                <div class="md:block -mr-2 flex">
                                    <form class="flex flex-col md:flex-row w-3/4 md:w-full max-w-sm md:space-x-3 space-y-3 md:space-y-0 justify-center">
                                        <Link to='/login'>
                                            <button class="flex-shrink-0 px-4 py-2 text-base font-medium tracking-wider text-purple-400 border-2 border-purple-600 rounded-lg shadow-md hover:bg-purple-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200" type="submit">
                                                Login
                                            </button>
                                        </Link>
                                    </form>
                                </div>
                                
                                <div class="ml-4 flex items-center md:ml-6">
                                </div>
                            </div>
                            
                            <div class="-mr-2 flex md:hidden">
                                <button class="text-gray-800 dark:text-white hover:text-gray-300 inline-flex items-center justify-center p-2 rounded-md focus:outline-none">
                                    <svg width="20" height="20" fill="currentColor" class="h-8 w-8" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1664 1344v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45z">
                                        </path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="md:hidden">
                        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            <a class="text-gray-300 hover:text-gray-800 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium" href="/#">
                                Home
                            </a>
                            <a class="text-gray-800 dark:text-white block px-3 py-2 rounded-md text-base font-medium" href="/#">
                                Gallery
                            </a>
                            <a class="text-gray-300 hover:text-gray-800 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium" href="/#">
                                Content
                            </a>
                            <a class="text-gray-300 hover:text-gray-800 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium" href="/#">
                                Contact
                            </a>
                        </div>

                        <div class="p-2 flex">
                            <form class="flex flex-col md:flex-row w-3/4 md:w-full max-w-sm md:space-x-3 space-y-3 md:space-y-0 justify-center">
                                <div class=" relative ">
                                    <input type="text" id="&quot;form-subscribe-Search" class=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="components"/>
                                </div>
                                <button class="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200" type="submit">
                                    Login
                                </button>
                            </form>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    )
}

export default MainNavbar

import React, { Component, useContext } from "react";
import { ShepherdTour, ShepherdTourContext } from "react-shepherd";
import { steps as newSteps } from "./steps";

import "shepherd.js/dist/css/shepherd.css";

import { Button } from "@mui/material";

const tourOptions = {
	defaults: {
		classes: "shepherd-theme-arrows",
	},
	defaultStepOptions: {
		cancelIcon: {
			enabled: true,
		},
	},
	useModalOverlay: true,
};

function ButtonStart() {
	const tour = useContext(ShepherdTourContext);

	return (
		<Button variant="contained" className="button dark" onClick={tour.start}>
			Start Tour
		</Button>
		// tour.start()
	);
}

export default function Intro() {
	const tour = useContext(ShepherdTourContext);
	return (
		<>
			<ShepherdTour steps={newSteps} tourOptions={tourOptions}>
				<ButtonStart />
				<div className="mt-3">
					<p class="first">Modal is here dapat</p>
				</div>
			</ShepherdTour>
		</>
	);
}

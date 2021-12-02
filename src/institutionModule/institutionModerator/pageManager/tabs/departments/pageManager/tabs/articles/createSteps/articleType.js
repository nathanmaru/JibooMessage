import React from "react";

import DialogComponent from "../../../../../../../../../materialUI/components/reuseableComponents/dialogComponent";

import { Button, Card, CardContent } from "@mui/material";
import { styled } from "@mui/material/styles";

const Input = styled("input")({
	display: "flex",
});

const ArticleType = () => {
	return (
		<>
			<div className="flex flex-col justify-center items-center w-full h-56 space-y-8 bg-red-50">
				<div className="flex items-center">
					<p className="text-lg font-bold text-gray-700">
						Please Select Article Type
					</p>
				</div>
			</div>
		</>
	);
};

export default ArticleType;

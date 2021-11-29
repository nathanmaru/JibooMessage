import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useFetch from "../../hooks/useFetch";

import BannerComponent from "../../materialUI/components/reuseableComponents/bannerComponent";
import DialogComponent from "../../materialUI/components/reuseableComponents/dialogComponent";
import CardHolder from "../../materialUI/components/reuseableComponents/cardHolder";
import CardComponent from "../../materialUI/components/reuseableComponents/cardComponent";

import { getInstitutions } from "../../store/newInstitutionSlice";

//mui
import { Button, TextField, Typography } from "@mui/material";

//validation
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const InstitutionStaff = () => {
	const dispatch = useDispatch(); //gamiton para mu call to dispatch action reducer
	const institutionState = useFetch; //mu create ug instance sa useFetch

	const fetchedInstitutions = useSelector(
		(state) => state.institution.institutions
	);
	const { items: institutions, setItems: setInstitutions } =
		institutionState(fetchedInstitutions);

	// useEffect(() => {
	// 	dispatch(getInstitutions());
	// }, []);

	//validation
	const validationMsg = Yup.object().shape({
		code: Yup.string()
			.required("Code is required.")
			.min(8, "Must be exactly 8 characters")
			.max(8, "Must be exactly 8 characters"),
	});

	const {
		register, // register inputs
		handleSubmit, // handle form submit
		formState: { errors },
	} = useForm({
		resolver: yupResolver(validationMsg),
	});

	const onSubmit = (data) => {
		console.log(JSON.stringify(data, null, 2));
		// dispatch(joinClassroom(data.code));
	};

	return (
		<>
			<div className="flex flex-col w-full space-y-4">
				<BannerComponent
					title=" Hello dear, Staff !"
					subtitle="Keep yourself updated with your instituion:"
				>
					<DialogComponent
						title="Join Institution"
						button={<Button variant="contained">Join Institution</Button>}
					>
						<form
							onSubmit={handleSubmit(onSubmit)}
							className="flex flex-col space-y-4"
						>
							<div className="mt-4">
								<TextField
									fullWidth
									id="outlined-search"
									label="Code"
									variant="outlined"
									name="code"
									// value={code}
									// onChange={(e) => onChange(e)}
									{...register("code")}
									error={errors.code ? true : false}
								/>
								<Typography
									sx={{ fontSize: "12px", color: "red", fontStyle: "italic" }}
								>
									{errors.code?.message}
								</Typography>
							</div>

							<div>
								<Button type="submit" variant="contained">
									Join
								</Button>
							</div>
						</form>
					</DialogComponent>
				</BannerComponent>

				<CardHolder>
					{institutions && institutions.length > 0 ? (
						<>
							{institutions.map((item) => (
								<CardComponent
									key={item.id}
									item={item}
									image={item.cover}
									link={`/classroom/researcher/${item.id}?tab=dashboard`}
								></CardComponent>
							))}
						</>
					) : (
						<div>You don't have a classroom yet.</div>
					)}
				</CardHolder>
			</div>
		</>
	);
};

export default InstitutionStaff;

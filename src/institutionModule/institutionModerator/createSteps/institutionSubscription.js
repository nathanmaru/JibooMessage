import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useFetch from '../../../hooks/useFetch';
import Paypal from '../../../materialUI/components/paypal';
import CardComponent from '../../../materialUI/components/reuseableComponents/cardComponent';
import DialogComponent from '../../../materialUI/components/reuseableComponents/dialogComponent';
import { getInstitutionPlans } from '../../../store/subscriptionSlice';

const InstitutionSubscription = () => {
	const currentInstitution = useSelector((state) => state.institution.currentInstitution);
	const dispatch = useDispatch();
	const planStates = useFetch;
	useEffect(() => {
		dispatch(getInstitutionPlans());
	}, []);
	const fetchedPlans = useSelector((state) => state.subscription.plans);
	const { items: plans, setItems: setPlans } = planStates(fetchedPlans);
	console.log(fetchedPlans);

	return (
		<>
			<div className='flex w-full justify-center items-center'>
				{plans.map((item) => (
					<DialogComponent title='Pay Thru:' button={<CardComponent item={item} />}>
						{currentInstitution ? (
							<Paypal
								item={item}
								productID={currentInstitution.id}
								productlabel='institution'
								dispatchLink={`/subscription/buy/institution/${currentInstitution.id}`}
							/>
						) : null}
					</DialogComponent>
				))}
			</div>
		</>
	);
};

export default InstitutionSubscription;

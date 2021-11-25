import { Button } from '@mui/material';
import { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { buyPlan } from '../../store/subscriptionSlice';

export default function Paypal({ item, productlabel, productID, dispatchLink }) {
	const paypal = useRef();
	const dispatch = useDispatch();
	const currentUser = useSelector((state) => state.auth.user);
	const handleFree = () => {
		let form_data = new FormData();
		form_data.append('payer_Email', currentUser.email);
		form_data.append('payer_FullName', currentUser.name);
		form_data.append('plan', item.id);
		form_data.append(productlabel, productID);
		dispatch(buyPlan(dispatchLink, form_data));
	};

	useEffect(() => {
		window.paypal
			.Buttons({
				createOrder: (data, actions, err) => {
					return actions.order.create({
						intent: 'CAPTURE',
						purchase_units: [
							{
								description: item.name,
								amount: {
									currency_code: 'PHP',
									value: item.price,
								},
							},
						],
					});
				},
				onApprove: async (data, actions) => {
					const order = await actions.order.capture();
					let form_data = new FormData();
					console.log(order);
					form_data.append('payer_Email', order.payer.email_address);
					form_data.append(
						'payer_FullName',
						order.payer.name.given_name + ' ' + order.payer.name.surname
					);
					form_data.append('plan', item.id);
					form_data.append('classroom', productID);
					dispatch(buyPlan(dispatchLink, form_data));
				},
				onError: (err) => {
					console.log(err);
				},
			})
			.render(paypal.current);
	}, []);

	return (
		<div>
			{item.price == '0.00' ? (
				<>
					<div>
						<b>Price: </b>
						{item.description}
					</div>
					<div className='flex w-full items-center justify-center'>
						<Button variant='contained' onClick={handleFree}>
							Choose This
						</Button>
					</div>
				</>
			) : (
				<div ref={paypal}></div>
			)}
		</div>
	);
}

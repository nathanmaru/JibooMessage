import { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { buyPlan } from '../../store/subscriptionSlice';

export default function Paypal({ item, productlabel, productID }) {
	const paypal = useRef();
	const dispatch = useDispatch();

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
					form_data.append(productlabel, productID[0].id);
					form_data.append(
						'payerName',
						order.payer.name.given_name + ' ' + order.payer.name.surname
					);
					form_data.append('payerEmail', order.payer.email_address);
					form_data.append('plan', item.id);
					dispatch(buyPlan('/institution/subscribe', form_data));
				},
				onError: (err) => {
					console.log(err);
				},
			})
			.render(paypal.current);
	}, []);

	return <div>{item.price == '0.00' ? item.description : <div ref={paypal}></div>}</div>;
}

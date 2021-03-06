import React, { useEffect, useState } from "react";
import "./Payment.css";
import { useStateValue } from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import { getBasketTotal } from "./reducer";
import CurrencyFormat from "react-currency-format";
import { Link, useHistory } from "react-router-dom";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { db } from "./firebase";
import axios from "./axios";
function Payment() {
	const history = useHistory();
	const [{ basket, user }, dispatch] = useStateValue();
	const stripe = useStripe();
	const elements = useElements();
	const [succeeded, setsuccededed] = useState(false);
	const [processing, setprocessing] = useState("");
	const [error, setError] = useState(null);
	const [disabled, setDisabled] = useState(true);
	const [clientSecret, setclientSecret] = useState(true);

	useEffect(() => {
		//generate the special stripe secrets which allows us to
		// charge a customer
		const getClientSecret = async () => {
			const response = await axios({
				//stripe excepts the total in a currencies subunits
				method: "post",
				url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
			});
			setclientSecret(response.data.clientSecret);
		};

		getClientSecret();
	}, [basket]);
	console.log("the secret key", clientSecret);

	const handleSubmit = async (event) => {
		//do all thr fancy stripe stuff...
		event.preventDefault();
		setprocessing(true);
		const payload = await stripe
			.confirmCardPayment(clientSecret, {
				payment_method: {
					card: elements.getElement(CardElement),
				},
			})
			.then(({ paymentIntent }) => {
				//paymentIntent = payment confirmation

				db.collection("users")
					.doc(user?.uid)
					.collection("orders")
					.doc(paymentIntent.id)
					.set({
						basket: basket,
						amount: paymentIntent.amount,
						created: paymentIntent.created,
					});
				setsuccededed(true);
				setError(null);
				setprocessing(false);

				dispatch({
					type: "EMPTY_BASKET",
				});

				history.replace("/orders");
			});
	};
	const handleChange = (event) => {
		//listen for changes in the CardElement
		//and display any errors as the customer types their card details
		setDisabled(event.empty);
		setError(event.error ? event.error.message : "");
	};
	return (
		<div className="payment">
			<div className="payment_container">
				<h1>
					Checkout(<Link to="/checkout">{basket?.length} items</Link>)
				</h1>
				<div className="payment_section">
					{/* {payment-section_delivery address} */}
					<div className="payment_title">
						<h3>Delivery Adress</h3>
					</div>
					<div className="payment_address">
						<p>{user?.email}</p>
						<p>123 React Lane</p>
						<p>Los Angeles,CA</p>
					</div>
				</div>
				{/* payment-section review items */}
				<div className="payment_section">
					<div className="payment_title">
						<h3>Review items and delivery</h3>
					</div>
					<div className="payment_items">
						{basket.map((item) => (
							<CheckoutProduct
								id={item.id}
								title={item.title}
								image={item.image}
								price={item.price}
								rating={item.rating}
							/>
						))}
					</div>
				</div>
				{/* payment-section payment method */}
				<div className="payment_section">
					<div className="payment_title">
						<h3>Payment Methods</h3>
					</div>
					<div className="payment_details">
						<form onSubmit={handleSubmit}>
							<CardElement onChange={handleChange} />

							<div className="payment_priceContainer">
								<CurrencyFormat
									renderText={(value) => (
										<>
											<h3>Order Total:{value}</h3>
										</>
									)}
									decimalScale={2}
									value={getBasketTotal(basket)}
									displayType={"text"}
									thousandSeparator={true}
									prefix={"Rs"}
								/>
								<button disabled={processing || disabled || succeeded}>
									<span>{processing ? <p> Processing</p> : "Buy Now"}</span>
								</button>
							</div>
							{/* Errors */}
							{error && <div>{error}</div>}
						</form>
						{/* stripe magic will go */}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Payment;

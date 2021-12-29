import React from "react";
import "./Subtotal.css";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "./StateProvider";
import { getBasketTotal } from "./reducer";
import { useHistory } from "react-router-dom";

function Subtotal() {
	const history = useHistory();
	const [{ basket }, dispatch] = useStateValue();
	// console.log(basket);
	// var x = basket.length;
	// var sum = 0;
	// for (var i = 0; i < x; i++) {
	// 	console.log(basket[i].price);
	// 	sum += basket[i].price;
	// }
	// console.log(sum);
	// dispatch({});

	return (
		<div className="subtotal">
			<CurrencyFormat
				renderText={(value) => (
					<>
						<p>
							{/* part of the homework */}
							subtotal ({basket.length} items):
							<strong>{value}</strong>
						</p>
						<small className="subtotal_gift">
							<input type="checkbox" />
							This order contains a gift
						</small>
					</>
				)}
				decimalScale={2}
				value={getBasketTotal(basket)} //part of the home
				displayType={"text"}
				thousandSeparator={true}
				prefix={"Rs"}
			/>
			<button onClick={(e) => history.push("/payment")}>
				Proceed to Checkout
			</button>
		</div>
	);
}

export default Subtotal;

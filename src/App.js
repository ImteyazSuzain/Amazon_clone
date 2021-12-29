//import logo from './logo.svg';
import "./App.css";
import Header from "./Header";
import Home from "./Home";
import Login from "./Login";
import Orders from "./Orders";
import Checkout from "./Checkout";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import React, { useEffect } from "react";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import Payment from "./Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const promise = loadStripe(
	"pk_test_51K2In6SJiIWnzaoMG9MPalHhbEPBW4WoiuFcbajQ5NF2KPdwJXpCREx1ySVghmnWf8VV9ekuQWpXHUqcGVuA7mzO00doAVa8fM"
);

function App() {
	const [{}, dispatch] = useStateValue();
	useEffect(() => {
		//will only run once when the app component loads...
		auth.onAuthStateChanged((authUser) => {
			// console.log("THE USER IS>>>>", authUser);
			if (authUser) {
				//the user just logged in / the user was logged in
				dispatch({
					type: "SET_USER",
					user: authUser,
				});
			} else {
				dispatch({
					type: "SET_USER",
					user: null,
				});
				//the user is logged out
			}
		});
	}, []);
	return (
		<div className="App">
			<Router>
				<Switch>
					<Route path="/orders">
						<Header />
						<Orders />
					</Route>
					<Route path="/login">
						<Header />
						<Login />
					</Route>
					<Route path="/checkout">
						<Header />
						<Checkout />
					</Route>
					<Route path="/payment">
						<Header />
						<Elements stripe={promise}>
							<Payment />
						</Elements>
					</Route>
					<Route path="/">
						<Header />
						<Home />
					</Route>
				</Switch>
			</Router>
		</div>
	);
}

export default App;

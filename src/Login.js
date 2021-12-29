import React, { useState } from "react";
import "./Login.css";
import { Link, useHistory } from "react-router-dom";
import { auth } from "./firebase";
function Login() {
	const history = useHistory();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const SignIn = (e) => {
		e.preventDefault();
		//some fancy firebase login shittt.....
		auth
			.signInWithEmailAndPassword(email, password)
			.then((auth) => {
				if (auth) {
					history.push("/");
				}
			})
			.catch((error) => alert(error.message));
	};

	const register = (e) => {
		e.preventDefault();
		//do some fancy firebase register shitt........
		auth
			.createUserWithEmailAndPassword(email, password)
			.then((auth) => {
				//it successfully created a new user with email and password
				// console.log(auth);

				if (auth) {
					history.push("/");
				}
			})
			.catch((error) => alert(error.message));
	};
	return (
		<div className="Login">
			<Link to="/">
				<img
					className="Login_Logo"
					src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
					alt=""
				/>
			</Link>
			<div className="login_container">
				<h1>Sign In</h1>
				<form action="">
					<h5>E-mail</h5>
					<input
						type="text"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<h5>Password</h5>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<button type="submit" onClick={SignIn} className="login_SignInbutton">
						Sign In
					</button>
					<p>
						{" "}
						By signing-in you agree to Amazon's Conditions of Use & Sales .
						Please see our Privacy Notice , our Cookies Notice and our
						Interest-Based Ad Notice
					</p>
					<button onClick={register} className="Login_Registerbutton">
						Create your Amazon account
					</button>
				</form>
			</div>
		</div>
	);
}

export default Login;

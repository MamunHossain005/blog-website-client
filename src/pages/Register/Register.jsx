import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import { sendEmailVerification, updateProfile } from "firebase/auth";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { Helmet } from "react-helmet-async";

const Register = () => {
	const { registerUser, MySwal } = useContext(AuthContext);
	const navigate = useNavigate();
	const [show, setShow] = useState(false);

	const form = useForm({
		defaultValues: {
			firstName: "",
			lastName: "",
			email: "",
			password: "",
			terms: false,
		},
	});

	const { register, handleSubmit, formState, reset } = form;
	const { errors, isSubmitSuccessful } = formState;

	const onSubmitForm = data => {
		const { firstName, lastName, email, password } = data;

		registerUser(email, password)
			.then(userCredential => {
				const user = userCredential.user;

				updateProfile(user, {
					displayName: `${firstName} ${lastName}`
				})
					.then(() => {
						sendEmailVerification(user)
							.then(() => {
								MySwal.fire({
									icon: 'success',
									title: "Success",
									text: 'You are registered successfully',
									confirmButtonColor: "#3085d6",
									confirmButtonText: "Ok"
								})
									.then(() => {
										navigate('/confirmEmail');
									})
							})
					})
					.catch(error => {
						MySwal.fire({
							icon: 'error',
							title: "Error",
							text: error.message,
							confirmButtonColor: "#3085d6",
							confirmButtonText: "Ok"
						})
					})
			})
			.catch(error => {
				MySwal.fire({
					icon: 'error',
					title: "Error",
					text: error.message,
					confirmButtonColor: "#3085d6",
					confirmButtonText: "Ok"
				})
			})
	}

	useEffect(() => {
		if (isSubmitSuccessful) {
			reset();
		}
	}, [isSubmitSuccessful, reset])

	return (
		<div className="my-20 max-w-xl mx-auto p-8 shadow-lg rounded-lg">
			<Helmet>
				<title>Bloggy | Register</title>
			</Helmet>
			<div className="flex items-center justify-between">
				<h1 className="text-3xl font-bold">Register</h1>
				<p className="text-blue-700 text-sm">
					Already have an account? Please{" "}
					<Link to={"/login"}>
						<span className="text font-medium hover:text-purple-600 hover:font-bold hover:underline">
							Login
						</span>
					</Link>
				</p>
			</div>
			<form className="mt-10" onSubmit={handleSubmit(onSubmitForm)} noValidate>
				<div className="flex gap-5">
					<div className="grow">
						<label htmlFor="firsName">
							First Name<sup>*</sup>
						</label>
						<input
							type="text"
							id="firstName"
							className={`border-2 rounded-md p-2 block mt-2 w-full outline-none hover:border-blue-300 focus:border-blue-500 ${errors.firstName && "border-red-500"
								}`}
							{...register("firstName", {
								required: {
									value: true,
									message: "First Name is required",
								},
							})}
						/>
						<p className="text-red-500 text-sm">
							{errors.firstName && errors.firstName?.message}
						</p>
					</div>
					<div className="grow">
						<label htmlFor="lastName">
							Last Name<sup>*</sup>
						</label>
						<input
							type="text"
							id="lastName"
							className={`border-2 rounded-md p-2 block mt-2 w-full outline-none hover:border-blue-300 focus:border-blue-500 ${errors.lastName && "border-red-500"
								}`}
							{...register("lastName", {
								required: {
									value: true,
									message: "Last Name is required",
								},
							})}
						/>
						<p className="text-red-500 text-sm">
							{errors.lastName && errors.lastName?.message}
						</p>
					</div>
				</div>
				<div className="mt-6">
					<label htmlFor="email">
						Email Address<sup>*</sup>
					</label>
					<input
						type="email"
						id="email"
						className={`border-2 rounded-md p-2 block mt-2 w-full outline-none hover:border-blue-300 focus:border-blue-500 ${errors.email && "border-red-500"
							}`}
						{...register("email", {
							required: {
								value: true,
								message: "Email address is required",
							},
							pattern: {
								value: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
								message: "Invalid email address"
							}
						})}
					/>
					<p className="text-red-500 text-sm">
						{errors.email && errors.email?.message}
					</p>
				</div>
				<div className="mt-6">
					<label htmlFor="password">
						Password<sup>*</sup>
					</label>
					<div className="relative">
						<input
							type={show ? 'text' : 'password'}
							id="password"
							className={`border-2 rounded-md p-2 block mt-2 w-full outline-none hover:border-blue-300 focus:border-blue-500 ${errors.password && "border-red-500"
								}`}
							{...register("password", {
								required: {
									value: true,
									message: "Password is required",
								},
								minLength: {
									value: 6,
									message: "Password must be at least of 6 characters"
								},
								pattern: {
									value: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$-_!%*?&]+$/g,
									message: "Invalid password"
								}
							})}
						/>
						<button className="text-xl absolute top-[25%] right-[3%]" onClick={() => setShow(!show)} title={show ? 'hide' : 'show'}>{show ? <IoEyeOff /> : <IoEye />}</button>
					</div>
					<p className="text-red-500 text-sm">
						{errors.password && errors.password?.message}
					</p>
				</div>
				<div className="space-x-2 mt-6">
					<input type="checkbox" id="terms" {...register("terms", {
						required: {
							value: true,
							message: "You need to accept terms and policies"
						}
					})} />
					<label htmlFor="terms" className="text-sm">By Signing up, you agree to our  <span className="text-blue-600">Terms of Service</span>  and  <span className="text-blue-600">Privacy Policy</span></label>
					<p className="text-red-500 text-sm">{errors.terms && errors.terms?.message}</p>
				</div>
				<button type="submit" className="py-2 text-center w-full outline outline-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white mt-8 rounded-md font-medium">Create Account</button>
			</form>
		</div>
	);
};

export default Register;

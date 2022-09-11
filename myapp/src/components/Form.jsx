import {
	Flex,
	Box,
	FormControl,
	FormLabel,
	Input,
	Checkbox,
	Stack,
	Link,
	Button,
	Heading,
	Text,
	useColorModeValue,
} from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SimpleCard() {
	const [email, setemail] = useState("");
	const [password, setpassword] = useState("");
	const navigate = useNavigate();
	//
	function login(email, password) {
		axios
			.post("https://skyappdeploy.herokuapp.com/login", { email, password })
			.then((res) => {
				if (res.data.token) {
					localStorage.setItem("token", res.data.token);
					navigate("/article");
				} else {
					alert("Invalid Email or Password");
				}
			});
	}
	return (
		<Flex
			minH={"100vh"}
			align={"center"}
			justify={"center"}
			bg={useColorModeValue("gray.50", "gray.800")}>
			<Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
				<Stack align={"center"}>
					<Heading fontSize={"4xl"}>Sign in to your account</Heading>
					<Text fontSize={"lg"} color={"gray.600"}>
						to enjoy all of our cool features ✌️
					</Text>
				</Stack>
				<Box
					rounded={"lg"}
					bg={useColorModeValue("white", "gray.700")}
					boxShadow={"lg"}
					p={8}>
					<Stack spacing={4}>
						<FormControl id='email'>
							<FormLabel>Email address</FormLabel>
							<Input
								type='email'
								onChange={(e) => {
									setemail(e.target.value);
								}}
							/>
						</FormControl>
						<FormControl id='password'>
							<FormLabel>Password</FormLabel>
							<Input
								type='password'
								onChange={(e) => {
									setpassword(e.target.value);
								}}
							/>
						</FormControl>
						<Stack spacing={10}>
							<Stack
								direction={{ base: "column", sm: "row" }}
								align={"start"}
								justify={"space-between"}>
								<Checkbox>Remember me</Checkbox>
								<Link color={"blue.400"}>Forgot password?</Link>
							</Stack>
							<Button
								bg={"blue.400"}
								color={"white"}
								_hover={{
									bg: "blue.500",
								}}
								onClick={() => {
									login(email, password);
								}}>
								Sign in
							</Button>
						</Stack>
					</Stack>
				</Box>
			</Stack>
		</Flex>
	);
}

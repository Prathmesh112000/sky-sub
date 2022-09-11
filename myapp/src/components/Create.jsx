import React, { useState } from "react";
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Button,
	useDisclosure,
	FormControl,
	FormLabel,
	Input,
	Textarea,
	Select,
	Alert,
	AlertIcon,
	AlertTitle,
	AlertDescription,
} from "@chakra-ui/react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { senddatafunction } from "../Redux/action";
export default function InitialFocus() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const dispatch = useDispatch();
	const [Title, setTitle] = useState("");
	const [Desc, setDesc] = useState("");
	const [longDesc, setlongDesc] = useState("");
	const [mainCat, setmainCat] = useState("");
	const [subcat, setsubcat] = useState("");
	const [input, setInput] = useState("");
	const initialRef = React.useRef(null);
	const finalRef = React.useRef(null);
	const isError = input === "";
	function senddata() {
		//     title:String,
		// adminId:String,
		// description:String,
		// createdAt:String,
		// longdesc:String,
		// category:String,
		// subCategory:String,
		// updatedAt:{
		//     type:String,
		//     default:null
		// }

		const token = localStorage.getItem("token");
		const obj = {
			title: Title,
			description: Desc,
			longdesc: longDesc,
			category: mainCat,
			subCategory: subcat,
		};

		axios
			.post("https://skyappdeploy.herokuapp.com/article/create", obj, {
				headers: {
					authorization: `bearer ${token}`,
				},
			})
			.then((res) => {
				console.log(res);

				senddatafunction(dispatch);
				//     <Alert status='success'>
				//     <AlertIcon />
				//     Data uploaded to the server. Fire on!
				//   </Alert>
				setTitle("");
				setDesc("");
				setlongDesc("");
				setmainCat("");
				setsubcat("");
				window.location.reload(true);
				alert("Article Added Successfully");
			});
	}

	return (
		<>
			<Button onClick={onOpen}>Create Article</Button>

			<Modal
				initialFocusRef={initialRef}
				finalFocusRef={finalRef}
				isOpen={isOpen}
				onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Create your Article</ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={6}>
						<FormControl>
							<FormLabel>Title</FormLabel>
							<Input
								ref={initialRef}
								value={Title}
								onChange={(e) => {
									setTitle(e.target.value);
								}}
							/>
						</FormControl>

						<FormControl mt={4}>
							<FormLabel>Short Description</FormLabel>
							<Input
								placeholder='Last name'
								value={Desc}
								onChange={(e) => {
									setDesc(e.target.value);
								}}
							/>
						</FormControl>

						<FormControl mt={4}>
							<FormLabel>Long Description </FormLabel>
							<Textarea
								placeholder='Here is a sample placeholder'
								value={longDesc}
								onChange={(e) => {
									setlongDesc(e.target.value);
								}}
							/>
						</FormControl>

						<FormControl mt={4}>
							<FormLabel>Category</FormLabel>
							<Select
								placeholder='Select option'
								onChange={(e) => {
									setmainCat(e.target.value);
								}}>
								<option value='News'>News</option>
								<option value='Sports'>Sports</option>
								<option value='Culture'>Culture</option>
							</Select>
						</FormControl>

						<FormControl mt={4}>
							<FormLabel>Sub Category</FormLabel>
							<Select
								placeholder='Select option'
								onChange={(e) => {
									setsubcat(e.target.value);
								}}>
								<option value='General'>General</option>
								<option value='Special'>Special</option>
								<option value='Latest'>Latest</option>
							</Select>
						</FormControl>
					</ModalBody>

					<ModalFooter>
						<Button
							colorScheme='blue'
							mr={3}
							onClick={() => {
								senddata();
								onClose();
							}}>
							Save
						</Button>
						<Button onClick={onClose}>Cancel</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
}

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
	Box,
} from "@chakra-ui/react";
import axios from "axios";

export default function InitialFocus(props) {
	const { isOpen, onOpen, onClose } = useDisclosure();

	const [Title, setTitle] = useState("");
	const [Desc, setDesc] = useState("");
	const [longDesc, setlongDesc] = useState("");
	const [mainCat, setmainCat] = useState("");
	const [subcat, setsubcat] = useState("");
	const [input, setInput] = useState("");
	const initialRef = React.useRef(null);
	const finalRef = React.useRef(null);
	const isError = input === "";

	function updatedata() {
		const token = localStorage.getItem("token");
		console.log("edit form id is", props.id);
		const obj = {
			title: Title,
			description: Desc,
			longdesc: longDesc,
			category: mainCat,
			subCategory: subcat,
			_id: props.id,
		};

		// const {title,description,longdesc,_id,category,subCategory}= req.body

		axios
			.put("https://skyappdeploy.herokuapp.com/article/update", obj)
			.then((res) => {
				console.log(res);
				//     <Alert status='success'>
				//     <AlertIcon />
				//     Data uploaded to the server. Fire on!
				//   </Alert>
				setTitle("");
				setDesc("");
				setlongDesc("");
				setmainCat("");
				setsubcat("");

				props.getdata();
				// window.location.reload(true);
				alert("data update");
			});
	}

	return (
		<>
			<Box onClick={onOpen}>Edit</Box>

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
								updatedata();
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

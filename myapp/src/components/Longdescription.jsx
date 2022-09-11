import React from "react";
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	useDisclosure,
	Button,
	Text,
} from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";

export default function Longdescription({ description, title }) {
	const OverlayOne = () => (
		<ModalOverlay
			bg='blackAlpha.300'
			backdropFilter='blur(10px) hue-rotate(90deg)'
		/>
	);

	const { isOpen, onOpen, onClose } = useDisclosure();
	const [overlay, setOverlay] = React.useState(<OverlayOne />);

	return (
		<>
			{/* onClick={() => {
					setOverlay(<OverlayOne />);
					onOpen();
				}} */}
			<Button
				rightIcon={<ArrowForwardIcon />}
				onClick={() => {
					setOverlay(<OverlayOne />);
					onOpen();
				}}
				colorScheme='messenger'>
				Read More
			</Button>
			<Modal isCentered isOpen={isOpen} onClose={onClose}>
				{overlay}
				<ModalContent>
					<ModalHeader>{title}</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Text>{description}</Text>
					</ModalBody>
					<ModalFooter>
						<Button onClick={onClose}>Close</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
}

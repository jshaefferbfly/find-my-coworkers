import { FormEvent, useState } from "react";
import { Button, FormControl, InputGroup, Modal } from "react-bootstrap";

interface Props {
	handlePass: () => void;
}

export default function Pass({ handlePass }: Props) {
	const [show, setShow] = useState(true);
	const [password, setPassword] = useState("");
	const [wrong, setWrong] = useState(false);

	const handleClose = () => {
		if (password) {
			setShow(false);
		}
	};

	const handleSend = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (password === process.env.REACT_APP_BUTTERFLY_PASS) {
			handleClose();
			localStorage.setItem("butterfly", "true");
			handlePass();
		} else {
			setWrong(true);
		}
	};

	return (
		<>
			<Modal show={show} onHide={handleClose}>
				<form onSubmit={handleSend}>
					<Modal.Body>
						<InputGroup size="sm" className="mb-3">
							<InputGroup.Text id="inputGroup-sizing-sm">Password:</InputGroup.Text>
							<FormControl
								type="password"
								aria-label="Small"
								aria-describedby="inputGroup-sizing-sm"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</InputGroup>
					</Modal.Body>
					<Modal.Footer>
						{wrong ? <small style={{ color: "red" }}>yo, that&apos;s not the right password</small> : <></>}
						<Button variant="primary" type="submit" disabled={!password}>
							Submit
						</Button>
					</Modal.Footer>
				</form>
			</Modal>
		</>
	);
}

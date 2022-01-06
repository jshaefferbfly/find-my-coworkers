import { FormEvent, useCallback, useEffect, useState } from "react";
import { Modal, Button, InputGroup, FormControl } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";

// eslint-disable-next-line
export default function UserModal({ handleDB }: any) {
	const [show, setShow] = useState(true);
	const [name, setName] = useState<string>("");
	const [team, setTeam] = useState<string>("");
	const [location, setLocation] = useState<GeolocationCoordinates>();
	const [message, setMessage] = useState<string>("");

	const handleClose = () => {
		let success = false;
		if (name && team) {
			setShow(false);
			success = true;
		} else {
			success = false;
		}
		return success;
	};

	const handleSend = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (isTooLong()) return;
		if (handleClose()) {
			handleDB({
				name,
				team,
				location: {
					longitude: location?.longitude,
					latitude: location?.latitude,
				},
				avatarId: uuidv4(),
			});
		}
	};

	const getLocation = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((locationObject) => setLocation(locationObject.coords));
		}
	};

	const isTooLong = useCallback(() => {
		if (name.length > 20 || team.length > 20) {
			return true;
		} else {
			return false;
		}
	}, [name.length, team.length]);

	useEffect(() => {
		if (isTooLong()) {
			setMessage("Name and/or Team is too long");
		} else {
			setMessage("");
		}
	}, [name, team, isTooLong]);

	useEffect(() => {
		getLocation();
	}, []);

	return (
		<>
			<Modal show={show} onHide={handleClose}>
				<form onSubmit={handleSend}>
					<Modal.Header>
						<Modal.Title>
							Hey 👋, Welcome to <b>FindMyCoworker</b>
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<InputGroup size="sm" className="mb-3">
							<InputGroup.Text id="inputGroup-sizing-sm">What&apos;s your name?</InputGroup.Text>
							<FormControl
								aria-label="Small"
								aria-describedby="inputGroup-sizing-sm"
								value={name}
								onChange={(e) => setName(e.target.value)}
								onBlur={isTooLong}
							/>
						</InputGroup>
						<InputGroup size="sm" className="mb-3">
							<InputGroup.Text id="inputGroup-sizing-sm">What&apos;s your team?&nbsp;</InputGroup.Text>
							<FormControl
								aria-label="Small"
								aria-describedby="inputGroup-sizing-sm"
								value={team}
								onChange={(e) => setTeam(e.target.value)}
								onBlur={isTooLong}
							/>
						</InputGroup>
						<small style={{ color: "red" }}>{message}</small>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="primary" type="submit" disabled={!name || !team || isTooLong()}>
							Pin me!
						</Button>
					</Modal.Footer>
				</form>
			</Modal>
		</>
	);
}

/*eslint eqeqeq:0*/

import { useEffect, useState } from "react";
import { Modal, Button, InputGroup, FormControl } from "react-bootstrap";

// eslint-disable-next-line
export default function UserModal({handleDB}:any) {
	const [show, setShow] = useState(true);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const handleSend = () => {
		handleClose();
		console.log(`
			sending to the back... 
			name: ${name},
			team: ${team},
			location: ${location}
			lat: ${location?.latitude}
			long: ${location?.longitude}
		`);
		handleDB({ name, team, location: { longitude: location?.longitude, latitude: location?.latitude } });
	};

	const [name, setName] = useState<string>("");
	const [team, setTeam] = useState<string>("");

	const [location, setLocation] = useState<GeolocationCoordinates>();

	function getLocation() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((locationObject) => setLocation(locationObject.coords));
		}
	}

	useEffect(() => {
		getLocation();
	}, []);

	return (
		<>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Hey 👋, Welcome to Find my Coworker</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<InputGroup size="sm" className="mb-3">
						<InputGroup.Text id="inputGroup-sizing-sm">What&apos;s your name :</InputGroup.Text>
						<FormControl
							aria-label="Small"
							aria-describedby="inputGroup-sizing-sm"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</InputGroup>
					<InputGroup size="sm" className="mb-3">
						<InputGroup.Text id="inputGroup-sizing-sm">What&apos;s your team ?</InputGroup.Text>
						<FormControl
							aria-label="Small"
							aria-describedby="inputGroup-sizing-sm"
							value={team}
							onChange={(e) => setTeam(e.target.value)}
						/>
					</InputGroup>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="danger" onClick={handleClose}>
						Close
					</Button>
					<Button variant="primary" onClick={handleSend}>
						Pin me!
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { UserData } from "../App";
import "./connected.css";

interface Props {
	users: UserData[];
}

export default function ConnectedUsers({ users }: Props) {
	return (
		<div>
			<Modal show={true} backdrop={false} className="connected-container">
				<Modal.Header>
					<Modal.Title>Coworkers:</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div>
						<ul>
							{users.map((e, id) => (
								<li key={id}>{e.name}</li>
							))}
						</ul>
					</div>
				</Modal.Body>
			</Modal>
		</div>
	);
}

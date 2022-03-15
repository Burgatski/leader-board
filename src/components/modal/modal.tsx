import React from "react";
import {Button, Modal} from "react-bootstrap";
import {PlayerData} from "../../types/players";

interface ModalWindowProps {
    isOpen: boolean,
    handleCloseModal: (el: boolean) => void,
    player: PlayerData
}

export const ModalWindow: React.FC<ModalWindowProps> = React.memo(({handleCloseModal, isOpen, player}) => {
    const handleClose = () => handleCloseModal(false);
    return (
        <Modal show={isOpen} onHide={handleClose} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>Player information</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>Name: {player.name}</div>
                <div>Points: {player.points}</div>
                <div>Age: {player.age}</div>
                <div>City: {player.city}</div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
})
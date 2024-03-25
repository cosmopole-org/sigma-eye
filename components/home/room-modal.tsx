import Board from "@/app/page";
import { Modal, ModalBody, ModalContent, ModalHeader, Tab, Tabs } from "@nextui-org/react";
import Icon from "../elements/icon";
import { hookstate, useHookstate } from "@hookstate/core";
import RoomBottomNav from "./room-bottomnav";

export const roomModalView = hookstate(false);

export const switchRoomModal = (v: boolean) => {
    roomModalView.set(v);
}

export default function RoomModal() {
    const modalViewState = useHookstate(roomModalView);
    return (
        <Modal
            placement="bottom"
            size={'full'}
            isOpen={modalViewState.get({noproxy: true})}
            onClose={() => modalViewState.set(false)}
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader>
                            Room 1
                        </ModalHeader>
                        <ModalBody className="overflow-auto">
                            <Board />
                            <RoomBottomNav />
                        </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}
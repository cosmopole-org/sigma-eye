import Board from "@/app/page";
import { Modal, ModalBody, ModalContent, ModalHeader, Tab, Tabs } from "@nextui-org/react";
import Icon from "../elements/icon";
import { hookstate, useHookstate } from "@hookstate/core";

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
                            <Tabs defaultSelectedKey={'board'} color={"primary"} radius="full" aria-label="Tabs colors" fullWidth className="fixed bottom-2 left-2" style={{ width: 'calc(100% - 16px)' }}>
                                <Tab key="board" className="h-13" title={
                                    <div className="items-center">
                                        <Icon name="gallery" size={[20, 20]} />
                                        <span style={{ marginLeft: -8 }} className="text-xs">Board</span>
                                    </div>
                                } />
                                <Tab key="chat" className="h-13" title={
                                    <div className="items-center">
                                        <Icon name="music" size={[20, 20]} />
                                        <span style={{ marginLeft: -1 }} className="text-xs">Chat</span>
                                    </div>
                                } />
                                <Tab key="files" className="h-13" title={
                                    <div className="items-center">
                                        <Icon name="video" size={[20, 20]} />
                                        <span style={{ marginLeft: -11 }} className="text-xs">Files</span>
                                    </div>
                                } />
                            </Tabs>
                        </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}
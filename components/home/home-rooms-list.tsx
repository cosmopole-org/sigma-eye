import { Avatar, Card } from "@nextui-org/react"
import IconButton from "../elements/icon-button"
import { getUsers, randEmoji } from "@/api/offline/constants"
import { switchRoomModal } from "./room-modal"
import { hookstate, useHookstate } from "@hookstate/core"

const roomsListView = hookstate(false);

export const switchRoomsList = (v: boolean) => {
    roomsListView.set(v);
}

export default function HomeRoomsList() {
    const roomsListState = useHookstate(roomsListView);
    return (
        <Card className="fixed top-44 h-full" style={{
            width: 'calc(100% - 78px)', height: 'calc(100% - 176px)', borderRadius: '24px 0px 0px 0px',
            transition: 'right 500ms', right: roomsListState.get({ noproxy: true }) ? 0 : '-100%'
        }}>
            <Card radius="none" className="h-10">
                <div className="flex h-full">
                    <IconButton name="back" size={[20, 20]} onClick={() => roomsListState.set(false)} />
                    <p className="mt-2">
                        Tower rooms
                    </p>
                </div>
            </Card>
            <div
                className={"relative w-full overflow-scroll pl-4 pr-4"}
                style={{ height: 'calc(100% - 40px)' }}
            >
                {getUsers().map(item => (
                    <Card onClick={() => {
                        switchRoomModal(true)
                    }} className="mt-4 m-h-16 w-full bg-transparent" key={item.id} isPressable shadow="none">
                        <div className="flex gap-2 w-full">
                            <div className="flex flex-col">
                                <span className="text-md text-left">{item.emoji} {item.name}</span>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </Card>
    )
}
"use client"

import { Card } from "@nextui-org/react"
import IconButton from "../elements/icon-button"
import { getUsers } from "@/api/offline/constants"
import { hookstate, useHookstate } from "@hookstate/core"
import { useRouter } from "next/navigation"
import { switchMainLoading } from "@/api/offline/states"

export const roomsListView = hookstate(false);
export const switchRoomsList = (v: boolean) => {
    roomsListView.set(v);
}

export default function HomeRoomsList() {
    const roomsListState = useHookstate(roomsListView);
    const router = useRouter();
    return (
        <Card className="fixed top-[172px] overflow-x-hidden" style={{
            width: 'calc(100% - 78px)', height: 'calc(100% - 184px)', borderRadius: '24px 0px 0px 0px', right: 0,
            transition: 'transform 250ms', transform: roomsListState.get({ noproxy: true }) ? 'translateX(0px)' : 'translateX(+100%)'
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
                        switchMainLoading(true);
                        router.push('/api/room/board')
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
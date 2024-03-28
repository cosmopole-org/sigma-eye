"use client"

import { getUsers } from "@/api/offline/constants"
import { Card } from "@nextui-org/react"
import { roomsListView, switchRoomsList } from "./home-rooms-list"
import Icon from "../elements/icon"
import { useTheme } from "next-themes"
import { useHookstate } from "@hookstate/core"
import Image from "next/image"

export default function HomeTowersList() {
    const { theme } = useTheme();
    const roomsListState = useHookstate(roomsListView);
    return (
        <div className="w-full h-auto pl-4 pr-4 pb-20">
            <div className={(roomsListState.get({ noproxy: true }) ? "h-[172px]" : "h-0")} />
            <Card onClick={() => {
                switchRoomsList(true)
            }} className="mt-4 m-h-16 w-full bg-transparent" key={'home'} isPressable shadow="none">
                <div className="flex gap-2 w-full">
                    <Icon iconType="circle" name="home" size={[48, 48]} className="w-[68px] p-1" color={theme === 'light' ? "blue" : "#aaa"} />
                    <div className="flex flex-col relative w-full">
                        <span className="text-lg text-left">Home</span>
                        <span className="text-md text-default-400 text-left">No messsages exist in home...</span>
                        <span className="absolute right-0 top-1 text-sm">
                            yesterday
                        </span>
                        <Icon name="dbl-tick" size={[16, 16]} className="absolute right-0 bottom-1 text-sm" />
                    </div>
                </div>
            </Card>
            {
                getUsers().map((item, index) => (
                    <Card onClick={
                        () => {
                            switchRoomsList(true)
                        }
                    } className="mt-4 m-h-16 w-full bg-transparent" key={item.id} isPressable shadow="none">
                        <div className="flex gap-2 w-full">
                            <Image width={68} height={68} alt={item.name} className="w-[68px] rounded-3xl" src={item.avatar} />
                            <div className="flex flex-col relative w-full">
                                <span className="text-lg text-left">{item.name}</span>
                                <span className="text-md text-default-400 text-left">No messsages exist in home...</span>
                                <span className="absolute right-0 top-1 text-sm">
                                    yesterday
                                </span>
                                <Icon name="dbl-tick" size={[16, 16]} className="absolute right-0 bottom-1 text-sm" />
                            </div>
                        </div>
                    </Card>
                ))
            }
        </div >
    )
}
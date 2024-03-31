"use client"

import { Avatar, Navbar, NavbarContent } from "@nextui-org/react";
import { useHookstate } from "@hookstate/core";
import HomeSearchbar from "../home/home-searchbar";
import IconButton from "../elements/icon-button";
import { selectedRoomSection } from "./room-bottomnav";
import { getUsers } from "@/api/offline/constants";
import { useRouter } from "next/navigation";

export default function RoomNavbar() {
    const router = useRouter();
    const roomSectionState = useHookstate(selectedRoomSection);
    return (
        <Navbar
            shouldHideOnScroll={roomSectionState.get({ noproxy: true }) === 'board'}
            isBordered
            className={roomSectionState.get({ noproxy: true }) === 'board' ? "h-[120px] pb-4" : "h-[64px] pb-1"}
        >
            <NavbarContent as="div" className={"items-center w-full " + (roomSectionState.get({ noproxy: true }) === 'board' ? "h-[120px]" : "h-[64px]")} justify="center">
                <div className={"w-full"}>
                    <div className="flex -ml-1">
                        <IconButton name="back" onClick={() => {
                            router.back();
                        }} />
                        <p className="text-xl flex-1 text-center flex text-center items-center justify-center">
                            <Avatar
                                isBordered
                                src={getUsers()[0].avatar}
                                color={"primary"}
                                name={"Room 1"}
                                size={"sm"}
                            />
                            <span className="ml-3">Room 1</span>
                        </p>
                        <IconButton name="settings" onClick={() => {

                        }} />
                    </div>
                    {
                        roomSectionState.get({ noproxy: true }) === 'board' ? (
                            <HomeSearchbar />
                        ) : null
                    }
                </div>
            </NavbarContent>
        </Navbar >
    )
}

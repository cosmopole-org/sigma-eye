"use client"

import { Avatar, Navbar, NavbarContent } from "@nextui-org/react";
import { useHookstate } from "@hookstate/core";
import HomeSearchbar from "./home-searchbar";
import IconButton from "../elements/icon-button";
import { switchRoomModal } from "./room-modal";
import { selectedRoomSection } from "./room-bottomnav";
import { getUsers } from "@/api/offline/constants";

export default function RoomNavbar() {
    const roomSectionState = useHookstate(selectedRoomSection);
    return (
        <Navbar
            isBordered
            className={roomSectionState.get({ noproxy: true }) === 'board' ? "h-[128px] pb-4" : "h-[120px] pb-4"}
        >
            <NavbarContent as="div" className={"items-center w-full " + (roomSectionState.get({ noproxy: true }) === 'board' ? "h-[128px]" : "h-[120px]")} justify="center">
                <div className={"w-full"}>
                    <div className="flex -ml-1">
                        <IconButton name="back" onClick={() => {
                            switchRoomModal(false);
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
                    <HomeSearchbar />
                </div>
            </NavbarContent>
        </Navbar >
    )
}

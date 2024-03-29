"use client"

import { Navbar, NavbarContent } from "@nextui-org/react";
import { useHookstate } from "@hookstate/core";
import IconButton from "../elements/icon-button";
import { switchRoomModal } from "./room-modal";
import { selectedRoomSection } from "./room-bottomnav";

export default function RoomNavbar() {
    const roomSectionState = useHookstate(selectedRoomSection);
    return (
        <Navbar
            isBordered
            className={roomSectionState.get({ noproxy: true }) === 'board' ? "h-[56px]" : "h-[120px] pb-4"}
        >
            <NavbarContent as="div" className={"items-center w-full " + (roomSectionState.get({ noproxy: true }) === 'board' ? "h-[56px]" : "h-[120px]")} justify="center">
                <div className={"w-full"}>
                    <div className="flex -ml-1">
                        <IconButton name="back" onClick={() => {
                            switchRoomModal(false);
                        }} />
                        <p className="text-xl flex-1 text-center pt-1">
                            Room
                        </p>
                        <IconButton name="settings" onClick={() => {

                        }} />
                    </div>
                </div>
            </NavbarContent>
        </Navbar >
    )
}

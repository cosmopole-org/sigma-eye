import { Navbar, NavbarContent } from "@nextui-org/react";
import { ThemeSwitch } from "../theme-switch";
import { useHookstate } from "@hookstate/core";
import HomeFolders from "./home-folders";
import HomeMenu from "./home-menu";
import HomeSearchbar from "./home-searchbar";
import { roomsListView } from "./home-rooms-list";

export default function HomeNavbar() {
    const roomsListState = useHookstate(roomsListView);
    return (
        <Navbar shouldHideOnScroll={!roomsListState.get({ noproxy: true })} className="pt-8 h-44 pb-12" isBordered>
            <NavbarContent as="div" className="items-center w-full" justify="start">
                <div className="mt-8 w-full">
                    <div className="flex pl-1">
                        <HomeMenu />
                        <p className="text-xl flex-1 text-center">
                            Sigma
                        </p>
                        <ThemeSwitch className="-mt-1" />
                    </div>
                    <HomeSearchbar />
                    <HomeFolders />
                </div>
            </NavbarContent>
        </Navbar >
    )
}
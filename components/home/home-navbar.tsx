import { Navbar, NavbarContent } from "@nextui-org/react";
import { ThemeSwitch } from "../theme-switch";
import { useHookstate } from "@hookstate/core";
import { roomModalView } from "./room-modal";
import HomeFolders from "./home-folders";
import HomeMenu from "./home-menu";
import HomeSearchbar from "./home-searchbar";

export default function HomeNavbar() {
    const roomModalState = useHookstate(roomModalView);
    return (
        <Navbar shouldHideOnScroll={!roomModalState.get({ noproxy: true })} className="pt-8 h-44 pb-12" isBordered>
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
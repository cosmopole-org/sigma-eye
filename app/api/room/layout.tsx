"use client"

import { setHomeCityScrollPos, setHomePeopleScrollPos, setHomeSettingsScrollPos } from "@/api/offline/backup";
import RoomBottomNav, { selectedRoomSection } from "@/components/home/room-bottomnav";
import { useHookstate } from "@hookstate/core";
import { Card, CircularProgress } from "@nextui-org/react";
import { useEffect } from "react";
import City from "../home/city/page";
import HomeBottomNav from "@/components/home/home-bottomnav";
import { roomSliderView, showRoomLoading } from '../../../api/offline/states';

export default function RoomLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const roomSectionState = useHookstate(selectedRoomSection);
	const showLoadingState = useHookstate(showRoomLoading);
	const open = useHookstate(roomSliderView);
	useEffect(() => {
		const scroller = () => {
			switch (roomSectionState.get({ noproxy: true })) {
				case 'board': {
					setHomePeopleScrollPos(document.documentElement.scrollTop);
					break;
				}
				case 'chat': {
					setHomeCityScrollPos(document.documentElement.scrollTop);
					break;
				}
				case 'files': {
					setHomeSettingsScrollPos(document.documentElement.scrollTop);
					break;
				}
			}
		}
		if (typeof window !== 'undefined') {
			window.addEventListener('scroll', scroller);
		}
		open.set(true);
		return () => {
			if (typeof window !== 'undefined') {
				window.removeEventListener('scroll', scroller);
			}
		}
	}, []);
	let wWidth = 0;
	if (typeof window !== 'undefined') {
		wWidth = window.innerWidth;
	}
	return (
		<div className="relative flex flex-col h-screen overflow-hidden">
			<div className="w-full h-full fixed top-0 left-0">
				<City />
				<HomeBottomNav />
			</div>
			<main className="w-full h-full relative" style={{ transition: 'transform 250ms', transform: open.get({ noproxy: true }) ? 'translateX(0px)' : `translateX(${wWidth - 1}px)` }}>
				{children}
				{
					showLoadingState.get({ noproxy: true }) ? (
						<Card shadow="none" radius="none" className="w-full h-full fixed left-0 top-0" style={{ zIndex: 99 }}>
							<Card className="w-24 h-24 fixed left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 items-center justify-center">
								<CircularProgress />
							</Card>
						</Card>
					) : null
				}
				<RoomBottomNav />
			</main>
		</div>
	);
}

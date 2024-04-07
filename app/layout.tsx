'use client'

import "@/styles/globals.css";
import { fontSans } from "@/config/fonts";
import { Providers } from "./providers";
import clsx from "clsx";
import { useHookstate } from "@hookstate/core";
import { Card, CircularProgress } from "@nextui-org/react";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { showMainLoading, switchLoading, switchMainLoading, switchRoomLoading } from "../api/offline/states";
import { getUsers, loadSizes } from "@/api/offline/constants";
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCreative } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-creative';
import { switchHomeNav } from "@/components/home/home-navbar";
import { switchRoomNav } from "@/components/room/room-navbar";

let dynamicPath = '';

let oldPath = '';
let oldScroll = 0;
let swiperInst: any = null;
export const enableSwiper = () => {
	if (swiperInst) {
		swiperInst.enable();
	}
}
export const disableSwiper = () => {
	if (swiperInst) {
		swiperInst.disable();
	}
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const path = usePathname();
	dynamicPath = path;
	const scrollPositions = useRef<{ [url: string]: number }>({})
	loadSizes();
	const contentRef = useRef<HTMLDivElement>(null);
	useEffect(() => {
		const scroller = () => {
			if (contentRef.current) {
				console.log(dynamicPath, contentRef.current.scrollTop);
				if (dynamicPath.startsWith('/api/home')) {
					if (oldScroll > contentRef.current.scrollTop) {
						switchHomeNav(true)
					} else if (oldScroll < contentRef.current.scrollTop) {
						switchHomeNav(false);
					}
				} else if (dynamicPath.startsWith('/api/room')) {
					if (oldScroll > contentRef.current.scrollTop) {
						switchRoomNav(true)
					} else if (oldScroll < contentRef.current.scrollTop) {
						switchRoomNav(false);
					}
				}
				oldScroll = contentRef.current.scrollTop;
			}
		}
		contentRef.current?.addEventListener('scroll', scroller);
		return () => {
			contentRef.current?.removeEventListener('scroll', scroller);
		}
	}, [])
	useEffect(() => {
		if (contentRef.current) {
			if (oldPath !== dynamicPath) {
				scrollPositions.current[oldPath] = oldScroll;
				oldPath = dynamicPath
				oldScroll = 0
			}
			contentRef.current.scroll({
				top: scrollPositions.current[dynamicPath],
				behavior: "auto",
			})
		}
		switchLoading(false);
		switchRoomLoading(false);
		switchMainLoading(false);
		if (dynamicPath.startsWith("/api/home")) {
			switchHomeNav(true);
		} else if (dynamicPath.startsWith("/api/room")) {
			switchRoomNav(true);
		}
	}, [path])
	const showLoadingState = useHookstate(showMainLoading);
	return (
		<html lang="en" suppressHydrationWarning>
			<head />
			<body
				className={clsx(
					"bg-background font-sans antialiased",
					fontSans.variable
				)}
			>
				<Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
					<div className="relative flex flex-col h-full">
						<main className="w-full h-full">
							<Swiper
								onInit={(swiper: any) => {
									swiperInst = swiper
								}}
								grabCursor={true}
								effect={'creative'}
								creativeEffect={{
									prev: {
										shadow: true,
										translate: [0, 0, -100],
									},
									next: {
										translate: ['100%', 0, 0],
									},
								}}
								modules={[EffectCreative]}
								className="h-full w-full"
							>
								<SwiperSlide className="w-full h-full"><div ref={contentRef} className="w-full h-full overflow-x-hidden overflow-y-auto">{children}</div></SwiperSlide>
								<SwiperSlide className="w-full h-full" style={{ backdropFilter: 'blur(10px)' }}>
									<div className="grid grid-cols-2 w-full h-full overflow-auto p-4 gap-2">
										{getUsers().map(i => (
											<Card key={i.id} className="w-full h-48 bg-s-black/80">

											</Card>
										))}
									</div>
								</SwiperSlide>
							</Swiper>
							{
								showLoadingState.get({ noproxy: true }) ? (
									<Card isBlurred shadow="none" radius="none" className="w-full h-full fixed left-0 top-0 bg-transparent" style={{ zIndex: 100 }}>
										<Card className="w-24 h-24 fixed left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 items-center justify-center">
											<CircularProgress />
										</Card>
									</Card>
								) : null
							}
						</main>
					</div>
				</Providers>
			</body>
		</html>
	);
}

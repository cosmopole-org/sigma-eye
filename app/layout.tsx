'use client'

import "@/styles/globals.css";
import { fontSans } from "@/config/fonts";
import { Providers } from "./providers";
import clsx from "clsx";
import { hookstate, useHookstate } from "@hookstate/core";
import { Card, CircularProgress } from "@nextui-org/react";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { switchLoading } from "./api/home/layout";
import { getHomeCityScrollPos, getHomePeopleScrollPos, getHomeSettingsScrollPos, getRoomBoardScrollPos } from "@/api/offline/backup";
import { switchRoomLoading } from "./api/room/layout";

const showMainLoading = hookstate(false);
export const switchMainLoading = (v: boolean) => {
	showMainLoading.set(v);
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const path = usePathname();
	useEffect(() => {
		switch (path) {
			case '/api/home/people': {
				document.documentElement.scrollTop = getHomePeopleScrollPos();
				break;
			}
			case '/api/home/city': {
				document.documentElement.scrollTop = getHomeCityScrollPos();
				break;
			}
			case '/api/home/settings': {
				document.documentElement.scrollTop = getHomeSettingsScrollPos();
				break;
			}
			case '/api/room/board': {
				document.documentElement.scrollTop = getRoomBoardScrollPos();
				break;
			}
		}
		switchLoading(false);
		switchRoomLoading(false);
		switchMainLoading(false);
	}, [path])
	const showLoadingState = useHookstate(showMainLoading);
	return (
		<html lang="en" suppressHydrationWarning>
			<head />
			<body
				className={clsx(
					"min-h-screen bg-background font-sans antialiased",
					fontSans.variable
				)}
			>
				<Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
					<div className="relative flex flex-col h-screen">
						<main className="w-full h-full">
							{children}
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

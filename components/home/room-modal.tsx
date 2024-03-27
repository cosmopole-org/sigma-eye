import Board from "@/app/page";
import { Card, Image } from "@nextui-org/react";
import { hookstate } from "@hookstate/core";
import IconButton from "../elements/icon-button";
import { useRouter } from "next/navigation";
import { swtichRoomSlider } from "@/app/api/room/layout";

export const roomModalView = hookstate(false);

export const switchRoomModal = (v: boolean) => {
    roomModalView.set(v);
}

export default function RoomModal() {
    const router = useRouter();
    return (
        <Card
            radius="none"
            className={"w-full h-full absolute right-0 top-0"} style={{ zIndex: 100 }}
        >
            <div className="overflow-auto relative w-full h-full" style={{ overscrollBehavior: 'contain' }}>
                <div className="relative" style={{ minHeight: 270 }}>
                    <Image radius="none" alt={'room-header'} width={window.innerWidth} height={300} src={'/images/photos/header.jpg'} className="relative" style={{ zIndex: 0 }} />
                    <Card isBlurred className="rounded-full w-auto h-auto flex absolute left-2 top-2">
                        <IconButton name="back" onClick={() => {
                            swtichRoomSlider(false);
                            setTimeout(() => {
                                router.push('/api/home/city');
                            }, 250);
                        }} />
                    </Card>
                    <Card isBlurred className="rounded-full m-auto -mt-44 w-32 h-32">

                    </Card>
                </div>
                <Card className="w-full h-auto p-2 -mt-6" style={{ minHeight: 1000, borderRadius: '24px 24px 0px 0px' }}>
                    <Board />
                </Card>
            </div>
        </Card>
    )
}
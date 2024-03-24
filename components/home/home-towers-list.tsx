import { getUsers } from "@/api/offline/constants"
import { Avatar, Card } from "@nextui-org/react"
import { switchRoomsList } from "./home-rooms-list"

export default function HomeTowersList() {
    return (
        <div>
            {
                getUsers().map(item => (
                    <Card onClick={() => {
                        switchRoomsList(true)
                    }} className="mt-4 m-h-16 w-full bg-transparent" key={item.id} isPressable shadow="none">
                        <div className="flex gap-2 w-full">
                            <Avatar alt={item.name} className="" size="lg" src={item.avatar} />
                            <div className="flex flex-col">
                                <span className="text-lg text-left">{item.name}</span>
                                <span className="text-md text-default-400 text-left">{item.email}</span>
                            </div>
                        </div>
                    </Card>
                ))
            }
        </div>
    )
}

import { Card, Chip, Divider } from "@nextui-org/react";
import IconButton from "../elements/icon-button";

export default function ProjectCard() {
    return (
        <Card className="rounded-xl relative w-full h-52" isPressable>
            <IconButton className="absolute right-2 top-1" name="more-horiz" />
            <p className="text-left ml-6 mr-6 mt-10 w-[calc(100% - 48px)]">Automatically research medicine</p>
            <div className="gap-1 w-[calc(100% - 48px)] mb-8 ml-6 mr-6 mt-4 flex flex-wrap">
                <Chip size="sm">ux design</Chip>
                <Chip size="sm">design process</Chip>
            </div>
            <Divider className="absolute left-0 bottom-10 w-full" />
            <div className='w-[calc(100% - 32px)] absolute left-4 bottom-0 flex'>
                <IconButton name="code" size={[18, 18]} color={'#999'} />
                <IconButton name="file-data" size={[18, 18]} color={'#999'} />
                <IconButton name="file-search" size={[18, 18]} color={'#999'} />
            </div>
        </Card >
    )
}
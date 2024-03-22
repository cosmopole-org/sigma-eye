"use client"

import * as React from 'react';
import FilestList from './files-list';
import { Button, Card, Divider, Input } from '@nextui-org/react';
import IconButton from '../elements/icon-button';

export type BotPanelMode = 'create' | 'edit'
export default function KnowledgePanel({ className }: Readonly<{ className?: string }>) {
    return (
        <Card className={'relative w-full pt-4 pb-4 pl-8 pr-8 rounded-2xl ' + (className ?? "")}>
            <p className='mt-4'>
                Create or select knowledge piece
            </p>
            <div className='w-full h-[225px] mt-8 text-center rounded-3xl' style={{
                backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='24' ry='24' stroke='%23999999FF' stroke-width='3' stroke-dasharray='6%2c 14' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")`
            }}>
                <IconButton className='mt-8' name='upload' />
                <p className='mt-6'>
                    Drag & Drop or <span className='text-link'>Choose file</span> to upload
                </p>
                <p className='mt-6 text-default-400'>
                    PDF
                </p>
            </div>
            <Input placeholder='Please put the name of your memory piece' className='w-[calc(100% - 32px)] h-full mt-6' />
            <div className='w-full h-auto text-right mt-8 mb-8'>
                <Button className='pl-8 pr-8 h-14'>
                    Save Knowledge
                </Button>
            </div>
            <Divider />
            <Card shadow='none' className='text-passive text-center absolute left-2/4 top-[486px] pl-4 pr-4 -translate-x-2/4'>
                Existing Knowledge
            </Card>
            <Input placeholder='Search for existing knowledge' className='w-[calc(100% - 32px)] h-full mt-8' />
            <FilestList className='mt-4' />
        </Card >
    );
}

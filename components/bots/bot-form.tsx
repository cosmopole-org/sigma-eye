"use client"

import { Card, Divider, Input } from '@nextui-org/react';
import * as React from 'react';

export default function BotForm({ className }: Readonly<{ className?: string }>) {
    return (
        <Card className={'relative w-full pt-4 pb-4 pl-8 pr-8 rounded-2xl ' + (className ?? "")}>
            <p className='text-4xl mt-8 mb-6'>
                Bot Customization
            </p>
            <Divider />
            <p className='text-4xl mt-9'>
                Bot Info
            </p>
            <Input label={'Bot Title'} className='mt-6' fullWidth />
            <Input label={'Bot Description'} className='mt-6' fullWidth />
            <Input label={'Bot Favicon'} className='mt-6' fullWidth />
            <Input label={'Bot Icon (url)'} className='mt-6' fullWidth />
            <p className='text-4xl mt-9'>
                Font Style
            </p>
            <Input label={'Button Font Family'} className='mt-6' fullWidth />
            <Input label={'Button Font Weight'} className='mt-6 mb-8' fullWidth />
        </Card>
    );
}


import * as React from 'react';
import FilestList from '../knowledge/files-list';
import { Button, Card, Divider, Input } from '@nextui-org/react';

export type AppPanelMode = 'create' | 'update'
export default function AppPanel({ style, mode }: Readonly<{ style?: any, mode?: AppPanelMode }>) {
    return (
        <Card className='relative w-full pt-4 pb-4 pl-8 pr-8 rounded-2xl'>
            <p className='mt-4'>
                {mode == 'create' ? 'Create/' : ''}Edit Your App
            </p>
            <Input placeholder='App Name' className='w-[calc(100% - 32px)] h-full rounded-2xl mb-12 mt-6' />
            <Divider />
            {mode == 'create' ? (
                <Card className='text-default-400 text-center absolute left-2/4 top-[156px] pl-4 pr-4 -translate-x-1/2 mt-0' shadow='none'>
                    Selected Knowledge
                </Card>
            ) : (
                <Card className='text-default-400 text-center absolute left-2/4 top-[156px] pl-4 pr-4 -translate-x-1/2 mt-0' shadow='none'>
                    Selected Files
                </Card>
            )}
            {mode == 'create' ? null : (
                <Button className='w-full h-14 rounded-2xl mt-10'>
                    Edit the bot
                </Button>
            )}
            <FilestList className='mt-4' />
            {
                mode == 'create' ? (
                    <p className='mt-4 text-center text-link'>
                        <u>To modify the Knowledge list please go to the previous step</u>
                    </p>
                ) : null
            }
            {
                mode == 'create' ? (
                    <div className='w-full h-auto text-right'>
                        <Button className='pl-8 pr-8 h-14 rounded-2xl mt-10'>
                            Create App
                        </Button>
                    </div>
                ) : null
            }
        </Card>
    );
}

'use client'

import { Avatar, Card, CardFooter, Divider } from '@nextui-org/react';
import * as React from 'react';
import IconButton from '../elements/icon-button';
import { useTheme } from 'next-themes';

export default function View() {
    const { theme } = useTheme()
    return (
        <Card className='border-solid border-4 overflow-hidden w-96 h-[80%] mt-4 ml-4 rounded-3xl' style={{ borderColor: theme === 'light' ? '#888' : '#666' }}>
            <div className='flex w-full h-20 p-4'>
                <Avatar name='Asqme' size='lg' />
                <div className='ml-2 mt-1'>
                    <p className='-mb-6'>
                        Asqme
                    </p>
                    <br />
                    <p>
                        Ask me Aspirin who
                    </p>
                </div>
            </div>
            <Divider />
            <div className='mb-auto w-full'>
                <Card className='p-4 bg-message w-9/12 h-auto ml-4 mt-8' style={{ borderRadius: '0px 28px 28px 28px', color: '#000' }}>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                </Card>
            </div>
            <Divider />
            <CardFooter className='max-h-12 w-full p-4'>
                <p className='text-passive'>
                    Message here...
                </p>
                <div className='flex-1' />
                <IconButton name="addicon" className="bg-transparent" />
                <IconButton name="addicon" className="bg-transparent" />
            </CardFooter>
        </Card>
    );
}

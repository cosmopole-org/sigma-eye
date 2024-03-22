
import { Card } from '@nextui-org/react';
import * as React from 'react';

export default function Banner(props: Readonly<{ primaryText: string, primaryNextText?: string, secondaryText?: string }>) {
    const { primaryText, primaryNextText, secondaryText } = props
    return (
        <Card className='w-full h-auto pt-8 pb-8 rounded-2xl'>
            <div className='justify-center w-full flex'>
                <p className='text-7xl w-auto justify-center'>
                    {primaryText}
                </p>
                <p className='w-auto justify-center mt-11 font-bold'>
                    {primaryNextText ?? null}
                </p>
            </div>
            <p className='w-full text-center mt-4'>
                {secondaryText ?? null}
            </p>
        </Card>
    );
}

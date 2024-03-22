"use client"

import * as React from 'react';
import { Listbox, ListboxItem } from '@nextui-org/react';
import Icon from '../elements/icon';

export default function FilestList({ className }: Readonly<{ className?: string }>) {
    return (
        <Listbox selectionMode="multiple" className={'w-full ' + (className ?? "")}>
            {[0, 1, 2].map((value) => (
                <ListboxItem key={value} startContent={<Icon name='pdf' />}>
                    <div className="flex flex-col ml-4">
                        <span className="text-base">Document file</span>
                        <span className="text-sm text-default-400">PDF file</span>
                    </div>
                </ListboxItem>
            ))}
        </Listbox>
    );
}

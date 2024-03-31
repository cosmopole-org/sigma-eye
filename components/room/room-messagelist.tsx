'use client'

import TextMessage from "./message/text";
import React from 'react';
import { List, AutoSizer, CellMeasurer, CellMeasurerCache } from 'react-virtualized';

const rowCount = 20;

const list = Array.from(Array(rowCount).keys()).map((val, idx) => {
    return {
        id: idx,
        name: 'John Doe',
        image: 'http://via.placeholder.com/40',
        text: 'dfgdgfdgdfgdfgdgf4ybryrbynrtnybrtbrstbbsetdbtbtst.'
    }
});


const cache = new CellMeasurerCache({
    fixedWidth: true,
    defaultHeight: 100
});

function renderRow({ index, key, style, parent }: { index: number, key: any, style: any, parent: any }) {
    return (
        <CellMeasurer
            key={key}
            cache={cache}
            parent={parent}
            columnIndex={0}
            rowIndex={index}>
            {({ registerChild, measure }: any) => (
                <div style={style} ref={registerChild}>
                    <TextMessage key={index} rightSide={index % 2 === 0} />
                </div>
            )}
        </CellMeasurer>
    );
}

export default function MessageList() {
    return (
            <div className="h-full">
                <AutoSizer>
                    {
                        ({ width, height }: any) => (
                            <List
                                width={width}
                                height={height}
                                deferredMeasurementCache={cache}
                                rowHeight={cache.rowHeight}
                                rowRenderer={renderRow}
                                rowCount={list.length}
                                overscanRowCount={3}
                                className={'px-2 pb-36'}
                            />
                        )
                    }
                </AutoSizer>
            </div>
    );
}

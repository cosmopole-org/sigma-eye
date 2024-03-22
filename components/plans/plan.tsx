
export default function Plan({ name, price, chatsPerMonth, nextChatsPerMonth }: Readonly<{ name: string, price?: number, chatsPerMonth?: number, nextChatsPerMonth?: number }>) {
    return price ? (
        <div className="w-full h-full p-12">
            <div style={{ width: '100%', height: '100%', }}>
                <p style={{ marginTop: 8 }}>
                    {name}
                </p>
                <p style={{ marginTop: 8, marginLeft: -16, textAlign: 'center' }}>
                    <span style={{ marginRight: 8 }}>$</span>
                    <span style={{ fontSize: 24, fontWeight: 'bold' }}>{price}</span>
                </p>
                <p style={{ marginTop: 16, fontSize: 13 }}>
                    {chatsPerMonth} chats / month
                </p>
                <p style={{ marginTop: 4, fontSize: 13 }}>
                    then ${nextChatsPerMonth} / 100 message
                </p>
            </div>
        </div>
    ) : (
        <div style={{ width: '100%', height: '100%', padding: 48 }}>
            <p style={{ marginTop: 8 }}>
                {name}
            </p>
            <p style={{ marginTop: 16, fontSize: 13 }}>
                Individual contract with included custom bot building process
            </p>
            <p style={{ color: 'blue', marginTop: 16 }}>
                <u>Contact Us</u>
            </p>
        </div>
    )
}

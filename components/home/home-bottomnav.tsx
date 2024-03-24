import { Tab, Tabs } from "@nextui-org/react";
import Icon from "../elements/icon";

export default function HomeBottomNav() {
    return (
        <Tabs defaultSelectedKey={'city'} color={"primary"} radius="full" aria-label="Tabs colors" fullWidth className="fixed bottom-2 left-2" style={{ width: 'calc(100% - 16px)' }}>
            <Tab key="people" className="h-13" title={
                <div className="items-center">
                    <Icon name="gallery" size={[20, 20]} />
                    <span style={{ marginLeft: -8 }} className="text-xs">People</span>
                </div>
            } />
            <Tab key="city" className="h-13" title={
                <div className="items-center">
                    <Icon name="music" size={[20, 20]} />
                    <span style={{ marginLeft: -1 }} className="text-xs">City</span>
                </div>
            } />
            <Tab key="settings" className="h-13" title={
                <div className="items-center">
                    <Icon name="video" size={[20, 20]} />
                    <span style={{ marginLeft: -11 }} className="text-xs">Settings</span>
                </div>
            } />
        </Tabs>
    )
}

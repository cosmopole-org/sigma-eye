
import View from "./view";
import IconButton from "../elements/icon-button";

export default function Emulator() {
    return (
        <div className="w-[27.5rem] h-full fixed right-0 pt-8">
            <div className="w-96 h-auto ml-4 mt-2 mb-2 flex">
                <p className="flex-1">
                    https://smart.asqme.ai/...
                </p>
                <IconButton name="addicon" className="bg-transparent -mt-2" />
            </div>
            <View />
        </div>
    )
}
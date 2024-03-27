import HomeFolders from "@/components/home/home-folders";
import HomeTowersList from "@/components/home/home-towers-list";
import HomeRoomsList from "@/components/home/home-rooms-list";
import HomeNavbar from "@/components/home/home-navbar";

export default function City() {
    return (
        <div className="w-full relative">
            <HomeNavbar />
            <HomeTowersList />
            <HomeRoomsList />
            <HomeFolders secondary />
        </div>
    );
}

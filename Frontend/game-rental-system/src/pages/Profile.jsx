import Navbar from "../components/Navbar";

export default function Profile() {
    return (
        <>
            <Navbar/>
            <h1 className="flex items-center justify-center text-3xl mt-4">My Profile</h1>
            <div className="flex flex-col items-center justify-center gap-4 mt-4 w-full h-dvh p-4">
                <img src="/path/to/profile-pic.jpg" alt="Profile Picture" className="rounded-full w-32 h-32" />
                <h2 className="text-2xl">John Doe</h2>
                <p className="text-lg">john.doe@example.com</p>
            </div>
        </>
    )
}
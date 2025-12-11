import { serverFetch } from "@/lib/server-fetch";
import Image from "next/image";

const MyProfilePage = async() => {
  // Simulate fetching user data
//  const user = await serverFetch.get("get-me", );
  return (
    <div className="flex flex-col items-center p-6">
      {/* <Image
        src={user.profilePhoto}
        alt="Profile"
        width={96}
        height={96}
        className="rounded-full border border-gray-300 object-cover"
      />

      <h2 className="text-xl font-bold mt-4">{user.email}</h2>
      <p className="text-gray-500 text-sm">{user.role}</p> */}
    </div>
  );
};

export default MyProfilePage;
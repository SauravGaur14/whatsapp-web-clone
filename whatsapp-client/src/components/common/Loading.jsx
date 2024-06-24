import { BiSolidLockAlt } from "react-icons/bi";

export default function Loading() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-y-5 bg-dropdown-background">
      <img src="/whatsapp.svg" className="animate-pulse" alt="" height={100} width={100} />
      <div className="text-xl flex items-center justify-center gap-2 text-primary-strong">
        <BiSolidLockAlt/>
        <span>Your chats are end to end encrypted</span>
      </div>
    </div>
  );
}

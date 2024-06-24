import { HiLockClosed } from "react-icons/hi";

export default function Empty() {
  return (
    <div className="flex h-[100vh] w-full flex-col items-center justify-center gap-5 border-l border-conversation-border  border-b-icon-green bg-panel-header-background p-5">
      <img
        src="/wa-desktop-home.png"
        alt="wa-desktop"
        height={300}
        width={300}
      />
      <div className="mt-6 flex flex-col items-center justify-center gap-5">
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="text-wrap text-3xl font-light text-primary-strong">
            Download WhatsApp for Windows
          </h1>
          <div className="max-w-[560px] text-center text-sm text-icon-lighter">
            Make calls, share your screen and get a faster experience when you
            download the Windows app.
          </div>
        </div>
        <button className="w-max rounded-3xl bg-icon-green px-6 py-[10px] text-sm font-medium text-search-input-container-background">
          Get from Microsoft Store
        </button>
      </div>
      <div className="mt-9 flex items-center justify-center gap-3 text-sm text-[#667781]">
        <HiLockClosed className="" />
        <div className="">Your personal messages are end-to-end encrypted</div>
      </div>
    </div>
  );
}

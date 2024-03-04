import { useStateProvider } from "../context/StateContext";

export default function Onboarding() {
  const [{ userInfo }] = useStateProvider();
  return (
    <div className="bg-panel-header-background h-screen w-screen text-white flex flex-col items-center justify-center">
      <div className="flex items-center justify-center gap-2">
        <img src="whatsapp.gif" alt="whatsapp" height={300} width={300} />
        <span className="text-7xl">Whatsapp</span>
      </div>
      <h2 className="text-2xl">Welcome to Whatsapp</h2>
      <h2 className="text-2xl mt-6">Create your profile</h2>
      <div className="flex gap-6 mt-6">
        <div className="flex flex-col items-center justify-center mt-5 gap-6">
          {userInfo.name}
        </div>
      </div>
    </div>
  );
}

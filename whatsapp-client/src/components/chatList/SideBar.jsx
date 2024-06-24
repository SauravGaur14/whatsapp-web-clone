import Header from "./ChatListHeader";
import SearchBar from "./SearchBar";
import ChatList from "./ChatList";

export default function SideBar() {
  return (
    <div className="h-full overflow-hidden">
      <Header />
      <SearchBar />
      <ChatList />
    </div>
  );
}

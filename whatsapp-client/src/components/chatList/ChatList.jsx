import { useEffect, useState } from "react";
import ChatListItem from "./ChatListItem";
import axios from "axios";
import { GET_ALL_CONTACTS } from "../../utils/Api_routes";
import { setContacts } from "../../state/userSlice";
import { useDispatch, useSelector } from "react-redux";
export default function ChatList() {
  const [filteredContacts, setFilteredContacts] = useState([]);
  const { contacts, searchInput, isSearching } = useSelector(
    (store) => store.user,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    async function getContacts() {
      const { data } = await axios.get(GET_ALL_CONTACTS);
      dispatch(setContacts(data.users));
    }
    getContacts();
  }, [dispatch]);

  useEffect(() => {
    if (isSearching && searchInput.length > 0) {
      setFilteredContacts(
        contacts.filter((contact) =>
          contact.name.toLowerCase().includes(searchInput.toLowerCase()),
        ),
      );
    } else setFilteredContacts([...contacts]);
  }, [contacts, isSearching, searchInput]);

  return (
    <div className="custom-scrollbar h-full overflow-y-scroll pb-32">
      {filteredContacts.map((contact) => (
        <ChatListItem user={contact} key={contact._id} />
      ))}
    </div>
  );
}

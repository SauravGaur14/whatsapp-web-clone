import { useEffect, useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { useDispatch } from "react-redux";
import { setIsSearching, setSearchInput } from "../../state/userSlice";

export default function SearchBar() {
  const [searchInputValue, setSearchInputValue] = useState("");
  const dispatch = useDispatch();
  function searchHandler(e) {
    const value = e.target.value;
    setSearchInputValue(value);
    dispatch(setSearchInput(value));
    dispatch(setIsSearching(value.length > 0)); 
  }

  useEffect(() => {
    if (searchInputValue.length) dispatch(setIsSearching(true));
    else dispatch(setIsSearching(false));
  }, [dispatch, searchInputValue]);
  return (
    <div className="mx-auto mt-2 flex w-[95%] items-center gap-x-4 rounded-lg bg-panel-header-background p-3">
      <IoMdSearch className="text-panel-header-icon" size={25} />
      <input
        type="text"
        id="searchContact"
        className="bg-transparent focus:outline-none"
        placeholder="Search"
        value={searchInputValue}
        onChange={searchHandler}
      />
    </div>
  );
}

import style from "./SearchBar.module.scss";

export const SearchBar = ({ searchText, setSearchText }) => {

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  }

  return (
    <input
      className={style.input}
      value={searchText}
      onChange={handleSearch}
      placeholder="Search meals"
    />
  );
};

import { useCallback, useEffect, useState } from "react";
import { useLocationStore, useMemoStore, useShortcutStore } from "../store/module";
import Icon from "./Icon";
import SearchBar from "./SearchBar";
import { toggleSidebar } from "./Sidebar";
import "../less/memos-header.less";

let prevRequestTimestamp = Date.now();

const MemosHeader = () => {
  const locationStore = useLocationStore();
  const memoStore = useMemoStore();
  const shortcutStore = useShortcutStore();
  const query = locationStore.state.query;
  const shortcuts = shortcutStore.state.shortcuts;
  const [titleText, setTitleText] = useState("MEMOS");

  useEffect(() => {
    if (!query?.shortcutId) {
      setTitleText("MEMOS");
      return;
    }

    const shortcut = shortcutStore.getShortcutById(query?.shortcutId);
    if (shortcut) {
      setTitleText(shortcut.title);
    }
  }, [query, shortcuts]);

  const handleTitleTextClick = useCallback(() => {
    const now = Date.now();
    if (now - prevRequestTimestamp > 1 * 1000) {
      prevRequestTimestamp = now;
      memoStore.fetchMemos().catch(() => {
        // do nth
      });
    }
  }, []);

  return (
    <div className="memos-header-container">
      <div className="title-container">
        <div className="action-btn" onClick={() => toggleSidebar(true)}>
          <Icon.Menu className="icon-img" />
        </div>
        <span className="title-text" onClick={handleTitleTextClick}>
          {titleText}
        </span>
      </div>
      <SearchBar />
    </div>
  );
};

export default MemosHeader;

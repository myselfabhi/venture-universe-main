"use client";

import { useEffect, useState } from "react";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { motion } from "motion/react";
import {
  isBookmarked,
  toggleBookmark,
  subscribeBookmarks,
} from "../lib/bookmarks";

const BookmarkButton = ({ item, className = "" }) => {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSaved(isBookmarked(item.id));
    return subscribeBookmarks(() => setSaved(isBookmarked(item.id)));
  }, [item.id]);

  const handle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleBookmark(item);
  };

  return (
    <motion.button
      onClick={handle}
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.05 }}
      aria-label={saved ? "Remove bookmark" : "Save for later"}
      aria-pressed={saved}
      className={`p-2 rounded-full vu-glass hover:bg-white/15 transition ${className}`}
    >
      {saved ? (
        <BookmarkCheck className="w-4 h-4 text-aqua" />
      ) : (
        <Bookmark className="w-4 h-4 text-white/80" />
      )}
    </motion.button>
  );
};

export default BookmarkButton;

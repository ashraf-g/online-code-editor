import React from "react";

const Footer = () => {
  return (
    <div className="fixed-bottom h-8 bottom-0 px-2 py-1 flex items-center justify-center w-full text-xs text-black-500 ">
      <span>
        Created By{" "}
        <a
          href="https://www.linkedin.com/in/huma-mokashi-217a98280/"
          target="__blank" //This will open the linked page on the next pg it will not show on the same pg
          className="hover:bg-red-500 hover:text-black font-bold"
        >
          Huma Mokashi{" "}
        </a>
        And{" "}
        <a
          href="https://in.linkedin.com/in/gulam-ashraf-99633227b/"
          target="__blank"
          className="hover:bg-red-500 hover:text-black font-bold"
        >
          Gulam Ashraf{" "}
        </a>
      </span>
    </div>
  );
};

export default Footer;

import React from 'react';

export default function Footer() {
  return (
    <footer
      className="fixed bottom-0 w-full bg-neutral-200 text-center dark:bg-neutral-700 lg:text-left">
      <div className="p-4 text-center text-neutral-700 dark:text-neutral-200">
        © 2024 Copyright
        <br/>
        <a
          className="text-neutral-800 dark:text-neutral-400"
          href="https://github.com/amannnnnyyyy/"
        >Aman Moha</a>
      </div>
    </footer>
  );
}
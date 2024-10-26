import { FC } from "react";
import Link from "next/link";

const Footer: FC = () => {
  return (
    <footer className="flex flex-col items-center justify-center w-full py-4 border-t bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-500 dark:text-gray-400">
      <div className="text-sm">
        <span>
          © {new Date().getFullYear()}{" "}
          <Link
            href="https://github.com/amirahnasihah"
            target="_blank"
            className="underline hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
          >
            amirahnasihah
          </Link>
        </span>
      </div>
      <Link
        href="https://github.com/amirahnasihah/simple-todo"
        target="_blank"
        className="underline hover:text-gray-800 dark:hover:text-gray-200 transition-colors text-sm mt-1"
      >
        View Project on GitHub
      </Link>
    </footer>
  );
};

export default Footer;

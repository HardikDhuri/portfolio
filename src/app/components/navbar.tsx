"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const menuVariants = {
  hidden: {
    opacity: 0,
    y: -20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
};

interface MenuItemProps {
  href: string;
  label: string;
  strong?: boolean;
  onClick: () => void;
}

const menuItems: MenuItemProps[] = [
  { href: "/", label: "About", onClick: () => {} },
  { href: "/experience", label: "Experience", onClick: () => {} },
  { href: "/projects", label: "Projects", onClick: () => {} },
  { href: "/articles", label: "Articles", onClick: () => {} },
  { href: "/connect", label: "Contact Me", strong: true, onClick: () => {} },
];

const MenuItem: React.FC<MenuItemProps> = ({
  href,
  label,
  strong,
  onClick,
}) => (
  <motion.li variants={itemVariants}>
    <Link href={href} onClick={onClick}>
      {strong ? <strong>{label}</strong> : label}
    </Link>
  </motion.li>
);

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav className="navbar bg-base-200 p-4 w-full z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link className="text-3xl font-bold" href="/">
          Hardik Dhuri
        </Link>
        <div className="lg:hidden">
          <button
            className="text-xl focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            ☰
          </button>
        </div>
        <div className="hidden lg:flex space-x-6">
          <ul className="menu menu-horizontal text-xl">
            {menuItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>
                  {item.strong ? <strong>{item.label}</strong> : item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={menuVariants}
            className="fixed top-0 left-0 w-full h-full bg-base-200 z-50"
          >
            <motion.ul className="menu menu-vertical text-xl p-4">
              {menuItems.map((item) => (
                <MenuItem key={item.href} {...item} onClick={toggleMenu} />
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

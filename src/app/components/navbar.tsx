'use client'
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
    { href: '#about', label: 'About', onClick: () => {} },
    { href: '#experience', label: 'Experience', onClick: () => {} },
    { href: '#projects', label: 'Projects', onClick: () => {} },
    { href: '#articles', label: 'Articles', onClick: () => {} },
    { href: '#contact', label: 'Contact Me', strong: true, onClick: () => {} },
];

const MenuItem: React.FC<MenuItemProps> = ({ href, label, strong, onClick }) => (
    <motion.li variants={itemVariants}>
        <a href={href} onClick={onClick}>{strong ? <strong>{label}</strong> : label}</a>
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

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <nav className="navbar bg-base-200 p-4 relative">
            <div className="container mx-auto flex justify-between items-center">
                <a className="text-3xl font-bold" href="#">Hardik Dhuri</a>
                <div className="lg:hidden">
                    <button
                        className="text-3xl focus:outline-none"
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                    >
                        ☰
                    </button>
                </div>
                <div className="hidden lg:flex space-x-6">
                    <ul className="menu menu-horizontal text-2xl">
                        {menuItems.map((item) => (
                            <li key={item.href}>
                                <a href={item.href}>{item.strong ? <strong>{item.label}</strong> : item.label}</a>
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
                        className="absolute top-full left-0 w-full bg-base-200 z-10"
                    >
                        <motion.ul className="menu menu-vertical text-2xl p-4">
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

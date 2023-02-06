import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import style from "./Navbar.module.scss";
import logo from "../../images/logo_primary.png";
import { MdRestaurantMenu } from "react-icons/md";

export const Navbar = () => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const handleOpenMenu = () => {
    setMenuIsOpen(!menuIsOpen);
  };

  return (
    <nav className={`${style.navBar} flex justify_between align_center row`}>
      <Link href="/" legacyBehavior={true}>
        <a className={style.logo}>
          <Image src={logo} alt="Logo" width={100}></Image>
        </a>
      </Link>
      <ul className={`${style.navLinks} align_center`}>
        <li>
          <Link href={"/meals"}>MEALS</Link>
        </li>
        <li>
          <Link href={"/saved-meals"}>SAVED MEALS</Link>
        </li>
      </ul>
      <MdRestaurantMenu className={style.menuIcon} onClick={handleOpenMenu} />
      <AnimatePresence>
        {menuIsOpen ? (
          <motion.div
            className={style.menuDrawer}
            initial={{ x: 500 }}
            animate={{ x: 0 }}
            exit={{ x: 500 }}
            transition={{ ease: "easeOut", duration: 1 }}
          >
            <MdRestaurantMenu
              className={style.menuIcon}
              onClick={handleOpenMenu}
            />
            <ul className={`${style.drawerLinks} flex align_center`}>
              <motion.li
                whileTap={{ backgroundColor: "#e85d04", scale: 0.9 }}
                onClick={handleOpenMenu}
              >
                <Link href={"/meals"}>MEALS</Link>
              </motion.li>
              <motion.li
                whileTap={{ backgroundColor: "#e85d04", scale: 0.9 }}
                onClick={handleOpenMenu}
              >
                <Link href={"/saved-meals"}>SAVED MEALS</Link>
              </motion.li>
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </nav>
  );
};

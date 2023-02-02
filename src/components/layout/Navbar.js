import Link from 'next/link';
import Image from 'next/image';
import style from './Navbar.module.scss';
import logo from '../../images/meal_khuj_logo.png';

export const Navbar = () => {
  return (
    <nav className={`${style.navBar} flex justify_between align_center`}>
        <Link href="/" legacyBehavior={true}>
            <a className={style.logo}>
                <Image src={logo} alt="Logo"></Image>
            </a>
        </Link>
        <ul className={`${style.navLinks} flex align_center`}>
            <li>
                <Link href={'/meals'}>
                    MEALS
                </Link>
            </li>
            <li>
                <Link href={'/saved-meals'}>
                    SAVED MEALS
                </Link>
            </li>
        </ul>
    </nav>
  )
}

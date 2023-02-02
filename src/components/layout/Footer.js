import Image from 'next/image';
import logo from '../../images/meal_khuj_logo_primary.png';
import style from './Footer.module.scss';
import { Text } from '../text/Text';

export const Footer = () => {
    return (
        <footer className={style.footer}>
        <Image src={logo} alt="Logo"></Image>
        <Text>
            Find the perfect meal recipe for you.
        </Text>
        <Text className={style.copyright}>
        "MyMeals" © 2023 | All rights reserved
        </Text>
        </footer>
    )
}
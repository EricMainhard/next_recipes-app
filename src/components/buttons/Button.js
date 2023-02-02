import style from './Button.module.scss';
import Link from 'next/link';
import clsx from 'clsx';

export const ButtonWithLink = ({link = '/', children, variant = 'secondary'}) => {
    return (
        <Link href={link} legacyBehavior={true}>
            <a
                className={clsx(style.button, style[`variant__${variant}`])}
                type="button"
            >
                {children}
            </a>
        </Link>
    )
}

export const Button = ({children, variant = 'secondary', onClick }) => {
    return (    
        <button className={`flex ${clsx(style.button, style[`variant__${variant}`])}`} onClick={onClick}>
            {children}
        </button>
    )
}

export default ButtonWithLink;
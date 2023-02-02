import style from './Layout.module.scss';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export const Layout = ({ children }) => {
    return (
        <>
            <div className={style.container}>
                <Navbar/>
                {children}
            </div>
            <Footer/>
        </>
    )
}
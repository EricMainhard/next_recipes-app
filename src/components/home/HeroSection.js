import style from './HeroSection.module.scss';
import { motion } from "framer-motion"
import heroImage from '../../images/hero_img.jpg';
import { Text } from '../text/Text';
import Image from 'next/image';
import ButtonWithLink from '../buttons/Button';

export const HeroSection = () => {
  return (
    <section className={style.heroSection}>
        <div className={`${style.container} flex justify_between align_center`}>
            <div className={style.heroInfo}>
                <motion.div
                    className={style.heroTitle}
                    animate={{ x: 0 }}
                    initial={{ x: -500 }}
                    transition={{ ease: "easeOut", duration: 2 ,delay: 0 }}
                >
                    Find the perfect
                </motion.div>
                <motion.div
                    className={style.heroTitle}
                    animate={{ x: 0 }}
                    initial={{ x: -500 }}
                    transition={{ ease: "easeOut", duration: 2, delay: 0.25 }}
                    style={{ color: '#e85d04'}}
                >
                    meal recipe
                </motion.div>
                <motion.div
                    className={style.heroTitle}
                    animate={{ x: 0 }}
                    initial={{ x: -500 }}
                    transition={{ ease: "easeOut", duration: 2, delay: 0.5 }}
                >
                    for you.
                </motion.div>
                <motion.div
                    animate={{ x: 0 }}
                    initial={{ x: -500 }}
                    transition={{ ease: "easeOut", duration: 2, delay: 0.5 }}
                >
                    <Text>
                        a listing website of meal recipes
                    </Text>
                    <div className={`${style.heroButtons} flex`}>
                        <ButtonWithLink link='/meals' variant='primary'>
                            Explore Meals
                        </ButtonWithLink>
                        <ButtonWithLink link='/meals'>
                            Saved Meals
                        </ButtonWithLink>
                    </div>
                </motion.div>
            </div>
            <motion.div 
                className={style.heroImage}
                animate={{ x: 0 }}
                initial={{ x: 500 }}
                transition={{ ease: "easeOut", duration: 2 }}
            >
                <Image src={heroImage} width={400} alt="Hero image"></Image>
            </motion.div>
        </div>
    </section>
  )
}

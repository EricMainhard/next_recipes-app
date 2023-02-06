import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import style from './SingleMeal.module.scss';
import { motion } from 'framer-motion';
import { Title } from '../text/Title';

export const SingleMeal = ({ meal, i, optionToRemove }) => {

    return (
        <Link href={`/meals/${meal.idMeal}`}>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ ease: "easeOut", duration: 1, delay: ((i + 1) / 4) }}
            >
                <div className={style.item}>
                    <Image src={meal.strMealThumb} width={100} height={100} alt={`${meal.strMeal} image`}></Image>
                    <Title
                        className={style.title}
                        variant="secondary"
                    >
                        {meal.strMeal}
                    </Title>
                </div>
            </motion.div>
        </Link>
    )
}
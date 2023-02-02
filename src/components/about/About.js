import style from './About.module.scss';
import { Title } from '../text/Title';
import { Text } from '../text/Text';
import { motion } from 'framer-motion';
import { useState } from 'react';

export const About = () => {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.div
            layout
            data-isOpen={isOpen}
            className={style.about}
            onClick={() => setIsOpen(!isOpen)}
        >
            <motion.div layout className={style.content}>
                <Title>
                    About our recipes
                </Title>
                <Text variant='primary'>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Modi at voluptatum officiis commodi quo quidem optio veniam esse corporis necessitatibus.
                </Text>
            </motion.div>
        </motion.div>
    )
}
import style from "./CategoryItem.module.scss";
import Image from "next/image";
import { motion } from "framer-motion";
import clsx from "clsx";

export const CategoryItem = ({ category, selectedCategory, onClickHandler }) => {

  const isSelected = category.strCategory === selectedCategory;

  return (
    <motion.div
      whileTap={{ scale: 0.9 }}
      className={`flex column align_center ${clsx(style.category, isSelected ? style.selected : '')}`}
      onClick={onClickHandler}
    >
      <Image
        src={category.strCategoryThumb}
        width={50}
        height={50}
        className={style.categoryImage}
        alt="Category image"
      ></Image>
      <h5 className={style.categoryTitle}>{category.strCategory}</h5>
    </motion.div>
  );
};

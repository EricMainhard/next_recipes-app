import style from "./Categories.module.scss";
import { CategoryItem } from "./CategoryItem";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";

export const Categories = ({
  categories,
  loading,
  error,
  selectedCategory,
  setSelectedCategory,
  setQuery,
}) => {
  return (
    <div className={style.categories__container}>
      <Swiper
        spaceBetween={0}
        slidesPerView={3}
        navigation
        modules={[Navigation, Pagination]}
        pagination={{ clickable: true }}
        breakpoints={{
          768: {
            slidesPerView: 5,
          },
        }}
      >
        {categories?.data?.categories.map((cat) => (
          <SwiperSlide key={cat.idCategory}>
            <CategoryItem
              category={cat}
              selectedCategory={selectedCategory}
              onClickHandler={() => {
                setSelectedCategory(cat.strCategory);
                setQuery('');
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

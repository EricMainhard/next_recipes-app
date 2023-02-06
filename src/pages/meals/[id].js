import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/router";
import { Title } from "@/components/text/Title";
import { Text } from "@/components/text/Text";
import { Ingredients } from "@/components/mealsPage/Ingredients";
import { PointText } from "@/components/text/PointText";
import Image from "next/image";
import { toast } from "react-hot-toast";
import style from "./meals.module.scss";
import BarLoader from "react-spinners/BarLoader";
import ButtonWithLink, { Button } from "@/components/buttons/Button";
import { BsYoutube } from "react-icons/bs";
import { FaHeart, FaHeartBroken } from "react-icons/fa";
import { useState, useEffect } from "react";

export const getMealById = async ({queryKey}) => {
  const { data } = await axios.get(`/lookup.php?i=${queryKey[1]}`);
  return data?.meals[0];
};

const SingleMealPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [isSaved, setIsSaved] = useState(false);

  const handleSaveMeal = (id) => {
    if (localStorage.getItem("savedMeals")) {
      let savedMeals = JSON.parse(localStorage.getItem("savedMeals"));
      if (isSaved) {
        let filterMeals = savedMeals.filter(savedMeal => savedMeal !== id);
        localStorage.setItem("savedMeals", JSON.stringify(filterMeals));
        setIsSaved(false);
        toast.error("Meal removed successfully");
      } else {
        savedMeals.push(id);
        localStorage.setItem("savedMeals", JSON.stringify(savedMeals));
        setIsSaved(true);
        toast.success("Meal saved successfully");
      }
    } else {
      localStorage.setItem("savedMeals", JSON.stringify([id]));
      setIsSaved(true);
      toast.success("Meal saved successfully");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("savedMeals")) {
      let savedMeals = JSON.parse(localStorage.getItem("savedMeals"));
      if (savedMeals.includes(id)) {
        setIsSaved(true);
      } else {
        setIsSaved(false);
      }
    }
  }, [id]);

  const {
    data: meal,
    isLoading,
    isError,
  } = useQuery(["mealById", id], getMealById);

  if (isLoading || !meal) {
    return (
      <BarLoader
        color="white"
        loading={isLoading}
        size={150}
        cssOverride={{ margin: "2rem 0" }}
      />
    );
  }

  const ingredientsKeys = Object.keys(meal)
    .filter((key) => key.includes("strIngredient"))
    .filter((key) => meal[key] !== "" && meal[key] !== null);

  const ingredients = ingredientsKeys.map((key, i) => ({
    index: i + 1,
    ingredient: meal[key],
    measure: meal[`strMeasure${i + 1}`],
  }));

  return (
    <div className={style.singleMeal}>
      <div className={style.grid}>
        <div>
          <Image
            src={meal.strMealThumb}
            alt=""
            width={250}
            height={250}
          ></Image>
        </div>
        <div className={`flex column ${style.info}`}>
          <Title>{meal.strMeal}</Title>
          <PointText>Category: {meal.strCategory}</PointText>
          <PointText>Area: {meal.strArea}</PointText>
          <Text className="greenText">{ isSaved ? 'This meal is already saved' : ''}</Text>
          <Button variant="primary" onClick={() => handleSaveMeal(id)} className="row">
            {isSaved ? (
              <>
                <FaHeartBroken className={style.heartIcon} />
                Remove meal
              </>
            ) : (
              <>
                <FaHeart className={style.heartIcon} />
                Save meal
              </>
            )}
          </Button>
          {meal.strYoutube ? (
            <ButtonWithLink
              link={meal.strYoutube}
              className={`flex column ${style.youtube}`}
            >
              <BsYoutube color="#e85d04" />
              <Text>Watch tutorial</Text>
            </ButtonWithLink>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className={style.ingredients}>
        <Ingredients ingredients={ingredients} />
      </div>
    </div>
  );
};

export default SingleMealPage;

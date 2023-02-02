import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/router";
import { Title } from "@/components/text/Title";
import { Text } from "@/components/text/Text";
import { Ingredients } from "@/components/mealsPage/Ingredients";
import { PointText } from "@/components/text/PointText";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-hot-toast";
import style from "./meals.module.scss";
import BarLoader from "react-spinners/BarLoader";
import ButtonWithLink, { Button } from "@/components/buttons/Button";
import { BsYoutube } from "react-icons/bs";
import { FaHeart, FaHeartBroken } from "react-icons/fa";
import { useState, useEffect } from "react";

const SingleMealPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [isSaved, setIsSaved] = useState(false);

  const handleSaveMeal = (id) => {
    if (localStorage.getItem("savedMeals")) {
      let savedMeals = Array.from(JSON.parse(localStorage.getItem("savedMeals")));
      if (isSaved) {
        savedMeals.filter((meal) => meal != id);
        localStorage.setItem("savedMeals", JSON.stringify(savedMeals));
        setIsSaved(false);
        toast.success("Meal removed successfully");
      } else {
        savedMeals.push(id);
        localStorage.setItem("savedMeals", JSON.stringify(savedMeals));
        setIsSaved(true);
        toast.success("Meal saved successfully");
      }
    } else {
      localStorage.setItem("savedMeals", JSON.stringify(id));
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

  const getMealById = async () => {
    const { data } = await axios.get(`/lookup.php?i=${id}`);
    return data?.meals[0];
  };

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
          <Button variant="primary" onClick={() => handleSaveMeal(id)}>
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

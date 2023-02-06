import { useQueries } from "@tanstack/react-query";
import style from "./saved-meals.module.scss";
import { useEffect, useState } from "react";
import { getMealById } from "./meals/[id]";
import { toast } from "react-hot-toast";
import { Title } from "@/components/text/Title";
import { Text } from "@/components/text/Text";
import { BarLoader } from "react-spinners";
import { PointText } from "@/components/text/PointText";
import ButtonWithLink, { Button } from "@/components/buttons/Button";
import { BsEye, BsTrashFill } from "react-icons/bs";

const SavedMeals = () => {
  const [savedMealsID, setSavedMealsID] = useState([]);

  const handleRemoveMeal = (id) => {
    let savedMeals = JSON.parse(localStorage.getItem("savedMeals"));
    let filterMeals = savedMeals.filter((savedMeal) => savedMeal !== id);
    localStorage.setItem("savedMeals", JSON.stringify(filterMeals));
    setSavedMealsID(JSON.parse(localStorage.getItem("savedMeals")));
    toast.error("Meal removed successfully");
  };

  useEffect(() => {
    if (localStorage.getItem("savedMeals")) {
      setSavedMealsID(JSON.parse(localStorage.getItem("savedMeals")));
    }
  }, []);

  const queries = savedMealsID?.map((id) => ({
    key: id,
    queryKey: ["singleMeal", id],
    queryFn: getMealById,
  }));

  const result = useQueries({ queries });

  return (
    <div className={style.savedMealsContainer}>
      {result.length > 0 ? (
        result.map(({ data, isLoading, isError }, index) => {
          if (isLoading) {
            return (
              <BarLoader
                color="white"
                loading={isLoading}
                size={150}
                cssOverride={{ margin: "2rem 0" }}
              />
            );
          }
          if (isLoading) {
            return <Text> Something went wrong, please try again. </Text>;
          }
          return (
            <div className={`flex justify_between row ${style.card}`}>
              <div className={style.cardInfo}>
                <Title variant="secondary">{data.strMeal}</Title>
                <PointText>{data.strCategory}</PointText>
                <PointText>{data.strArea}</PointText>
              </div>
              <div
                className={`flex align_center column justify_between ${style.cardActions}`}
              >
                <ButtonWithLink link={`/meals/${data.idMeal}`}>
                  <BsEye />
                </ButtonWithLink>
                <Button
                  variant="primary"
                  onClick={() => {
                    handleRemoveMeal(data.idMeal);
                  }}
                >
                  <BsTrashFill />
                </Button>
              </div>
            </div>
          );
        })
      ) : (
        <Text>You have no items in your list.</Text>
      )}
    </div>
  );
};

export default SavedMeals;

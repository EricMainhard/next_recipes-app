import style from "./meals.module.scss";
import { SearchBar } from "@/components/mealsPage/SearchBar";
import { PointText } from "@/components/text/PointText";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Categories } from "@/components/categories/Categories";
import { useState, useEffect } from "react";
import BarLoader from 'react-spinners/BarLoader';
import { SingleMeal } from "@/components/mealsPage/SingleMeal";

const getCategories = async () => {
  const res = await axios.get("/categories.php");
  return res;
};

const Meals = () => {

  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchText, setSearchText] = useState('');
  const [query, setQuery] = useState('');

  const getMealsByCategory = async ({ queryKey }) => {
    const res = await axios.get(`/filter.php?c=${queryKey[1]}`)
    return res;
  }

  const getQueriedMeals = async ({queryKey}) => {
    const res = await axios.get(`/search.php?s=${queryKey[1]}`);
    return res?.data?.meals || []; 
  }

  const {
    data: categories,
    isLoading: loading,
    isError: error,
  } = useQuery(["categories"], getCategories);

  const {
    data,
    isLoading,
    isError,
  } = useQuery(["mealsByCategory", selectedCategory], getMealsByCategory, {
    enabled: query === ''
  });

  const {
    data: queryData,
    isLoading: queryIsLoading,
    isError: queryIsError 
  } = useQuery(["mealsByQuery", query], getQueriedMeals, {
    enabled: query !== ''
  });

  useEffect(()=>{
    setSelectedCategory(categories?.data?.categories[0].strCategory);
  }, [categories])

  useEffect(()=>{
    const timeout = setTimeout(()=>{
      if (searchText){
        setQuery(searchText);
        setSelectedCategory('');
      } else {
        setQuery('');
        if (categories){
          setSelectedCategory(categories.data.categories[0].strCategory);
        }
      }
    }, 300);

    return (()=>{
      setQuery('');
      clearTimeout(timeout);
    })

  }, [searchText, categories])

  return (
    <div className={style.meals}>
        <SearchBar searchText={searchText} setSearchText={setSearchText}/>
        <PointText className={style.text}>
            Search meals or select categories from below.
        </PointText>
        <Categories 
            categories={categories} 
            loading={loading} 
            error={error}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            setQuery={setQuery}
        />
        { isLoading || loading ? (
          <div className={style.spinner}>
            <BarLoader 
              color="white"
              loading={loading}
              size={150}
              cssOverride={{ margin: '2rem 0' }}
            />
          </div>
        ) : null}
        <div className={style.mealsContainer}>
          { selectedCategory ? data?.data?.meals.map(( meal, i ) => (
            <SingleMeal meal={meal} i={i} key={meal.idMeal} />
          )) : null}
          { query ? queryData?.map(( meal, i ) => (
            <SingleMeal meal={meal} i={i} key={meal.idMeal} />
          )) : null}
        </div>
    </div>
  );
};

export default Meals;

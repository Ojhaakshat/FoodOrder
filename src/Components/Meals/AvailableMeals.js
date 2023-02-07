import React, { useEffect, useState } from "react";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from './AvailableMeals.module.css'

const AvailableMeals = props =>  {

    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [httpError, setError] = useState(null);

    useEffect(() => {
      const fetchMeals = async()=> {
        setIsLoading(true);
        const MEALSDATAJSON = await fetch('https://foodorder-fd899-default-rtdb.firebaseio.com/meals.json') 
        if(!MEALSDATAJSON.ok) {
          throw new Error("Something went wrong!")
        }
        const MEALSDATAOBJECT = await MEALSDATAJSON.json();
        const MEALSDATAARRAY = [];
        for(const key in MEALSDATAOBJECT) {
          MEALSDATAARRAY.push({
            id: key,
            name: MEALSDATAOBJECT[key].name,
            description: MEALSDATAOBJECT[key].description,
            price: MEALSDATAOBJECT[key].price,

          })
        }
        setMeals(MEALSDATAARRAY);
      }
      fetchMeals().catch(error => {
        setError(error.message);
      }) 
      setIsLoading(false);        

    },[])

    const mealList = meals.map(meal => <MealItem key={meal.id} id={meal.id} name={meal.name} description={meal.description} price={meal.price}/>)
    
    if(isLoading) {
      return(
        <section className={classes.MealsLoading}>
          <p>Loading.....</p>
        </section>
      )
    }
    if(httpError) {
        return (
          <section className={classes.MealsError}>
            <p>{httpError}</p>
          </section>
        )
    }
    return (
        <section className={classes.meals}>
            <Card>
                {!isLoading && <ul>
                    {mealList}
                </ul>}
            </Card>
        </section>
    )
}

export default AvailableMeals;
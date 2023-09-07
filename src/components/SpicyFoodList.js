import React, { useState } from "react";
import { spicyFoods, getNewRandomSpicyFood } from "../data";

function SpicyFoodList() {
  const [filterBy, setFilterBy] = useState("All")
  const [foods, setFoods] = useState(spicyFoods);

  function handleAddFood() {
    const newFood = getNewRandomSpicyFood();
    const newFoodArray = [...foods, newFood]
    setFoods(newFoodArray)
   
  }

  // Here's a quick reference of some common techniques for manipulating arrays in state. Keep this in mind, because working with arrays will be important as a React developer!
  // Add: use the spread operator ([...])
  // Remove: use .filter
  // Update: use .map

  function handleLiClick(id) {
    const newFoodArray = foods.map((food) => {
      if (food.id === id) {
        return {
          ...food,
          heatLevel: food.heatLevel + 1,
        };
      } else {
        return food;
      }
    });
    setFoods(newFoodArray);
  }

  function handleFilterChange(event){
    setFilterBy(event.target.value)
  }

  
  const foodsToDisplay = foods.filter((food) => {
    if(filterBy === "All") {
      return true
    } else {
      return food.cuisine === filterBy
    }

  })

  const foodList = foodsToDisplay.map((food) => (
    <li key={food.id} onClick={() => handleLiClick(food.id)}>
      {food.name} | Heat: {food.heatLevel} | Cuisine: {food.cuisine}
    </li>
  ));


  return (
    
      <div>
        <select name="filter" onChange={handleFilterChange}>
          <option value="All">All</option>
          <option value="American">American</option>
          <option value="Sichuan">Sichuan</option>
          <option value="Thai">Thai</option>
          <option value="Mexican">Mexican</option>
        </select>
        <button onClick={handleAddFood}>Add New Food</button>
        <ul>{foodList}</ul>  
      </div>
  );
}

export default SpicyFoodList;

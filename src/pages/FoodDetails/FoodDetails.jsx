
import { useLocation } from 'react-router-dom';

import FoodCardDetails from '../../components/FoodCardDetails/FoodCardDetails';

const FoodDetails = () => {
  const location = useLocation();
  const meal = location.state?.meal; // Access the meal object from location.state

  return (
    <div>
      {meal && <FoodCardDetails meal={meal} />}
      {/* Render MealDetailsCard with the passed meal object */}
    </div>
  );
};

export default FoodDetails;

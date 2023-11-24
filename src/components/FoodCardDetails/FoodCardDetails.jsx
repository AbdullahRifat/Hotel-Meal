import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import useAxiosPublic from '../../hooks/useAxiosPublic';
import LoaderAnimations from '../../pages/Shared/Loader/LoaderAnmations';


const FoodCardDetails = () => {
  const params = useParams();
  const { id } = params;

  const [foodDetails, setFoodDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const axiosPublic = useAxiosPublic()

  useEffect(() => {

  
    const fetchData = async () => {
      try {
        const response = await axiosPublic.get(`/menu/${id}`); // Adjust the URL as per your server endpoint
        setFoodDetails(response.data);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (isLoading) {
     <LoaderAnimations></LoaderAnimations>
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const { name, category, recipe, price, _id, image } = foodDetails;

  return (
    <div className="meal-details-card">
      <img src={image} alt="Meal" className="meal-image" />

      <h2>{name}</h2>
      <p>Category: {category}</p>
      <p>Recipe: {recipe}</p>
      <p>Price: {price}</p>
      <p>ID: {_id}</p>

      {/* ... other UI elements using foodDetails properties ... */}
    </div>
  );
};

export default FoodCardDetails;

import { useParams } from "react-router-dom";
import useReviews from "../../hooks/useReviews";
import LoaderAnimations from "../../pages/Shared/Loader/LoaderAnmations";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { useForm } from 'react-hook-form';
import Swal from "sweetalert2";
import { useEffect, useState } from "react";

const Review = () => {
    const { register, handleSubmit, setValue } = useForm();
    const axiosPublic = useAxiosPublic();
    const { id } = useParams();
  
    const [review, setReview] = useState(null);

    const { data: allReviews = [], isPending: loading, refetch } = useQuery({
      queryKeys: ['allReviews'],
      queryFn: async () => {
        const res = await axiosPublic.get('reviews');
        return res.data;
      },
      staleTime: Infinity, // 1 hour in milliseconds
    });
  
    useEffect(() => {
      if (allReviews.length > 0) {
        const foundReview = allReviews.find(r => r._id === id);
        setReview(foundReview);
      }
    }, [allReviews, id]);
  
    if (loading) return <LoaderAnimations></LoaderAnimations>;
  
    if (!review) return <div>Review not found</div>;
  
    const onSubmit = async (data) => {
       
      const response = await axiosPublic.put(`myreviews/reviews/edit/${id}`, { details: data.reviewText });
  
      if (response.data.modifiedCount) {
        Swal.fire({
          position: 'top-center',
          icon: 'success',
          title: 'Review Updated',
          showConfirmButton: false,
          timer: 1500,
        });
  
        refetch();
      }
    };
  
    setValue('reviewText', review.details); // Set initial textarea value
  
    return (
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <textarea
            {...register('reviewText')}
            className="form-control"
            placeholder="Edit your review"
          />
          <button type="submit" className="btn btn-primary mt-2">Update Review</button>
        </form>
      </div>
    );
  };
  
  export default Review;
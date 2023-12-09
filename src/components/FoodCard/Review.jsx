// import { useParams } from "react-router-dom";
// import useReviews from "../../hooks/useReviews";
// import LoaderAnimations from "../../pages/Shared/Loader/LoaderAnmations";
// import useAxiosPublic from "../../hooks/useAxiosPublic";
// import { useQuery } from "@tanstack/react-query";
// import { useForm } from 'react-hook-form';
// import Swal from "sweetalert2";
// import { useEffect, useState } from "react";

// const Review = () => {
//     const { register, handleSubmit, setValue } = useForm();
//     const axiosPublic = useAxiosPublic();
//     const { id } = useParams();
  
//     const [review, setReview] = useState(null);

//     const { data: allReviews = [], isPending: loading, refetch } = useQuery({
//       queryKeys: ['allReviews'],
//       queryFn: async () => {
//         const res = await axiosPublic.get('reviews');
//         return res.data;
//       },
//       staleTime: Infinity, // 1 hour in milliseconds
//     });
  
//     useEffect(() => {
//       if (allReviews.length > 0) {
//         const foundReview = allReviews.find(r => r._id === id);
//         setReview(foundReview);
//       }
//     }, [allReviews, id]);
  
//     if (loading) return <LoaderAnimations></LoaderAnimations>;
  
  
  
//     const onSubmit = async (data) => {
       
//       const response = await axiosPublic.put(`myreviews/reviews/edit/${id}`, { details: data.reviewText });
  
//       if (response.data.modifiedCount) {
//         Swal.fire({
//           position: 'top-center',
//           icon: 'success',
//           title: 'Review Updated',
//           showConfirmButton: false,
//           timer: 1500,
//         });
  
//         refetch();
//       }
//     };
  
//     setValue('reviewText', review?.details); // Set initial textarea value
//     console.log('addada')
//     return (
//       <div>
      
//        {
//         loading?<div><p className="text-3xl font-bold">Try To Reload please</p></div>: <form onSubmit={handleSubmit(onSubmit)}>
//         <textarea
//           {...register('reviewText')}
//           className="form-control w-full h-24 border-solid border-2 border-sky-400"
//           placeholder="Edit your review"
//         />
//         <button type="submit" className="btn btn-primary mt-2">Update Review</button>
//       </form>
//        }
//       </div>
//     );
//   };
  
//   export default Review;

import { useParams } from "react-router-dom";
import LoaderAnimations from "../../pages/Shared/Loader/LoaderAnmations";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { useForm } from 'react-hook-form';
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Review = () => {
  const { register, handleSubmit, setValue } = useForm();
  const axiosPublic = useAxiosPublic();
  const { id } = useParams();

  const [review, setReview] = useState(null);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [loadingReview, setLoadingReview] = useState(true);
  const [errorFetching, setErrorFetching] = useState(false);

  const axiosSecure = useAxiosSecure();

  const { data: allReviews = [], isFetching, refetch } = useQuery({
    queryKey: 'allReviews',
    queryFn: async () => {
      try {
        const res = await axiosPublic.get('reviews');
        return res.data;
      } catch (error) {
        console.error(error);
        setErrorFetching(true);
        return [];
      }
    },
    staleTime: Infinity,
  });

  useEffect(() => {
    if (allReviews.length > 0) {
      setLoadingReview(true);
      const foundReview = allReviews.find(r => r._id === id);
      if (foundReview) {
        setReview(foundReview);
        setValue('reviewText', foundReview.details);
      } else {
        setErrorFetching(true);
      }
      setLoadingReview(false);
      setLoadingReviews(false);
    }
  }, [allReviews, id, setValue]);

  const onSubmit = async (data) => {
    console.log("hitted")
    const response = await axiosSecure.put(`myreviews/reviews/edit/${id}`, { details: data.reviewText });

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

  if (isFetching || loadingReviews || loadingReview) return <LoaderAnimations />;
  
  if (errorFetching) {
    return <div>Error fetching reviews or review not found. Please try again later.</div>;
  }

  if (!review) return <div>Review not found</div>;

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <textarea
          {...register('reviewText')}
          className="form-control w-full h-24 border-solid border-2 border-sky-400"
          placeholder="Edit your review"
        />
        <button type="submit" className="btn btn-primary mt-2">
          Update Review
        </button>
      </form>
    </div>
  );
};

export default Review;

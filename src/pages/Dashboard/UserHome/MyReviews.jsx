import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAuth from "../../../hooks/useAuth";


const MyReviews = () => {
    const {user} = useAuth()
    const axiosPublic = useAxiosPublic()
    const {data: allReviews=[] ,isPending: loading,refetch} = useQuery({

        queryKeys: ['allReviews'],
        queryFn: async()=> {
            const res = await axiosPublic.get('reviews')
            return res.data
        },
       
    })

    const myReviews = allReviews.filter((review)=>review.email?.toLowerCase()===user.email)


    return (
        <div>
            {myReviews.map((review,idx)=> <div key={idx}>

{review?.details}
{review?.status}
</div>)}
        </div>
    )

    
};

export default MyReviews;
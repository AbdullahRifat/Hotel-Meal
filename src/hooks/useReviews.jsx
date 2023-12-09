import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
const useReviews = () => {
    const axiosPublic = useAxiosPublic()
    const {data: allReviews=[] ,isPending: loading,refetch} = useQuery({

        queryKeys: ['allReviews'],
        queryFn: async()=> {
            const res = await axiosPublic.get('/reviews/allreviews')
            return res.data
        },
        
       // 1 hour in milliseconds
          
       
    })
    return [allReviews, loading,refetch];
};

export default useReviews;
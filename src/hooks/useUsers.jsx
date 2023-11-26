
import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";



const useUsers = () => {
   
   
    const axiosPublic = useAxiosPublic()

    const {data: allUsers=[] ,isPending: loading,refetch} = useQuery({

        queryKeys: ['allUsers'],
        queryFn: async()=> {
            const res = await axiosPublic.get('/users')
    
            return res.data
        },
     
    })

  
    return [allUsers, loading,refetch];
};


export default useUsers;

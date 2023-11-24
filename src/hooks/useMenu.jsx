
import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";



const useMenu = () => {
   
   
    const axiosPublic = useAxiosPublic()

    const {data: menu=[] ,isPending: loading,refetch} = useQuery({

        queryKeys: ['menu'],
        queryFn: async()=> {
            const res = await axiosPublic.get('menu')
            return res.data
        },
        staleTime: Infinity,
    })

  
    return [menu, loading,refetch];
};


export default useMenu;

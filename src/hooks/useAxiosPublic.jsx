import axios from "axios";

const axiosPublic = axios.create(
    {
        baseURL: 'https://job-seeking-server.vercel.app'
    }
);

const useAxiosPublic = () => {
   
    return axiosPublic;
};

export default useAxiosPublic;
import { FaGoogle } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";



const SocialLogin = () => {
    const {googleSignIn} = useAuth();
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate()

    const handleLogin = ()=>{
        googleSignIn()
        .then(res=>{
            const userInfo ={
                name : res?.user?.displayName,
                email : res?.user?.email,
            }
            axiosPublic.post('/users',userInfo)
            .then(res=>{
                console.log(res.data.message)
               if(res.data.message==='user already exists'){
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: res.data.message,
                    showConfirmButton: false,
                    timer: 1500
                });
               }
                navigate('/')
            })
        })
    }
    return (
        <div>
            <button onClick={handleLogin} className="btn glass"><FaGoogle className="text-green"></FaGoogle><span className="ml-2">login</span></button>
        </div>
    );
};

export default SocialLogin;
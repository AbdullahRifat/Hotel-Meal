import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useCart from "../../hooks/useCart";


const FoodCard = ({ item }) => {
    const { title, image, price, ingredients, _id } = item;
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const axiosSecure = useAxiosSecure();
    const [, refetch] = useCart();

    const handleAddToCart = () => {
        if (user && user.email) {
            //send cart item to the database
            const cartItem = {
                menuId: _id,
                email: user.email,
                name,
                image,
                price
            }
            axiosSecure.post('/carts', cartItem)
                .then(res => {
                    console.log(res.data)
                    if (res.data.insertedId) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: `${name} added to your cart`,
                            showConfirmButton: false,
                            timer: 1500
                        });
                        // refetch cart to update the cart items count
                        refetch();
                    }

                })
        }
        else {
            Swal.fire({
                title: "You are not Logged In",
                text: "Please login to add to the cart?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, login!"
            }).then((result) => {
                if (result.isConfirmed) {
                    //   send the user to the login page
                    navigate('/login', { state: { from: location } })
                }
            });
        }
    }
    return (
        <div className="card w-[300px] bg-base-100 shadow-xl">
            <figure><img className="w-full h-36" src={image} alt="missing photo" /></figure>
            
            <div className="card-body flex flex-col items-center">
                <h2 className="card-title flex-grow">{title}</h2>
                <p className=""><span className="font-bold">Price : </span>${price}</p>
                <p ><span className="font-bold">Ingredients : </span>{ ingredients}</p>
                <div className="card-actions justify-end">
                    <Link to={{
                        pathname: `mealdetails/${_id}`,
                        state: { item }, // Pass the meal object as state
                    }}


                    >
                        <button
                            // onClick={handleAddToCart}
                            className="btn btn-outline bg-slate-100 border-0 border-b-4 border-orange-400 mt-4"
                        >Details</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;
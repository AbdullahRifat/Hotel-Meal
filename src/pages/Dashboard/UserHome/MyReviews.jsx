import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { NavLink } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

const MyReviews = () => {
    const axiosPublic = useAxiosPublic();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // Adjust this number as needed

    const { user } = useAuth();

    const {
        data: allReviews = [],
        isFetching: loading,
        refetch,
    } = useQuery({
        queryKey: ["allReviews"],
        queryFn: async () => {
            const res = await axiosPublic.get("reviews");
            return res.data;
        },
        staleTime: Infinity, // 1 hour in milliseconds
    });

    const { data: menu = [] } = useQuery({
        queryKey: ['menu'],
        queryFn: async () => {
            const res = await axiosPublic.get('menu');
            return res.data;
        },
    });

    const userReviews = allReviews.filter((review) => review?.email?.toLowerCase() === user.email.toLowerCase());

    return (
        <div>
            <table className="table w-full">
                <thead>
                    <tr>
                        <th>Meal Title</th>
                        <th>Likes count</th>
                        <th>Reviews count</th>
                        <th>View Meal </th>
                        <th>Edit Meal</th>
                    </tr>
                </thead>
                <tbody>
                    {userReviews.map((review) => {
                        const matchingMenuItem = menu.find((menuItem) => menuItem._id === review.menuId);
                        if (matchingMenuItem) {
                            return (
                                <tr key={matchingMenuItem._id}>
                                    <td>{matchingMenuItem.title}</td>
                                    <td>{matchingMenuItem.likes}</td>
                                    <td>{matchingMenuItem.reviews}</td>
                                    <td>
                                        <NavLink to={`mealDetails/${matchingMenuItem._id}`}>
                                            <button className="btn btn-primary">
                                                View Meal
                                            </button>
                                        </NavLink>
                                    </td>
                                    <td>
                                        <NavLink to={`mealDetails/edit/${review._id}`}>
                                            <button className="btn btn-primary">
                                                Edit
                                            </button>
                                        </NavLink>
                                    </td>
                                </tr>
                            );
                        }
                        return null;
                    })}
                </tbody>
            </table>

            {/* Pagination */}
            {/* Your pagination logic here */}
        </div>
    );
};

export default MyReviews;

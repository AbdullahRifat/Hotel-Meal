import { useState } from "react";
import useMenu from "../../../hooks/useMenu";

import Swal from "sweetalert2";
import LoaderAnimations from "../../Shared/Loader/LoaderAnmations";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const UpcomingMeals = () => {
    const [menu, loading, refetch] = useMenu();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // Adjust as needed

    const axiosPublic = useAxiosPublic()

    const upcomings = menu.filter((item) => item.upcoming === true);
    const sortedUpcomings = upcomings.sort((a, b) => b.likes - a.likes);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentUpcomings = sortedUpcomings.slice(indexOfFirstItem, indexOfLastItem);

    const publishMeal = async (mealId) => {
        const meal = menu.find((item) => item._id === mealId);
        if (meal.likes >= 10) {
            const response = await axiosPublic.put(`/menu/upcoming/${mealId}`, {
                upcoming: false,
            });

          
            if (response.data.modifiedCount) {
                Swal.fire({
                    position: "top-center",
                    icon: "success",
                    title: "Meal Published!",
                    showConfirmButton: false,
                    timer: 1500,
                });
                refetch(); // Fetch updated data after successful publish
            } else {
                // Handle unsuccessful response
                Swal.fire({
                    position: "top-center",
                    icon: "error",
                    title: "Failed to publish meal",
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        } else {
            Swal.fire({
                position: "top-center",
                icon: "warning",
                title: "Meal needs at least 10 likes to publish",
                showConfirmButton: false,
                timer: 1500,
            });
        }
    };

    const handlePublish = (mealId) => {
        publishMeal(mealId);
        // Perform refetch or any other actions after publishing
        refetch();
    };

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const totalPages = Math.ceil(sortedUpcomings.length / itemsPerPage);

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
            <li
                key={i}
                className={`pagination-item ${currentPage === i ? "active" : ""}`}
            >
                <button className="btn" onClick={() => paginate(i)}>
                    {i}
                </button>
            </li>
        );
    }

    return (
        <div>
            {loading ? (
                <LoaderAnimations />
            ) : (
                <div>
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>Meal Title</th>
                                <th>Likes Count</th>
                                <th>Publish/Production</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentUpcomings.map((upcoming, idx) => (
                                <tr key={idx}>
                                    <td>{upcoming.title}</td>
                                    <td>{upcoming.likes}</td>
                                    <td>
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => handlePublish(upcoming._id)}
                                        >
                                            Publish
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Pagination */}
                    <ul className="pagination flex gap-4 justify-center items-center my-32">
                        {pageNumbers}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default UpcomingMeals;

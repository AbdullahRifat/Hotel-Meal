import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const AllServeMealsPagination = () => {
    const axiosPublic = useAxiosPublic();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 1; // Adjust as needed

    const { data: requestedMeals = [], isLoading: loading, refetch } = useQuery({
        queryKey: ["requestedMeals"],
        queryFn: async () => {
            const res = await axiosPublic.get("carts/requestedMeals");
            return res.data;
        },
    });

    const serveMeal = async (mealId, mealStatus) => {
        if (mealStatus === "served") {
            Swal.fire({
                position: "top-center",
                icon: "success",
                title: "Meal Already Served",
                showConfirmButton: false,
                timer: 1500,
            });
            return;
        }
        const res = await axiosPublic.put(`/carts/requestedMeals/serve/${mealId}`, {
            mealStatus: "served",
        });
        if (res.data.modifiedCount) {
            Swal.fire({
                position: "top-center",
                icon: "success",
                title: "Meal Served",
                showConfirmButton: false,
                timer: 1500,
            });
        }
        refetch();
    };

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentRequestedMeals = requestedMeals.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(requestedMeals.length / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
            <table className="table w-full">
                <thead>
                    <tr>
                        <th>Meal title</th>
                        <th>Email</th>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Serve Button</th>
                    </tr>
                </thead>
                <tbody>
                    {currentRequestedMeals.map((meal) => (
                        <tr key={meal._id}>
                            <td>{meal.title}</td>
                            <td>{meal.email}</td>
                            <td>{meal.name}</td>
                            <td>{meal.mealStatus}</td>
                            <td>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => serveMeal(meal._id, meal.mealStatus)}
                                >
                                    Serve
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
    );
};

export default AllServeMealsPagination;

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { Link, NavLink } from "react-router-dom";
const AllReviewsPagination = () => {
    const axiosPublic = useAxiosPublic();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // Adjust this number as needed
    
    const {data: menu=[] ,isPending: menuloading,refetch:menurefetch} = useQuery({

        queryKeys: ['menu'],
        queryFn: async()=> {
            const res = await axiosPublic.get('menu')
            return res.data
        },
     
    })
    
    
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

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentReviews = allReviews.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(allReviews.length / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
            <li
                key={i}
                className={`pagination-item ${
                    currentPage === i ? "active" : ""
                }`}
            >
                <button className="btn" onClick={() => paginate(i)}>
                    {i}
                </button>
            </li>
        );
    }

    // Filter objects with a menuId
const reviewsWithMenuId = allReviews.filter(review => review.menuId);

// Create a Set of unique menuIds
const uniqueMenuIdsSet = new Set(reviewsWithMenuId.map(review => review.menuId));

// Create an array of objects with unique menuIds
const uniqueMenuIdsArray = Array.from(uniqueMenuIdsSet).map(menuId => ({ menuId }));

const filteredMenus = menu.filter((review) => {
    const menuIdFound = uniqueMenuIdsArray.find((menuIdObj) => menuIdObj.menuId === review._id);
    return menuIdFound;
  });
  console.log(filteredMenus)







    return (
        <div>
            <table className="table w-full">
                <thead>
                    <p>{allReviews.length}</p>
                    <tr>
                        <th>Meal Title</th>
                        <th>Number of Likes count</th>
                        <th>Number of Reviews count</th>
                        <th>Functional Delete button</th>
                        <th>View Meal Button</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredMenus.map((review) => (
                        <tr key={review._id}>
                            <td>{review.title}</td>
                            <td>{review.likes}</td>
                            <td>{review.reviews}</td>
                            <td>
                                <button
                                    onClick={() => handleDelete(review._id)}
                                    className="btn btn-danger"
                                >
                                    Delete
                                </button>
                            </td>
                            <td>
                                
                                {/* Implement your View Meal Button */}
                               <NavLink to={`mealDetails/${review._id}`}>
                               <button className="btn btn-primary">
                                    View Meal
                                </button>
                               </NavLink>
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

export default AllReviewsPagination;

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const AllReviewsPagination = () => {
    const axiosPublic = useAxiosPublic();
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredCurrentPage, setFilteredCurrentPage] = useState(1);
    const itemsPerPage = 2; // Adjust this number as needed
    const filteredItemsPerPage = 10 // Adjust this number as needed

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

    const {
        data: menu = [],
        isPending: menuloading,
        refetch: menurefetch,
    } = useQuery({
        queryKeys: ['menu'],
        queryFn: async () => {
            const res = await axiosPublic.get('menu')
            return res.data
        },
    });

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

    // Pagination for allReviews
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentReviews = allReviews.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(allReviews.length / itemsPerPage);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Pagination for filteredMenus
    const filteredIndexOfLastItem = filteredCurrentPage * filteredItemsPerPage;
    const filteredIndexOfFirstItem = filteredIndexOfLastItem - filteredItemsPerPage;
    const currentFilteredMenus = filteredMenus.slice(filteredIndexOfFirstItem, filteredIndexOfLastItem);
    const filteredTotalPages = Math.ceil(filteredMenus.length / filteredItemsPerPage);
    const filteredPaginate = (pageNumber) => setFilteredCurrentPage(pageNumber);

    const handleDelete = async (id) => {
        try {
            const response = await axiosPublic.delete(`/allreviews/filtered/${id}`);
            // Check the response and handle success or error messages accordingly
            if (response.data.deletedCount>0) {
                Swal.fire({
                    position: "top-center",
                    icon: "success",
                    title: "Meal Served",
                    showConfirmButton: false,
                    timer: 1500,
                });
                refetch()
                // Handle UI update or any other action upon successful deletion
            } else {
                console.error('Deletion failed');
                // Handle error scenarios or UI updates for failure
            }
        } catch (error) {
            console.error('Error deleting:', error);
            // Handle any network errors or other issues
        }
    };
    

    const [isLike, setIsLike] = useState(false);
    const [isReview, setIsReview] = useState(false);

   
    const hanleReview = () => {
        if (!isReview) {
            setIsLike(false)
            setIsReview(true)
        } else {
            setIsReview(false)
        }
    }
    const handlePagination = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleFilteredPagination = (pageNumber) => {
        setFilteredCurrentPage(pageNumber);
    };


    return (
        <div>
             <Helmet>
                <title>Hotel Meal | Review</title>
            </Helmet>

            <div className="flex flex-col justify-center items-center gap-4 my-5">
                {/* <button onClick={handleLike}>Like</button> */}
                <h1 className="font-bold">Click Below To Change Sorting</h1>
                <button className="btn btn-primary" onClick={hanleReview}>{isReview?<p>Sorted By Review</p>:<p>Sorted By Like</p>}</button>
            </div>
            <table className="table w-full">
                <thead>
                    <tr>
                        <th>Meal Title</th>
                        <th>Number of Likes count</th>
                        <th>Number of Reviews count</th>
                        <th>Functional Delete button</th>
                        <th>View Meal Button</th>
                    </tr>
                </thead>
                <tbody>
                    {isReview==true && isLike==false?currentFilteredMenus
                        .slice() // Create a copy to avoid mutating original data
                        .sort((a, b) => {
                            // Assuming sorting by title (modify key as needed)
                            const titleA = a.reviews;
                            const titleB = b.reviews;

                            if (titleA > titleB) return -1;
                            if (titleA < titleB) return 1;
                            return 0;
                        })
                        .map((review) => (
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
                                    <NavLink to={`mealDetails/${review._id}`}>
                                        <button className="btn btn-primary">
                                            View Meal
                                        </button>
                                    </NavLink>
                                </td>
                            </tr>
                        )): currentFilteredMenus
                        .slice() // Create a copy to avoid mutating original data
                        .sort((a, b) => {
                            // Assuming sorting by title (modify key as needed)
                            const titleA = a.likes;
                            const titleB = b.likes;

                            if (titleA > titleB) return -1;
                            if (titleA < titleB) return 1;
                            return 0;
                        })
                        .map((review) => (
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

            {/* Pagination for Filtered Menus */}
            <ul className="pagination flex gap-4 justify-center items-center my-32">
                {Array.from({ length: filteredTotalPages }, (_, i) => (
                    <li
                        key={i + 1}
                        className={`pagination-item ${filteredCurrentPage === i + 1 ? "active" : ""}`}
                    >
                        <button className="btn" onClick={() => handleFilteredPagination(i + 1)}>
                            {i + 1}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AllReviewsPagination;

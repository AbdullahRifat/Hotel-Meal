// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import { FaTrashAlt, FaUser, FaUsers } from "react-icons/fa";
// import Swal from "sweetalert2";


// const Allusers = () => {
//     const axiosSecure = useAxiosSecure()

//     const { data: users = [] ,refetch} = useQuery({
//         queryKey: ['users'],
//         queryFn: async () => {
//             const res = await axiosSecure.get('/users');
//             return res.data;
//         }
//     })


//     //functions

//     const handleDeleteUser = (user)=>{
//         Swal.fire({
//             title: "Are you sure?",
//             text: "You won't be able to revert this!",
//             icon: "warning",
//             showCancelButton: true,
//             confirmButtonColor: "#3085d6",
//             cancelButtonColor: "#d33",
//             confirmButtonText: "Yes, delete it!"
//         }).then((result) => {
//             if (result.isConfirmed) {

//                 axiosSecure.delete(`/users/${user._id}`)
//                     .then(res => {
//                         if (res.data.deletedCount > 0) {
//                             refetch();
//                             Swal.fire({
//                                 title: "Deleted!",
//                                 text: "User has been deleted.",
//                                 icon: "success"
//                             });
//                         }
//                     })
//             }
//         });

//     }


//     const handleMakeAdmin= (user)=>{
//         Swal.fire({
//             title: "Are you sure?",
//             text: "You won't be able to revert this!",
//             icon: "warning",
//             showCancelButton: true,
//             confirmButtonColor: "#3085d6",
//             cancelButtonColor: "#d33",
//             confirmButtonText: "Yes, Make Admin",
//         }).then((result) => {
//             if (result.isConfirmed) {

//                 axiosSecure.patch(`users/admin/${user._id}`)
//                     .then(res => {
                       
//                         if (res.data.modifiedCount > 0) {
//                             refetch();
//                             Swal.fire({
//                                 title: `${user.name} is now Admin!`,
//                                 text: "User is Now Admin",
//                                 icon: "success"
//                             });
//                         }
//                     })
                    
      
//             }
//         });

//     }

//     return (
//         <div>
//             <div className="flex text-3xl justify-between">
//                 <h2>All Users</h2>
//                 <h2>Total users : {users.length}</h2>
//             </div>

//             <div className="flex items-center justify-center">
//               <input
//                     type="text"
//                     placeholder="Search by name or email"
//                     // value={searchTerm}
//                     // onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm on change
//                     className="border w-full border-gray-300 px-2 py-1 rounded-md mt-4"
//                 />
                
//             </div>
//             <div>


//                 <div className="overflow-x-auto">
//                     <table className="table table-zebra w-full">
//                         {/* head */}
                        
//                         <thead>
//                             <tr>
//                                 <th>Serial</th>
//                                 <td>Name</td>
//                                 <td>Email</td>
//                                 <td>Subscription</td>
//                                 <td>Role</td>
//                                 <td>Action</td>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {/* row 1 */}
//                           {
//                             users.map((user,idx) =>
//                                 <tr key={user._id}>
//                                 <th>{idx+1}</th>
//                                 <td>{user.name}</td>
//                                 <td>{user.email}</td>
//                                 <td>{user.subscription}</td>
//                                 <td > {
                                    
//                                     user.role==='admin'?<button className="btn btn-ghost btn-lg " ><FaUser></FaUser></button>:
//                                     <button 
//                                         onClick={() => handleMakeAdmin(user)}
//                                         className="btn btn-ghost btn-lg ">
//                                         <FaUsers className="text-red-600"></FaUsers>
//                                     </button>
                                    
//                                     }

//                                 </td>
//                                 <td> <button
//                                         onClick={() => handleDeleteUser(user)}
//                                         className="btn btn-ghost btn-lg">
//                                         <FaTrashAlt className="text-red-600"></FaTrashAlt>
//                                     </button>
//                                 </td>
//                             </tr>
                                
                                
                                
//                                 )
//                           }
                            
//                         </tbody>
//                     </table>
//                 </div>

//             </div>

//         </div>
//     );
// };

// export default Allusers;

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaTrashAlt, FaUser, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import LoaderAnimations from "../../Shared/Loader/LoaderAnmations";

const Allusers = () => {
    const axiosSecure = useAxiosSecure();
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const { isLoading, error, data, refetch } = useQuery({
      queryKey: ["users"],
      queryFn: async () => {
        const res = await axiosSecure.get("/users");
        return res.data;
      },
    });
  
    useEffect(() => {
      if (!isLoading && !error && data) {
        setUsers(data);
      }
    }, [isLoading, error, data]);
  
    const handleSearchChange = async (event) => {
      const searchTerm = event.target.value;
  
      setSearchTerm(searchTerm);
  
      try {
        const res = await axiosSecure.get(`/users/search?searchTerm=${searchTerm}`);
        setUsers(res.data);
      } catch (error) {
        console.error('Error searching users:', error);
      }
    };
       const handleDeleteUser = (user)=>{
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`/users/${user._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "User has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });

    }
    if (isLoading) {
        return <LoaderAnimations></LoaderAnimations>; // Show a loading indicator while fetching data
      }

    const handleMakeAdmin= (user)=>{
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Make Admin",
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.patch(`users/admin/${user._id}`)
                    .then(res => {
                       
                        if (res.data.modifiedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: `${user.name} is now Admin!`,
                                text: "User is Now Admin",
                                icon: "success"
                            });
                        }
                    })
                    
      
            }
        });

    }
   

    return (
        <div>
            <div className="flex text-3xl justify-between">
                <h2>All Users</h2>
                <h2>Total users : {users.length}</h2>
            </div>

            <div className="flex items-center justify-center">
                <input
                    type="text"
                    placeholder="Search by name or email"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="border w-full border-gray-300 px-2 py-1 rounded-md mt-4"
                />
            </div>

            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>Serial</th>
                            <td>Name</td>
                            <td>Email</td>
                            <td>Subscription</td>
                            <td>Role</td>
                            <td>Action</td>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, idx) => (
                            <tr key={user._id}>
                                <th>{idx + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.subscription}</td>
                                <td>
                                    {user.role === "admin" ? (
                                        <button className="btn btn-ghost btn-lg ">
                                            <FaUser></FaUser>
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => handleMakeAdmin(user)}
                                            className="btn btn-ghost btn-lg "
                                        >
                                            <FaUsers className="text-red-600"></FaUsers>
                                        </button>
                                    )}
                                </td>
                                <td>
                                    <button
                                        onClick={() => handleDeleteUser(user)}
                                        className="btn btn-ghost btn-lg"
                                    >
                                        <FaTrashAlt className="text-red-600"></FaTrashAlt>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Allusers;

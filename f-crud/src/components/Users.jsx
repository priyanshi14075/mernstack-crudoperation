import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Users() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001")
            .then(result => setUsers(result.data))
            .catch(err => console.log(err));
    }, []); // FIXED

    const handleDelete = (user_id) => {
        axios.delete("http://localhost:3001/deleteUser/" + user_id)
            .then(res => {
                console.log(res);
                window.location.reload();
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="d-flex vh-100 bg-dark bg-opacity-50 justify-content-center align-item-center">
            <div className="w-50 bg-light my-3 rounded p-3">
                <Link to="/create" className="btn btn-success my-3">Add +</Link>

                <table className="table bg-transparent table-bordered-bottom text-center">
                    <thead className="bg-dark text-white border-top">
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Age</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.age}</td>
                                <td>
                                    <Link to={`/update/${user._id}`} className="btn btn-success">Update</Link>
                                    <button
                                        className="btn btn-danger mx-3"
                                        onClick={() => handleDelete(user._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Users;

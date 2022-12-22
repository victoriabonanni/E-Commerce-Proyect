import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  useEffect(() => {
    const getUsers = async () => {
      const response = await axios.get("http://localhost:5001/api/users", {
        headers: {
          Authorization: token,
        },
      });

      console.log(response.data.users);
      setUsers(response.data.users);
      console.log(response.data);
    };
    getUsers();
  }, []);

  const deleteUser = (user) => {
    localStorage.setItem("user", user);
    let option = window.confirm("¿Seguro que quieres eliminar el usuario?");
    let user2 = localStorage.getItem("user");
    if (option == true) {
      try {
        const response = axios.delete(
          `http://localhost:5001/api/user/${user2}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        console.log(response);
        setTimeout(() => {
          window.location.href = "/all_users";
        }, 2000);
      } catch (error) {
        console.log(error.response);
      }
    }
  };

  return (
    <div>
      <h1 className="">Usuarios</h1>
      {users.map((usuarios) => {
        return (
          <div key={users._id}>
            <div class="">
              <h3 class="">{usuarios.name}</h3>
              <h6>{usuarios.email}</h6>
            </div>
            <div class="">
              <Link to={`/edit_user/${usuarios._id}`}>
                <button className="">Editar</button>
              </Link>

              <button
                onClick={() => {
                  deleteUser(usuarios._id);
                }}
                className=""
              >
                Eliminar Usuario
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Users;

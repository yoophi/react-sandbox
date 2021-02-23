import React from "react";
import axios from "axios";
import useAsync from "./useAsync";

async function getUser(id) {
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/users/${id}`
  );

  return response.data;
}

function User({ id }) {
  const [state] = useAsync(() => getUser(id), [id]);
  const { loading, data: user, error } = state;

  if (loading) return <div>loading...</div>;
  if (error) return <div>error occurred.</div>;
  if (!user) return null;

  return (
    <div>
      <h1>{user.username}</h1>
      <p>
        <b>Email:</b> {user.email}
      </p>
    </div>
  );
}

export default User;

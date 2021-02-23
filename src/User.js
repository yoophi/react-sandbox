import React from "react";
import axios from "axios";
import { useAsync } from "react-async";

async function getUser({ id }) {
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/users/${id}`
  );

  return response.data;
}

function User({ id }) {
  const { data: user, error, isLoading } = useAsync({
    promiseFn: getUser,
    id,
    watch: id,
  });

  if (isLoading) return <div>loading...</div>;
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

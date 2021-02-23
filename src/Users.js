import React, { useState } from "react";

import User from "./User";
import axios from "axios";
import useAsync from "./useAsync";

async function getUsers() {
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/users`
  );

  return response.data;
}

function Users() {
  const [userId, setUserId] = useState(null);
  const [state, refetch] = useAsync(getUsers, [], true);

  const { loading, data: users, error } = state;

  if (loading) return <div>loading...</div>;
  if (error) return <div>error occurred.</div>;
  if (!users) return <button onClick={refetch}>불러오기</button>;

  return (
    <>
      <ul>
        {users.map((user) => (
          <li
            key={user.id}
            onClick={() => setUserId(user.id)}
            style={{ cursor: "pointer" }}
          >
            {user.username} ({user.name})
          </li>
        ))}
      </ul>
      <button onClick={refetch}>불러오기</button>
      {userId && <User id={userId} />}
    </>
  );
}

export default Users;

import React, { useState } from "react";

import User from "./User";
import axios from "axios";
import { useAsync } from "react-async";

async function getUsers() {
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/users`
  );

  return response.data;
}

function Users() {
  const [userId, setUserId] = useState(null);
  const { data: users, error, isLoading, run } = useAsync({
    deferFn: getUsers,
  });

  if (isLoading) return <div>loading...</div>;
  if (error) return <div>error occurred.</div>;
  if (!users) return <button onClick={run}>불러오기</button>;

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
      <button onClick={run}>불러오기</button>
      {userId && <User id={userId} />}
    </>
  );
}

export default Users;

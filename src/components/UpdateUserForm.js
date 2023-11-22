import React, { useState, useEffect } from 'react';

const UpdateUserForm = () => {
  const [users, setUsers] = useState([]);

  // Fetch users from your API when the component mounts
  

  return (
    <table>
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          {/* Add more columns as needed */}
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user.id}>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{user.email}</td>
            {/* Add more cells as needed */}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UpdateUserForm;


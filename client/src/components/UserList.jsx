import axios from 'axios';

function UserList({ users, fetchUsers, setEditingUser, searchTerm }) {
  // Filter users based on search term
  const filteredUsers = users.filter((user) => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase());
  });

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`http://localhost:3000/api/users/${id}`);
        fetchUsers();  // Fetch the updated user list
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };
  

  return (
    <div>
      <h2>Users</h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>User ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
        {filteredUsers.map(user => (
  <tr key={user.id}> {/* Use user.id here */}
    <td>{user.firstName}</td>
    <td>{user.lastName}</td>
    <td>{user.email}</td>
    <td>{user.age}</td>
    <td>{user.id}</td>
    <td className="action-buttons">
      <button onClick={() => setEditingUser(user)}>Edit</button>
      <button onClick={() => handleDelete(user.id)}>Delete</button>
    </td>
  </tr>
))}

        </tbody>
      </table>
    </div>
  );
}

export default UserList;

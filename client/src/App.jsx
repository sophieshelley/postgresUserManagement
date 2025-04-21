import { useState, useEffect } from 'react';
import axios from 'axios';
import UserList from './components/UserList';
import UserForm from './components/UserForm';

function App() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingUser, setEditingUser] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');

  const fetchUsers = async () => {
    try {
      const res = await axios.get('https://postgresusermanagement-2.onrender.com/users');

      console.log('Fetched users:', res.data);
      setUsers(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSearch = async () => {
    try {
      const res = await axios.get(`https://postgresusermanagement-2.onrender.com/api/users/search?name=${searchTerm}`);
      setUsers(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSort = () => {
    const sorted = [...users].sort((a, b) => {
      if (sortOrder === 'asc') {
        if (a.firstName === b.firstName) {
          return a.lastName.localeCompare(b.lastName);
        }
        return a.firstName.localeCompare(b.firstName);
      } else {
        if (b.firstName === a.firstName) {
          return b.lastName.localeCompare(a.lastName);
        }
        return b.firstName.localeCompare(a.firstName);
      }
    });
    setUsers(sorted);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>User Management</h1>

      <div className="search-sort" style={{ marginBottom: '20px' }}>
        <input 
          type="text" 
          placeholder="Search by name..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSearch();
            }
          }}
          style={{ marginRight: '10px', padding: '5px' }}
        />
        
        <button onClick={handleSort}>
          Sort ({sortOrder})
        </button>
      </div>

      <UserForm fetchUsers={fetchUsers} editingUser={editingUser} setEditingUser={setEditingUser} />

      <UserList users={users} fetchUsers={fetchUsers} setEditingUser={setEditingUser} searchTerm={searchTerm} />
    </div>
  );
}

export default App;


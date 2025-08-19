import LoaderSpinner from '@/Components/shared/Loaders/Loader';
import TableDashboard from '@/Components/TableDashboard';
import { fetchUsers } from '@/Redux/slices/userSlice';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

function Users() {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const filteredUsers = users?.map(user => {
    return {
      id: user.id,
      name: user.username,
      email: user.email,
      password: user.password,
      role: user.role,
      address: user.address,
      phone: user.phone
    };
  }) || [];

  if (loading) return <LoaderSpinner />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <TableDashboard data={filteredUsers} type="users" />
    </div>
  )
}

export default Users;

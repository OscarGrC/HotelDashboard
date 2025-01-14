import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './common/Layout';
import { Dashboard } from './dashboard/pages/dashboard.jsx';
import { Rooms } from './rooms/pages/rooms.jsx';
import { RoomCreate } from './rooms/pages/roomsCreate.jsx';
import { RoomDetails } from './rooms/pages/roomsDetails.jsx';
import { RoomEdit } from './rooms/pages/roomsEdit.jsx';
import { Root } from './common/Root.jsx';
import { Login } from './login/login.jsx';
import { Bookings } from './booking/pages/booking.jsx'
import './index.css';
import PrivateRoute from './common/PrivatesRoute';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<Layout />}>
        <Route path="/" element={<PrivateRoute element={<Dashboard />} />} />
        <Route path="/Rooms" element={<PrivateRoute element={<Root />} />}>
          <Route path="" element={<PrivateRoute element={<Rooms />} />} />
          <Route path="details/:id" element={<PrivateRoute element={<RoomDetails />} />} />
          <Route path="create" element={<PrivateRoute element={<RoomCreate />} />} />
          <Route path="edit/:id" element={<PrivateRoute element={<RoomEdit />} />} />
        </Route>
        <Route path="/Bookings" element={<PrivateRoute element={<Root />} />}>
          <Route path="" element={<PrivateRoute element={<Bookings />} />} />
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
);

/*
  <Routes>
          <Route element={<Layout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="rooms" element={<Rooms />}>
              <Route path="create" element={<CreateRoom />} />
              <Route path="edit/:id" element={<EditRoom />} />
              <Route path="delete/:id" element={<DeleteRoom />} />
            </Route>
            <Route path="users" element={<Users />} />
            <Route path="contact" element={<Contact />} />
          </Route>
        </Routes>

*/
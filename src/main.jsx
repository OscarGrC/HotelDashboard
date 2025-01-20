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
import { BookingEdit } from './booking/pages/bookingEdit.jsx';
import { BookingCreate } from './booking/pages/bookingCreate.jsx';
import { BookingDetails } from './booking/pages/bookingDetail.jsx';
import { Users } from './users/pages/users.jsx'
import PrivateRoute from './common/PrivatesRoute';
import { UserDetail } from './users/pages/usersDetail.jsx';
import { UserCreate } from './users/pages/usersCreate.jsx';
import { UserEdit } from './users/pages/usersEdit.jsx';
import { Contact } from './contact/pages/contact.jsx';
import { Provider } from 'react-redux';
import { store } from './app/store';
import './index.css';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<Layout />}>
          <Route path="/" element={<PrivateRoute element={<Dashboard />} />} />
          <Route path="/rooms" element={<PrivateRoute element={<Root />} />}>
            <Route path="" element={<PrivateRoute element={<Rooms />} />} />
            <Route path="details/:id" element={<PrivateRoute element={<RoomDetails />} />} />
            <Route path="create" element={<PrivateRoute element={<RoomCreate />} />} />
            <Route path="edit/:id" element={<PrivateRoute element={<RoomEdit />} />} />
          </Route>
          <Route path="/Bookings" element={<PrivateRoute element={<Root />} />}>
            <Route path="" element={<PrivateRoute element={<Bookings />} />} />
            <Route path="details/:id" element={<PrivateRoute element={<BookingDetails />} />} />
            <Route path="create" element={<PrivateRoute element={<BookingCreate />} />} />
            <Route path="edit/:id" element={<PrivateRoute element={<BookingEdit />} />} />
          </Route>
          <Route path="/users" element={<PrivateRoute element={<Root />} />}>
            <Route path="" element={<PrivateRoute element={<Users />} />} />
            <Route path="details/:id" element={<PrivateRoute element={<UserDetail />} />} />
            <Route path="create" element={<PrivateRoute element={<UserCreate />} />} />
            <Route path="edit/:id" element={<PrivateRoute element={<UserEdit />} />} />
          </Route>
          <Route path="/contact" element={<PrivateRoute element={<Root />} />}>
            <Route path="" element={<PrivateRoute element={<Contact />} />} />

          </Route>
        </Route>
      </Routes>
    </Provider>
  </BrowserRouter>
);


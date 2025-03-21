import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './common/Layout';
import { Dashboard } from './dashboard/pages/dashboard.tsx';
import { Rooms } from './rooms/pages/rooms.tsx';
import { RoomCreate } from './rooms/pages/roomsCreate.tsx';
import { RoomDetails } from './rooms/pages/roomsDetails.tsx';
import { RoomEdit } from './rooms/pages/roomsEdit.tsx';
import { Root } from './common/Root.tsx';
import { Login } from './login/login.tsx';
import { Bookings } from './booking/pages/booking.tsx'
import { BookingEdit } from './booking/pages/bookingEdit.tsx';
import { BookingCreate } from './booking/pages/bookingCreate.tsx';
import { BookingDetails } from './booking/pages/bookingDetail.tsx';
import { Users } from './users/pages/users.tsx'
import PrivateRoute from './common/PrivatesRoute';
import { UserDetail } from './users/pages/usersDetail.tsx';
import { UserCreate } from './users/pages/usersCreate.tsx';
import { UserEdit } from './users/pages/usersEdit.tsx';
import { Contact } from './contact/pages/contact.tsx';
import { Provider } from 'react-redux';
import { store } from './app/store';
import './index.css';
import { AuthProvider } from './login/AuthContext.tsx';

createRoot(document.getElementById('root')).render(
  <AuthProvider>
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
            <Route path="/bookings" element={<PrivateRoute element={<Root />} />}>
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
  </AuthProvider>
);


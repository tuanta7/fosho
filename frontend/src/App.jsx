import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Page404 from './components/Page404';
import AuthLayout from './layouts/AuthLayout';
import LoginForm from './features/auth/LoginForm';
import RegisterForm from './features/auth/RegisterForm';
import PublicLayout from './layouts/PublicLayout';
import RestaurantList from './features/public/restaurants/RestaurantList';
import ItemList from './features/public/items/ItemList';

import Profile from './features/users/Profile';
import UserRestaurantList from './features/restaurants/UserRestaurantList';
import ProtectedLayout from './layouts/ProtectedLayout';
import RestaurantDetail from './features/restaurants/RestaurantDetail';
import DishDetail from './features/dishes/DishDetail';
import Cart from './features/cart/Cart';
import OrderList from './features/orders/OrderList';
import RestaurantOrderList from './features/restaurants/RestaurantOrderList';
import Search from './features/search/Search';

function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-left"
        gutter={12}
        containerStyle={{ margin: '2px', padding: '10px' }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: '18px',
            width: 'max-content',
            zIndex: 99,
          },
        }}
      />
      <Routes>
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<RestaurantList />} />
          <Route path="search" element={<Search />} />
          <Route path="restaurants" element={<RestaurantList />} />
          <Route path="restaurants/:restaurantId" element={<RestaurantDetail />} />
          <Route path="items" element={<ItemList />} />
        </Route>
        <Route path="/users/:userId" element={<ProtectedLayout />}>
          <Route index element={<Profile />} />
          <Route path="carts" element={<Cart />} />
          <Route path="orders" element={<OrderList />} />

          <Route path="info" element={<Profile />} />
          <Route path="restaurants" element={<UserRestaurantList />} />

          <Route path="restaurants/:restaurantId" element={<RestaurantDetail />} />
          <Route path="restaurants/:restaurantId/dishes/:dishId" element={<DishDetail />} />
          <Route path="restaurants/:restaurantId/orders" element={<RestaurantOrderList />} />
        </Route>
        <Route path="/auth" element={<AuthLayout />}>
          <Route index element={<LoginForm />} />
          <Route path="login" element={<LoginForm />} />
          <Route path="register" element={<RegisterForm />} />
        </Route>
        <Route path="*" element={<Page404 />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

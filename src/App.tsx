import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Link,
} from "react-router";
import { RoomsPage } from "./pages/RoomsPage";
import { RoomDetailPage } from "./pages/RoomDetailPage";
import { BookingsPage } from "./pages/BookingsPage";
import "./index.css";

const Layout = () => (
  <div className="app-container">
    <header>
      <h1>🦷 SmileCare Tandklinik</h1>
      <nav>
        <Link to="/">Behandlingsrum</Link>
        <Link to="/bookings">Alla bokningar</Link>
      </nav>
    </header>
    <main>
      <Outlet />
    </main>
  </div>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <RoomsPage /> },
      { path: "rooms/:id", element: <RoomDetailPage /> },
      { path: "bookings", element: <BookingsPage /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}

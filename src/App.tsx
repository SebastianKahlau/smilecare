import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Link,
} from "react-router";
import { RoomsPage } from "./pages/RoomsPage";
import { RoomDetailPage } from "./pages/RoomDetailPage";
import { BookingsPage } from "./pages/BookingsPage";

const Layout = () => (
  <div
    style={{
      maxWidth: "800px",
      margin: "0 auto",
      padding: "1.5rem",
      fontFamily: "system-ui, sans-serif",
    }}
  >
    <header
      style={{
        borderBottom: "2px solid #eee",
        paddingBottom: "1rem",
        marginBottom: "1.5rem",
      }}
    >
      <h1>🦷 SmileCare Tandklinik</h1>
      <nav style={{ display: "flex", gap: "1.5rem", marginTop: "0.5rem" }}>
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: "#0066cc",
            fontWeight: "bold",
          }}
        >
          Behandlingsrum
        </Link>
        <Link
          to="/bookings"
          style={{
            textDecoration: "none",
            color: "#0066cc",
            fontWeight: "bold",
          }}
        >
          Alla bokningar
        </Link>
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

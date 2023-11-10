import { NavLink, Outlet } from "react-router-dom";
import "./Layout.css";

export default function Layout() {
  return (
    <div className="wrapper">
      <div>
        <header className="header-wrapper">
          <NavLink
            to="/albums"
            end={true}
            className={({ isActive }) => (isActive ? "link-active" : "")}
          >
            Albums
          </NavLink>
          <NavLink
            to="/users"
            className={({ isActive }) => (isActive ? "link-active" : "")}
          >
            Users
          </NavLink>
        </header>
      </div>
      <div>
        <main className="main-wrap">
          <Outlet />
        </main>
      </div>
      <footer className="footer">
        <hr></hr>
        <div className="footer_info">
          <div>Created by:Tonoyan Anna</div>
          <div>BSU:2023</div>
        </div>
      </footer>
    </div>
  );
}

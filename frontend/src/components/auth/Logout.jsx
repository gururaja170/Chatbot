import { logout } from "../../services/authService";

const Logout = () => {
  logout();
  window.location.replace("/");
};

export default Logout;

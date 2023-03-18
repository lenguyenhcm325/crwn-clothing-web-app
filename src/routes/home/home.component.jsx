import { Outlet } from "react-router-dom";

import CategoryItem from "../../components/directory-item/directory-item.component";
import Directory from "../../components/directory/directory.component";
const Home = () => {
  return (
    <div>
      <Directory />
      <Outlet />
    </div>
  );
};

export default Home;

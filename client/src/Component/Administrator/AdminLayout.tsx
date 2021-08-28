import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
const AdminLayout = (props: any) => {
  return (
    <div>
      <Topbar />
      <div className="" style={{ display: "flex", backgroundColor: "white" }}>
        <Sidebar />
        {props.children}
      </div>
    </div>
  );
};

export default AdminLayout;

import Sidebar from "../Administrator/components/sidebar/Sidebar";
import Topbar from '../Administrator/components/topbar/Topbar'
import "../Administrator/Appl.css";
const AdminLayout = (props: any) => {
  return (
    <div>
     <Topbar/>
     <div className='' style={{display:'flex',backgroundColor:'white'}}>
      <Sidebar/>
      {props.children}
     </div>

    </div>
  );
};

export default AdminLayout;

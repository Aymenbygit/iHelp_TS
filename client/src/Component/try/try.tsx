import React, { useState } from "react";
import { Settings } from "@material-ui/icons";
import AdminLayout from "../Admin/AdminLayout";

const Try = () => {
  const [toggle, setToggle] = useState(false);
  const handleToggle = () => {
    setToggle(!toggle);
  };
  return (
    <AdminLayout>

    </AdminLayout>
  );
};

export default Try;

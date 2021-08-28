import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./Component/header_footer/Header";
import Login from "./Component/login/Login";
import Posts from "./Component/post/Posts";
import SignUp from "./Component/signUp/SignUp";
import Home from "./Component/home/Home";
import Activity from "./Component/activity/Activity";
import Mycomments from "./Component/activity/MyComments";
import SavedPosts from "./Component/activity/SavedPosts";
import PrivateRoutes from "./Component/authRoutes/privateRoutes";
import PublicRoute from "./Component/authRoutes/publicRoutes";
import Notfound from "./Component/home/Notfound";
import EditPersonel from "./Component/profile/EditPersonel";
import EditEducation from "./Component/profile/EditEducation";
import EditContact from "./Component/profile/EditContact";
import Messages from "./Component/contactUs/Message";
import About from "./Component/home/About";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import Delete from "./Component/profile/Delete";
import EditPost from "./Component/post/EditPost";
import HelpCenter from "./Component/home/HelpCenter";
import Footer from "./Component/header_footer/Footer";
import PostsList from "./Component/post/PostsList";
import UserList from "./Component/users/UserList";
import UserDetail from "./Component/users/UserDetail";
import MyPosts from "./Component/activity/MyPosts";
import HomeADM from "./Component/Administrator/pages/home/Home";
import UsersList from "./Component/Administrator/pages/userList/UserList";
import User from "./Component/Administrator/pages/user/User";
import NewUser from "./Component/Administrator/pages/newUser/NewUser";
import ProductList from "./Component/Administrator/pages/productList/ProductList";
import Product from "./Component/Administrator/pages/product/Product";
import NewProduct from "./Component/Administrator/pages/newProduct/NewProduct";
import ReportList from "./Component/Administrator/pages/reports/ReportList";
import AdminMessages from "./Component/Administrator/pages/messages/MessagesList";
import Message from "./Component/Administrator/pages/messages/Messag";
import ReportModel from "./Component/Administrator/pages/reports/Report";
import Staff from "./Component/Administrator/pages/staff/Staff";
import Try from "./Component/try/try";

function App() {
  const UserReducer = useSelector((state: any) => state.UserReducer);
  const AuthReducer = useSelector((state: any) => state.AuthReducer);
  const PostList = useSelector((state: any) => state.PostReducer);
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();
  const search = (inputValue: any) => {
    setSearchValue(inputValue);
  };

  return (
    <Router>
      <Header />
      <Switch>
        <PrivateRoutes
          exact
          path="/profile/user/personal_information"
          component={EditPersonel}
        />
        <PrivateRoutes
          exact
          path="/profile/user/work_education"
          component={EditEducation}
        />
        <PrivateRoutes
          exact
          path="/profile/user/contact"
          component={EditContact}
        />
        <PrivateRoutes exact path="/edit_post/:id" component={EditPost} />

        <PrivateRoutes exact path="/profile/user/delete" component={Delete} />

        <PrivateRoutes
          exact
          path="/activity/saved_posts"
          component={SavedPosts}
        />
        <PrivateRoutes
          exact
          path="/activity/my_comments"
          component={Mycomments}
        />
        <PrivateRoutes exact path="/activity/my_posts" component={MyPosts} />
        <PrivateRoutes exact path="/activity" component={Activity} />
        {AuthReducer.user && AuthReducer.user.type === true ? (
          <Route exact path="/" component={HomeADM} />
        ) : (
          <Route exact path="/" component={Home} />
        )}
        <Route
          exact
          path="/posts"
          render={() => (
            <PostsList
              postss={
                PostList &&
                PostList.filter((posts: any) =>
                  posts.title
                    .toLowerCase()
                    .includes(searchValue.toLowerCase().trim())
                )
              }
              search={search}
            />
          )}
        />

        <Route
          exact
          path="/posts/:id"
          render={(props) => <Posts PostList={PostList} {...props} />}
        />
        <Route
          exact
          path="/users"
          render={() => (
            <UserList
              users={
                UserReducer &&
                UserReducer.filter(
                  (user: any) =>
                    user.username
                      .toLowerCase()
                      .includes(searchValue.toLowerCase().trim()) ||
                    user.first_name
                      .toLowerCase()
                      .includes(searchValue.toLowerCase().trim()) ||
                    user.last_name
                      .toLowerCase()
                      .includes(searchValue.toLowerCase().trim())
                )
              }
              search={search}
            />
          )}
        />
        <PublicRoute exact path="/login" component={Login} />
        <PublicRoute exact path="/register" component={SignUp} />
        <Route exact path="/user/:id" component={UserDetail} />
        <PublicRoute exact path="/contactUs" component={Messages} />
        <PublicRoute exact path="/aboutUs" component={About} />
        <PublicRoute exact path="/helpcenter" component={HelpCenter} />

        {/*----------- Admin layout----------- */}
        <PrivateRoutes exact path="/admin" component={HomeADM} />
        <PrivateRoutes exact path="/admin/userslist" component={UsersList} />
        <PrivateRoutes exact path="/admin/user/:id" component={User} />
        {/* <PrivateRoutes exact path="/admin/newUser" component={NewUser} /> */}
        <PrivateRoutes exact path="/admin/products" component={ProductList} />
        <PrivateRoutes exact path="/admin/product/:id" component={Product} />
        <PrivateRoutes exact path="/admin/newproduct" component={NewProduct} />
        <PrivateRoutes exact path="/admin/ReportList" component={ReportList} />
        <PrivateRoutes
          exact
          path="/admin/ReportList/:id"
          component={ReportModel}
        />
        <PrivateRoutes
          exact
          path="/admin/adminmessages"
          component={AdminMessages}
        />
        <PrivateRoutes
          exact
          path="/admin/adminmessages/:id"
          component={Message}
        />
        <PrivateRoutes exact path="/admin/staff" component={Staff} />
        {/* ------------------------*/}
        <Route exact path="/Try" component={Try} />

        <PublicRoute restricted={false} component={Notfound} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;

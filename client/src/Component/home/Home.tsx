import React, { useEffect } from "react";
import Curcly from "../../Resource/imgs/curly-bracket.jpg";
import NeedHelp from "../../Resource/imgs/needHelp.jpg";
import Math from "../../Resource/imgs/math.jpg";
import { useDispatch, useSelector } from "react-redux";
import { getOps } from "../../redux/action/postAction";
import { allUsers } from "../../redux/action/authAction";

const Home = () => {
  const PostList = useSelector((state:any) => state.PostReducer);
  const UserReducer = useSelector((state:any) => state.UserReducer);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(allUsers());
    dispatch(getOps());
  }, [dispatch]);
  return (
    <div className="tm-container mx-auto">
      <section>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 order-lg-2">
              <div className="p-5">
                <img
                  className="img-fluid rounded-circle"
                  src={NeedHelp}
                  alt="..."
                />
              </div>
            </div>
            <div className="col-lg-6 order-lg-1">
              <div className="p-5">
                <h2 className="display-4">A public Knowledge Sharing Platform</h2>
                <p>
                  
                </p>
              </div>
            </div>
          </div>

          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="p-5">
                <img
                  className="img-fluid rounded-circle"
                  src={Math}
                  alt="..."
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="p-5">
                <h2 className="display-4">join our community!</h2>
                <p>
                  It is time to head towards researching the challenges of the
                  future and making human life better and better.
                </p>
              </div>
            </div>
          </div>

          <div className="row align-items-center">
            <div className="col-lg-6 order-lg-2">
              <div className="p-5">
                <img
                  className="img-fluid rounded-circle"
                  src={Curcly}
                  alt="..."
                />
              </div>
            </div>
            <div className="col-lg-6 order-lg-1">
              <div className="p-5">
                <h2 className="display-4">
                  This is a professional space that contains a lot of expertise
                  and expertise!
                </h2>
                <p>
                  The main goal is to provide assistance, spread the spirit of
                  giving, volunteer work, and exchange experiences and
                  knowledge..
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section_2">
        <div className="container">
          <div className="row home_sec_2">
            <div className="col-md-3 col-sm-6" style={{ paddingBottom: 60 }}>
              <div className="fun-box text-center">
                <i className="fas fa-flag"></i>

                <div className="value" style={{ padding: 30 }}>
                  {PostList && PostList.length}
                </div>
                <div className="title">Posts</div>
              </div>
            </div>

            <div className="col-md-3 col-sm-6 " style={{ paddingBottom: 60 }}>
              <div className="fun-box text-center">
                <i className="fas fa-users"></i>

                <div className="value" style={{ padding: 30 }}>
                  {UserReducer && UserReducer.length}
                </div>
                <div className="title">Users</div>
              </div>
            </div>

            <div className="col-md-3 col-sm-6" style={{ paddingBottom: 35 }}>
              <div className="fun-box text-center">
                <i className="fas fa-eye"></i>

                <div className="value" style={{ padding: 30 }}>
                  100+ million
                </div>
                <div className="title">Monthly visitors to our network</div>
              </div>
            </div>

            <div className="col-md-3 col-sm-6">
              <div className="fun-box text-center">
                <i className="fas fa-hourglass-start"></i>

                <div className="value" style={{ padding: 30 }}>
                  2 minutes
                </div>
                <div className="title">Average time between new questions</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div>new section</div>
      </section>
    </div>
  );
};

export default Home;

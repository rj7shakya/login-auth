import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../context/authContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import setAuthToken from "../xtra/setAuthToken";

const Login = (props) => {
  const authContext = useContext(AuthContext);
  // eslint-disable-next-line
  const { forgetpw, isAuthenticated, url } = authContext;
  // let loadurl = false;
  const [user, setUser] = useState({
    email: "",
  });

  const [isurl, setisurl] = useState(false);
  useEffect(() => {
    setisurl(true);
    // showurl();
  }, [url]);

  const { email } = user;

  const onChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(email)) {
      toast.error("Invalid email ", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } else {
      forgetpw({ email })
        .then((res) => {
          console.log(url);
          toast.success("link sent", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        })
        .catch((error) => {
          console.log(error);
          toast.error(error, {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        });
    }
  };

  return (
    <div className="form-container">
      <h1>Forget password?</h1>
      <form action="" onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="text" name="email" value={email} onChange={onChange} />
        </div>
        <input
          type="submit"
          value="Get Link"
          className="btn btn-primary btn-block"
        />
      </form>
      <br />
      <br />
      <span> {url && <a href={url.url}>reset url</a>} </span>
    </div>
  );
};

export default Login;

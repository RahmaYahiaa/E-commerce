import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2'; // Import SweetAlert2

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});
  const [userData, setUserData] = useState([]);

 
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUserData(storedUsers);
  }, []);

  const handlerEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlerPassword = (e) => {
    setPassword(e.target.value);
  };

  const sumbitHandler = (e) => {
    e.preventDefault(); // منع تحديث الصفحة
    if (hasErrors(email, password)) {
      console.log(error.email);
      console.log(error.password);
    } else {
      console.log({ email, password });

      // حفظ البيانات في localStorage
      const newUser = { email, password };
      const updatedUserData = [...userData, newUser];
      setUserData(updatedUserData);
      localStorage.setItem("users", JSON.stringify(updatedUserData));

      // عرض رسالة تأكيد
      Swal.fire({
        icon: 'success',
        title: 'Login Successful',
        text: `Welcome, ${email}!`,
      });

      // إعادة تعيين الحقول بعد الحفظ
      setEmail("");
      setPassword("");
    }
  };

  const hasErrors = (email, password) => {
    const errors = {};
    if (!email.match(/^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/)) {
      errors.email = "Invalid email";
    }
    if (password.length < 8) {
      errors.password = "Invalid password";
    }
    setError(errors);
    return Object.keys(errors).length;
  };

  return (
    <div className="container py-5 my-5">
      <h2 className="text-center mb-4">Login</h2>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={sumbitHandler} noValidate className="border p-4 rounded shadow">
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                value={email}
                onChange={handlerEmail}
                required
              />
              {error.email && (
                <div id="emailHelp" className="form-text text-danger">
                  {error.email}
                </div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                value={password}
                onChange={handlerPassword}
                required
              />
              {error.password && (
                <div id="passwordHelp" className="form-text text-danger">
                  {error.password}
                </div>
              )}
            </div>
            <button type="submit" className="btn btn-primary w-100">Submit</button>
          </form>
        </div>
      </div>

      {/* عرض بيانات المستخدمين في جدول */}
      <div className="row mt-5">
        <div className="col-md-8 offset-md-2">
          <h3 className="text-center">Users Data</h3>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Email</th>
                <th>Password</th>
              </tr>
            </thead>
            <tbody>
              {userData.length > 0 ? (
                userData.map((user, index) => (
                  <tr key={index}>
                    <td>{user.email}</td>
                    <td>{user.password}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2">No users available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

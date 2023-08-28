import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Button, Checkbox, Form, Input, notification } from "antd";
import { useDispatch } from "react-redux";
import { setUserLoginStatus } from "../features/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [alertInfo, setAlertInfo] = useState(false);

  const handleLoginSuccess = () => {
    dispatch(setUserLoginStatus(true));
    navigate("/");
    notification.success({
      message: "Login Successful",
      duration: 3,
    });
    form.resetFields();
    setAlertInfo(false);
  };

  const handleLoginFailure = () => {
    setAlertInfo(true);
  };

  const onFinish = async (values) => {
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      handleLoginSuccess();
    } catch (error) {
      handleLoginFailure();
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleButtonClick = () => {
    navigate("/signup");
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Sign In</h1>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="on"
        form={form}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please input your email!" },
            { type: "email", message: "Please enter a valid email address!" },
          ]}
        >
          <Input placeholder="Enter email" style={{ width: "300px" }} />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password
            style={{ width: "300px" }}
            placeholder="Enter password"
          />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      {alertInfo && (
        <p className="alert-message">Please enter correct email/password</p>
      )}
      <div className="btn-container">
        <Button type="link" onClick={handleButtonClick}>
          Register for a new account
        </Button>
      </div>
    </div>
  );
};

export default Login;

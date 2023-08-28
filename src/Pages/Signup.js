import React from "react";
import { auth, database } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { set } from "firebase/database";
import { Button, Form, Input, notification } from "antd";

const Signup = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      
      const res = await createUserWithEmailAndPassword(auth, values.email, values.password);
      const user = res.user;

      notification.success({
        message: "Sign Up Successful",
        description: "You have successfully signed up.",
        duration: 3,
      });
      navigate("/home", { replace: true });

      
      await updateProfile(user, {
        displayName: values.name,
        photoURL: "https://phantom-elmundo.unidadeditorial.es/9e302c2e024f70492ed7cf27eaa6e61d/crop/0x0/1349x898/resize/414/f/jpg/assets/multimedia/imagenes/2019/08/12/15656006955566.jpg"
      });
      
      const userInfoInDB = database.ref(`users/${user.uid}`);
      await set(userInfoInDB, {
        email: values.email,
        username: values.name,
        phone: values["phone-number"],
      });
      
      
      form.resetFields();

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="signup-container">
      <h1 className="signup-title">Sign up for a new account</h1>
      <Form layout="vertical" onFinish={onFinish} form={form} style={{ width: "400px" }}>
        <Form.Item
          label="Name"
          name="name"
          rules={[
            { required: true, message: "Please input your name!" },
            { min: 3, message: "Name must be at least 3 characters long." },
            { max: 20, message: "Name cannot exceed 20 characters." },
          ]}
        >
          <Input size="large" placeholder="Enter name" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please input your email!" },
            { type: "email", message: "Please enter a valid email address!" },
          ]}
        >
          <Input size="large" placeholder="Enter email" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            { required: true, message: "Please input your password!" },
            { min: 6, message: "Password must be at least 6 characters long." },
          ]}
        >
          <Input.Password placeholder="Enter password" size="large"/>
        </Form.Item>

        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          dependencies={["password"]}
          rules={[
            { required: true, message: "Please confirm your password!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords do not match.")
                );
              },
            }),
          ]}
        >
          <Input.Password size="large" placeholder="Confirm password" />
        </Form.Item>

        <Form.Item
          label="Phone Number"
          name="phone-number"
          rules={[
            { required: true, message: "Please input your phone number!" },
            {
              pattern: /^[0-9]+$/,
              message: "Please enter a valid phone number.",
            },
          ]}
        >
          <Input size="large" placeholder="Phone Number"></Input>
        </Form.Item>

        <Form.Item>
          <Button block type="primary" htmlType="submit" size="large" style={{ fontFamily: "Poppins", fontSize: "15px" }}>
            Sign Up
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Signup;

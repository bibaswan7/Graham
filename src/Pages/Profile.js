import React, { useState } from "react";
import { Descriptions, Button, Input, Form, Alert } from "antd";
import { updateProfile, updateEmail } from "firebase/auth";
import { auth } from "../firebase";

import { useSelector, useDispatch } from "react-redux";
import { setAuthUser } from "../features/authSlice";

export default function Profile() {
  const authUser = useSelector((state) => state.auth.authUser);
  const [inputField, setInputField] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const toggleInputField = () => {
    setInputField((prev) => !prev);
  };

  const handleFormSubmit = async (values) => {
    const user = auth.currentUser;

    try {
      await updateProfile(user, { displayName: values.name });
      await updateEmail(user, values.email);
      dispatch(setAuthUser(user));
      setError(null);
      toggleInputField();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="profile-container">
      {error && <Alert message={error} type="error" />}
      {!inputField ? (
        <>
          <h1>User info</h1>
          <Descriptions column={1}>
            <div>
              <strong>UserName:</strong> <span style={{ marginLeft: "0.5em" }}>{authUser.displayName}</span>
            </div>
            <div>
              <strong>Email:</strong><span style={{ marginLeft: "0.5em" }}> {authUser.email}</span>
            </div>
          </Descriptions>
          <Button type="primary" onClick={toggleInputField}>
            Edit info
          </Button>
        </>
      ) : (
        <>
          <h1>Update information</h1>
          <Form
            initialValues={{
              name: authUser.displayName,
              email: authUser.email,
            }}
            onFinish={handleFormSubmit}
            onFinishFailed={(errorInfo) => setError("Failed: " + errorInfo)}
            labelCol={{ span: 3 }}
            wrapperCol={{ span: 10 }}
          >
            <Form.Item label="Username" name="name">
              <Input />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  type: "email",
                  message: "Please enter a valid email address!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Save changes
              </Button>
            </Form.Item>
          </Form>
        </>
      )}
    </div>
  );
}

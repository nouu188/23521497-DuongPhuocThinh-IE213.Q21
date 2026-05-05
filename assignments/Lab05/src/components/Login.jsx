import { useState } from "react";
import { Button, Form } from "react-bootstrap";

function Login({ onLogin }) {
  const [user, setUser] = useState({
    name: "",
    id: "",
  });

  const updateField = (field) => (event) => {
    setUser((currentUser) => ({
      ...currentUser,
      [field]: event.target.value,
    }));
  };

  const submitForm = (event) => {
    event.preventDefault();
    onLogin({
      name: user.name.trim(),
      id: user.id.trim(),
    });
  };

  return (
    <section className="form-panel">
      <h1>Login</h1>
      <p className="muted-copy">
        Use a simple local identity so you can add, update, and delete your own
        reviews.
      </p>

      <Form onSubmit={submitForm}>
        <Form.Group className="mb-3" controlId="loginName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={user.name}
            onChange={updateField("name")}
            placeholder="Enter your display name"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="loginId">
          <Form.Label>User ID</Form.Label>
          <Form.Control
            type="text"
            value={user.id}
            onChange={updateField("id")}
            placeholder="Enter your student ID"
            required
          />
        </Form.Group>

        <Button type="submit" className="btn-brand">
          Continue
        </Button>
      </Form>
    </section>
  );
}

export default Login;

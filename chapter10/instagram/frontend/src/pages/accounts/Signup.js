import React, { useState, useEffect } from "react";
import { Alert } from "antd";
import { useHistory } from "react-router-dom";
import Axios from "axios";

export default function Signup() {
  const history = useHistory();
  const [inputs, setInputs] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formDisabled, setFormDisabled] = useState(true);

  const onSubmit = (e) => {
    e.preventDefault();

    setLoading(true);
    setErrors({});

    Axios.post("http://localhost/accounts/signup/", inputs)
      .then((response) => {
        console.log("response", response);
        history.push("/accounts/login");
      })
      .catch((error) => {
        console.log("error response : ", error.response.data);
        console.log("error : ", error);
        if (error.response) {
          setErrors({
            username: (error.response.data.username || []).join(" "),
            password: (error.response.data.password || []).join(" "),
          });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    const isEnabled = Object.values(inputs).every((s) => s.length > 0);
    setFormDisabled(!isEnabled);
    //   const isDisabled = inputs.username.length > 0 || inputs.password.length > 0;
    //   setFormDisabled(isDisabled);
  }, [inputs]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <input type="text" name="username" onChange={onChange} />
          {errors.username && <Alert type="error" message={errors.username} />}
        </div>
        <div>
          <input type="password" name="password" onChange={onChange} />
          {errors.password}
        </div>
        <input
          type="submit"
          value="회원가입"
          disabled={loading || formDisabled}
        />
      </form>
    </div>
  );
}

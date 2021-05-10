import React from "react";
import { Link } from "react-router-dom";
import validator from "validator";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../hooks/useForm";
import { removeError, setError } from "../../actions/ui";
import { startRegisterWithEmail } from "../../actions/auth";

export const RegisterScreen = () => {
  const dispatch = useDispatch();

  const { msgError } = useSelector( state => state.ui );

  const [formValues, handleInputChange] = useForm({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formValues;

  const handleRegister = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      dispatch(startRegisterWithEmail(email, password, name))
    }
  };

  const isFormValid = () => {
    if (name.trim().length === 0) {
      dispatch(setError("Name invalid"));
      return false;
    } else if (!validator.isEmail(email)) {
      dispatch(setError("Email invalid"));
      return false;
    } else if (password.length < 6) {
      dispatch(setError("Password should have more than 5 characters"));
      return false;
    } else if (password !== password2) {
      dispatch(setError("Password dosn't match"));
      return false;
    }

    dispatch(removeError())
    return true;
  };

  return (
    <div className='animate__animated animate__fadeIn animate__faster'>
      <h3 className="auth__title mb-5">Register</h3>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          autoComplete="off"
          className="auth__input"
          placeholder="Name"
          name="name"
          value={name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          autoComplete="off"
          className="auth__input"
          placeholder="Email"
          name="email"
          value={email}
          onChange={handleInputChange}
        />
        <input
          type="password"
          className="auth__input"
          placeholder="Password"
          name="password"
          value={password}
          onChange={handleInputChange}
        />
        <input
          type="password"
          className="auth__input"
          placeholder="Confirm password"
          name="password2"
          value={password2}
          onChange={handleInputChange}
        />
        <button className="btn btn-primary btn-block mb-5" type="submit">
          Register
        </button>
        {
          msgError !== null && <div className="auth__alert-error">{msgError}</div> 
        }
        <Link className="link" to="/auth/login">
          Already have an account?
        </Link>
      </form>
    </div>
  );
};

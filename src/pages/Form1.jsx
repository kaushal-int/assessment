import { useState } from "react";
import PropTypes from "prop-types";

const Form1 = ({ formData, setFormData, navigation }) => {
  const { emailId, password } = formData;
  const { next, previous } = navigation;

  const [errors, setErrors] = useState({});

  const validate = () => {
    let valid = true;
    const newErrors = {};

    if (!emailId) {
      newErrors.emailId = "Email ID is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(emailId)) {
      newErrors.emailId = "Email ID is invalid";
      valid = false;
    }

    if (!password) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (
      !/(?=.*[A-Z].*[A-Z])(?=.*[a-z].*[a-z])(?=.*\d.*\d)(?=.*[!@#$%^&*()_+}{":;'?/>.<,]).{8,}/.test(
        password,
      )
    ) {
      newErrors.password =
        "Password must contain 2 capital letters, 2 small letters, 2 numbers, and 2 special characters";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      next();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="emailId" className="block text-sm font-medium text-gray-500">
          Email ID
        </label>
        <input
          type="email"
          id="emailId"
          name="emailId"
          value={emailId}
          onChange={(e) => setFormData({ ...formData, emailId: e.target.value })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-purple-500 sm:text-sm"
        />
        {errors.emailId && <p className="text-sm text-red-500">{errors.emailId}</p>}
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-500">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-purple-500 sm:text-sm"
        />
        {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
      </div>
      <div className="flex justify-between">
        <button
          onClick={previous}
          className="mr-4 rounded bg-gray-300 px-4 py-2 text-gray-700 disabled:bg-gray-100"
          disabled={true}
        >
          Back
        </button>
        <button
          type="submit"
          className=" mr-4 rounded bg-purple-500 px-4 py-2 text-white hover:bg-purple-600"
        >
          Save
        </button>
        <button
          type="submit"
          className="rounded bg-orange-500 px-4 py-2 text-white hover:bg-orange-600"
        >
          Save & next
        </button>
      </div>
    </form>
  );
};

Form1.propTypes = {
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};
export default Form1;

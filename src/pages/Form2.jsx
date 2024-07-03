import { useState } from "react";
import PropTypes from "prop-types";

const Form2 = ({ formData, setFormData, navigation }) => {
  const { firstName, lastName, address } = formData;
  const { previous, next } = navigation;

  const [errors, setErrors] = useState({});

  const validate = () => {
    let valid = true;
    const newErrors = {};

    if (!firstName) {
      newErrors.firstName = "First Name is required";
      valid = false;
    } else if (!/^[a-zA-Z]+$/.test(firstName)) {
      newErrors.firstName = "First Name must contain only alphabets";
      valid = false;
    } else if (firstName.length < 2 || firstName.length > 50) {
      newErrors.firstName = "First Name must be between 2 to 50 characters";
      valid = false;
    }

    if (lastName && !/^[a-zA-Z]+$/.test(lastName)) {
      newErrors.lastName = "Last Name must contain only alphabets";
      valid = false;
    }

    if (!address || address.length < 10) {
      newErrors.address = "Address is required and must be at least 10 characters";
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
        <label htmlFor="firstName" className="block text-sm font-medium text-gray-500">
          First Name
        </label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={firstName}
          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-purple-500 sm:text-sm"
        />
        {errors.firstName && <p className="text-sm text-red-500">{errors.firstName}</p>}
      </div>
      <div>
        <label htmlFor="lastName" className="block text-sm font-medium text-gray-500">
          Last Name
        </label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={lastName}
          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-purple-500 sm:text-sm"
        />
        {errors.lastName && <p className="text-sm text-red-500">{errors.lastName}</p>}
      </div>
      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-500">
          Address
        </label>
        <textarea
          id="address"
          name="address"
          value={address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-purple-500 sm:text-sm"
        />
        {errors.address && <p className="text-sm text-red-500">{errors.address}</p>}
      </div>
      <div className="flex justify-between">
        <button onClick={previous} className="mr-4 rounded bg-gray-300 px-4 py-2 text-gray-700">
          Back
        </button>
        <button
          type="submit"
          className="mr-4 rounded bg-purple-500 px-4 py-2 text-white hover:bg-purple-600"
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
Form2.propTypes = {
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};
export default Form2;

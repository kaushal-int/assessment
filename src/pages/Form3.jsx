import { useState } from "react";
import PropTypes from "prop-types";

const Form3 = ({ formData, setFormData, navigation }) => {
  const { countryCode, phoneNumber, acceptTermsAndCondition } = formData;
  const { previous, save } = navigation;

  const [errors, setErrors] = useState({});

  const validate = () => {
    let valid = true;
    const newErrors = {};

    if (!countryCode) {
      newErrors.countryCode = "Country Code is required";
      valid = false;
    }

    if (!phoneNumber || !/^\d{10}$/.test(phoneNumber)) {
      newErrors.phoneNumber = "Phone Number is required and must be 10 digits";
      valid = false;
    }

    if (!acceptTermsAndCondition) {
      newErrors.acceptTermsAndCondition = "Please accept the terms and conditions";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      save();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="countryCode" className="block text-sm font-medium text-gray-500">
          Country Code
        </label>
        <select
          id="countryCode"
          name="countryCode"
          value={countryCode}
          onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-purple-500 sm:text-sm"
        >
          <option value="">Select Country Code</option>
          <option value="+91">India (+91)</option>
          <option value="+1">America (+1)</option>
        </select>
        {errors.countryCode && <p className="text-sm text-red-500">{errors.countryCode}</p>}
      </div>
      <div>
        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-500">
          Phone Number
        </label>
        <input
          type="text"
          id="phoneNumber"
          name="phoneNumber"
          value={phoneNumber}
          onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-purple-500 sm:text-sm"
        />
        {errors.phoneNumber && <p className="text-sm text-red-500">{errors.phoneNumber}</p>}
      </div>
      <div>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={acceptTermsAndCondition}
            onChange={(e) =>
              setFormData({ ...formData, acceptTermsAndCondition: e.target.checked })
            }
            className="form-checkbox h-4 w-4 text-indigo-600"
          />
          <span className="ml-2 text-gray-700">I accept the terms and conditions</span>
        </label>
        {errors.acceptTermsAndCondition && (
          <p className="text-sm text-red-500">{errors.acceptTermsAndCondition}</p>
        )}
      </div>
      <div className="flex justify-between">
        <button
          type="button"
          onClick={previous}
          className="mr-4 rounded bg-gray-300 px-4 py-2 text-gray-700"
        >
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
          disabled={true}
          className="disable rounded bg-orange-300 px-4 py-2 text-white"
        >
          Save & next
        </button>
      </div>
    </form>
  );
};
Form3.propTypes = {
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};
export default Form3;

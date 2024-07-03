import { useState } from "react";
import Form1 from "./Form1";
import Form2 from "./Form2";
import Form3 from "./Form3";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const [formData, setFormData] = useState({
    emailId: "",
    password: "",
    firstName: "",
    lastName: "",
    address: "",
    countryCode: "",
    phoneNumber: "",
    acceptTermsAndCondition: false,
  });
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [success, setSuccess] = useState();
  const next = () => {
    setCurrentStep(currentStep + 1);
  };

  const previous = () => {
    setCurrentStep(currentStep - 1);
  };

  const save = async () => {
    try {
      const response = await fetch("https://codebuddy.review/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emailId: formData.emailId,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName,
          address: formData.address,
          countryCode: formData.countryCode,
          phoneNumber: formData.phoneNumber,
        }),
      });
      const data = await response.json();
      setSuccess(true);

      setFormData({
        emailId: "",
        password: "",
        firstName: "",
        lastName: "",
        address: "",
        countryCode: "",
        phoneNumber: "",
        acceptTermsAndCondition: false,
      });
      setTimeout(() => {
        navigate("/posts");
      }, 1000);
      console.log("res", data);
    } catch (error) {
      setSuccess(false);
      console.error("Error submitting form:", error);
    }
  };

  return (
    <>
      <div>
        <div className="block text-center  text-2xl font-medium text-gray-500">
          Application form
        </div>
        {success == true ? (
          <div
            className="relative rounded border border-green-400 bg-green-100 px-4 py-3 text-green-700"
            role="alert"
          >
            <strong className="font-bold">Success!</strong>
            <span className="block sm:inline">Form submitted successfully.</span>
            <span className="absolute bottom-0 right-0 top-0 px-4 py-3">
              <svg
                className="h-6 w-6 fill-current text-green-500"
                role="button"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <title>Close</title>
                <path d="M14.348 5.652a.5.5 0 01.707.707l-8.1 8.1a.5.5 0 01-.707-.707l8.1-8.1z" />
              </svg>
            </span>
          </div>
        ) : success == false ? (
          <div
            className="relative rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700"
            role="alert"
          >
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline">Something went wrong.</span>
            <span className="absolute bottom-0 right-0 top-0 px-4 py-3">
              <svg
                className="h-6 w-6 fill-current text-red-500"
                role="button"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <title>Close</title>
                <path d="M14.348 5.652a.5.5 0 01.707.707l-8.1 8.1a.5.5 0 01-.707-.707l8.1-8.1z" />
              </svg>
            </span>
          </div>
        ) : (
          <></>
        )}
        <div className="container mx-auto mt-16">
          <div className="flex  items-center">
            <div
              className="flex flex-col items-center"
              onClick={() => {
                if (formData.emailId && formData.password) setCurrentStep(1);
              }}
            >
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full ${
                  currentStep == 1 ? "bg-purple-500" : "bg-gray-300"
                } text-white`}
              >
                1
              </div>
              <div className="ml-2">Step 1</div>
            </div>

            <div className="mx-2 mb-5 h-0.5 flex-1 bg-gray-300 "></div>

            <div
              className="flex flex-col  items-center"
              onClick={() => {
                if (formData.firstName && formData.lastName && formData.address) setCurrentStep(2);
              }}
            >
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full ${
                  currentStep == 2 ? "bg-purple-500" : "bg-gray-300"
                } text-white`}
              >
                2
              </div>
              <div className="ml-2">Step 2</div>
            </div>

            <div className="mx-2 mb-5 h-0.5 flex-1 bg-gray-300"></div>

            <div
              className="flex flex-col  items-center"
              onClick={() => {
                if (formData.countryCode && formData.phoneNumber) setCurrentStep(3);
              }}
            >
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full ${
                  currentStep == 3 ? "bg-purple-500" : "bg-gray-300"
                } text-white`}
              >
                3
              </div>
              <div className="ml-2">Step 3</div>
            </div>
          </div>
        </div>

        <div className=" mt-8 max-w-lg rounded-lg p-4 ">
          {currentStep === 1 && (
            <Form1 formData={formData} setFormData={setFormData} navigation={{ previous, next }} />
          )}
          {currentStep === 2 && (
            <Form2 formData={formData} setFormData={setFormData} navigation={{ previous, next }} />
          )}
          {currentStep === 3 && (
            <Form3 formData={formData} setFormData={setFormData} navigation={{ previous, save }} />
          )}
        </div>
      </div>
    </>
  );
};

export default Form;

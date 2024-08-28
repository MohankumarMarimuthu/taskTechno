import {
  validateAddressLine,
  validateEmail,
  validateLinkedIn,
  validateName,
} from "./RegExp";

export const validateForm = ({ employeeInfo, setErrors }: any) => {
  let formIsValid = true;
  const newErrors = {
    name: "",
    email: "",
    url: "",
    gender: "",
    addressLine1: "",
    addressLine2: "",
    state: "",
    city: "",
    pin: "",
  };
  if (employeeInfo.name === "") {
    newErrors.name = "name is required.";
    formIsValid = false;
  }
  if (employeeInfo.email === "") {
    newErrors.email = "email is required.";
    formIsValid = false;
  }
  if (employeeInfo.url === "") {
    newErrors.url = "url is required.";
    formIsValid = false;
  }

  if (employeeInfo.name !== "" && !validateName(employeeInfo.name)) {
    newErrors.name = "Invalid name. It should be between 3 and 15 characters.";
    formIsValid = false;
  }
  if (employeeInfo.email !== "" && !validateEmail(employeeInfo.email)) {
    newErrors.email = "Invalid email address.";
    formIsValid = false;
  }
  if (employeeInfo.url !== "" && !validateLinkedIn(employeeInfo.url)) {
    newErrors.url = "Invalid LinkedIn URL.";
    formIsValid = false;
  }
  if (
    employeeInfo.addressLine1 !== "" &&
    !validateAddressLine(employeeInfo.addressLine1)
  ) {
    newErrors.addressLine1 = "Invalid address line 1.";
    formIsValid = false;
  }
  if (
    employeeInfo.addressLine2 !== "" &&
    !validateAddressLine(employeeInfo.addressLine2)
  ) {
    newErrors.addressLine2 = "Invalid address line 2.";
    formIsValid = false;
  }
  if (!employeeInfo.gender) {
    newErrors.gender = "gender is required.";
    formIsValid = false;
  }
  //   commenting this hence address, state, city, pin is not mandatory
  //   if (!employeeInfo.state) {
  //     newErrors.state = "State is required.";
  //     formIsValid = false;
  //   }
  //   if (!employeeInfo.city) {
  //     newErrors.city = "City is required.";
  //     formIsValid = false;
  //   }
  //   if (!employeeInfo.pin) {
  //     newErrors.pin = "Pincode is required.";
  //     formIsValid = false;
  //   }

  setErrors(newErrors);
  return formIsValid;
};

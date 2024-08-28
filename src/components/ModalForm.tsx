import React, { useEffect, useState } from "react";
import styles from "../../styles/Modal.module.css";
import Select from "react-select";
import { genderOptions, statesWithCities } from "@/utils/data";
import { validateForm } from "@/utils/formValidation";
import { useDispatch } from "react-redux";
import { addEmployee, editEmployee } from "../redux/employeeSlice";

type OptionType = {
  value: string;
  label: string;
};

const customStyles = {
  container: (provided: any) => ({
    ...provided,
    width: "320px", // Set the desired width here
  }),
  control: (provided: any) => ({
    ...provided,
    backgroundColor: "#f0f0f0",
    outline: "none",
    padding: "16px",
    height: "55px",
    width: "325px",
    border: "none",
  }),
  valueContainer: (provided: any) => ({
    ...provided,
  }),
  singleValue: (provided: any) => ({
    ...provided,
  }),
  placeholder: (provided: any) => ({
    ...provided,
    padding: "",
  }),
};

const ModalForm = ({
  closeModal,
  clickedEmployee,
  setClickedEmployee,
}: any) => {
  const [employeeInfo, setEmployeeInfo] = useState({
    name: "",
    email: "",
    url: "",
    gender: "",
    addressLine1: "",
    addressLine2: "",
    state: "",
    city: "",
    pin: "",
  });
  const [cityList, setCityList] = useState<OptionType[]>([]);
  const [pincode, setPincode] = useState<any>([]);
  const [selectedPincode, setSelectedPincode] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    url: "",
    gender: "",
    addressLine1: "",
    addressLine2: "",
    state: "",
    city: "",
    pin: "",
  });
  const dispatch = useDispatch();

  const stateList = statesWithCities.map((item: any) => {
    return { value: item.state, label: item.state };
  });

  useEffect(() => {
    // Prefill form with clickedEmployee data when modal is opened
    if (clickedEmployee) {
      setEmployeeInfo({
        name: clickedEmployee.name || "",
        email: clickedEmployee.email || "",
        url: clickedEmployee.url || "",
        gender: "",
        addressLine1: "",
        addressLine2: "",
        state: clickedEmployee.state || "",
        city: clickedEmployee.city || "",
        pin: clickedEmployee.pin || "",
      });
    }
  }, [clickedEmployee]);

  useEffect(() => {
    if (employeeInfo.state) {
      const selectedState = statesWithCities.find(
        (item) => item.state === employeeInfo.state
      );
      if (selectedState) {
        const cities = selectedState.cities.map((city: any) => ({
          value: city.city,
          label: city.city,
        }));
        const pincodes = selectedState.cities.map((city: any) => ({
          value: city,
        }));
        setCityList(cities);
        setPincode(pincodes);
      }
    } else {
      setCityList([]);
      setPincode([]);
    }
  }, [employeeInfo.state]);

  useEffect(() => {
    const fetchPincode = pincode.filter((item: any) =>
      item.value.city === employeeInfo?.city ? item.value.pin : ""
    );
    setSelectedPincode(fetchPincode[0]?.value?.pin);
  }, [employeeInfo.city]);

  const formHandleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setEmployeeInfo((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSelectChange = (
    selectedOption: OptionType | null,
    { name }: any
  ) => {
    setEmployeeInfo((prev) => ({
      ...prev,
      [name]: selectedOption ? selectedOption.value : "",
    }));
  };

  const handleEmployeeSubmit = () => {
    if (validateForm({ employeeInfo, setErrors })) {
      if (clickedEmployee) {
        dispatch(
          editEmployee({
            email: clickedEmployee.email,
            updatedData: employeeInfo,
          })
        );
      } else {
        dispatch(addEmployee(employeeInfo));
      }
      console.log("Form submitted:", employeeInfo);
      setEmployeeInfo({
        name: "",
        email: "",
        url: "",
        gender: "",
        addressLine1: "",
        addressLine2: "",
        state: "",
        city: "",
        pin: "",
      });
      setClickedEmployee(null);
      closeModal();
    } else {
      console.log("Form has errors.");
    }
  };

  return (
    <div>
      <div>
        <form>
          <h4 className={styles.modalTitle}>Create Employee Details</h4>

          <div>
            <div className="grid-container">
              <div className="">
                <input
                  placeholder="Name"
                  className={styles.formInput}
                  type="text"
                  id="name"
                  value={employeeInfo.name}
                  onChange={formHandleChange}
                />
                <p className={styles.error}>{errors.name}</p>
              </div>

              <div className="">
                <input
                  placeholder="Email"
                  className={styles.formInput}
                  type="email"
                  id="email"
                  onChange={formHandleChange}
                  value={employeeInfo.email}
                />
                <p className={styles.error}>{errors.email}</p>
              </div>
              <div className="">
                <input
                  placeholder="Linkedin URL"
                  className={styles.formInput}
                  id="url"
                  onChange={formHandleChange}
                  value={employeeInfo.url}
                />
                <p className={styles.error}>{errors.url}</p>
              </div>
              <div className="">
                <Select
                  options={genderOptions}
                  placeholder="Gender"
                  styles={customStyles}
                  id="gender"
                  name="gender"
                  onChange={(selected) =>
                    handleSelectChange(selected, { name: "gender" })
                  }
                />
                <p className={styles.error}>{errors.gender}</p>
              </div>
              <div className="">
                <input
                  placeholder="Address Line1"
                  className={styles.formInput}
                  id="addressLine1"
                  onChange={formHandleChange}
                  value={employeeInfo.addressLine1}
                />
                <p className={styles.error}>{errors.addressLine1}</p>
              </div>
              <div className="">
                <input
                  placeholder="Address Line2"
                  className={styles.formInput}
                  id="addressLine2"
                  onChange={formHandleChange}
                  value={employeeInfo.addressLine2}
                />
                <p className={styles.error}>{errors.addressLine2}</p>
              </div>
              <div className="">
                <Select
                  options={stateList}
                  placeholder="State"
                  styles={customStyles}
                  id="state"
                  name="state"
                  onChange={(selected) =>
                    handleSelectChange(selected, { name: "state" })
                  }
                />
                <p className={styles.error}>{errors.state}</p>
              </div>
              <div className="">
                <Select
                  placeholder="City"
                  styles={customStyles}
                  options={cityList}
                  id="city"
                  name="city"
                  isDisabled={!employeeInfo.state} // Disable if no state is selected
                  onChange={(selected) =>
                    handleSelectChange(selected, { name: "city" })
                  }
                />
                <p className={styles.error}>{errors.city}</p>
              </div>
              <div className="">
                <input
                  placeholder="Pincode"
                  id="pin"
                  className={styles.formInput}
                  value={selectedPincode}
                  onChange={formHandleChange}
                />
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "center" }}>
              <button
                className="createBtn"
                type="button"
                onClick={handleEmployeeSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalForm;

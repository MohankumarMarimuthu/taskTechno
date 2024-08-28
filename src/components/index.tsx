import React, { useState } from "react";
import styles from "../../styles/Home.module.css";
import EmployeeTable from "./EmployeeTable";
import Modal from "./CreateModal";
import ModalForm from "./ModalForm";

const HomepageComponents = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clickedEmployee, setClickedEmployee] = useState<any>();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setClickedEmployee(null);
  };
  return (
    <div>
      <div className={styles.container}>
        <div>
          <h1 className={styles.titleName}>Technospurs Table</h1>
        </div>

        <button className="createBtn" onClick={handleOpenModal}>
          Create
        </button>
        <div>
          <EmployeeTable
            setIsModalOpen={setIsModalOpen}
            setClickedEmployee={setClickedEmployee}
          />
        </div>
        <div>
          <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
            <ModalForm
              closeModal={handleCloseModal}
              clickedEmployee={clickedEmployee}
              setClickedEmployee={setClickedEmployee}
            />
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default HomepageComponents;

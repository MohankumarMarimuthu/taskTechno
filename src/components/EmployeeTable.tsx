import React from "react";
import styles from "../../styles/Home.module.css";
import { useSelector } from "react-redux";
import { MdOutlineEdit } from "react-icons/md";
import Link from "next/link";

const tableHeaderMenu = [
  {
    id: 1,
    name: "Name",
  },
  {
    id: 2,
    name: "email",
  },
  {
    id: 3,
    name: "Linkedin URL",
  },
  {
    id: 4,
    name: "Gender",
  },
  {
    id: 5,
    name: "Edit",
  },
  {
    id: 6,
    name: "Address",
  },
  {
    id: 7,
    name: "City",
  },
];

const EmployeeTable = ({ setIsModalOpen, setClickedEmployee }: any) => {
  const employees = useSelector((state: any) => state.employee.employees);

  return (
    <div className={styles.tableContainer}>
      <table className={styles.responsiveTable}>
        <thead>
          <tr style={{ backgroundColor: "#f2f2f2" }}>
            {tableHeaderMenu.map((item) => (
              <th key={item.id} className={styles.tableHeading}>
                {item.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {employees.map((item: any, index: number) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td style={{ textDecoration: "underline" }}>
                <Link href={item.url} target="blank">
                  {item?.url?.slice(0, 25)}
                </Link>
              </td>
              <td>{item.gender}</td>
              <td
                style={{ display: "flex", alignItems: "center", gap: "5px" }}
                onClick={() => {
                  setIsModalOpen(true);
                  setClickedEmployee(item);
                }}
              >
                {" "}
                <MdOutlineEdit />
                Edit
              </td>
              <td>
                {item.addressLine1 !== "" ? item.addressLine1 : "no data"}
              </td>
              <td>{item.city !== "" ? item.city : "no data"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;

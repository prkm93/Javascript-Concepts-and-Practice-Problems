import { data } from "./data.js";

console.log(data);
const empList = document.querySelector("#emp-list");
const empDetails = document.querySelector("#emp-details");

console.log(empList);

const renderList = () => {
  data.forEach((item) => {
    const empItem = document.createElement("div");
    empItem.setAttribute("id", `${item.id}`);
    empItem.innerHTML = `
          <div>${item.firstName} ${item.lastName}</div>
          `;

    const btn = document.createElement("button");
    btn.innerHTML = "X";
    btn.addEventListener("click", (e) => {
      deleteItem(item.id);
      e.stopPropagation();
    });
    empItem.appendChild(btn);

    empItem.classList.add("emp-item");
    console.log(empItem);

    empList.appendChild(empItem);

    empItem.addEventListener("click", () => {
      showEmployeeDetails(item.id);
    });
  });

  showEmployeeDetails(data[0].id);
};

const deleteItem = (id) => {
  console.log("id", id);
  console.log(empList);
  const deleteItem = document.getElementById(`${id}`);
  console.log("deleteItem", deleteItem);
  deleteItem.remove();
};

const showEmployeeDetails = (id) => {
  const clickedEmp = data.find((item) => item.id === id);
  console.log(clickedEmp);

  const {
    imageUrl,
    firstName,
    lastName,
    email,
    contactNumber,
    age,
    dob,
    salary,
    address,
  } = clickedEmp;

  empDetails.innerHTML = `
                            <img src={${imageUrl}} alt=${email} />
                            <h3>${firstName} ${lastName} (${age})</h3>
                            <p>${address}</p>
                            <p>${email}</p>
                            <p>Mobile: ${contactNumber}</p>
                            <p>${dob}</p>
                            <p>${salary}</p>
                        `;
};
document.addEventListener("DOMContentLoaded", renderList);

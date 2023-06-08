import React, { useState, useEffect } from "react";
import axios from "axios";

function Employee() {
  const [employees, setEmployees] = useState(null);
  const [employeeForm, setEmployeeForm] = useState({});
  const [deps, setDeps] = useState(null);
  const [dsgs, setDsgs] = useState(null);

  useEffect(() => {
    getDeps();
    getDsgs();
    getEmployees();
  }, []);

  const changeHandler = (event) => {
    setEmployeeForm({
      ...employeeForm,
      [event.target.name]: event.target.value,
    });
  };

  const saveClick = () => {
    axios
      .post("http://localhost:8081/saveEmp", employeeForm)
      .then((d) => {
        if (d.data.status == 1) {
          alert(d.data.message);
          getEmployees();
        }
      })
      .catch((e) => {
        alert(JSON.stringify(e));
      });
  };

  function editClick(item) {
    setEmployeeForm({
      ...item,
      department: item.department._id,
      designation: item.designation._id,
    });
  }

  const updateClick = () => {
    alert("update");
  };

  function getEmployees() {
    axios.get("http://localhost:8081/getEmp").then((d) => {
      if (d) {
        setEmployees(d.data.data);
      }
    });
  }
  function getDeps() {
    axios.get("http://localhost:8081/getDep").then((d) => {
      if (d) {
        setDeps(d.data.data);
        // console.log(deps);
      }
    });
  }
  function getDsgs() {
    axios.get("http://localhost:8081/getDsg").then((d) => {
      if (d) {
        setDsgs(d.data.data);
      }
    });
  }

  function renderEmployees() {
    if (employees) {
      let employeeArr = [];
      employees?.map((item) => {
        employeeArr.push(
          <tr>
            <td>{item.name}</td>
            <td>{item.address}</td>
            <td>{item.salary}</td>
            <td>{item?.department?.name}</td>
            <td>{item?.designation?.name}</td>
            <td>
              <button
                data-target="#editModal"
                data-toggle="modal"
                onClick={() => {
                  editClick(item);
                }}
                className="btn btn-info"
              >
                Edit
              </button>
              {"\u00A0"}
              <button className="btn btn-danger">Delete</button>
            </td>
          </tr>
        );
      });
      if (employeeArr.length > 0) {
        return (
          <table className="table table-bordered table-stripped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Address</th>
                <th>Salary</th>
                <th>Department</th>
                <th>Designation</th>
                <th>Actions</th>
              </tr>
            </thead>
            {employeeArr}
          </table>
        );
      }
    }
  }

  function renderDeps() {
    if (deps) {
      let deparr = [];
      deparr.push(<option value="-1">Select Department</option>);
      deps?.map((item) => {
        deparr.push(
          <option key={item._id} value={item._id}>
            {item.name}
          </option>
        );
      });

      if (deparr.length > 0) {
        return (
          <select
            onChange={changeHandler}
            name="department"
            value={employeeForm?.department ? employeeForm.department : "-1"}
            className="form-control"
          >
            {deparr}
          </select>
        );
      }
    }
  }

  function renderDsgs() {
    if (dsgs) {
      let dsgarr = [];
      dsgarr.push(<option value="-1">Select Designation</option>);
      dsgs?.map((item) => {
        dsgarr.push(
          <option key={item._id} value={item._id}>
            {item.name}
          </option>
        );
      });

      if (dsgarr.length > 0) {
        return (
          <select
            value={employeeForm?.designation ? employeeForm.designation : "-1"}
            name="designation"
            onChange={changeHandler}
            className="form-control"
          >
            {dsgarr}
          </select>
        );
      }
    }
  }

  return (
    <div>
      <h2 className="text-primary text-center">Employee Page</h2>
      <div className="row">
        <div className="col-6">
          <h2 className="text-info text-left">Employees List</h2>
        </div>
        <div className="col-3">
          <button
            className="btn btn-info"
            data-toggle="modal"
            data-target="#newModal"
            // onClick={() => {
            //   // setEmployeeForm({});
            // }}
          >
            New Employee
          </button>
        </div>
      </div>
      <div className="col-9 p-3 m-3">{renderEmployees()}</div>
      {/* Save */}
      <div class="modal" id="newModal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header" style={{ backgroundColor: "darkcyan" }}>
              <h5 class="modal-title text-white">New Employee</h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div className="form-group row p-2 m-2">
                <label for="txtName">Name</label>
                <input
                  id="txtName"
                  name="name"
                  placeholder="Enter Name"
                  type="text"
                  className="form-control"
                  onChange={changeHandler}
                />
              </div>
              <div className="form-group row p-2 m-2">
                <label for="txtAddress">Address</label>
                <input
                  id="txtAddress"
                  name="address"
                  placeholder="Enter Address"
                  type="text"
                  className="form-control"
                  onChange={changeHandler}
                />
              </div>
              <div className="form-group row p-2 m-2">
                <label for="txtSalary">Salary</label>
                <input
                  id="txtSalary"
                  name="salary"
                  placeholder="Enter Salary"
                  type="Number"
                  className="form-control"
                  onChange={changeHandler}
                />
              </div>
              <div className="form-group row p-2 m-2">
                <label for="txtSalary">Department</label>
                {renderDeps()}
              </div>
              <div className="form-group row p-2 m-2">
                <label for="txtSalary">Designation</label>
                {renderDsgs()}
              </div>
            </div>
            <div class="modal-footer" style={{ backgroundColor: "darkgray" }}>
              <button
                type="button"
                data-dismiss="modal"
                onClick={saveClick}
                class="btn btn-primary"
              >
                Save changes
              </button>
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Edit */}
      <div class="modal" id="editModal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header" style={{ backgroundColor: "darkcyan" }}>
              <h5 class="modal-title text-white">Edit Employee</h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div className="form-group row p-2 m-2">
                <label for="txtName">Name</label>
                <input
                  id="txtName"
                  name="name"
                  placeholder="Enter Name"
                  type="text"
                  className="form-control"
                  onChange={changeHandler}
                  value={employeeForm.name}
                />
              </div>
              <div className="form-group row p-2 m-2">
                <label for="txtAddress">Address</label>
                <input
                  id="txtAddress"
                  name="address"
                  placeholder="Enter Address"
                  type="text"
                  className="form-control"
                  onChange={changeHandler}
                  value={employeeForm.address}
                />
              </div>
              <div className="form-group row p-2 m-2">
                <label for="txtSalary">Salary</label>
                <input
                  id="txtSalary"
                  name="salary"
                  placeholder="Enter Salary"
                  type="Number"
                  className="form-control"
                  onChange={changeHandler}
                  value={employeeForm.salary}
                />
              </div>
              <div className="form-group row p-2 m-2">
                <label for="txtSalary">Department</label>
                {renderDeps()}
              </div>
              <div className="form-group row p-2 m-2">
                <label for="txtSalary">Designation</label>
                {renderDsgs()}
              </div>
            </div>
            <div class="modal-footer" style={{ backgroundColor: "darkgray" }}>
              <button
                type="button"
                data-dismiss="modal"
                onClick={updateClick}
                class="btn btn-primary"
              >
                Update changes
              </button>
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Employee;

import { useEffect ,useState} from "react";
import { listEmployee,deleteEmployee } from "../services/EmployeService";
import { useNavigate } from "react-router-dom";

const ListEmployee = () => {
  const [employees, setEmployees] = useState([]);
  const navigator = useNavigate()
  useEffect(() => {
    listEmployee()
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function addNewEmployee(){
    navigator("/add-employee")
  }

  function updateEmployee(id){
    navigator(`/update-employee/${id}`)
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      deleteEmployee(id).then(() => {
        console.log('Employee deleted');
        // Remove the deleted employee from the list
        setEmployees(employees.filter(employee => employee.id !== id));
        navigator('/employees');
      }).catch((error) => {
        console.error('Error deleting employee:', error);
      });
    }
  };


  return (
    <div className="container">
      <h2 className="text-center">Employee List</h2>
      <button className="btn btn-primary mb-3" onClick={addNewEmployee}>Add employee</button>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.email}</td>
              <td><button className="btn btn-info" onClick={()=>updateEmployee(employee.id)}>Update</button></td>
              <td><button className="btn btn-danger" onClick={()=>handleDelete(employee.id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListEmployee;

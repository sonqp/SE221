// var temp = sessionStorage.getItem("tasks");
// if (temp == null) sessionStorage.setItem("tasks",new Map());
const tasks = new Map();
function fetchAllTasks(){
fetch('task.json')
.then((response) => response.json())
.then((json) => {
    for (i of json){
        i.getEmployee =  function() {
            return employees.get(this.employeeId);
        }
        i.getVehicle =  function() {
            return vehicles.get(this.vehicleId);
        }
        i.getTaskRunning = function(){
            return tasks;
        }
        tasks.set(i.taskId,i);   
    }   
}); 
}
function loadAllTasks(){
    sessionStorage.getItem("tasks").forEach((value, key) => {
        tasks.set(value, key);
    })
}
console.log(tasks);
 
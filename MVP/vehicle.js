// var temp = sessionStorage.getItem("vehicles");
// if (temp == null) sessionStorage.setItem("vehicles",new Map());
const vehicles = new Map();
function fetchAllVehicles(){
fetch('vehicle.json')
.then((response) => response.json())
.then((json) => {
    for (i of json){
        i.getEmployeeUsing =  function() {
            return employees.get(this.employeeId);
        }
        i.getEmployeeLastUsed =  function() {
            return employees.get(this.lastUsedEmployeeId);
        }
        i.getTaskRunning = function(){
            return tasks.get(this.taskRunning);
        }
        vehicles.set(i.vehicleId,i);   
    }   
});     
}
function getVehicleById(id){
    return vehicles.get(id);
}
function loadAllVehicles(){
    sessionStorage.getItem("vehicles").forEach((value, key) => {
        vehicles.set(value, key);
    })
}
 
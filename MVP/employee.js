const employees = new Map();
function fetchAllEmployees(){
fetch('./employee.json')
.then((response) => response.json())
.then((json) => {
    for (i of json){
        employees.set(i.userid,i);   
    }
}); 
}
function loadAllEmployees(){
    sessionStorage.getItem("employees").forEach((value, key) => {
        employees.set(value, key);
    })
}
function Employee(id, phone,email,fullName, role, group, status, account, vehicle = null, tasks = null){
    return {
        id : id, 
        phone: phone,
        email: email,
        fullName: fullName,
        role: role,
        group: group,
        status:status,
        account : account,
        vehicle: vehicle,
        tasks : tasks
    }
}
function getEmployeeById(id){
    return employees.get(id);
}
function getEmployeeList () {
    return list();
}
function selectEmployee(eId){
    if (getSelectedEmployees().includes(eId)) return alert("Employee "+ eId + " is already added before");
    var temp = document.getElementById("employeeSelect");
    var option = document.createElement("option");
      option.text = 'Employee: '+employees.get(eId).fullName;
      option.value = eId;
      temp.add(option);
}
function removeSelectedEmployee(){
        var temp = document.getElementById("employeeSelect");
        temp.remove(temp.selectedIndex);
}
function getSelectedEmployees(){
        const arr = [];
        var temp = document.getElementById("employeeSelect");
        for (i = 0 ; i < temp.length; i++){
            arr.push(temp.options[i].value);
        }
        return arr;
}
function generateEmployeeTable(){
document.getElementById("table-div").innerHTML= `
    <table id="table_id" class="display">
    <thead>
        <tr>
            <th>Employee ID</th>
            <th>Name</th>
            <th>Group</th>
            <th>Vehicle</th>
            <th>Vehicle ID</th>
            <th>Phone</th>
            <th><button onclick = 'alert("not implement yet")'>Select all</button></th>
        </tr>
    </thead>
    <tbody>
    </tbody>
</table>
`
var table = $('#table_id').DataTable( {
    ajax: {
        url: 'employee.json',
        dataSrc: ''
    },
    columnDefs:[ ],
    columns: [
    { data: "userid"},
    { data: "fullName"},
    { data: "group", defaultContent: "No group"},
    { data: "vehicleId",render: function (data) {return `<a onClick="getVehicleById('${data}');">${getVehicleById(data).name}</a>`}},
    { data: "vehicleId"},
    { data: "phone" },
    { data:"userid", render: function (data){return `<button onclick = "selectEmployee('${data}')" >Select</button>`}, orderable:false}
  ]
} );
}
function generateSelectedEmployeeTable(arr){
    document.getElementById("table-div").innerHTML= `
        <table id="table_id" class="display">
        <thead>
            <tr>
                <th>Employee ID</th>
                <th>Name</th>
                <th>Group</th>
                <th>Vehicle</th>
                <th>Vehicle ID</th>
                <th>Phone</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
        </tbody>
    </table>
    `
    var table = $('#table_id').DataTable( {
        ajax: {
            url: 'employee.json',
            dataSrc: function(json) {
                return json.filter(function(item){
                    return arr.includes(item.userid);         
                    });
        }},
        columnDefs:[ ],
        columns: [
        { data: "userid"},
        { data: "fullName"},
        { data: "group", defaultContent: "No group"},
        { data: "vehicleId",render: function (data) {return `<a onClick="getVehicleById('${data}');">${getVehicleById(data).name}</a>`}},
        { data: "vehicleId"},
        { data: "phone" },
        { data:"userid", render: function (data){return `<button onclick = "selectEmployee('${data}')" >Assign Vehicle</button>`}, orderable:false}
      ]
    } );
}
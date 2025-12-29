const API_URL = "http://localhost:8090/departments";

let editMode = false;

window.onload = loadDepartments;

// READ
function loadDepartments() {
    fetch(API_URL)
        .then(res => res.json())
        .then(data => {
            const table = document.getElementById("deptTable");
            table.innerHTML = "";

            data.forEach(d => {
                table.innerHTML += `
                    <tr>
                        <td>${d.id}</td>
                        <td>${d.name}</td>
                        <td>${d.location}</td>
                        <td>
                            <button class="edit-btn"
                                onclick="editDepartment(${d.id}, '${d.name}', '${d.location}')">
                                Edit
                            </button>
                            <button class="delete-btn"
                                onclick="deleteDepartment(${d.id})">
                                Delete
                            </button>
                        </td>
                    </tr>
                `;
            });
        });
}

// CREATE
function addDepartment() {

    if (editMode) {
        alert("You are editing an existing record. Click UPDATE instead.");
        return;
    }

    const name = document.getElementById("deptName").value;
    const location = document.getElementById("deptLocation").value;

    if (!name || !location) {
        alert("Please fill all fields");
        return;
    }

    fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, location })
    }).then(() => {
        clearForm();
        loadDepartments();
    });
}

// EDIT (Fill form only)
function editDepartment(id, name, location) {
    document.getElementById("deptId").value = id;
    document.getElementById("deptName").value = name;
    document.getElementById("deptLocation").value = location;
    editMode = true;
}

// UPDATE
function updateDepartment() {

    const id = document.getElementById("deptId").value;
    const name = document.getElementById("deptName").value;
    const location = document.getElementById("deptLocation").value;

    if (!id) {
        alert("Select a department to update");
        return;
    }

    fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, location })
    }).then(() => {
        clearForm();
        editMode = false;
        loadDepartments();
    });
}

// DELETE
function deleteDepartment(id) {

    if (!confirm("Are you sure you want to delete this department?"))
        return;

    fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    }).then(() => loadDepartments());
}

// CLEAR FORM
function clearForm() {
    document.getElementById("deptId").value = "";
    document.getElementById("deptName").value = "";
    document.getElementById("deptLocation").value = "";
}

document.getElementById('add-doctor').addEventListener('click', function() {
    document.getElementById('content').innerHTML = `
        <h2>Add Doctor</h2>
        <form action="add_doctor.php" method="post">
            <label for="doctor-firstname">First Name:</label>
            <input type="text" id="doctor-firstname" name="doctor_firstname" required ><br><br>
            <label for="doctor-lastname">Last Name:</label>
            <input type="text" id="doctor-lastname" name="doctor_lastname" required><br><br>
            <label for="doctor-specialist">Specialization:</label>
            <input type="text" id="doctor-specialist" name="doctor_specialist" required><br><br>
            <label for="doctor-email">Email:</label>
            <input type="email" id="doctor-email" name="doctor_email" required><br><br>
            <label for="doctor-password">Password:</label>
            <input type="password" id="doctor-password" name="doctor_password" r><br><br>
            <button type="submit">Add Doctor</button>
        </form>
    `;
});

document.getElementById('update-schedule').addEventListener('click', function() {
    document.getElementById('content').innerHTML = `
        <h1>Patient Schedule</h1>
        <table id="scheduleTable">
            <thead>
                <tr>
                    <th>Patient Name</th>
                    <th>Age</th>
                    <th>Doctor</th>
                    <th>Schedule Date</th>
                    <th>Schedule Time</th>
                    <th>Status</th>
                    <th>Approve</th>
                    <th>Cancel</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
    `;
    fetchData();
});

function fetchData() {
    fetch('Doctorpage.php')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector('#scheduleTable tbody');
            tableBody.innerHTML = '';

            if (data.length === 0) {
                const row = document.createElement('tr');
                const cell = document.createElement('td');
                cell.colSpan = 9;
                cell.textContent = 'No records found';
                row.appendChild(cell);
                tableBody.appendChild(row);
                return;
            }

            data.forEach(item => {
                const status = item.Approved === null ? 'Pending' : item.Approved ? 'Approved' : 'Cancelled';
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${item.patient_name}</td>
                    <td>${item.age}</td>
                    <td>${item.doctor}</td>
                    <td>${item.schedule_date}</td>
                    <td>${item.schedule_time}</td>
                    <td id="status${item.id}">${status}</td>
                    <td>
                        <input type="checkbox" id="approve${item.id}" name="status${item.id}" value="approved" onclick="toggleUpdateButton(${item.id})"> Approve
                    </td>
                    <td>
                        <input type="checkbox" id="cancel${item.id}" name="status${item.id}" value="cancelled" onclick="toggleUpdateButton(${item.id})"> Cancel
                    </td>
                    <td>
                        <button type="button" id="updateButton${item.id}" disabled onclick="updateStatus(${item.id})">Update</button>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        });
}

function toggleUpdateButton(id) {
    const approveCheckbox = document.querySelector(`#approve${id}`);
    const cancelCheckbox = document.querySelector(`#cancel${id}`);
    const updateButton = document.querySelector(`#updateButton${id}`);

    approveCheckbox.addEventListener('change', () => {
        if (approveCheckbox.checked) {
            cancelCheckbox.checked = false;
        }
        updateButton.disabled = !(approveCheckbox.checked || cancelCheckbox.checked);
    });

    cancelCheckbox.addEventListener('change', () => {
        if (cancelCheckbox.checked) {
            approveCheckbox.checked = false;
        }
        updateButton.disabled = !(approveCheckbox.checked || cancelCheckbox.checked);
    });

    updateButton.disabled = !(approveCheckbox.checked || cancelCheckbox.checked);
}

function updateStatus(id) {
    const approveCheckbox = document.querySelector(`#approve${id}`);
    const cancelCheckbox = document.querySelector(`#cancel${id}`);
    const status = approveCheckbox.checked ? true : cancelCheckbox.checked ? false : null;

    fetch('updateStatus.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: id, Approved: status }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            const statusCell = document.querySelector(`#status${id}`);
            statusCell.textContent = status ? 'Approved' : 'Cancelled';
        } else {
            alert('Error updating status');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error updating status');
    });
}
document.addEventListener('DOMContentLoaded', fetchData);

document.getElementById('edit_account').addEventListener('click', function() {
    document.getElementById('content').innerHTML = `
        <h1>Manage Accounts</h1>
        <div>
            <h2>Patients</h2>
            <table id="patientTable">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Gender</th>
                        <th>Address</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
        <div>
            <h2>Doctors</h2>
            <table id="doctorTable">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Specialist</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
    `;
    fetchPatients();
    fetchDoctors();
});

function fetchPatients() {
    fetch('fetchRegistrations.php')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const tableBody = document.querySelector('#patientTable tbody');
            tableBody.innerHTML = '';

            if (data.length === 0) {
                const row = document.createElement('tr');
                const cell = document.createElement('td');
                cell.colSpan = 7;
                cell.textContent = 'No patients found';
                row.appendChild(cell);
                tableBody.appendChild(row);
                return;
            }

            data.forEach(item => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${item.registration_id}</td>
                    <td>${item.first_name} ${item.last_name}</td>
                    <td>${item.age}</td>
                    <td>${item.gender}</td>
                    <td>${item.address}</td>
                    <td>${item.email}</td>
                    <td>
                        <button onclick="editEntry('patients', ${item.registration_id})">Edit</button>
                        <button onclick="deleteEntry('patients', ${item.registration_id})">Delete</button>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Fetch error:', error);
            alert('Error fetching patients');
        });
}

function fetchDoctors() {
    fetch('fetchDoctors.php')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const tableBody = document.querySelector('#doctorTable tbody');
            tableBody.innerHTML = '';

            if (data.length === 0) {
                const row = document.createElement('tr');
                const cell = document.createElement('td');
                cell.colSpan = 5;
                cell.textContent = 'No doctors found';
                row.appendChild(cell);
                tableBody.appendChild(row);
                return;
            }

            data.forEach(item => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${item.doctor_id}</td>
                    <td>${item.doctor_firstname} ${item.doctor_lastname}</td>
                    <td>${item.doctor_specialist}</td>
                    <td>${item.doctor_email}</td>
                    <td>
                        <button onclick="editEntry('doctors', ${item.doctor_id})">Edit</button>
                        <button onclick="deleteEntry('doctors', ${item.doctor_id})">Delete</button>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Fetch error:', error);
            alert('Error fetching doctors');
        });
}

function editEntry(entity, id) {
    let fetchUrl = '';
    let formTitle = '';
    let editIdField = '';

    if (entity === 'patients') {
        fetchUrl = `fetchSingleRegistration.php?id=${id}`;
        formTitle = 'Edit Patient Registration';
        editIdField = 'editId';
    } else if (entity === 'doctors') {
        fetchUrl = `fetchSingleDoctor.php?id=${id}`;
        formTitle = 'Edit Doctor Information';
        editIdField = 'editDoctorId';
    }

    fetch(fetchUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            let formFields = '';
            let submitButtonText = '';

            if (entity === 'patients') {
                formFields = `
                    <input type="hidden" id="${editIdField}" value="${data.registration_id}">
                    <label for="editFirstName">First Name:</label>
                    <input type="text" id="editFirstName" value="${data.first_name}" required><br>
                    <label for="editLastName">Last Name:</label>
                    <input type="text" id="editLastName" value="${data.last_name}" required><br>
                    <label for="editAge">Age:</label>
                    <input type="number" id="editAge" value="${data.age}" required><br>
                    <label for="editGender">Gender:</label>
                    <input type="text" id="editGender" value="${data.gender}" required><br>
                    <label for="editAddress">Address:</label>
                    <input type="text" id="editAddress" value="${data.address}" required><br>
                    <label for="editEmail">Email:</label>
                    <input type="email" id="editEmail" value="${data.email}" required><br>
                `;
                submitButtonText = 'Save Patient';
            } else if (entity === 'doctors') {
                formFields = `
                    <input type="hidden" id="${editIdField}" value="${data.doctor_id}">
                    <label for="editDoctorFirstName">First Name:</label>
                    <input type="text" id="editDoctorFirstName" value="${data.doctor_firstname}" required><br>
                    <label for="editDoctorLastName">Last Name:</label>
                    <input type="text" id="editDoctorLastName" value="${data.doctor_lastname}" required><br>
                    <label for="editDoctorSpecialist">Specialist:</label>
                    <input type="text" id="editDoctorSpecialist" value="${data.doctor_specialist}" required><br>
                    <label for="editDoctorEmail">Email:</label>
                    <input type="email" id="editDoctorEmail" value="${data.doctor_email}" required><br>
                `;
                submitButtonText = 'Save Doctor';
            }

            const form = `
                <h2>${formTitle}</h2>
                <form id="editForm">
                    ${formFields}
                    <button type="submit">${submitButtonText}</button>
                </form>
            `;
            document.getElementById('content').innerHTML = form;

            document.getElementById('editForm').addEventListener('submit', function(event) {
                event.preventDefault();
                if (entity === 'patients') {
                    updatePatient();
                } else if (entity === 'doctors') {
                    updateDoctor();
                }
            });
        })
        .catch(error => {
            console.error('Fetch error:', error);
            alert('Error fetching data for editing');
        });
}

function updatePatient() {
    const id = document.getElementById('editId').value;
    const firstName = document.getElementById('editFirstName').value;
    const lastName = document.getElementById('editLastName').value;
    const age = document.getElementById('editAge').value;
    const gender = document.getElementById('editGender').value;
    const address = document.getElementById('editAddress').value;
    const email = document.getElementById('editEmail').value;

    const formData = { id, firstName, lastName, age, gender, address, email };

    fetch('updatePatient.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        if (data.success) {
            alert('Patient information updated successfully');
            fetchPatients(); // Refresh patients list
        } else {
            alert('Error updating patient information');
        }
    })
    .catch(error => {
        console.error('Update error:', error);
        alert('Error updating patient information');
    });
}

function updateDoctor() {
    const id = document.getElementById('editDoctorId').value;
    const firstName = document.getElementById('editDoctorFirstName').value;
    const lastName = document.getElementById('editDoctorLastName').value;
    const specialist = document.getElementById('editDoctorSpecialist').value;
    const email = document.getElementById('editDoctorEmail').value;

    const formData = { id, firstName, lastName, specialist, email };

    fetch('updateDoctor.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        if (data.success) {
            alert('Doctor information updated successfully');
            fetchDoctors(); // Refresh doctors list
        } else {
            alert('Error updating doctor information');
        }
    })
    .catch(error => {
        console.error('Update error:', error);
        alert('Error updating doctor information');
    });
}

function deleteEntry(entity, id) {
    if (confirm('Are you sure you want to delete this entry?')) {
        let deleteUrl = '';

        if (entity === 'patients') {
            deleteUrl = 'deletePatient.php';
        } else if (entity === 'doctors') {
            deleteUrl = 'deleteDoctor.php';
        }

        fetch(deleteUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                if (entity === 'patients') {
                    alert('Patient deleted successfully');
                    fetchPatients(); // Refresh patients list
                } else if (entity === 'doctors') {
                    alert('Doctor deleted successfully');
                    fetchDoctors(); // Refresh doctors list
                }
            } else {
                alert(`Error deleting ${entity}`);
            }
        })
        .catch(error => {
            console.error('Delete error:', error);
            alert(`Error deleting ${entity}`);
        });
    }
}

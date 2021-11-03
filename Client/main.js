const url = "http://localhost/Institute/School/public/index.php";

const getPersons = async() => {
    await $.ajax({
        type: 'GET',
        headers: { "Accept": "application/json" },
        url: 'http://localhost/Institute/School/public/'
    }).done(res => {
        let listPersons = res.listPersons;
        let table = $("#contenido");
        table.append(
            "<tr class='bg-dark text-light'>" +
            "<th scope='col'>#</th>" +
            "<th scope='col'>Name</th>" +
            "<th scope='col'>Street</th>" +
            "<th scope='col'>Status</th>" +
            "<th scope='col'>Detalles</th>" +
            "<th scope='col'>Actualizar</th>" +
            "<th scope='col'>Eliminar</th>" +
            "</tr>")

        for (let i = 0; i < listPersons.length; i++) {
            table.append(
                "<tr>" +
                "<td>" + listPersons[i].id + "</td>" +
                "<td>" + listPersons[i].name + "</td>" +
                "<td>" + listPersons[i].street + "</td>" +
                "<td>" + listPersons[i].status + "</td>" +
                "<td><button class='btn btn-primary' data-toggle='modal'  onclick='getInfo(" + listPersons[i].id + ")' data-target='#detalles'><i class='fas fa-info-circle'></i></button></td>" +
                "<td><button class='btn btn-warning' data-toggle='modal' onclick='getInfoUpdate(" + listPersons[i].id + ")'  data-target='#updatePerson'><i class='fas fa-pen'></i></button></td>" +
                "<td><button class='btn btn-danger' data-toggle='modal' onclick='getId(" + listPersons[i].id + ")' data-target='#delete'><i class='fas fa-trash'></i></button></td>" +
                "</tr>")
        }
    });
};
getPersons();

const getById = async id => {
    return await $.ajax({
        type: 'GET',
        url: url + '/school/' + id
    }).done(res => res);
}

const getInfo = async id => {
    let person = await getById(id);
    let date = new Date(person.person[0].created.date);

    document.getElementById('name').value = person.person[0].name
    document.getElementById('street').value = person.person[0].street
    document.getElementById('status').value = person.person[0].status ? 'Activo' : 'Inactivo'
    document.getElementById('created').value = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
    document.getElementById('updated').value = person.person[0].updated

    if (person.person[0].updated == null) {
        document.getElementById('updated').innerHTML = 'Aún sin actualizar';
    } else {
        let dateUpdated = new Date(person.person[0].updated.date);
        document.getElementById('updated').innerHTML = dateUpdated.getDate() + "/" + dateUpdated.getMonth() + "/" + dateUpdated.getFullYear();
    }

}

const getInfoUpdate = async id => {
    let school = await getById(id);

    document.getElementById('id_update').value = id
    document.getElementById('name_update').value = school.school[0].name
    document.getElementById('street_update').value = school.school[0].street
}

const registerPerson = async() => {
    let name = document.getElementById('name_register').value;
    let street = document.getElementById('street_register').value;
    console.log(name + " " + street);


    await $.ajax({
        type: "POST",
        url: url + "/school/create",
        data: { name, street }
    }).done(function(res) {
        console.log(res);
    });
};

const updatePerson = async() => {
    let id = document.getElementById('id_update').value;
    let name = document.getElementById('name_update').value;
    let street = document.getElementById('street_update').value;

    await $.ajax({
        type: 'POST',
        url: url + "/school/update/" + id,
        data: { name, street }
    }).done(function(res) {

    })
};


const deletePerson = async() => {
    let id = document.getElementById('id_delete').value;
    await $.ajax({
        type: 'GET',
        url: url + '/school/delete/' + id
    }).done(res => {
        console.log(res);
        getPersons();
    });
}

const getId = async id => {
    document.getElementById("id_delete").value = id;
};
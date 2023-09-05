const URL_BASE = "https://reqres.in";
let users = [];
let user = {
    id: 0,
    name: "",
    work: "",
};
let jobs = ['Albañil','Fullstack','Cerillito'];


(()=> {
    fetch(URL_BASE + "/api/users")
    .then(res => res.json())
    .then(res => {
        
        users = res.data
        console.log(users);
        let dragUsers = document.getElementById('dragUsers')
        users.forEach((user, index, users) => {
            dragUsers.innerHTML += `<tr >
            <th scope="row">${index + 1}</th>
            <td>
                <img src="${user.avatar}" class="img-fluid" width="50">
            </td>
            <td>${user.first_name} ${user.last_name}</td>
            <td>${user.email}</td>
            <td>
                <button type="button" class="btn btn-info" onclick="showUser(${user.id})" data-bs-toggle="modal" data-bs-target="#mdlShow">Ver</button>
                <button type="button" class="btn btn-warning" onclick="searchUser(${user.id})" data-bs-toggle="modal" data-bs-target="#mdlUpdate">Modificar</button>
                <button type="button" class="btn btn-danger" onclick="deleteUser(${user.id})">Eliminar</button>
            </td>
          </tr>`
        });
    })
})()

const registerUser = () =>{
    user.name = document.getElementById("nameR")
    user.work = document.getElementById("workR")

    fetch(URL_BASE + "/api/users", {
        method: 'POST',
        body: JSON.stringify(user)
    })
    .then(res => {
        if(res.status == 201){
            Swal.fire(
                'Registro exitoso!',
                'Se ha registrado la persona!',
                'success'
              )
              $('#mdlCreate').modal('hide');
        }else{
            Swal.fire(
               'Registro fallido!',
               'Algo salio mal, intentalo de nuevo',
               'error'
             )

        } 

    })
    
}

const searchUser = (id) => {
    console.log(id);
    fetch(URL_BASE + "/api/users/" + id, {
        method: 'GET',
    })
    .then(res => res.json())
    .then(({data}) => {
        user.id = id;
        user.name = `${data.first_name} ${data.last_name}`
        user.work = jobs[Math.floor(Math.random() * jobs.length)]
        document.getElementById('nameU').value = user.name
        document.getElementById('workU').value = user.work
    })
}

const updateUser = () =>{
    fetch(URL_BASE + "/api/users/" + user.id, {
        method: 'PUT',
        body: JSON.stringify(user)
    })
    .then(res => {
        if(res.status == 200){
            Swal.fire(
                'Actualización exitosa!',
                'Se ha actualizado la persona!',
                'success'
              ) 
              $('#mdlUpdate').modal('hide');
        }else{
            Swal.fire(
              'Actualización fallida!',
              'Algo salio mal, intentalo de nuevo',
              'error'
            )
        }  
    })
    
}

const deleteUser = (id) => {
    Swal.fire({
        title: 'Estas seguro de eliminar este usuario?',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Sí',
        denyButtonText: `Cancelar`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            fetch(URL_BASE + "/api/users/" + id, {
                method: 'DELETE'
            })
            .then(res => {
                if(res.status == 204){
                    Swal.fire(
                        'Eliminación exitosa!',
                        'Se ha eliminado la persona!',
                        'success'
                      ) 
                }else{
                    Swal.fire(
                      'Eliminación fallida!',
                      'Algo salio mal, intentalo de nuevo',
                      'error'
                    )
                }  
            })
        } 
      })
}

const showUser = (id) => {
    console.log(id);
    fetch(URL_BASE + "/api/users/" + id, {
        method: 'GET',
    })
    .then(res => res.json())
    .then(({data}) => {
        console.log(data)
        document.getElementById('nameS').innerHTML = data.first_name + " " + data.last_name
        document.getElementById('workS').innerHTML = data.email
        document.getElementById('imgS').src = data.avatar
    })
}

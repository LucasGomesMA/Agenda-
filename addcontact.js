function add(event){
  const contato = document.getElementById("addcontact").value;
  const numero = document.getElementById("number").value;

  const contact = {
    contato,
    numero
  }

  $.ajax({
    type: "POST",
    url: "http://localhost:3000/contacts",
    data: JSON.stringify(contact),
    contentType: "application/json; charset=utf-8",         
    dataType: "json",
    success: (contact) => {
      const {contato, id} = contact;
      document.getElementById("contacts").innerHTML += `
      <div id="${id}" class="row form-group">
        <button onclick="mostrar('${id}')" class="col-11 btn btn-success">${contato}</button>
        <button onclick="deletar('${id}')" class="col-1 btn btn-danger"><strong>X</strong></butto>
      </div>
      `
    },
    failure: (err) => console.error(err)
  })


  
}

function mostrar(id){
  $.get(`http://localhost:3000/contacts/${id}`, (contact) =>{
    const {numero, id} = contact;

    const estaAberto = document.getElementById("aberto");
    const estaAberto2 = document.getElementById("aberto2");
    if(estaAberto){
      estaAberto.remove();
      estaAberto2.remove();
    }
    document.getElementById(id).innerHTML += `
      <div id="aberto" class="col-10 form-control alert-light" role="alert">number: ${numero}</div>
      <button id="aberto2" class="col-2 btn btn-primary">Edit</button>
    `;

  }) 
}

function verificar(){
  let array = [];
  console.log(array);
  $.get("http://localhost:3000/contacts", (contacts) => {
    contacts.forEach((contact) => {
      array.push(contact);
    })
  }).done(()=>{
    array = array.sort((a,b) => {
    if(a.contato > b.contato){
      return 1;
    }
    if(a.contato < b.contato){
      return -1;
    }
    return 0;
  });

  for(let i = 0; i < array.length; i ++){
    console.log('teste');
    document.getElementById("contacts").innerHTML += `
      <div id="${array[i].id}" class="row form-group">
        <button onclick="mostrar('${array[i].id}')" class="col-11 btn btn-success">${array[i].contato}</button>
        <button onclick="deletar('${array[i].id}','${array[i].contato}')" class="col-1 btn btn-danger"><strong>X</strong></butto>
      </div>
      `
      ;
  }
})

  
}
verificar();

function deletar(id,contato){
  console.log(id,contato)
  document.getElementById(id).innerHTML = `<div class="form-control alert alert-danger"><strong>${contato} was deleted.</strong></div>`
  $.ajax({
    url: `http://localhost:3000/contacts/${id}`,
    type: 'DELETE',
    success: function(result) {
        // Do something with the result
        console.log("deleted");
    }
  });

}
let addNote = document.querySelector('#add-note');//Botão de para adicionar nota
let closeModalView = document.querySelector('#close-modal'); //fechar janela modal com os detalhes da nota.
let modal = document.querySelector('#modal'); //Modal para edição das notas
let modalView = document.querySelector('#modal-view'); //Modal para exibição dos detalhes da nota
let notes = document.querySelector('#notes');//Lista divs com dados das notas
let btnSaveNote = document.querySelector("#btn-save-note"); //icone para salvar nota
let btnCloseModal = document.querySelector("#btn-close-note");//icone para fechar modal de edição de nota.

document.querySelector("#input-id").value = "";
document.querySelector("#input-title").value = "";
document.querySelector("#input-content").value = "";

addNote.addEventListener('click', (evt) => {
  evt.preventDefault(); //PREVINE DA PÁGINA RECARREGAR COM O LINK
  modal.style.display = 'block';
  notes.style.display = 'none';
  addNote.style.display = 'none';
});




btnCloseModal.addEventListener('click', (evt) => {
  evt.preventDefault();
  listNotes();
  modal.style.display = 'none';
  notes.style.display = 'flex';
  addNote.style.display = 'block';
});




btnSaveNote.addEventListener('click', (evt) => {
  evt.preventDefault();
  let objNote = {
    id: document.querySelector("#input-id").value.trim(), //retorna a string sem os espaços em branco
    title: document.querySelector("#input-title").value.trim(),
    content: document.querySelector("#input-content").value.trim()


  };




  console.log(objNote);
  saveNote(objNote);

 


});


closeModalView.addEventListener('click', evt => {
  evt.preventDefault();
  // modalView.style.display = "none";
  notes.style.display = 'flex';
  addNote.style.display = 'block';
  
})








const saveNote = (note) => {
  let listNotes = loadNotes();




  if (note.id.trim().length < 1) {
    note.id = new Date().getTime();
    document.querySelector('#input-id').value = note.id;
    listNotes.push(note);
  } else {
    console.log(note.id);
    listNotes.forEach((item, i) => {
      if (item.id == note.id) {
        listNotes[i] = note;
      }
    });
  }
  note.lastTime = new Date().getTime();
  note.content = document.querySelector("#input-content").value.trim();
  console.log(listNotes)
  
  listNotes = JSON.stringify(listNotes);
  localStorage.setItem('notes', listNotes);
  location.reload();
};




const loadNotes = () => {
  let listNotes = localStorage.getItem('notes');
  console.log(listNotes);




  if (!listNotes) {
    listNotes = [];
  }
  else {
    listNotes = JSON.parse(listNotes);
  }
  return listNotes;
}




const listNotes = () => {
  notes.innerHTML = "";
  let listNotes = loadNotes();
  listNotes.forEach((item) => {
    let divCard = document.createElement('div');
    divCard.className = 'car';
    divCard.style.width = '18rem';
    notes.appendChild(divCard); //coloca divCard dentro de divCardBody
    let divCardBody = document.createElement('div');
    divCardBody.className = "card-body";
    divCard.appendChild(divCardBody);
    let h1 = document.createElement('h1');
    h1.innerText = item.title;
    divCardBody.appendChild(h1);
    let pContent = document.createElement('p');
    pContent.innerText = item.content;
    divCardBody.appendChild(pContent);
    
    // pContent.innerText = new Date(item.lastTime).toLocaleDateString();
    // divCardBody.appendChild(pContent)

    let pLastTime = document.createElement('p')
    pLastTime.innerText = "última alteração em:"+ new Date(item.lastTime).toLocaleDateString();
    divCardBody.appendChild(pLastTime)
    divCard.addEventListener('click', (evt) => {
      evt.preventDefault();
      showNotes(item)
    });








  })
};




const showNotes = (note) => {
  document.querySelector('#title-note').innerHTML = "<h1>" + note.title + "</h1>"
  document.querySelector('#content-note').innerHTML = "<p>" + note.content + "</p>"
  document.querySelector("#title-note").innerHTML +=
    "<p> Ultima alteracao: " + new Date(note.lastTime).toLocaleDateString() + "</p>"
    document.querySelector("#controls-note").innerHTML = "";
  let aDelete = document.createElement('a');
  let i = document.createElement('i');
  i.style.color = "#2cceffee"
  i.className = "bi";
  i.className = "bi-trash"
  aDelete.appendChild(i);
  document.querySelector("#controls-note").appendChild(aDelete)
  aDelete.addEventListener('click', (evt)=>{
    evt.preventDefault();
    deleteNote(note.id);
  })
  let aEdit = document.createElement('a');
  let iEdit = document.createElement('i');
  iEdit.className = "bi bi-pencil-square";
  aEdit.appendChild(iEdit);
  document.querySelector("#controls-note").appendChild(aEdit)
  aEdit.addEventListener('click', (evt) => {
    evt.preventDefault();
    editNote(note);
  })


  // modalView.style.display = 'block';
  notes.style.display = 'none';
  addNote.style.display = 'none';



}

const editNoteModal = (note) => {
  document.querySelector("#input-id").value = note.id;
  document.querySelector("#input-title").value = note.title;
  document.querySelector("#input-content").value = note.content;
  modal.style.display = "block";
  notes.style.display = "none";
  addNote.style.display = "none";
  btnSaveNote.addEventListener('click', (evt) => {
    evt.preventDefault();
    note.title = document.querySelector("#input-title").value.trim();
    note.content = document.querySelector("#input-content").value.trim();
    note.lastTime = new Date().getTime();
    saveNote(note);
    listNotes();
    modal.style.display = 'none';
    notes.style.display = 'flex';
    addNote.style.display = 'block';
  });
};



const deleteNote = (id) => {
  let listNotes = loadNotes(); 

  listNotes.forEach((note, i) => {
    if (note.id === id) {
      listNotes.splice(i, 1);
    }
  });
  listNotes = JSON.stringify(listNotes); 
  localStorage.setItem("notes", listNotes);
  location.reload();
}


const editNote = (note) => {
  let listNotes = loadNotes();
  
  listNotes.forEach((item, i) => {
    if (item.id === note.id) {
      listNotes[i].title = note.title;
      listNotes[i].content = note.content;
      listNotes[i].lastTime = new Date().getTime();
    }
  });
  

  localStorage.setItem('notes', JSON.stringify(listNotes));
  editNoteModal(note);
};




listNotes();


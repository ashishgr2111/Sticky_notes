let CreatedSort = [];
let UpdatedSort = []
const layout = document.querySelector('.layout');

const btn = document.querySelector('button');
btn.onclick = displayMessage;
btn.focus();

function displayMessage() {
  const panel = document.createElement('div');
  panel.setAttribute('class', 'msgBox');

  CreatedSort.unshift(panel);
  UpdatedSort.unshift(panel);
  DrawDOM();

  const msg = document.createElement('p');
  msg.textContent = prompt("Enter your msg");
  panel.appendChild(msg);

  const closeBtn = document.createElement('button');
  closeBtn.setAttribute("id", "closeButton");
  closeBtn.textContent = 'x';
  panel.appendChild(closeBtn);

  const editBtn = document.createElement('button');
  editBtn.setAttribute("id", "editButton");
  editBtn.textContent = 'Edit/Enter';
  panel.appendChild(editBtn);

  editBtn.onclick = function(){
    if(panel.children.length === 3){
      let toBeRemoved = panel;

      const textInput = document.createElement('textarea');
      textInput.value = msg.textContent;
      panel.appendChild(textInput);     

      const submitBtn = document.createElement('button');
      submitBtn.textContent = 'Save';
      panel.appendChild(submitBtn);

      submitBtn.onclick = function(){ 
        msg.textContent = textInput.value;
        textInput.parentNode.removeChild(textInput);
        submitBtn.parentNode.removeChild(submitBtn);
        
        UpdatedSort = UpdatedSort.filter(function(value){
          return (value !== toBeRemoved);
        });
        UpdatedSort.unshift(panel);
        DrawDOM();
      } 
    }              
  }

  closeBtn.onclick = function() {
    let answer = prompt("Do u really want to delete this note?? Yes/No");
    if(answer.toLowerCase()[0] === 'y'){
      panel.parentNode.removeChild(panel);
    }
  }
}

let radioObj = document.getElementsByTagName("input");
for(let i=0; i<radioObj.length ; i++){
  radioObj[i].onclick = DrawDOM;
}

function DrawDOM() {
  let prev_len = layout.children.length;
  for(let i=0 ; i < prev_len; i++){
    layout.children[0].parentNode.removeChild(layout.children[0]);;
  }

  let len = CreatedSort.length;        
  for(let i=0; i < len ; i++){          
    if(radioObj[0].checked){
      layout.appendChild(CreatedSort[i]);
    }
    else{
      layout.appendChild(UpdatedSort[i]); 
    }
  }
}
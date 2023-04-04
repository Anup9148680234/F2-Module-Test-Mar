
const AddStudent = document.getElementById('addUser');
const btnText = AddStudent.innerText;
const userText = document.getElementById('name');
const emailText = document.getElementById('email');
const gpaText = document.getElementById('gpa');
const ageText = document.getElementById('age');
const degreeText = document.getElementById('degree');



const studentRecords = document.getElementById('records');
let userArray = [];
let edit_id = null;

let objStr = localStorage.getItem('users');

if (objStr != null) {
   userArray = JSON.parse(objStr);
}

DisplayInfo();
AddStudent.onclick = () => {
   //get user's name from text field
   const name = userText.value;
   const email = emailText.value;
   const gpa = gpaText.value;
   const age = ageText.value;
   const degree = degreeText.value;
   
   if (edit_id != null) {
      //edit action
      userArray.splice(edit_id, 1, {
        'name': name,
        'email':email,
        'gpa':gpa,
        'age':age,
        'degree':degree
      });
      
      edit_id = null;
   } else {
      //insert action
      userArray.push({
         'name': name,
         'email':email,
         'gpa':gpa,
         'age':age,
         'degree':degree
      });
   }

   SaveInfo(userArray);
   userText.value = '';
   ageText.value='';
   emailText.value='';
   gpaText.value='';
   degreeText.value='';
   AddStudent.innerText = btnText;
}

// store user's name in local storage
function SaveInfo(userArray) {
   let str = JSON.stringify(userArray);
   localStorage.setItem('users', str);

   
//    fs.writeFileSync('./data.json',str);

   DisplayInfo();
}

// display user's name
function DisplayInfo() {
    document.getElementById('addUser').style.backgroundColor = '#FFFFFF';
    document.getElementById('addUser').style.color = '#111111';
   let statement = '';
   userArray.forEach((user, i) => {
      statement += `<tr>
           <th scope="row">${i+1}</th>
           <td>${user.name}</td>
           <td>${user.email}</td>
           <td>${user.age}</td>
           <td>${user.gpa}</td>
           <td>${user.degree} <i onclick='EditInfo(${i})'><img src="./edit 1.svg"></i> <i onclick='DeleteInfo(${i})'><img src="./trash-2 1.svg"></i></td>

         </tr>`;
   });
   studentRecords.innerHTML = statement;
}

// edit user's name
function EditInfo(id) {
   edit_id = id;
   userText.value = userArray[id].name;
   emailText.value = userArray[id].email;
   ageText.value = userArray[id].age;
   gpaText.value = userArray[id].gpa;
   degreeText.value = userArray[id].degree;
   AddStudent.innerText = 'Edit Student';
   document.getElementById('addUser').style.backgroundColor = '#111111';
   document.getElementById('addUser').style.color = '#FFFFFF';
}

//delete user's name
function DeleteInfo(id) {
   userArray.splice(id, 1);
   SaveInfo(userArray);
}



const allTr = document.querySelectorAll('#records tr');

const searchInputField = document.querySelector('#search');
searchInputField.addEventListener('input', function (e) {
   const searchStr = e.target.value.toLowerCase();
   studentRecords.innerHTML = '';
   allTr.forEach(tr => {
        // console.log(tr);
    const td_in_tr = tr.querySelectorAll('td');
        if (td_in_tr[0].innerText.toLowerCase().indexOf(searchStr) > -1 ||
        td_in_tr[1].innerText.toLowerCase().indexOf(searchStr) > -1 ||
        td_in_tr[4].innerText.toLowerCase().indexOf(searchStr) > -1) {
        studentRecords.appendChild(tr);
        }
    
   });

   if (studentRecords.innerHTML == '') {
      studentRecords.innerHTML = ' No Records Found';
   }
});
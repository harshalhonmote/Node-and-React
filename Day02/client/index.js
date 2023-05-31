if(sessionStorage.getItem("isLogin") == null){
  window.location.href="login.html";
}
var refHeader = document.getElementById('header');
refHeader.innerText=sessionStorage.getItem("email");

function logout(){
  sessionStorage.removeItem("isLogin");
  sessionStorage.removeItem("email");
  window.location.href = "login.html";
}



var refName = document.getElementById('userName');
var refCity = document.getElementById('city');
var refDivInput = document.getElementById('divAdd');


var refSubmit = document.getElementById('submit');
var refUpdate = document.getElementById('update');
var refIdInput=null;
refUpdate.disabled=true;
async function getData() {
  var refTable = document.getElementById("table");
  refTable.innerHTML="";
   await fetch('http://127.0.0.1:3000/emp')
        .then((response)=>response.json())
        .then((jsonResp)=>{
            jsonResp.forEach((data) => {
                var row = `
             <tr>
             <td>${data.id}</td>
             <td>${data.ename}</td>
             <td>${data.city}</td>
             <td>
             <input type="button" name="edit" value="EDIT" class="btn btn-success" onclick="editData(${data.id},'${data.ename}','${data.city}')">
             <input type="button"  name="remove" value="REMOVE" class="btn btn-danger" onclick="removeData(${data.id})">
             </td>
            </tr> `;
            refTable.innerHTML=refTable.innerHTML+row;
             });
        }).catch(err => console.log(err))
}

async function updateData(){
  var updateId = refIdInput.value;
  debugger;
  if(refName.value !="" && refCity.value !="")
  {
     const url = 'http://127.0.0.1:3000/emp/'+updateId;
     let data = {
        ename:refName.value,
        city:refCity.value
      }
  
      let fetchData = {
           method: 'PUT',
          body: JSON.stringify(data),
          headers:{
                'Content-Type': 'application/json'
              }
        }
  await fetch(url, fetchData)
    .then((resp)=> resp.json()
    )
    .then((data)=>console.log(data)
    )
    .catch (function (error) {
      console.log('Request failed'+error);
  });
     clear();
     message("user updated !!!!");
     //debugger;
     getData();
    //  window.location.reload();
    refSubmit.disabled=false;
    refUpdate.disabled=true;
    refDivInput.innerHTML="";
  }
  else{
      // debugger;
      message("Username & City Required*");
  }
}

function editData(editId,name,city){
  // debugger;
 
  refSubmit.disabled=true;
  refUpdate.disabled=false;

  refDivInput.innerHTML=`<label for="userName" class="form-label">ID</label>
                         <input type="text" id="idInput" value=${editId} class="form-control">`;
 
  refIdInput = document.getElementById('idInput');

  var refEditArr = document.getElementsByName('edit');
var refRemArr = document.getElementsByName('remove');
   
refEditArr.forEach((btn)=>{
  btn.disabled=true;
})
refRemArr.forEach((btn)=>{
  btn.disabled=true;
})
  //refIdInput.style.pointerEvents='none';
  refIdInput.disabled = true;
  refName.value=name;
  refCity.value=city;

}





async function removeData(id){
  // var refId = document.getElementById(id);
  const url = 'http://127.0.0.1:3000/emp/'+id;
  let fetchData = {
    method: 'DELETE'
 }

await fetch(url, fetchData)
.then((resp)=> resp.json()
)
.then((data)=>console.log(data.affectedRows)
)
.catch (function (error) {
console.log('Request failed'+error);
});
debugger;
getData();
// window.location.reload();
message("user deleted !!!!");
//debugger;
// setTimeout(getData(),3000);


}


 async function submitData(){
    
    if(refName.value !="" && refCity.value !="")
    {
       const url = 'http://127.0.0.1:3000/emp';
       let data = {
          ename:refName.value,
          city:refCity.value
        }
    
        let fetchData = {
             method: 'POST',
            body: JSON.stringify(data),
            headers:{
                  'Content-Type': 'application/json'
                }
          }
    await fetch(url, fetchData)
      .then((resp)=> resp.json()
      )
      .then((data)=>console.log(data)
      )
      .catch (function (error) {
        console.log('Request failed'+error);
    });
       clear();
       message("user added !!!!");
       //debugger;
       getData();
      //  window.location.reload();
    }
    else{
        // debugger;
        message("Username & City Required*");
    }
 }
 
function clear(){
  refName.value="";
  refCity.value="";
}

 function message(msg){
    var refErr = document.getElementById("err");
    refErr.innerText = msg; 
        setTimeout(() => {
            refErr.innerHTML = "";
        }, 3000); 
 }

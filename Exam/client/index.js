var refEmail = document.getElementById("email");
var refPass = document.getElementById("pass");

//------login--------------------------------
async function login(){
   // console.log(refEmail.value);
    if(refEmail.value !="" && refPass.value !="")
    {
       const url = 'http://127.0.0.1:3000/login';
       let data = {
          email:refEmail.value,
          pass:refPass.value
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
      .then((data)=>{
        console.log(data[0]);
        if(data[0].role =="usr"){
            sessionStorage.setItem("id", data[0].empid);
         sessionStorage.setItem("name", data[0].email);
         window.location.href="user.html";
         
        }
        else if(data[0].role =="emp"){
            sessionStorage.setItem("id", data[0].empid);
            sessionStorage.setItem("name", data[0].email);
            window.location.href="emp.html";
            
        }
      }
      )
      .catch (function (error) {
        console.log('Request failed'+error);
    });
    }
    else{
        // debugger;
        message("Username & pass Required*");
    }
}

//-------user------------------------------------
async function user(){
    console.log(sessionStorage.getItem("id"))
    var refTable = document.getElementById("table");
    var refHeaderName = document.getElementById("headername");
    refHeaderName.value=sessionStorage.getItem("name");
       const url = 'http://127.0.0.1:3000/user';
       let data = {
          id:sessionStorage.getItem("id")
        }
        let fetchData = {
             method: 'POST',
            body: JSON.stringify(data),
            headers:{
                  'Content-Type': 'application/json'
                }
          }
          var row=` <thead class="table-dark">
          <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>MODEL</th>
              <th>PRICE</th>
              <th>COLOR</th>
          </tr>
         `
    await fetch(url, fetchData)
      .then((resp)=> resp.json()
      ).then((data)=>{
        console.log(data);
       data.forEach(ele => {
             row=row+
             `<tr class="table-primary">
             <td>${ele.id}</td>
             <td>${ele.name}</td>
             <td>${ele.model}</td>
             <td>${ele.price}</td>
             <td>${ele.color}</td>         
             </tr>`
             refTable.innerHTML=row;
       });
      }
      )
      .catch (function (error) {
        console.log('Request failed'+error);
    });

}

async function carInfoSubmit(){
    var refcarname = document.getElementById("carname");
    var refmodel = document.getElementById("model");
    var refprice = document.getElementById("price");
    var refcolor = document.getElementById("color");

    if(refcarname.value !="" && refmodel.value !="" && refprice.value !="")
    {
       const url = 'http://127.0.0.1:3000/user/carRegister';
       let data = {
          carname:refcarname.value,
          model:refmodel.value,
          price:refprice.value,
          color:refcolor.value,
          id:sessionStorage.getItem("id")
        }
    
        let header = {
             method: 'POST',
            body: JSON.stringify(data),
            headers:{
                  'Content-Type': 'application/json'
                }
          }
    await fetch(url, header)
      .then((resp)=> resp.json())
      .then((data)=>console.log(data))
      .catch (function (error) {
        console.log('Request failed'+error);
    });
    
      user();
    }
    else{
        // debugger;
        alert("all fields required!!!")
    }
} 

function logout(){
    sessionStorage.removeItem("id");
    window.location.href="index.html";
}

async function register(){
    if(refEmail.value !="" && refPass.value !="")
    {
       const url = 'http://127.0.0.1:3000/login/register';
       let data = {
          email:refEmail.value,
          pass:refPass.value
        }
    
        let fetchData = {
             method: 'POST',
            body: JSON.stringify(data),
            headers:{
                  'Content-Type': 'application/json'
                }
          }
    await fetch(url, fetchData)
      .then((resp)=> resp.json())
      .then((data)=>{
        if(data.affectedRows==1){
            message("User Register sucessfully!!");
        }
    })
      .catch ((error)=> {
        console.log('Request failed'+error);
    });
    }
    else{
        // debugger;
        message("Username & pass Required*");
    }
}

//-------Validation---------------------------
function message(msg){
    var refMsg = document.getElementById("msg");
    refMsg.innerHTML=`<h3  class="mb-4  m-4 text-dange">${msg}</h3>`;

    setTimeout(()=>{
        refMsg.innerHTML="";
    },3000);
}

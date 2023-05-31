 var refEmail = document.getElementById("email");
 var refPass = document.getElementById("pass");

 async function login(){

    if(refEmail.value !="" && refPass.value !="")
    {      let passE = window.btoa(refPass.value);
        console.log(passE);
           const url = 'http://127.0.0.1:3000/emp/login';
           let data = {
              email:refEmail.value,
              pass:passE
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
            console.log(data)
            if(data.isValid ==true){
                sessionStorage.setItem("email",refEmail.value)
                sessionStorage.setItem("isLogin",true)
                window.location.href="index.html";
            }
            else{
                alert("Invalid credintial");
            }


          })
        }
        else{
            // debugger;
            alert("Username & City Required*");
        }
 }
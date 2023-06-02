async function emp(){
    console.log(sessionStorage.getItem("id"))
    var refTable = document.getElementById("table");


    var refHeaderName = document.getElementById("headername");
    refHeaderName.value=sessionStorage.getItem("name");

          var row=` <thead class="table-dark">
          <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>MODEL</th>
              <th>PRICE</th>
              <th>COLOR</th>
              <th>USER ID</th>
              <th></th>
          </tr>`

    await fetch('http://127.0.0.1:3000/emp')
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
             <td>${ele.uid}</td>
             <td>
             <button type="button" class="btn btn-success" onclick="edit('${ele.name}','${ele.model}','${ele.price}','${ele.color}')">Edit</button>
             <button type="button" class="btn btn-danger" onclick="remove(${ele.id})">Remove</button>
             <td>
             </tr>`
             refTable.innerHTML=row;
       });
      }
      )
      .catch (function (error) {
        console.log('Request failed'+error);
    });
}

function edit(name,model,price,color){
console.log(name,model,price,color);
var refSubmit =document.getElementById("submitbtn");
refSubmit.disabled =true;

    var refcarname = document.getElementById("carname");
    var refmodel = document.getElementById("model");
    var refprice = document.getElementById("price");
    var refcolor = document.getElementById("color");

    refcarname.value=name;
    refmodel.value=model;
    refprice.value=price;
    refcolor.value=color;
   

}
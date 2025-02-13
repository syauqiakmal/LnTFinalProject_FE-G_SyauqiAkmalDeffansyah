const firebaseConfig = {
    apiKey: "AIzaSyBL6BHP7O6Tpz2cjbC9YxSytECo7C_bWAc",
    authDomain: "projekbncc2022.firebaseapp.com",
    projectId: "projekbncc2022",
    storageBucket: "projekbncc2022.appspot.com",
    messagingSenderId: "828418595688",
    appId: "1:828418595688:web:5919a4f5b86c7d34fc94dd",
    measurementId: "G-9B035GEPGY"
  };

  firebase.initializeApp(firebaseConfig);
  var firestore=firebase.firestore();

const submitBtn=document.querySelector('#Submit');

let userName=document.querySelector('#userFullName');
let userEmail=document.querySelector('#userEmail');
let userPhoneNumber= document.querySelector('#userPhoneNumber');
let userOptions= document.getElementById("userOptions");
let error1=document.querySelector('#error_msg1');
let error2=document.querySelector('#error_msg2');
let error3=document.querySelector('#error_msg3');


const db=firestore.collection("BNCCFinalProjectFront-End");

submitBtn.addEventListener('click',function(event){
    event.preventDefault();
    error1.innerText='';
    error2.innerText='';
    error3.innerText='';
  
    let userNameInput = userName.value;
    let userEmailInput = userEmail.value;
    let userPhoneNumberInput = userPhoneNumber.value;
    let userOptionsInput = userOptions.options[userOptions.selectedIndex].text;
    
    if(userNameInput.length<3){
        error1.innerText='Name must be filled and name length must be greater than equal to 3 characters';
    }

    else if((!(userEmailInput.includes('@')))||userEmailInput.length==0){
        error2.innerText='Email must be filled and include @';
    }
    
    else if((!(userPhoneNumberInput.startsWith('08')))||
    userPhoneNumberInput.length==0||
    userPhoneNumberInput.length>14){
        error3.innerText='Phone number must be filled, the first digit must be 0, the second digit must be 8, and phone number length is no more than 14 digits';
    }

    else{
        let param = {Name: userNameInput, Email: userEmailInput, PhoneNumber: userPhoneNumberInput, Options: userOptionsInput}
        $.ajax({
            url:'https://jsonplaceholder.typicode.com/posts',
            type: 'POST',
            data: JSON.stringify(param),
            success:function(data){
                console.log(data);
            }
        })
        db.doc().set({
            Name: userNameInput,
            Email:userEmailInput,
            PhoneNumber:userPhoneNumberInput,
            Options: userOptionsInput
         }).then(function(){
             console.log("Data Submitted");
         });
         $("#userFullName").val("");
         $("#userEmail").val("");
         $("#userPhoneNumber").val("");
         $("#successAlert").removeClass("d-none");
    }
});
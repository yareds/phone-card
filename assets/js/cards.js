/**
 * cards.js
 * 
 * Everything related to the card management will be done here. 
 * All the arrays, event listeners and functions shall be created here as long as 
 * they are realted to the the card management.
 * 
 * @author Practical IT
 * @author [Yared Abegaz]
 */
let cards = {
  wallia: {
    title: 'Wallia',
    price:  25,
    minutes: 100,
    refillable: true
  },
  chellada: {
    title: 'Chellada',
    price:  20,
    minutes: 120,
    refillable: true
  },
  kebero: {
    title: 'Key Kebero',
    price:  10,
    minutes: 130,
    refillable: false
  }
};

let checkout = []; //array for checkedout cards.
let purchased = []; //array for the purchased cards
let email_subscribers = []; //array for the subscribers
let members = []; //array for the members

const buy_chellada_card = document.querySelector('#chellada');
const buy_wallia_card = document.querySelector('#wallia');
const buy_kebero_card = document.querySelector('#kebero');

const checkout_list = document.querySelector('#checkout_list');
const balance_list = document.querySelector('#balance_list');

const updateCheckout = () => {
  //create a list to be shown on the checkout list.
  let checkout_table = "";
  if (checkout.length > 0) {
    checkout.forEach( card => {
      let total = parseInt(cards[card.type].price)*parseInt(card.quantity);
      checkout_table += `<tr>
      <td>${card.type}</td>
      <td>${card.quantity}</td>
      <td>${cards[card.type].price}</td>
      <td>${total}</td>
    </tr>`;
    });
    checkout_list.innerHTML = checkout_table;
  }
}

const chellada_quantity = document.querySelector('#chellada_quantity');
const wallia_quantity = document.querySelector('#wallia_quantity');
const Kebero_quantity = document.querySelector('#kebero_quantity');

//initially the buttons are disabled. They will be back to active when the user selects quantity.
const quantitySelected = (event) => {
  //console.log(event);
  //get the type of the card from the id itself

  let card_type = event.target.id.split('_')[0];//gives the "type_quantity" as an id
  document.querySelector(`#${card_type}`).disabled = true;

 const quantity = event.target.value;
  if (quantity) { //meaning the user has seleted the quantity of the card to be purchased.

    //now the user has selected the quantity, activate the button.
    //console.log(document.querySelector(`#${card_type}`));
    document.querySelector(`#${card_type}`).disabled = false;
  }
}
chellada_quantity.addEventListener('change', (event) => quantitySelected(event));
wallia_quantity.addEventListener('change', (event) => quantitySelected(event));
Kebero_quantity.addEventListener('change', (event) => quantitySelected(event));


let quantity=0;

buy_chellada_card.addEventListener('click', () => 
addToCheckout('chellada', quantity = parseInt(chellada_quantity.value)));

buy_wallia_card.addEventListener('click', () => 
addToCheckout('wallia', quantity = parseInt(wallia_quantity.value)));

buy_kebero_card.addEventListener('click', () => 
addToCheckout("kebero", quantity = parseInt(Kebero_quantity.value)));

//purchased object example {type: 'chellada', quantity: 2 }
//console.log(quantity);

const addToCheckout = (type, quantity) => {
  //get valid card types
  let valid_types = Object.keys(cards);
  if (valid_types.includes(type)) {
    //create the object for checkout here.
      let checkout_card = {type: type, quantity: quantity};
    if ( checkout.length === 0) {
      checkout.push(checkout_card);
      //console.log(checkout_card)
      updateCheckout();
      totalBalance();
      updateCartCount();
      return;
    } else if (checkout.some(i => i.type === checkout_card.type)) 
    {
        checkout.forEach( item => {
          if (item.type === checkout_card.type)
            item.quantity += parseInt(checkout_card.quantity);
        });
          } else {
            checkout.push(checkout_card);
          }
      //console.log(quantityCount);
    updateCheckout();
    totalBalance();
    updateCartCount();
    //addMinutes();
    }
}

/* Total Balance */

let balanceTable = 0;
 let total_balance=0;
//let currentBalance;

    const totalBalance = () => {
   //if (checkout.length > 0) {
    checkout.forEach( (card) => {

    //balanceTable = "";
   currentBalance= parseInt(cards[card.type].minutes)*parseInt(card.quantity);
   console.log(cards[card.type].minutes)
   console.log(card.quantity)
   //console.log(currentBalance)
  })  
total_balance += currentBalance;
 //console.log(total_balance)

        balanceTable = `<tr>
        <td> Total Balance = ${total_balance}</td>
      </tr>`;
    balance_list.innerHTML = balanceTable;

   
  }

/* Checkout Cart Counter */

const updateCartCount= () => {
  let quantityCount = 0;
  checkout.forEach(item => {
    quantityCount += item.quantity;
     });
  let checkoutCount = document.querySelector('#checkoutCount');
  checkoutCount.innerHTML = `Checkout(${quantityCount})<i class="ion-android-remove"></i>`;

  let cartCount = document.querySelector('#cart_count');
  cartCount.innerHTML = `Cart(${quantityCount})</a></li>`;
}

/* Buy Card */

let buyCardButton = document.querySelector("#buyCard");
buyCardButton.addEventListener("click", () => {
let buy_quantity = parseInt(document.querySelector("#buy_quantity").value);
let buy_type = document.querySelector('#buy_type').value;
addToCheckout(buy_type, buy_quantity);
});


/* Add minutes */


// const addMinutes = () => {
//  purchased.forEach( card => {
  //let totalMinBalance = "";
let add_minutes_btn = document.querySelector("#add_minutes_btn");
let display_minutes = document.querySelector("#display_minutes");
add_minutes_btn.addEventListener("click", () => {
let minutes_amount = document.querySelector("#minutes").value;
//console.log(minutes_amount)
//let select_card_type = parseInt(document.querySelector('#select_card_type').value);
let select_qua_amount = document.querySelector("#select_qua_type").value;
let minValue = cards.wallia.minutes;
 // let minBalance = parseInt(cards[card.type].minutes) * parseInt(card.quantity);
 // console.log(minBalance);

//let totalBal = totalBalance();
 if (totalBalance() === 0) {
 alert("Your card balance is 0 . You have to purchase a card first");
 }else {
//   totalMinBalance = "";
 let totalMinutes = select_qua_amount * minutes_amount*minValue;
 display_minutes.innerHTML = `Your added minutes is(${totalMinutes})<br> `;
  console.log(totalMinutes)
 }
})

/* Membership registration */


function submit() {
  let fname = document.getElementById("first_name").value;
  let lname = document.getElementById("last_name").value;
  let email = document.getElementById("email").value;
  let phone = document.getElementById("phone").value;
  
    membersData = {
        fname: fname.value,
        lName: lname.value,
        emailAddress: email.value,
        phoneNumber: phone.value,
}
    members.push(membersData);

  if (memb_validation()) // Calling validation function
  {
    document.getElementById("form_id").submit(); //form submission
    alert(" FName : " + fname + " LName : " + lname + " Phone : " + phone +"  Email : " + email  + " Form Submitted Successfully!");
  }
  }
  function memb_validation(){
    let fname = document.getElementById("first_name").value;
    let lname = document.getElementById("last_name").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let phoneReg = /^\d{10}$/;
    if( fname ==='' || lname ==='' || phone ==='' || email ===''){
    alert("Please fill all fields...!!!!!!");
    return false;
    }else if(!(email).match(emailReg)){
    alert("Invalid Email...!!!!!!");
    }else if((!phone.match(phoneReg))){
    alert("Invalid Phone...!!!!!!");
    return false;
    }else{
    return true;
    }}

    /* Email Subscribers */

    let subscribe_btn = document.querySelector("#subscribe_id");
    subscribe_btn.addEventListener("click", subscribe);
   
    function subscribe() {
     
      let email = document.querySelector("#email_s").value;
      let emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      
      subscribersData = {
            emailAdd: email.value,
           }
        email_subscribers.push(subscribersData);


      if (email === ""){
        alert("Please enter your email!")
      }else if(!(email).match(emailReg)){
        alert("Invalid Email...!!!!!!");
        }else{
          alert(" Email : " + email  + " Subscribed Successfully!");
        }
      }
    
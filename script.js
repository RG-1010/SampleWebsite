if(!(parseInt(localStorage.getItem("counter")) >= 0)){
    localStorage.setItem("counter", JSON.stringify(-1)); //initializing counter
}


var counter = parseInt(localStorage.getItem("counter")); //global counter for cart page
console.log("-------Checking initialization of counter ---------: " + typeof counter + counter)



if(!(localStorage.getItem("coupons") == "null")){
    localStorage.setItem("coupons", JSON.stringify("null")); //initializing counter
}


var coupons = localStorage.getItem("coupons"); //global counter for cart page
console.log("-------Checking initialization of coupons ---------: " + typeof coupons + coupons)






/*HAMBURGUER MENU FOR SMALLER DEVICES */

const bar = document.getElementById('bar'); //id is from the hamburger menu icon
const close = document.getElementById('close'); //id is from the close icon
const nav = document.getElementById('navbar'); //id is from the navbar

if(bar){
    bar.addEventListener('click', () => {
        nav.classList.add('active');
    })
}

if(close){
    close.addEventListener('click', () => {
        nav.classList.remove('active');
    })
}

/* REVEAL PAGE SLOWLY */

window.addEventListener('scroll', reveal);

function reveal(){
    var reveals = document.querySelectorAll('.reveal');

    for(var i = 0; i < reveals.length; i++){

        var windowheight = window.innerHeight;
        var revealtop = reveals[i].getBoundingClientRect().top;
        var revealpoint = 50;

        if(revealtop < windowheight - revealpoint){
            reveals[i].classList.add('activeScroll');
        }
        else{
            reveals[i].classList.remove('activeScroll');
        }
    }

}

/*EMAIL COMMUNCATION IN CONTACT PAGE */

function sendEmail(){
    Email.send({
        Host : "smtp.elasticemail.com",
        Username : "raul.guerra.1901.flex@gmail.com",
        Password : "ACED6455F3E11DC9BE728948172E1350484C",
        To : 'LFmarketing4u@gmail.com', //--------- Where form submissions are sent
        From : "ContactPage@lfmarketingteam.com",
        Subject : "New Contact Form Submission From LF Marketing Website:" + document.getElementById("subject").value,
        Body : "Name: " + document.getElementById("name").value
        + "<br> Email: " + document.getElementById("email").value
        + "<br> Phone: " + document.getElementById("phone").value
        + "<br> Message: " + document.getElementById("message").value
    }).then(
      message => alert("Message sent successfully. We'll contact you soon!")
    );
}


/*EMAIL COMMUNCATION IN CART PAGE */

function sendOrder(){
    console.log("-------SendOrder() called ---------: ")
    var table = "<table id=\"emailTable\" width=\"100%\"><thead><tr><td>Product</td><td>Description</td><td>Quantity</td></tr></thead><tbody class=\"cart-items\">";
    var rows = ""; //store rows

    for ( var i = 0, len = parseInt(localStorage.getItem("counter")); i <= len; ++i ) {
        var storageKey = "item" + i;
        let testItem = localStorage.getItem(storageKey);
        if(JSON.parse(testItem) != null){
        rows += "<tr class=\"cart-row\"> <td>" + JSON.parse(testItem).product + "</td> <td>" + JSON.parse(testItem).description + "</td> <td>" + parseInt(JSON.parse(testItem).quantity) + "</td> </tr>";
        }
    }

    table += rows;
    table += "</tbody></table>";

    console.log("-------table created ---------: ")

    Email.send({
        Host : "smtp.elasticemail.com",
        Username : "raul.guerra.1901.flex@gmail.com",
        Password : "ACED6455F3E11DC9BE728948172E1350484C",
        To : 'LFmarketing4u@gmail.com', //--------- Where form submissions are sent
        From : "NewOrder@lfmarketingteam.com", //--------- What receivers will see as "sender"
        Subject : "New Order Submission From LF Marketing Website",
        Body : "Name: " + document.getElementById("name").value
        + "<br> Email: " + document.getElementById("email").value
        + "<br> Phone: " + document.getElementById("phone").value
        + "<br> Message: " + document.getElementById("message").value
        + "<br> Coupon: " + localStorage.getItem("coupons")
        + "<br> Order Details: <br>" + table
    }).then(
        window.alert("Order Submitted Successfully. We'll contact you soon to discuss the details!"),
        localStorage.clear(),
        window.location.reload(),
    );

    
    
}


//TO ADD COUPON IN CART PAGE

var addCouponButtons = document.getElementsByClassName('add-coupon-button');
    for (var i = 0; i < addCouponButtons.length; i++){
        var button = addCouponButtons[i];
        button.addEventListener('click', addCouponClicked);
    }

    function addCouponClicked(event){
        console.log("CLICKED APPLY COUPON ------------------------------------------------------")
        localStorage.removeItem("coupons");
        localStorage.setItem("coupons", JSON.stringify(document.getElementById("coupon-input").value))
        window.alert("Coupon will be applied upon order confirmation.")
    }    


//TO ADD TO CART IN ALL PRODUCT PAGES

var addToCartButtons = document.getElementsByClassName('shop-item-button');
    for (var i = 0; i < addToCartButtons.length; i++){
        var button = addToCartButtons[i];
        button.addEventListener('click', addToCartClicked);
    }


   

function addToCartClicked(event){
    console.log("CLICKED ADD TO CART ------------------------------------------------------")
    counter = parseInt(localStorage.getItem("counter")); //getting updated counter info
    counter++; //incrementing counter
    localStorage.removeItem("counter"); //removing old counter from local storage
    localStorage.setItem("counter", JSON.stringify(counter)); //saving new counter in local storage

    console.log("Counter increased ----: " + counter)
    var storageKey = "item" + counter;
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('main-product-image')[0].src   
    var quantity = shopItem.getElementsByClassName('shop-input-quantity')[0].value
    var description = shopItem.getElementsByClassName('shop-select-details')[0].value
    console.log("localID: " + counter );
    console.log("product: " + title );
    console.log("imageSrc: " + imageSrc);
    console.log("quantity: " + quantity);
    console.log("description: " + description);


    var newItem = {
        "localID": counter,
        "product": title,
        "imageSrc": imageSrc,
        "quantity": quantity,
        "description": description
    }

    localStorage.setItem(storageKey, JSON.stringify(newItem));
    
    window.alert("Product added to cart.")
    
    /*
    
    let testItem = localStorage.getItem(storageKey);
        console.log(JSON.parse(testItem))


        
         //FOR TESTING
        console.log("-----testItem.localID: " + JSON.parse(testItem).localID);
        console.log("-----testItem.product: " + JSON.parse(testItem).product);
        console.log("-----testItem.imageSrc: " + JSON.parse(testItem).imageSrc);
        console.log("-----testItem.quantity: " + JSON.parse(testItem).quantity);
        console.log("-----testItem.description: " + JSON.parse(testItem).description);
        */

        /*
    const addItemToCart = new createStruct("product, imageSrc, quantity, description");
    const currentItem = new addItemToCart(title, imageSrc, quantity, description);
    console.log("currentItem.product: " + currentItem.product);
    console.log("currentItem.imageSrc: " + currentItem.imageSrc);
    console.log("currentItem.quantity: " + currentItem.quantity);
    console.log("currentItem.description: " + currentItem.description);

   localStorage.setItem('temp1', JSON.stringify(currentItem));
    
   let newItem = window.localStorage.getItem("temp1");
        console.log(JSON.parse(newItem));

        var structOneInpStr = "";

        structOneInpStr += newItem['product'];

        console.log("newItem.product: " + structOneInpStr);
        console.log("newItem.imageSrc: " + newItem[1]);
        console.log("newItem.quantity: " + newItem[2]);
        console.log("newItem.description: " + newItem[3]);
*/
   
}


/*
//FAILED LOGIC 

let carts = document.querySelectorAll('.shop-item-button')

let products = [{
    imageSource: "someimage.jpg",
    name: "generic title",
    description: "some desc",
    quantity: 1

}]

for(let i = 0; i < carts.length; i++){ //selecting all "add to cart" buttons. There's only one per page. This can help when multiple buttons of this class.
    carts[i].addEventListener('click', () => {
        cartNumbers();
    })
}

function cartNumbers(){
    let productNumbers = localStorage.getItem('cartNumbers');

    productNumbers = parseInt(productNumbers);
    localStorage.setItem('cartNumbers', 1);
}
*/


/************************************** EXPERIMENTAL 

function createStruct(keys) { //creates struct
    if (!keys) return null;
    const kArr = keys.split(', ');
    const kCount = kArr.length;
    function createConstructor() {
       for (let i = 0; i < kCount; i++)
          this[kArr[i]] = arguments[i];
    }
    return createConstructor;
 }
*/

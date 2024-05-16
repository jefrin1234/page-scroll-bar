//get form in js
const form = document.getElementById('form')

//get ul in js
const contactList = document.getElementById('contactList')

//2 get event listener for form submission
form.addEventListener('submit' , handleSubmission)

// (event) parameter is the details of the event where it happened what happened,  like that.it automaticallt created by javascript when we call the function on the submit event




function handleSubmission(event){ 

 event.preventDefault()

 
//get picture and phone and name from input fields
const pictureInput = form['picture']  
const picture  = pictureInput.value;



const namaInput = form['name']
const name = namaInput.value;

const phoneInput = form['phone']
const phone = phoneInput.value;




//create contact

const li = document.createElement('li');
const img = document.createElement('img');


img.src = picture



li.appendChild(img);


const division = document.createElement('div')
li.appendChild(division);



const h3 = document.createElement('h3');
h3.innerHTML = name

division.appendChild(h3);

const span = document.createElement('span');
span.innerHTML = phone;

division.appendChild(span);

li.appendChild(division)

 contactList.appendChild(li)
}



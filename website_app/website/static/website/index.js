function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i].trim();
          // Does this cookie string begin with the name we want?
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
          }
      }
  }
  return cookieValue;
}

const csrftoken = getCookie('csrftoken');
const form =  document.querySelector('#form');
const showModal = document.querySelector('#show-modal')

const formTab = document.querySelector('#form-tab');
const showModalTab = document.querySelector('#show-modal-tab')

const formMobile = document.querySelector('#form-mobile');
const showModalMobile = document.querySelector('#show-modal-mobile')
// const form = document.getElementById('form')

// add Backend url
const url = "waitlist/submit";

// HTTP REQUEST
const sendData = () => {
//   const formData = new FormData();
 let userEmail1 = document.querySelector("#form .form-email").value;
 let userEmail2 = document.querySelector("#form-tab .form-email").value;
 let userEmail3 = document.querySelector("#form-mobile .form-email").value;
 let userEmail = userEmail1 || userEmail2 || userEmail3
// console.log("userEmail", userEmail)

  const xhr = new XMLHttpRequest();

  // REQUEST METHOD
  xhr.open("POST", url, true);

  // HTTP REQUEST HEADERS
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  xhr.setRequestHeader("Content-type", "application/xx-www-form-urlencoded");
  xhr.setRequestHeader('X-CSRFToken', csrftoken),

 xhr.onload = (event) => {
    if (xhr.status === 200) {
      // toggleModal()
        console.log(xhr);
        
        console.log("Successfully subscribed");
    }
  };
 
  // FORM SUBMIT ERROR

  // xhr.addEventListener("error", function (event) {
  //   alert("Oops! Something went wrong.");
  // });

  xhr.onerror = (event) => {
    if (xhr.status === 400) {
        console.log ('Something went wrong.');
    }
  };

  // SENDING/PASSING THE DATA
  xhr.send(JSON.stringify({email: userEmail}));
};


// FORM ELEMENT
form.addEventListener('submit', (event) => {
    event.preventDefault()
    console.log('successfully submitted');
    sendData();
})
formTab.addEventListener('submit', (event) => {
    event.preventDefault()
    console.log('successfully submitted');
    sendData();
})
formMobile.addEventListener('submit', (event) => {
    event.preventDefault()
    console.log('successfully submitted');
    sendData();
}) 

// MODAL
const toggleModal = () => {
    document.querySelector('.modal').classList.toggle('modal--hidden');
    document.querySelector('.overlay').classList.toggle('overlay--hidden');
  };

  showModal.addEventListener('click', toggleModal);
  showModalTab.addEventListener('click', toggleModal);
  showModalMobile.addEventListener('click', toggleModal);

  
  document.querySelector('.overlay').addEventListener('click', toggleModal);
  

  document.querySelector('.modal__close-bar span')
  .addEventListener('click', toggleModal);

// document.querySelector('.overlay').addEventListener('click', toggleModal);

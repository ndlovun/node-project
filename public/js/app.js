const weatherForm = document.querySelector("form");
const searchText = document.querySelector("input");
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = searchText.value;

  messageOne.textContent='Loading....'
  messageTwo.textContent=''

    fetch('http://172.26.7.65:3002/weather?address=' + location).then(
      (response) => {
        response.json().then((data) => {
          if (data.error) {
            messageOne.textContent=data.error
          } else {
            messageOne.textContent=data.location
            messageTwo.textContent=data.forecast
          }
        });
      }
    );
});

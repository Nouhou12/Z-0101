const myNumber = localStorage.getItem('myNumber');
// When the DOM is loaded, display the number in the main section
document.addEventListener('DOMContentLoaded', function() {
const main = document.querySelector('header');
const numberPara = document.createElement('h2');
numberPara.textContent = 'Token: ' + myNumber;
main.appendChild(numberPara);
});
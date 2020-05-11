englishInput = document.getElementById("english");
chineseInput = document.getElementById("chinese");
translateButton = document.getElementById("translate");
translateButton.addEventListener("click", function () {
    english = englishInput.value;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            chinese.value = JSON. parse(this.response)[0].chinese;
        } else if (this.status == 400) {
            snackBar('Please enter some words');
        } else if (this.status == 402) {
            snackBar('There is no such a phrase in the database');
        }
    };
    xhttp.open("GET", `http://localhost:3000/getTranslation?phrase=${english}`, true);
    xhttp.send();
});
addButton = document.getElementById("add");
addButton.addEventListener("click", function () {
    english = englishInput.value;
    chinese = chineseInput.value;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            snackBar('This phrase has added to database successfully');
        } else if (this.status == 400) {
            snackBar('Please enter some words');
        } else if (this.status == 401) {
            snackBar("This phrase is in the database already");
        }
    };
    xhttp.open("POST", `http://localhost:3000/addTranslation?phrase=${english}&translation=${chinese}`, true);
    xhttp.send();
});

function snackBar(message) {
    var x = document.getElementById("snackbar");
    x.className = "show";
    x.innerHTML = message;
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}
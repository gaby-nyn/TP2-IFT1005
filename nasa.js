
// Api request pour NASA api
var req = new XMLHttpRequest();
const url = "https://api.nasa.gov/planetary/apod?api_key=waYI4Z0angszWfu3GB9UEG6Vihp0rxQWwlaIXa9L"

// Event listener pour switch svg
document.querySelector('button').addEventListener('click', switcher)

function switcher() {
    var leftButton = document.getElementById("leftButton");
    var rightButton = document.getElementById("rightButton");

    if (leftButton.classList.contains("hidden")) {
        leftButton.classList.remove("hidden");
        rightButton.classList.add("hidden");
        document.getElementById("PoD").src = '';
        document.getElementById("description").textContent = '';
    } else {
        leftButton.classList.add("hidden");
        rightButton.classList.remove("hidden");
        getApod();
    }
}
function getApod() {
    req.onreadystatechange = function() { 
        if (req.readyState == 4 && req.status == 200)
            var data = JSON.parse(this.responseText);
            console.log(data);
            document.getElementById("PoD").src = data.hdurl;
            document.getElementById("description").textContent = data.explanation;
        }
    req.open("GET", url, true);
    req.send(null);
}

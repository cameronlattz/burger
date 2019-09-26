(function() {
    const init = function() {
        document.getElementById("burgerForm").addEventListener("submit", function(event) {
            event.preventDefault();
            const input = document.getElementById("burgerName");
            const burgerName = input.value;
            if (burgerName.length > 0) {
                input.value = "";
                submitBurger(burgerName);
            }
        })
        // add a click listener to all the .burger elements in the left burger container
        document.querySelectorAll("#burgerContainer .burger").forEach(burger => {
            burger.addEventListener("click", burgerClick);
        });
    }

    // add a burger to the burger list
    const addBurger = function(burgerId, burgerName) {
        // make a copy of the .burger element
        const burgerClone = document.getElementsByClassName("burger")[0].cloneNode(true);
        burgerClone.setAttribute("data-id", burgerId);
        burgerClone.getElementsByClassName("burger-name")[0].innerText = burgerName;
        document.getElementById("burgerContainer").append(burgerClone);
        burgerClone.addEventListener("click", burgerClick);
    }

    // post a burger to the database
    const submitBurger = function(burgerName) {
        fetch("/api/burgers", {
            method: "POST",
            body: JSON.stringify({burger_name: burgerName}),
            headers: { "Content-Type": "application/json" }
        })
        .then(function (response) { return response.json(); })
        .then(function (responseJson) {
            addBurger(responseJson.insertId, burgerName);
        });
    }

    // burger eating animation
    const burgerAnimation = function(burger) {
        const burgerName = burger.getElementsByClassName("burger-name")[0].innerHTML;
        burger.remove();
        const burgerImg = document.getElementById("eatingBurger");
        burgerImg.src = "assets/images/eating0.png";
        const delay = 500;
        setTimeout(function() {
            burgerImg.src = "assets/images/eating1.png";
        }, delay);
        setTimeout(function() {
            burgerImg.src = "assets/images/eating2.png";
        }, delay*2);
        setTimeout(function() {
            // set the burger in the man's hand to a transparent 1x1 png
            burgerImg.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
            const eatenElement = document.getElementById("eaten");
            const newElement = document.getElementsByClassName("burger")[0].cloneNode(true);
            newElement.getElementsByClassName("burger-name")[0].innerText = burgerName;
            // add a new burger to the man's stomach
            eatenElement.appendChild(newElement);
        }, delay*3);
    }

    // burger click handler
    const burgerClick = function(event) {
        const burger = event.target.closest(".burger");
        const id = burger.getAttribute("data-id");
        const burgerName = burger.getElementsByClassName("burger-name")[0].innerHTML;
        const body = {
            burger_name: burgerName,
            devoured: 1
        };
        fetch("/api/burgers/"+ id, {
            method: "PUT",
            body: JSON.stringify(body),
            headers: { "Content-Type": "application/json" }
        })
        .then(function () {})
        .then(function () {
            burgerAnimation(burger);
        });
    }

    document.addEventListener("DOMContentLoaded", init);
})();
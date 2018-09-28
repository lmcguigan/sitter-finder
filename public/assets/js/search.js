$(document).ready(function () {
    var customer_id = localStorage.getItem("id");
    var loggedin = customer_id !== null && customer_id !== 'null'
    console.log(customer_id);
    $(".close").click(function () {
        $(this).parents(".modal").css("display", "none");
    });
    //function to check if zipcode input is valid
    function checkZipCode(input) {
        return (/(^\d{5}$)|(^\d{5}-\d{4}$)/).test(input);
    };
    $("#searchagainbtn").click(function (event) {
        event.preventDefault();
        $("#card-holder").empty();
        $("#listname").text("");
        $("#messagemodal").css("display", "none");
        $("#searchmodal").css("display", "block");
    });
    $("#search-body").click(function (event) {
        event.preventDefault();
        $("#card-holder").empty();
        $("#listname").text("");
        $("#messagemodal").css("display", "none");
        $("#searchmodal").css("display", "block");
    });
    //until we figure out how to have user data persist
    $("#submitsearchbtn").click(function (event) {
        event.preventDefault();
        var newSitterRequest = {
            customer_id: customer_id,
            service: $("#serviceselection").val(),
            location: $("#zipcodeinput").val(),
            date: $("#dateinput").val(),
        };
        today = moment();
        requestDate = moment(newSitterRequest.date);
        dayDiff = requestDate.diff(today, "days");
        //if not, the popover will display
        if (checkZipCode(newSitterRequest.location) === false) {
            $("#zipcodeinput").popover("show");
        }
        //also check if day is not after today or user input is missing
        else if (dayDiff < 0 || isNaN(dayDiff) === true) {
            $("#dateinput").popover("show");
        }
        else {
            // Send the POST request.
            $.post("/api/sitters", newSitterRequest)
                .then(function (data) {
                    console.log(data);
                    $("#searchmodal").css("display", "none");
                    if (data.results.length === 0) {
                        $("#alertmessage").text("Sorry, there are no sitters available that meet your criteria.");
                        $("#modalbtnrow").css("display", "flex")
                        $("#see-all-modal").css("display", "block");
                        $("#viewresbtn").css("display", "none");
                        $("#messagemodal").css("display", "block");
                    }
                    else {
                        $("#listname").text("Sitters available for " + newSitterRequest.service);
                        for (let i = 0; i < data.results.length; i++) {
                            var userid;
                            if (data.user === undefined) {
                                userid = "none";
                            }
                            else {
                                userid = data.user.id;
                            }
                            var sitter = data.results[i];
                            var sitterCard = `<div class="card">
                                <img class="card-img-top" src=${sitter.photo_url} alt="Card image cap">
                                <div class="card-body">
                                    <h5 class="card-title">${sitter.username}</h5>
                                    <p class="card-text">Service offered: ${sitter.service} </p>
                                    <p class="card-text">Location: ${sitter.location} </p>
                                    <p class="card-text">Rating: ${sitter.rating}</p>
                                    <button class="btn btn-pink-flat book-btn" data-id="${sitter.id}" data-name="${sitter.username}" data-service="${sitter.service}" data-loggedin="${data.isLoggedIn}" data-user-id="${userid}">Book me!</button>
                                </div>
                            </div>`
                            $("#card-holder").append(sitterCard);
                            $("#see-all-body").css("display", "block");
                            $("#search-body").css("display", "none");
                            $("#body-btn-holder").css("display", "flex");
                        }
                        $(".book-btn").on("click", function (event) {
                            event.preventDefault();
                            console.log($(this).data("loggedin"));
                            console.log($(this).data("user-id"));
                            var loggedin = $(this).data("loggedin");
                            if (loggedin === false) {
                                $("#signinrequired").css("display", "block");
                                $("#signinrequired").text();
                            }
                            else {
                                var sitter = $(this).data("id");
                                var sittername = $(this).data("name");
                                var customerId = $(this).data("user-id");
                                var newResRequest = {
                                    customer_id: customerId,
                                    sitter_id: sitter,
                                    sitter_name: sittername,
                                    service: newSitterRequest.service,
                                    location: newSitterRequest.location,
                                    date: newSitterRequest.date,
                                }
                                $.post("/api/reservations", newResRequest)
                                    .then(function (data) {
                                        $("#alertmessage").text("Your reservation for " + newResRequest.service + " with " + newResRequest.sitter_name + " has been scheduled for " + newResRequest.date);
                                        $("#modalbtnrow").css("display", "flex");
                                        $("#see-all-modal").css("display", "none");
                                        $("#viewresbtn").css("display", "block");
                                        $("#messagemodal").css("display", "block");
                                    });
                            }
                        });
                    }
                });
        }
    });
    $(".see-all-btn").click(function (event) {
        event.preventDefault();
        $(this).parents(".modal").css("display", "none");
        $("#dateinput").popover("hide");
        $("#zipcodeinput").popover("hide");
        $.get("/api/sitters")
            .then(function (data) {
                console.log(data);
                console.log(data.user);
                $("#card-holder").empty();
                $("#listname").text("All Available Sitters");
                for (let i = 0; i < data.results.length; i++) {
                    var userid;
                    if (data.user === undefined) {
                        userid = "none";
                    }
                    else {
                        userid = data.user.id;
                    }
                    console.log(userid);
                    var sitter = data.results[i];
                    var sitterCard = `<div class="card">
                        <img class="card-img-top" src=${sitter.photo_url} alt="Card image cap">
                        <div class="card-body">
                            <h5 class="card-title">${sitter.username}</h5>
                            <p class="card-text">Service offered: ${sitter.service} </p>
                            <p class="card-text">Location: ${sitter.location} </p>
                            <p class="card-text">Rating: ${sitter.rating}</p>
                            <button class="btn btn-pink-flat show-all-book-btn" data-id="${sitter.id}" data-name="${sitter.username}" data-service="${sitter.service}" data-loggedin="${data.isLoggedIn}" data-user-id="${userid}">Book me!</button>
                        </div>
                    </div>`
                    $("#card-holder").append(sitterCard);
                    $("#see-all-body").css("display", "none");
                    $("#search-body").css("display", "block");
                    $("#body-btn-holder").css("display", "flex");
                }
                $(".show-all-book-btn").on("click", function (event) {
                    event.preventDefault();
                    console.log($(this).data("loggedin"));
                    console.log($(this).data("user-id"));
                    var loggedin = $(this).data("loggedin");
                    var sitter = $(this).data("id");
                    var customerId = $(this).data("user-id");
                    var sittername = $(this).data("name");
                    var sitterservice = $(this).data("service");
                    $("#serviceconfirmmessage").text("Booking " + sitterservice + " with " + sittername);
                    $("#additionalinputmodal").css("display", "block");
                    $("#submit-addtlinput").click(function (event) {
                        event.preventDefault();
                        var resRequest = {
                            //this will need to be updated with logged in customerid
                            customer_id: customerId,
                            sitter_id: sitter,
                            sitter_name: sittername,
                            service: sitterservice,
                            location: $("#addtlinput-zip").val(),
                            date: $("#addtlinput-date").val(),
                        }
                        today = moment();
                        reqDate = moment(resRequest.date);
                        dayDiff = reqDate.diff(today, "days");
                        if (checkZipCode(resRequest.location) === false) {
                            $("#addtlinput-zip").popover("show");
                        }
                        //also check if day is not after today or user input is missing
                        else if (dayDiff < 0 || isNaN(dayDiff) === true) {
                            $("#addtlinput-date").popover("show");
                        }
                        else {
                            if (loggedin === false) {
                                $("#signinrequired").css("display", "block");
                                $("#signinrequired").text();
                            }
                            else {
                                console.log(resRequest.customer_id);
                                $.post("/api/reservations", resRequest)
                                    .then(function (data) {
                                        $("#additionalinputmodal").css("display", "none");
                                        $("#alertmessage").text("Your reservation for " + resRequest.service + " with " + resRequest.sitter_name + " has been scheduled for " + resRequest.date);
                                        $("#modalbtnrow").css("display", "flex");
                                        $("#see-all-modal").css("display", "none");
                                        $("#viewresbtn").css("display", "block");
                                        $("#messagemodal").css("display", "block");
                                    });
                            }
                        }
                    });
                });
            });
    });
});
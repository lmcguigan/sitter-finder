$(document).ready(function () {
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
    var customerDummy = "2";
    $("#submitsearchbtn").click(function (event) {
        event.preventDefault();
        var newSitterRequest = {
            customer_id: customerDummy,
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
                    $("#searchmodal").css("display", "none");
                    if (data.sitters.length === 0) {
                        $("#alertmessage").text("Sorry, there are no sitters available that meet your criteria.");
                        $("#modalbtnrow").css("display", "flex")
                        $("#see-all-modal").css("display", "block");
                        $("#viewresbtn").css("display", "none");
                        $("#messagemodal").css("display", "block");
                    }
                    else {
                        $("#listname").text("Sitters available for " + newSitterRequest.service);
                        for (let i = 0; i < data.sitters.length; i++) {
                            var sitter = data.sitters[i];
                            var sitterCard = `<div class="card">
                                <img class="card-img-top" src=${sitter.photo_url} alt="Card image cap">
                                <div class="card-body">
                                    <h5 class="card-title">${sitter.username}</h5>
                                    <p class="card-text">Location: ${sitter.location} </p>
                                    <p class="card-text">Rating: ${sitter.rating}</p>
                                    <button class="btn btn-pink-flat book-btn" data-id="${sitter.id}" data-name="${sitter.username}">Book me!</button>
                                </div>
                            </div>`
                            $("#card-holder").append(sitterCard);
                            $("#see-all-body").css("display", "block");
                            $("#search-body").css("display", "none");
                            $("#body-btn-holder").css("display", "flex");
                        }
                        $(".book-btn").on("click", function (event) {
                            event.preventDefault();
                            //if (signedin === true){

                            //}
                            //else{
                            //$("#signinrequired).css("display", "block");
                            //}
                            var sitter = $(this).data("id");
                            var sittername = $(this).data("name");
                            var newResRequest = {
                                customer_id: newSitterRequest.customer_id,
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
                $("#card-holder").empty();
                $("#listname").text("All Available Sitters");
                for (let i = 0; i < data.length; i++) {
                    var sitter = data[i];
                    var sitterCard = `<div class="card">
                        <img class="card-img-top" src=${sitter.photo_url} alt="Card image cap">
                        <div class="card-body">
                            <h5 class="card-title">${sitter.username}</h5>
                            <p class="card-text">Service offered: ${sitter.service} </p>
                            <p class="card-text">Location: ${sitter.location} </p>
                            <p class="card-text">Rating: ${sitter.rating}</p>
                            <button class="btn btn-pink-flat show-all-book-btn" data-id="${sitter.id}" data-name="${sitter.username}" data-service="${sitter.service}">Book me!</button>
                        </div>
                    </div>`
                    $("#card-holder").append(sitterCard);
                    $("#see-all-body").css("display", "none");
                    $("#search-body").css("display", "block");
                    $("#body-btn-holder").css("display", "flex");
                }
                $(".show-all-book-btn").on("click", function (event) {
                    event.preventDefault();
                    var sitter = $(this).data("id");
                    var sittername = $(this).data("name");
                    var sitterservice = $(this).data("service");
                    //if (signedin === true){

                    //}
                    //else{
                    //$("#signinrequired).css("display", "block");
                    //}
                    $("#serviceconfirmmessage").text("Booking " + sitterservice + " with " + sittername);
                    $("#additionalinputmodal").css("display", "block");
                    $("#submit-addtlinput").click(function (event) {
                        event.preventDefault();
                        var resRequest = {
                            //this will need to be updated with logged in customerid
                            customer_id: customerDummy,
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
                            console.log(resRequest);
                            $.post("/api/reservations", resRequest)
                                .then(function (data) {
                                    console.log(data);
                                    $("#additionalinputmodal").css("display", "none");
                                    $("#alertmessage").text("Your reservation for " + resRequest.service + " with " + resRequest.sitter_name + " has been scheduled for " + resRequest.date);
                                    $("#modalbtnrow").css("display", "flex");
                                    $("#see-all-modal").css("display", "none");
                                    $("#viewresbtn").css("display", "block");
                                    $("#messagemodal").css("display", "block");
                                });
                        }
                    });
                });
            });
    });
});
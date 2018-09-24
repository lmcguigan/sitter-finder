$(document).ready(function () {
    $("#dateinput").attr("placeholder", moment().format("MM/DD/YYYY"))

    $("#searchagainbtn").click(function (event) {
        event.preventDefault();
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
        console.log(dayDiff);
        //function to check if zipcode input is valid
        function checkZipCode(input) {
            return (/(^\d{5}$)|(^\d{5}-\d{4}$)/).test(input);
        };
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
                    console.log(data);
                    if (data.sitters.length === 0) {
                        $("#alertmessage").text("Sorry, there are no sitters available that meet your criteria.");
                        $("#modalbtnrow").css("display", "flex")
                        $("#messagemodal").css("display", "block");
                    }
                    else {
                        var sittersContainer = `<div class="splash top">
                            <div class="container-fluid">
                                <div class="row justify-content-center">
                                    <div class="col-sm-12 col-md-9 sitterlist">
                                        <div class="row">
                                            <div class="col-12 d-flex justify-content-center">
                                                <h3>Available Sitters</h3>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-12 d-flex justify-content-center">
                                                <div class="card-deck" id="card-holder">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>`;
                        $("#colorbg").append(sittersContainer);
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
                        }
                        $(".sitterlist").css("display", "block");
                        $(".book-btn").on("click", function (event) {
                            event.preventDefault();
                            //if (signedin === true){

                            //}
                            //else{
                                //$("#alertmessage").text();
                                //$("#modalbtnrow").css("display", "none");
                                //$("#messagemodal").css("display", "block");
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
                                    console.log(data);
                                    $("#alertmessage").text("Your reservation for " + newResRequest.service + " with " + newResRequest.sitter_name + " has been scheduled for " + newResRequest.date);
                                    $("#modalbtnrow").css("display", "flex");
                                    $("#messagemodal").css("display", "block");
                                });
                        });
                    }
                });
        }
    });
});
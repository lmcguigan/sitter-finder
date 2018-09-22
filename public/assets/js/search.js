

// TO BE FINISHED
$(document).ready(function () {
    $(".searchclose").click(function () {
        $(".sitterlist").css("display", "block");
    });
    //until we figure out how to have user data persist
    var customerDummy = "123";
    $("#submitsearchbtn").click(function (event) {

        // Make sure to preventDefault on a submit event.
        event.preventDefault();
        var newSitterRequest = {
            customer_id: customerDummy,
            service: $("#serviceselection").val(),
            location: $("#zipcodeinput").val(),
            date: $("#dateinput").val(),
        };
        console.log("New Sitter Request")
        console.log(newSitterRequest);
        // Send the POST request.
        $.post("/api/sitters", newSitterRequest)
            .then(function (data) {
                $("#searchmodal").css("display", "none");
                console.log(data);
                var sittersContainer = `<div class="splash top">
                <div class="container-fluid">
                    <div class="row justify-content-center">
                        <div class="col-sm-12 col-md-9 sitterlist">
                            <h3>Available Sitters</h3>
                            <div class="card-deck" id="card-holder">
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
                            <p class="card-text">${sitter.rating}</p>
                            <button class="btn btn-pink-flat book-btn" data-id="${sitter.id}">Book me!</button>
                        </div>
                    </div>`
                    $("#card-holder").append(sitterCard);
                }
                // Reload the page to get the updated list
                //location.reload();
                $(".sitterlist").css("display", "block");
                $(".book-btn").on("click", function (event) {
                    var sitter = $(this).data("id");
                    var newResRequest = {
                        customer_id: newSitterRequest.customer_id,
                        sitter_id: sitter,
                        service: newSitterRequest.service,
                        location: newSitterRequest.location,
                        date: newSitterRequest.date,
                    }
                    $.post("/api/reservations", newResRequest)
                        .then(function (data) {
                            console.log(data);
                        });
                });
            });
    });
});
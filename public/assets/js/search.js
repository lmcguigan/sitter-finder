

// TO BE FINISHED
$(document).ready(function() {
    $(".searchclose").click(function () {
        $(".sitterlist").css("display", "block");
    });
    //until we figure out how to have user data persist
    var customerDummy = "123";
    $("#submitsearchbtn").click(function(event) {

        // Make sure to preventDefault on a submit event.
        event.preventDefault();
        var newSitterRequest = {
            customer_id: customerDummy,
            service: $("#serviceselection").val(),
            location: $("#zipcodeinput").val(),
            date: $("#dateinput").val(),
        };
        console.log(newSitterRequest);
        // Send the POST request.
        $.get("/api/sitters", newSitterRequest)
            .then(function(data) {
                $("#searchmodal").css("display", "none");
                console.log(data);
                // Reload the page to get the updated list
                //location.reload();
                $(".sitterlist").css("display", "block");
                $(".book-btn").on("click", function(event) {
                    var sitter = $(this).data("id");
                    var newResRequest = {
                        customer_id: newSitterRequest.customer_id,
                        sitter_id: sitter,
                        service: newSitterRequest.service,
                        location: newSitterRequest.location,
                        date: newSitterRequest.date,
                    }
                    $.post("/api/reservations", newResRequest)
                        .then(function(data) {
                            console.log(data);
                    });
                });
            });
    });
});
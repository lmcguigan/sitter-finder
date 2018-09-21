

// TO BE FINISHED
$(document).ready(function () {
    $("#submitsearch").on("submit", function (event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();
        var newSitterRequest = {
            service: $("#serviceselection").val(),
            location: $("#zipcodeinput").val(),
            startdate: $("#startdateinput").val(),
            enddate: $("#enddateinput").val()
        };
        console.log(newSitterRequest);
        // Send the POST request.
        $.get("/api/sitters", function (data) {
            console.log(data)
        }).then(
            function () {
                $("#searchmodal").css("display", "none");
                // Reload the page to get the updated list
                location.reload();
            }
        );
    });
});
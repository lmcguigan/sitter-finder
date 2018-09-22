

// TO BE FINISHED

$(document).ready(function() {
    console.log('working')
    $(".make-changes").click(function(){
        // console.log("click")
        $(".col-3").attr("contenteditable", "true");       

    });

    $(".change_button").click(function() {
        alert("Change Made");
        $(".col-3").attr("contenteditable", "true");

        var putId= $(this).data("id");

        $.ajax({
            url: "/api/update",
            method: "PUT",
            data: {
                id: putId,
                task: taskText,
                sitter: sitterTexnode 
                       }
        })
    });

    $(".delete-reservation").click(function () {
        alert("Reservation Deleted");
        $(this).closest('.resrow').remove();

        var deleteId = $(this).data("id");
        
        $.ajax({
            url: "/api/delete",
            method: "DELETE",
            data: {
                id: deleteId
            }
        })



        return true;
    });

})
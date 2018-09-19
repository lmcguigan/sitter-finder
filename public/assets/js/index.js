$(".close").click(function () {
    $(this).parents(".modal").css("display", "none");
});
$("#barloginbtn").click(function(){
    $("#loginmodal").css("display", "block");
});
$("#barregisterbtn").click(function(){
    $("#registermodal").css("display", "block");
    $('#submitregisterbtn').on('click', function() {
        console.log('just clicked me')
    });
    
}); 
$(".searchclose").click(function () {
    $(".sitterlist").css("display", "block");
});
$(".submitsearch").click(function () {
    $(".sitterlist").css("display", "block");
});


function authenticateUser(event) {
 event.preventDefault();
//  var email = $('#emailregister').val().trim();
//  var pwd = $('#pwregister').val().trim();
//  console.log('email ' + email + 'pwd ' + pwd);
 var user = {
     name: $('#nameregister').val().trim(),
     zipcode: $('#zipcoderegister').val().trim(),
     email: $('#emailregister').val().trim(),
     password: $('#passwordregister').val().trim(),
     phone: $('#phoneregister').val().trim(),
     address: $('#addressregister').val().trim(),
     
 }
 console.log('inside auth fct')
//  $.post('/api/customer', user, getCustomer);
}

function getCustomer() {
    $.get("/api/customer", function(data) {
        var customer = [];
        customer = data;
    //   todos = data;
    //   initializeRows();
    console.log(customer);
    });
  }

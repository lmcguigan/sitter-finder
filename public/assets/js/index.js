$(document).ready(function() {
    $(".close").click(function () {
        $(this).parents(".modal").css("display", "none");
    });
     
    $(".searchclose").click(function () {
        $(".sitterlist").css("display", "block");
    });
    
    //Search btn click fct
    //
    $(".submitsearch").click(function () {
        $(".sitterlist").css("display", "block");
    });
    
    //Register btn click fct
    //
    $("#barregisterbtn").click(function(){
        $("#registermodal").css("display", "block");
        $('#submitregisterbtn').on('click', createNewCustomer);
        
    });
    function createNewCustomer(event) {
     event.preventDefault();
     var customer = {
         name: $('#nameregister').val(),
         zipcode: $('#zipcoderegister').val(),
         email: $('#emailregister').val(),
         password: $('#passwordregister').val(),
         phone: $('#phoneregister').val(),
         address: $('#addressregister').val()    
     }
    console.log('before post')
    $.post('/api/customers', customer, function() {
        console.log('inside post');
        getCustomer();

    });
    $('#nameregister').val('');
    $('#zipcoderegister').val('');
    $('#emailregister').val('');
    $('#passwordregister').val('');
    $('#phoneregister').val('');
    $('#addressregister').val('');
    }
    
    
    
      //Login btn click fct
      //
      $("#barloginbtn").click(function(){
        $("#loginmodal").css("display", "block");
        $('#submitloginbtn').on('click', authenticateCustomer);
    
    }); 
    
    function authenticateCustomer(event) {
        event.preventDefault();
        var email = $('#emailinput').val().trim();
        var password = $('#pwinput').val().trim();
        console.log('email' + email + '  ' + password)
      

    }
    function getCustomer() {
        $.get("/api/customers", function(data) {
            var customer = [];
            customer = data;
        console.log(customer);
        });
      }

})
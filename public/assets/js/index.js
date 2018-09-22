
$(document).ready(function () {
    var loggedin = false;

    $(".close").click(function () {
        $(this).parents(".modal").css("display", "none");
    });

    //Register btn click fct
    //
    $("#barregisterbtn").click(function () {
        if (loggedin === false) {
            $("#registermodal").css("display", "block");
            $('#submitregisterbtn').on('click', createNewCustomer);
        }
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
        $.post('/api/customers', customer, function () {
            console.log('inside post');
            getCustomer();
            loggedin = true;
            $("#registermodal").css("display", "none");
            console.log(loggedin);
            console.log("refreshing bar");
            $("#barloginbtn").text("log out");
            $("#signedinas").text("signed in as: " + customer.email);
            $("#signedinas").css("display", "flex");
            $("#barregisterbtn").css("display", "none");
            $('#nameregister').val('');
            $('#zipcoderegister').val('');
            $('#emailregister').val('');
            $('#passwordregister').val('');
            $('#phoneregister').val('');
            $('#addressregister').val('');
        })
    }
    //Login btn click fct
    //
    $("#barloginbtn").click(function () {
        if (loggedin === false) {
            $("#loginmodal").css("display", "block");
            $('#submitloginbtn').on('click', authenticateCustomer);
        }
        else {
            //need code here to log user out
            $("#barloginbtn").text("log in");
        }
    });

    function authenticateCustomer(event) {
        event.preventDefault();
        var email = $('#emailinput').val().trim();
        var password = $('#pwinput').val().trim();
        console.log('email' + email + '  ' + password)
        $("#loginmodal").css("display", "none");
        $("#barloginbtn").text("log out");
        $("#signedinas").text("Signed in as: " + email);
        $("#signedinas").css("display", "flex");
        $("#barregisterbtn").css("display", "none");
    }
    function getCustomer() {
        $.get("/api/customers", function (data) {
            var customer = [];
            customer = data;
            console.log(customer);
        });
    }

})
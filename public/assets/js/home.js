$(document).ready(function () {
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
    $("#barregisterbtn").click(function () {
        $("#registermodal").css("display", "block");
        $('#submitregisterbtn').on('click', createNewCustomer);
        

    });
    function createNewCustomer(event) {
        event.preventDefault();
        var customer = {
            name: $('#nameregister').val().trim(),
            zipcode: $('#zipcoderegister').val().trim(),
            email: $('#emailregister').val().trim(),
            password: $('#pwregister').val().trim(),
            phone: $('#phoneregister').val().trim(),
            address: $('#addressregister').val().trim()
        }
        console.log('before post')
        $.post('/api/customers', customer, function () {
            console.log('inside post');
            getCustomer();

        });
        $('#nameregister').val('');
        $('#zipcoderegister').val('');
        $('#emailregister').val('');
        $('#pwregister').val('');
        $('#phoneregister').val('');
        $('#addressregister').val('');
        $('#registermodal').hide();
    }



    //Login btn click fct
    //
    $("#barloginbtn").click(function () {
        $("#loginmodal").css("display", "block");
        $('#submitloginbtn').on('click', authenticateCustomer);

    });

    function authenticateCustomer(event) {
        event.preventDefault();
        var credentials = {
            email:$('#emailinput').val().trim(),
            password:$('#pwinput').val().trim()
        }
        // var email = $('#emailinput').val().trim();
        // var password = $('#pwinput').val().trim();
        // console.log('email' + email + '  ' + password)
        $.post('/api/customers/login', credentials, function () {
            console.log('inside post' + credentials.email);
           getCustomer();

        });
        $('#emailinput').val('');
       $('#pwinput').val('');
       $("#loginmodal").hide();
       $("#barloginbtn").text('log out');

    }
    function getCustomer() {
        $.get("/api/customers", function (data) {
            var customer = [];
            customer = data;
            console.log(customer);
        });
    }

})
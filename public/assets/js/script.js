$(".close").click(function () {
    $(this).parents(".modal").css("display", "none");
});
$("#barloginbtn").click(function(){
    $("#loginmodal").css("display", "block");
});
$(".searchclose").click(function () {
    $(".sitterlist").css("display", "block");
});
$(".submitsearch").click(function () {
    $(".sitterlist").css("display", "block");
});

router.put("/manage/:id", function (req, res) {
    var updateReservation = "id = " + req.params.id;

    model.update({
        zip_code: req.body.zip_code,
        service_selection: req.body.service_selection,
        time_required: req.body.time_required
    }, updateReservation, function () {
        res.redirect("/");
    });
});

router.delete("/manage/delete/:id", function (req, res) {
    var deleteReservation = "id = " + req.params.id;

    model.delete(deleteReservation, function () {
        res.redirect("/");
    });
});


// TO BE FINISHED
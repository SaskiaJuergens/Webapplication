$(document).ready(function () {
  $.ajax({
    url: "php/setupDB.php",
    type: "GET",
    success: function (response) {
      $("#table-titles").html(response);
    },
    error: function (xhr, status, error) {
      console.log(error);
    },
  });
});

$(() => {
  let editedImages = [];

  function updateEditedImages() {
    const images = [];

    $(".card-image-col").each(function () {
      images.push($(this).find("img").attr("src"));
    });

    editedImages = images;
    $("#editedImages").val(JSON.stringify(images));
  }
  updateEditedImages();

  $("body").on("click", ".close", function () {
    $(this).parents(".card-image-col").remove();
    updateEditedImages();
  });
});

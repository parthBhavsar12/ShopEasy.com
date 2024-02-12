document.addEventListener("DOMContentLoaded", function () {
    var radioButtons = document.getElementsByName("user_type");

    function updateBorderStyle() {
        radioButtons.forEach(function (radioButton) {
            var label = document.querySelector('label[for="' + radioButton.id + '"]');
            if (radioButton.checked) {
                label.classList.add("selected");
                radioButton.style.display = "none";
            } else {
                label.classList.remove("selected");                
                radioButton.style.display = "inline";
            }
        });
    }

    radioButtons.forEach(function (radioButton) {
        radioButton.addEventListener("change", updateBorderStyle);
    });

    updateBorderStyle();
});
$(document).ready(function () {
    // Initial content loading
    loadContent("home.html #home");

    // Navigation click event
    $("nav a").click(function (e) {
        e.preventDefault();
        var page = $(this).attr("href");
        loadContent(page + " .content-section");

        // Update active navigation link
        $("nav a").removeClass("active");
        $(this).addClass("active");
    });

    // Back button click event
    $("#backButton").click(function () {
        history.back();
    });

    // Function to load content dynamically
    function loadContent(contentUrl) {
        $("#content").load(contentUrl, function () {
            // Additional callback actions after content is loaded
            // Collapsible functionality for dynamically loaded content
            $(".collapsible").click(function () {
                $(this).toggleClass("active");
                var content = $(this).find(".collapsible-content");
                content.slideToggle();
            });
        });
    }

    // Collapsible functionality
    $(".collapsible").click(function () {
        $(this).toggleClass("active");
        var content = $(this).find(".collapsible-content");
        content.slideToggle();
    });

    // Load XML data
    $.ajax({
        type: "GET",
        url: "dogs.xml",
        dataType: "xml",
        success: function (xml) {
            var dogsContent = "";
            $(xml).find('dog').each(function () {
                var name = $(this).find('name').text();
                var breed = $(this).find('breed').text();
                var age = $(this).find('age').text();
                var color = $(this).find('color').text();

                // Create HTML content for each dog
                dogsContent += `<div class="dog-info">
                                    <h3>${name}</h3>
                                    <p>Breed: ${breed}</p>
                                    <p>Age: ${age}</p>
                                    <p>Color: ${color}</p>
                                </div>`;
            });

            // Append the content to the 'dogsContent' div
            $('#dogsContent').html(dogsContent);
        }
    });

    loadXML();
    loadJSON();
});

(function($) {
    'use strict';

    $(document).ready(function() {
        $('ul.sf-menu').superfish({
            animation: {
                height: 'show'
            }, // slide-down effect without fade-in
            delay: 1200, // 1.2 second delay on mouseout
            cssArrows: false
        });

        $("#sidebar, .mainWrapper, #avanceContainer").mCustomScrollbar({
            theme: "minimal-dark"
        });

        var owl = $('.owl-carousel');
        owl.owlCarousel({
            items: 1,
            loop: true,
            margin: 10,
            autoplay: true,
            autoplayTimeout: 5000
        });

        $("#sidebarCollapse").click(function() {
            $('#sidebar, #content').toggleClass('active');

            setTimeout(reloadSlider, 200);

            var el = $("#sidebar");
            var content = $("#content");

            if (el.hasClass("mCS_disabled")) {
                el.mCustomScrollbar("update");
            } else {
                el.mCustomScrollbar("disable", true);
            }
        });

        $("#asistenciaDate").flatpickr({
            enableTime: true,
            dateFormat: "Y-m-d H:i",
        });

});

    function reloadSlider() {
        var owl = $('.owl-carousel');
        owl.trigger('refresh.owl.carousel');
    }


})(jQuery);
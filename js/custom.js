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

        // $("#sidebar, .mainWrapper, #avanceContainer").mCustomScrollbar({
        //     theme: "minimal-dark"
        // });

        var owl = $('.owl-carousel');
        owl.owlCarousel({
            items: 1,
            loop: true,
            margin: 10,
            autoplay: true,
            autoplayTimeout: 5000
        });

        new SimpleBar($('#menuExpanded')[0]);
        new SimpleBar($('.mainWrapper')[0]);

        $("#sidebarCollapse").click(function() {
            $('#sidebar, #content').toggleClass('active');
            setTimeout(reloadSlider, 200);
        });

        $("#asistenciaDate, #materialDate").flatpickr({
            enableTime: true,
            dateFormat: "Y-m-d H:i",
        });
});
    function reloadSlider() {
        var owl = $('.owl-carousel');
        owl.trigger('refresh.owl.carousel');
    }
})(jQuery);
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

        // Header Slider
        var owl = $('#headerSlider');
        owl.owlCarousel({
            items: 1,
            loop: true,
            margin: 10,
            autoplay: true,
            autoplayTimeout: 5000
        });

        // Cursos Slider
        var cursosCarrusel = $('#cursosCarrusel');
        cursosCarrusel.owlCarousel({
            items: 3,
            margin: 20,
            loop: true
        });
        $('.arrow-cursos.arrow-left').click(function() {
            cursosCarrusel.trigger('prev.owl.carousel');
        });
        $('.arrow-cursos.arrow-right').click(function() {
            cursosCarrusel.trigger('next.owl.carousel');
        });

        // Notificaciones Slider
        var notifCarrusel = $('#notifCarrusel');
        notifCarrusel.owlCarousel({
            items: 1,
            margin: 20,
            loop: true,
            dots: false
        });
        $('.arrow-notificaciones.arrow-left').click(function() {
            notifCarrusel.trigger('prev.owl.carousel');
        });
        $('.arrow-notificaciones.arrow-right').click(function() {
            notifCarrusel.trigger('next.owl.carousel');
        });

        // Books Carrusel
        var booksCarrusel = $('#booksCarrusel');
        booksCarrusel.on('initialized.owl.carousel', function(event) {
            var that = $(this);
            var stage = that.find(".owl-stage");
            var actives = stage.find(".owl-item.active");

            var active1 = actives[0];
            var active2 = actives[1];
            console.log(active1);
            // $(active1).attr("style", "margin-right: 0 !important;");
            // $(active1).find("img").attr("style", "zoom: .75;width: auto;");

            // $(active2).find("img").attr("style", "zoom: .87;width: auto;");
        });
        booksCarrusel.owlCarousel({
            items: 5,
            margin: 20,
            loop: true
        });
        $('.arrow-books.arrow-left').click(function() {
            booksCarrusel.trigger('prev.owl.carousel');
        });
        $('.arrow-books.arrow-right').click(function() {
            booksCarrusel.trigger('next.owl.carousel');
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
        $("#disponibilidadDesde, #disponibilidadHasta").flatpickr({
            defaultDate: 'today',
            onReady: function(){
                $("#disponibilidadDesde").parent().attr('style', 'margin:0');
                $("#disponibilidadHasta").parent().attr('style', 'margin:0');
            }
        });

        var registroDispo = $(".tiva-timetable").has("#registroDispo");
        var horarioDeClase = $(".tiva-timetable").has("#horarioDeClase");
        var horarioPersonal = $(".tiva-timetable").has("#horarioPersonal");
        if (registroDispo) {
            $('#registroDispo').each(function() {
                var mode = 'day';
                var timetable_contain = $(this);
                var timetable_json = 'vendor/tivatimetable/empty.json';

                $.getJSON(timetable_json, function(data) {
                    tiva_timetables = [];

                    for (var i = 0; i < data.items.length; i++) {
                        tiva_timetables.push(data.items[i]);
                    }

                    // Sort timetables by date
                    tiva_timetables.sort(sortByTime);
                    for (var j = 0; j < tiva_timetables.length; j++) {
                        tiva_timetables[j].id = j;
                    }

                    // Create timetable
                    var todayDate = new Date();
                    var date_start = (typeof timetable_contain.attr('data-start') != "undefined") ? timetable_contain.attr('data-start') : 'sunday';
                    var tiva_current_week = new Date(todayDate.setDate(tiva_current_date.getDate() - todayDate.getDay() + 1));
                    createTimetable(timetable_contain, 'current', tiva_current_week, tiva_current_month, tiva_current_year);

                    var arrayRango = [];
                    var arrayRangoAmPm = [];

                    var axisItems = timetable_contain.find(".timetable-axis > .axis-item");
                    var gridColumn = timetable_contain.find(".timetable-column-grid");

                    $(axisItems).each(function() {
                        var axis = $(this).html();
                        arrayRango.push(axis);
                    });
                    // console.log(arrayRango);

                    $(gridColumn).each(function(i, item) {
                        $(this).find(".grid-item").each(function(i, item2) {
                            $(item2).attr('data-rango', arrayRango[i] + '-' + arrayRango[i + 1]);
                        });
                    });

                    $(arrayRango).each(function(i, item) {
                        var rangoAmPm = timeTo12HrFormat(item);
                        arrayRangoAmPm.push(rangoAmPm);
                    });
                    // console.log(arrayRangoAmPm);

                    $(axisItems).each(function(i, item) {
                        $(item).html(arrayRangoAmPm[i]);
                    });

                });
            });
            er_gridItem();
        }
        if (horarioDeClase) {
            $('#horarioDeClase').each(function() {
                var mode = 'day';
                var timetable_contain = $(this);
                var timetable_json = 'vendor/tivatimetable/timetables_day.json';

                $.getJSON(timetable_json, function(data) {
                    tiva_timetables = [];

                    for (var i = 0; i < data.items.length; i++) {
                        tiva_timetables.push(data.items[i]);
                    }

                    // Sort timetables by date
                    tiva_timetables.sort(sortByTime);
                    for (var j = 0; j < tiva_timetables.length; j++) {
                        tiva_timetables[j].id = j;
                    }

                    // Create timetable
                    var todayDate = new Date();
                    var date_start = (typeof timetable_contain.attr('data-start') != "undefined") ? timetable_contain.attr('data-start') : 'sunday';
                    var tiva_current_week = new Date(todayDate.setDate(tiva_current_date.getDate() - todayDate.getDay() + 1));
                    createTimetable(timetable_contain, 'current', tiva_current_week, tiva_current_month, tiva_current_year);
                });
            });
        }
        if (horarioPersonal) {
            $('#horarioPersonal').each(function() {
                var mode = 'day';
                var timetable_contain = $(this);
                var timetable_json = 'vendor/tivatimetable/timetables_day.json';

                $.getJSON(timetable_json, function(data) {
                    tiva_timetables = [];

                    for (var i = 0; i < data.items.length; i++) {
                        tiva_timetables.push(data.items[i]);
                    }

                    // Sort timetables by date
                    tiva_timetables.sort(sortByTime);
                    for (var j = 0; j < tiva_timetables.length; j++) {
                        tiva_timetables[j].id = j;
                    }

                    // Create timetable
                    var todayDate = new Date();
                    var date_start = (typeof timetable_contain.attr('data-start') != "undefined") ? timetable_contain.attr('data-start') : 'sunday';
                    var tiva_current_week = new Date(todayDate.setDate(tiva_current_date.getDate() - todayDate.getDay() + 1));
                    createTimetable(timetable_contain, 'current', tiva_current_week, tiva_current_month, tiva_current_year);
                });
            });
        }
    });

    function reloadSlider() {
        var owl = $('.owl-carousel');
        owl.trigger('refresh.owl.carousel');
    }

    function er_gridItem() {
        $("#registroDispo").on("click", ".grid-item", function() {
            $(this).toggleClass("selected");
            console.log( $(this).data("dia") + ',' + $(this).data("rango") );
        });
    }

})(jQuery);
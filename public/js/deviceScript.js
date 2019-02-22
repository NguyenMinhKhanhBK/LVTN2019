$(document).ready(function () {
    $('#sidebarButton').on('click', function () {
        $('#sidebar').toggleClass('active');
        var icon = $(this).children('i')[0];
        $(icon).toggleClass('fa-arrow-left');
        $(icon).toggleClass('fa-bars');
    });
});
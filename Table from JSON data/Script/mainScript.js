"use strict";

(function ($, undefined) {
    function showPage() {
        $('#mainDiv').show();
        $('#loaderDiv').fadeOut();
    }

    function hidePage() {
        $('#mainDiv').hide();
        $('#loaderDiv').show();
    }

    function enlargePic(url) {
        var imageWrapper = $('.imageOverlay');
        var image = $('.bigImage');
        var mainDiv = $('#mainDiv');

        image.attr({
            'src': url,
            'alt': 'image'
        });
        
        mainDiv.addClass('blurred');
        imageWrapper.show();
    }

    function capitalize(name) {
        var tempName = name.toString();
        name = tempName.charAt(0).toUpperCase();
        name += tempName.slice(1, tempName.length);
        return name;
    }

    function populateRow(element) {
        var table = $('#people tbody'),
            row = $('<tr>'),
            tdPhoto = $('<td>'),
            tdName = $('<td>'),
            tdEmail = $('<td>'),
            tdGender = $('<td>');

        var name = capitalize(element.name.title) + ' ' + capitalize(element.name.first) + ' ' + capitalize(element.name.last);
        var email = element.email;
        var gender = element.gender;
        var img = document.createElement('IMG');

        tdName.text(name);
        tdEmail.text(email);
        tdGender.text(gender);
        img.src = element.picture.medium;
        tdPhoto.html(img);

        row.append(tdPhoto);
        row.append(tdName);
        row.append(tdEmail);
        row.append(tdGender);

        row.attr('class', 'informationRow');
        row.attr('data-imageUrl', element.picture.large);
        tdPhoto.attr('class', 'information');
        tdName.attr('class', 'information');
        tdEmail.attr('class', 'information');
        tdGender.attr('class', 'information');

        table.append(row);

        //console.log(element);
    }

    function populateUsers() {
        $.ajax({
            url: 'https://randomuser.me/api/?inc=picture,email,name,gender&results=10',
            dataType: 'json'
        }).done(function (data) {
            for (let element of data.results) {
                populateRow(element);
            }

            showPage();
        });
    }

    function deleteUsers() {
        $('.informationRow').remove();
    }

    // document.DOMContentLoaded(function(){
    //      populateUsers();

    //     $('.imageOverlay').on('click', function(){
    //         $(this).hide();
    //         $('#mainDiv').removeClass('blurred');
    //     });
    // });

    $(document).ready(function () {
        populateUsers();

        $('.imageOverlay').on('click', function(){
            $(this).hide();
            $('#mainDiv').removeClass('blurred');
        });

        $('.refreshButton').on('click', function(){
            hidePage();
            deleteUsers();
            populateUsers();
        });

        $('.peopleInfo tbody').on('click', '.informationRow', function () {
            enlargePic($(this).attr('data-imageUrl'));
        });
    });
})(jQuery);
(function($, undefined) {
    $(function() {
        var elementsOfCarousel = 5, 
        currPosition = 1;

        function hideUnnecessary (curr, next) {
            $('.page').removeClass('hidden');

            for(let i = 1; i <= elementsOfCarousel; i++) {
                if($('#c' + i).attr('attr-id') != curr && $('#c' + i).attr('attr-id') != next) {
                    $('#c' + i).addClass('hidden');                    
                }
            }
        }

        function Animate (curr, next) {
            if(curr < next) {
                $('.carousel').css({marginLeft: '0'})
                .animate({
                    marginLeft: '-20%'
                }, 'fast');
            }
            else if(curr > next){
                $('.carousel').css({marginLeft: '-20%'})
                .animate({
                    marginLeft: '0%'
                }, 'fast');
            }
        }

        var dots = $('.dot');
        let nextPosition;

        dots.click(function () {
            if($(this).is('.active')) {
                return;
            }

            currPosition = $('.active').attr('id');
            //activate dot:
            dots.removeClass('active');
            $(this).addClass('active');

            nextPosition = $(this).attr('id');        

            hideUnnecessary(currPosition, nextPosition);
            Animate(currPosition, nextPosition);
        });
    });
})(jQuery);

var slides = [
    {
        title: 'PAGE ONE',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin feugiat est quis diam sodales, a finibus leo laoreet. Ut finibus ante et feugiat dignissim. Vestibulum massa ligula, fermentum nec libero id, facilisis semper orci. Sed auctor ipsum magna,                             non consequat odio facilisis in. Maecenas vel lorem quis massa ullamcorper rhoncus eget at tellus. Mauris magna dui, imperdiet eu feugiat a,                             semper nec dolor. Integer malesuada, lacus a convallis sodales, ex velit convallis nisi, a suscipit ligula neque vitae sem. Mauris in orci id eros                             egestas auctor. Phasellus pharetra iaculis imperdiet. In at tempor mauris.'
    },
    {
        title: 'PAGE Two',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin feugiat est quis diam sodales, a finibus leo laoreet. Ut finibus ante et feugiat dignissim. Vestibulum massa ligula, fermentum nec libero id, facilisis semper orci. Sed auctor ipsum magna,                             non consequat odio facilisis in. Maecenas vel lorem quis massa ullamcorper rhoncus eget at tellus. Mauris magna dui, imperdiet eu feugiat a,                             semper nec dolor. Integer malesuada, lacus a convallis sodales, ex velit convallis nisi, a suscipit ligula neque vitae sem. Mauris in orci id eros                             egestas auctor. Phasellus pharetra iaculis imperdiet. In at tempor mauris.'
    },
    {
        title: 'PAGE Three',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin feugiat est quis diam sodales, a finibus leo laoreet. Ut finibus ante et feugiat dignissim. Vestibulum massa ligula, fermentum nec libero id, facilisis semper orci. Sed auctor ipsum magna,                             non consequat odio facilisis in. Maecenas vel lorem quis massa ullamcorper rhoncus eget at tellus. Mauris magna dui, imperdiet eu feugiat a,                             semper nec dolor. Integer malesuada, lacus a convallis sodales, ex velit convallis nisi, a suscipit ligula neque vitae sem. Mauris in orci id eros                             egestas auctor. Phasellus pharetra iaculis imperdiet. In at tempor mauris.'
    }
];

/*
- only one element in the mark-up, inside it generate dinamically the carousel
- multiple carousel per page
- automatically generate dots
- responsive
- be able to easily add new carousel(s)
- work with different number of slides
- support carousels with different widths
*/

(function($, undefined) {
    $(function() {
        var slides = [
            {
                title: 'PAGE ONE',
                content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin feugiat est quis diam sodales, a finibus leo laoreet. Ut finibus ante et feugiat dignissim. Vestibulum massa ligula, fermentum nec libero id, facilisis semper orci. Sed auctor ipsum magna,                             non consequat odio facilisis in. Maecenas vel lorem quis massa ullamcorper rhoncus eget at tellus. Mauris magna dui, imperdiet eu feugiat a,                             semper nec dolor. Integer malesuada, lacus a convallis sodales, ex velit convallis nisi, a suscipit ligula neque vitae sem. Mauris in orci id eros                             egestas auctor. Phasellus pharetra iaculis imperdiet. In at tempor mauris.'
            },
            {
                title: 'PAGE TWO',
                content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin feugiat est quis diam sodales, a finibus leo laoreet. Ut finibus ante et feugiat dignissim. Vestibulum massa ligula, fermentum nec libero id, facilisis semper orci. Sed auctor ipsum magna,                             non consequat odio facilisis in. Maecenas vel lorem quis massa ullamcorper rhoncus eget at tellus. Mauris magna dui, imperdiet eu feugiat a,                             semper nec dolor. Integer malesuada, lacus a convallis sodales, ex velit convallis nisi, a suscipit ligula neque vitae sem. Mauris in orci id eros                             egestas auctor. Phasellus pharetra iaculis imperdiet. In at tempor mauris.'
            },
            {
                title: 'PAGE THREE',
                content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin feugiat est quis diam sodales, a finibus leo laoreet. Ut finibus ante et feugiat dignissim. Vestibulum massa ligula, fermentum nec libero id, facilisis semper orci. Sed auctor ipsum magna,                             non consequat odio facilisis in. Maecenas vel lorem quis massa ullamcorper rhoncus eget at tellus. Mauris magna dui, imperdiet eu feugiat a,                             semper nec dolor. Integer malesuada, lacus a convallis sodales, ex velit convallis nisi, a suscipit ligula neque vitae sem. Mauris in orci id eros                             egestas auctor. Phasellus pharetra iaculis imperdiet. In at tempor mauris.'
            },
            {
                title: 'PAGE FOUR',
                content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin feugiat est quis diam sodales, a finibus leo laoreet. Ut finibus ante et feugiat dignissim. Vestibulum massa ligula, fermentum nec libero id, facilisis semper orci. Sed auctor ipsum magna,                             non consequat odio facilisis in. Maecenas vel lorem quis massa ullamcorper rhoncus eget at tellus. Mauris magna dui, imperdiet eu feugiat a,                             semper nec dolor. Integer malesuada, lacus a convallis sodales, ex velit convallis nisi, a suscipit ligula neque vitae sem. Mauris in orci id eros                             egestas auctor. Phasellus pharetra iaculis imperdiet. In at tempor mauris.'
            }
        ];
        var colors = ['23C690', 'EA8C19', 'D93137', '2F3F52', '7E2A9E'];

        class Carousel {
            constructor(slides, destination) {
                this.slides = slides;
                this.destination = $(destination);

                this.generateDots();
                this.generateContent();
            }

            hideUnnecessary(curr, next, where) {
                $(where).find('.wrapper').css({'width': 200+'%'})
                    .find('.page').removeClass('hidden');

                for(let i = 1; i <= this.slides.length; i++) {
                    if(i != curr && i != next) {
                        //console.log( $($(where).find('.wrapper')).find('.page'));
                        $(where).find('.page[attr-id="' + i + '"]').addClass('hidden');
                    }
                }
            }

            animate(curr, next, where) {
                var carouselWrapper = $(where).find('.wrapper');

                carouselWrapper.css({'width': '200%'});
                
                if(curr < next) {
                    carouselWrapper.css({marginLeft: '0'})
                    .animate({
                        marginLeft: '-100%'
                    }, 'fast');
                }
                else if(curr > next){
                    carouselWrapper.css({marginLeft: '-100%'})
                    .animate({
                        marginLeft: '0%'
                    }, 'fast');
                }
            }

            generateDots() {
                var instance = this,
                    currPosition = 1,
                    nextPosition,
                    dots = $('<section class="dot-container">');

                for(let i = 1; i <= this.slides.length; i++) {
                    let temp = $('<span class="dot dot' + i + '" data-id="' + i + '"></span>');

                    if(i == 1) {
                        $(temp).addClass('active');
                    }
                    
                    $(temp).appendTo(dots);
                }

                var dot = dots.children('.dot');

                dots.appendTo($(instance.destination));
                
                dot.click(function () {
                    var that = $(this);

                    if(that.is('.active')) {
                        return;
                    }

                    currPosition = $(instance.destination).find('.active').attr('data-id');
                    //activate dot:
                    dot.removeClass('active');
                    that.addClass('active');

                    nextPosition = that.attr('data-id');

                    // $(that.parent()).find('.wrapper').css({'display': 'none'});
                    instance.hideUnnecessary(currPosition, nextPosition, that.parent().parent());
                    instance.animate(currPosition, nextPosition, that.parent().parent());
                });
            }

            generateContent() {
                let slideContent, 
                    title, 
                    content;

                if(this.destination != null) {
                    var temp = $('<section class="wrapper"></section>')
                    temp.appendTo(this.destination);
                }

                for(let i = 1; i <= this.slides.length; i++) {
                    slideContent = $('<section attr-id="' + i + '" class="page">');
                    title = $('<h1 class="title">' + this.slides[i-1].title + '</h1>');
                    content = $('<span> ' + this.slides[i-1].content + '</span>');
                    title.appendTo(slideContent);
                    content.appendTo(slideContent);
                    slideContent.appendTo(this.destination.find('.wrapper'));

                    this.destination.find('.page[attr-id="' + i + '"]')
                        .css({'background-color' : '#' + colors[i % this.slides.length + 1]});                
                }

                this.destination.find('.wrapper').css({'width': 100*this.slides.length + '%'});
            }           
        }

        var firstCarousel = new Carousel(slides, '#carousel1');
        var secondCarousel = new Carousel(slides, '#carousel2');
        var thirdCarousel = new Carousel(slides, '#carousel3');
    });
})(jQuery);

/*
- only one element in the mark-up, inside it generate dinamically the carousel
- multiple carousel per page
- automatically generate dots
- responsive
- be able to easily add new carousel(s)
- work with different number of slides
- support carousels with different widths
*/

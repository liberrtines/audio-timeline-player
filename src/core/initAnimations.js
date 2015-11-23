import $ from 'jquery'
import __ from '../variables/variables'

export function initAnimation()
{

    setTimeout( () => 
    {
        $('#loreal').css({
        	'opacity' :  1
        })
    }, 1000)

    __.videoLink.on('click', initVideoPage)
    __.podcastLink.on('click', initAudioPage)

    function initVideoPage() {
    	if ($(this).hasClass('active')){
    	} else {
	    	$(this).addClass('active').siblings().removeClass('active')
	    	$('.bottom_controls').fadeOut()
	    	__.pauseButton.trigger('click')
	    	__.theTitle.text('Video Title')
	    	__.theMainTitle.text('Video Description')
	    	setTimeout(() => {
				let iFrameContent = '<iframe class="player" frameborder="0" scrolling="no" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true" src="http://loreal.dam.front.corp-en.cdn.brainsonic.com/index.php/player-html5-515fa863385f1464911b2d9002f99758.html" width="100%" height="100%"><noframes><img alt="L\'Oréal Foundation: Our beliefs, our commitments, our actions" src="http://loreal-dam-front-resources-corp-en-cdn.brainsonic.com/ressources/media/photo-127505-l-oreal-foundation-our-beliefs-our-commitments-our-actions.jpg" /><h2>L\'Oréal Foundation: Our beliefs, our commitments, our actions</h2></noframes></iframe>'
	    	__.coverImage.append(iFrameContent)
	    	},500)
    	}
    }

    function initAudioPage() {
    	if ($(this).hasClass('active')) {
    	} else {
    		if (typeof window.orientation !== 'undefined') {
    			location.reload();
    		} else {
    			$(window).trigger('resize');
    		}    		
    		$(this).addClass('active').siblings().removeClass('active')
	    	$('.bottom_controls').fadeIn()
	    	__.theTitle.text(__.podcastDataCategory.Podcastmp3.categories_list_podcasts_list_title)
	    	__.theMainTitle.text(__.podcastDataCategory.Category.cat_name)
	    	__.coverImage.children().remove()
    	}
    }
}

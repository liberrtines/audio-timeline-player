// Import Plugins
import $ from 'jquery'

// Import Variables
import __ from '../variables/variables'

export function initViews()
{

    if (!__.podcastData[0].timestamp == 0)
    {
        // Set Default Cover Image Here
        __.coverImage.attr('src', __.podcastCategoryImage)
        __.theTitle.text('Something Here')
       __.blurElement.css('background-image', 'url(' + __.podcastCategoryImage + ')');

        // __.blurElement.css({
        //    'background-image' : 'http://loreal-dam-front-resources-corp-en-cdn.brainsonic.com/ressources/afile/2084-b45b6-picture_photo-jennifer-lopez-face-of-looreal-paris.jpg'
        // })
    }
    else
    {
        __.coverImage.attr('src', __.podcastData[0].image)
        __.theTitle.text(__.podcastData[0].name)
    }

    __.theMainTitle.text(__.podcastDataCategory.category_name)

    __.duration = __.audioObject.duration
    __.currentTime = __.audioObject.currentTime
    __.timeDifference = __.timeline.width() / __.duration

    // Refactor This
    function secondsToHms(d)
    {
        d = Number(d);
        var h = Math.floor(d / 3600);
        var m = Math.floor(d % 3600 / 60);
        var s = Math.floor(d % 3600 % 60);

        return m + ':' + s
    }


    $('#totalDuration').text(secondsToHms(__.audioObject.duration))
}

// Import Plugins
import $ from 'jquery'

// Import Variables
import __ from '../variables/variables'

export function initViews()
{

    if (!__.podcastData[0].timecode == 0)
    {
        // Set Default Cover Image Here
        __.coverImage.attr('src', __.podcastCategoryImage)
        __.theTitle.text(__.podcastDataCategory.Podcastmp3.categories_list_podcasts_list_title)
        __.blurElement.css('background-image', 'url(' + __.podcastCategoryImage + ')');

    }
    else
    {
        __.coverImage.attr('src', __.podcastData[0].catimg)
        __.theTitle.text(__.podcastData[0].title)
    }

    __.theMainTitle.text(__.podcastDataCategory.Category.cat_name)
    __.theDate.text(__.podcastDataCategory.Podcastmp3.categories_list_podcasts_list_date)
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

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
    	__.theTitle.text('Something Bitches')
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
}

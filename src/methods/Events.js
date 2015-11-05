// Import Plugins
import $ from 'jquery'

// Import Variables
import __ from '../variables/variables'

export function EventListener()
{
    console.log('1', __.audioObject)



    __.audioObject.addEventListener('timeupdate', function ()
    {

        // -------------o Timeline width based on the current time of audio
        __.timelineInner.css(
        {
            width: (__.audioObject.currentTime) * __.timeDifference + 'px'
        })

        var currentImageNow = {
            image: __.podcastData[0].image
        };

        var arrayContainer = [0];

        for (var i = 0; i < $(__.markers).length; i++)
        {

            if (__.audioObject.currentTime > __.podcastData[i].timestamp)
            {
                if (currentImageNow.image == __.podcastData[i].image)
                {

                }
                else
                {
                    if (arrayContainer.length <= i)
                    {
                        arrayContainer.push(i);

                        __.coverImage.attr('src', __.podcastData[i].image);
                        __.theTitle.text(__.podcastData[i].name)
                    }
                    else
                    {

                    }
                    currentImageNow.image = __.podcastData[i].image;
                }

            }
        }

    }, false)

}

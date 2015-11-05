// Import Plugins
import $ from 'jquery'

// Import Variables
import __ from '../variables/variables'


export function initClickEvents()
{
    __.timeline.on('click', function (e)
    {
        var now = __.duration * (e.offsetX / 1000) * 2;
        playAt(now);

        for (var i = 0; i < __.markers.length; i++)
        {
            if (now > __.podcastData[i].timestamp)
            {
                __.coverImage.attr('src', __.podcastData[i].image);
                __.theTitle.text(__.podcastData[i].name)
            }
        }

    })

    function playAt(time)
    {
        __.audioObject.currentTime = time;
    }

    // Set the Click Events Here
    __.playButton.on('click', function ()
    {
        __.audioObject.play()
    })

    __.pauseButton.on('click', function ()
    {
        __.audioObject.pause()
    })
}

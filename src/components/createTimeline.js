// Import Plugins
import $ from 'jquery'
import WaveSurfer from 'wavesurfer.js/dist/wavesurfer.cjs.js'



// Import Variables
import __ from '../variables/variables'

export function createTimeline()
{
    if (!__.firstInit)
    {
        for (var i = 0; i < __.podcastData.length; i++)
        {

            if ($(__.$markers).length < __.podcastData.length)
            {
                __.timeline.append('<span class="markers" data-timestamp="' + __.podcastData[i].timestamp + '" style="left:' + (__.podcastData[i].timestamp * __.timeDifference) + 'px"></span>');
            }
            else
            {

            }
        }

        __.markers = $('.markers')

        var wavesurfer = Object.create(WaveSurfer);

        wavesurfer.init(
        {
            container: '#wave-timeline',
            height: 100,
            progressColor: 'rgba(0,0,0,0)',
            waveColor: '#E1E1E1',
            cursorColor: 'rgba(0,0,0,0)'
        });

        wavesurfer.load(__.audioMp3File);

        __.firstInit = true;
    }
}

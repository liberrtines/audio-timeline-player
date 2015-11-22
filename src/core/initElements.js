// Import Plugins
import $ from 'jquery'

// Import Variables
import __ from '../variables/variables'

export function initElements()
{

    __.coverImage = $('#image')
    __.theTitle = $('#title')
    __.theMainTitle = $('#maintitle')
    __.timeline = $('.timeline')
    __.timelineInner = $('.timeline_inner')
    __.playButton = $('#play')
    __.pauseButton = $('#pause')
    __.blurElement = $('.blur_inner')
    __.pauseButton = $('#pause')
    __.volumeSlider = $('input[type="range"]')
    __.theDate = $('.published_date')
    __.loadingSpinner = $('#loading')
    __.buffered = $('.buffered')
    __.theCurrentTime = $('.current_time_span')
    __.volumeBtn = $('.volume_icon')
    __.podcastLink = $('#podcast_link')
    __.videoLink = $('#video_link')

}

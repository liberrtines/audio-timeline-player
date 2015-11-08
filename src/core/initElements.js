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
    __.blurElement = $('.blur_element')
    __.pauseButton = $('#pause')
    __.volumeSlider = $('input[type="range"]')

}

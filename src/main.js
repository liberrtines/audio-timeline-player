'use strict'

// Import Jquery
import $ from 'jquery'

// Import Stylesheet
import './scss/main.scss'

// Import Variables
import __ from './variables/variables'


// Load Functions
/* beautify preserve:start */
import { loadJSON } from './services/Api'
import { initElements } from './methods/initElements'
import { initClickEvents } from './methods/initClickEvents'
import { initViews } from './methods/initViews'
import { createTimeline } from './methods/createTimeline'
import { EventListener } from './methods/Events'
/* beautify preserve:end */


/**
 * 
 *  APPLICATION STARTS HERE
 *	Get the Promise of the JSON call
 *	After success, then load the Mp3 to the player
 *	Then load the remaining methods
 * 
 */

loadJSON().then((data) =>
{
    initAudioObject().then(() =>
    {
        /**
            initElements
            ------o Sets empty Objects in Variables.js to a DOM Node in the HTML
        
            initViews
            ------o Updates the HTML views ( album jacket, title, etc..)
        
            createTimeline
            ------o Generates the Markers & WaveForm
         
            EventListener
            ------o Listens for any events, ex. audio playing
        
            initClickEvents
            ------o Calls an action when element it is clicked on
         */
        
        Promise.all([initElements(), initViews(), createTimeline(), EventListener(), initClickEvents()])
        
    }).catch(() =>
    {
        console.error('There is an error')
    })

})

let initAudioObject = () =>
{
    // Activate JSON Call
    return new Promise((resolve, reject) =>
    {
        // Create an Audio Object based on the Mp3 File
        __.audioObject = new Audio(__.audioMp3File);
        // Set a listener for when the mp3 can play
        __.audioObject.addEventListener('canplay', () =>
        {
            resolve(__.audioObject)
        })
    })
}

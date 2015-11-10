'use strict'

// Import Jquery
import $ from 'jquery'

// Import Stylesheet
import './scss/main.scss'

// Import Variables
import __ from './variables/variables'

// Import Estat
import Estat from './core/Estat'

// Import Player
import Player from './core/Player'

// Set Player Object
let player


// Load Functions
/* beautify preserve:start */
import { loadJSON }         from    './services/Api'
import { initElements }     from    './core/initElements'
import { initViews }        from    './core/initViews'
import { initAnimation }    from    './core/initAnimations.js'
/* beautify preserve:end */

let construct = () =>
{
    player = new Player(__)
}

/**
 * 
 *  APPLICATION STARTS HERE
 *  Get the Promise of the JSON call
 *  After success, then load the Mp3 to the player
 *  Then load the remaining core
 * 
 */

loadJSON().then((data) =>
{
    initAudioObject().then(() =>
    {

        // Estat Activation
        let estat = new Estat(__)
        estat.loadEstat().then(() =>
        {
            // Load Estat Actions into App Global Object for Access
            __.estatActions = estat.loadEstatSuccess()
        })


        /**
            initElements
            ------o Sets empty Objects in Variables.js to a DOM Node in the HTML
        
            initViews
            ------o Updates the HTML views ( album jacket, title, etc..)

            construct
            ------o  Creating a new instance of Player Object
        
            createTimeline
            ------o Generates the Markers & WaveForm
         
            EventListener
            ------o Listens for any events, ex. audio playing
        
            clickEvents
            ------o Calls an action when element it is clicked on
         */

        Promise.all([

            initElements(),
            initViews(),
            construct(),
            player.createTimeline(),
            player.EventListener(),
            player.clickEvents(),
            initAnimation()

        ])
        if (typeof window.orientation !== 'undefined')
        {
            __.volumeBtn.hide()
        }


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

        // If MOBILE, resolve immediately
        if (typeof window.orientation !== 'undefined')
        {
            resolve(__.audioObject)
        }
        else
        {
            __.audioObject.addEventListener('canplay', () =>
            {

                resolve(__.audioObject)
            })
        }
    })
}

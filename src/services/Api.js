// Import Plugins
import $ from 'jquery'

// Import Variables
import __ from '../variables/variables'

export function loadJSON()
{
    return new Promise((resolve, reject) =>
    {
        $.getJSON('json/loreal.json',
            {
                format: "json"
            })
            .done(function (data)
            {
                resolve(data)
                let Categories = data.Categories

                // We should set some variables
                __.audioMp3File = Categories[__.categoryNumber].mp3_url
                __.podcastDataCategory = Categories[__.categoryNumber]
                __.podcastData = Categories[__.categoryNumber].chapters

            });
    })
}

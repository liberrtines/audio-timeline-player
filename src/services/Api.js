// Import Plugins
import $ from 'jquery'

// Import Variables
import __ from '../variables/variables'

export function loadJSON()
{
    return new Promise((resolve, reject) =>
    {
        fetch('json/loreal.json')
            .then(returnData => returnData.json())
            .then(data =>
            {
                resolve(data)
                // Once Data is returned back from the JSON
               	
               	// For easier acces, set Categories to data.Categories
                let Categories = data.Categories;

				// We should set some variables
                __.audioMp3File = Categories[__.categoryNumber].mp3_url
                __.podcastDataCategory = Categories[__.categoryNumber]
                __.podcastData = Categories[__.categoryNumber].chapters

            })
            .catch(() =>
            {
                console.error('Error loading JSON')
            })
    })
}

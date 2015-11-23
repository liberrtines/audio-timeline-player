// Import Plugins
import $ from 'jquery'
import { timetoSeconds } from '../core/Helpers'

// Import Variables
import __ from '../variables/variables'

export let loadJSON = () =>
{
    return new Promise((resolve, reject) =>
    {
        $.getJSON('json/loreal.json',
            {
                format: "json"
            })
            .done((data) =>
            {
                resolve(data)
                let PodcastData = data[0]

                // We should set some variables
                __.audioMp3File = PodcastData.Podcastmp3.categories_list_podcasts_list_filepath

                __.podcastDataCategory = PodcastData
                
                __.podcastData = PodcastData.Chapter
                __.podcastCategoryImage = PodcastData.Category.catimg
                
                __.podcastData.filter((item) =>
                {
                    console.log(item)
                
                    var img = new Image();
                    img.src = item.cover_url;

                    if (isNaN(item.timecode))
                    {
                        item.timecode = timetoSeconds(item.timecode)
                    }
                })
            });
    })
}

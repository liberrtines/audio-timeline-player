// Import Plugins
import $ from 'jquery'

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

                    if (isNaN(item.timecode))
                    {

                        let timetoSeconds = (str) =>
                        {
                            let p = str.split(':'),
                                s = 0,
                                m = 1;

                            while (p.length > 0)
                            {
                                s += m * parseInt(p.pop(), 10);
                                m *= 60;
                            }

                            return s;
                        }


                        item.timecode = timetoSeconds(item.timecode)

                    }
                })

            });
    })
}

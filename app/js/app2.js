// -------------o L'Oreal


var Loreal = (function ($)
{

    var _ = {

        /* beautify preserve:start */

        firstInit      :   false,
        coverImage     :   null,
        timeline       :   null,
        timelineInner  :   null,
        theMainTitle   :   null,
        theTitle       :   null,
        markers        :   null,
        audioInstance  :   null,
        audioMp3File   :   null,
        podcastData    :   null,
        categoryNumber :   0,
        currentTime    :   null,
        duration       :   null,
        timeDifference :   null,
        pauseButton    :   null,
        playButton     :   null,
        apiUrl         :   'json/loreal.json',

        /* beautify preserve:end */

        initAPI: function ()
        {

            $.getJSON(_.apiUrl,
                {
                    format: "json"
                })
                .done(function (data)
                {

                    // -------------o Set Mp3 & Podcast Data to a variable
                    _.audioMp3File = data.Categories[_.categoryNumber].mp3_url
                    _.podcastDataCategory = data.Categories[_.categoryNumber]
                    _.podcastData = data.Categories[_.categoryNumber].chapters


                    _.init()

                });
        },

        initElements: function ()
        {
            _.coverImage = $('#image')
            _.theTitle = $('#title')
            _.theMainTitle = $('#maintitle')
            _.timeline = $('#timeline')
            _.timelineInner = $('#timeline_inner')
            _.playButton = $('#play')
            _.pauseButton = $('#pause')

            // -------------o Marker Variable is set in the function (watchAudioEvents)

        },

        initDomElements: function ()
        {
            // -------------o Set the cover image & title by first object in the chapter object
            _.coverImage.attr('src', _.podcastData[0].image)
            _.theTitle.text(_.podcastData[0].name)
            _.theMainTitle.text(_.podcastDataCategory.category_name)

        },

        initClickEvents: function ()
        {
            _.timeline.on('click', function (e)
            {
                var now = _.duration * (e.offsetX / 1000) * 2;
                playAt(now);

                for (var i = 0; i < _.markers.length; i++)
                {
                    if (now > _.podcastData[i].timestamp)
                    {
                        _.coverImage.attr('src', _.podcastData[i].image);
                        _.theTitle.text(_.podcastData[i].name)
                    }
                }

            })

            function playAt(time)
            {
                _.audioInstance.currentTime = time;
            }

            // Set the Click Events Here
            _.playButton.on('click', function ()
            {
                _.audioInstance.play()
            })

            _.pauseButton.on('click', function ()
            {
                _.audioInstance.pause()
            })

        },

        initAudio: function ()
        {
            _.audioInstance = new Audio(_.audioMp3File)
        },

        waitForAudioToBeReady: function ()
        {

            _.audioInstance.addEventListener('canplay', function ()
            {

                _.duration = this.duration
                _.currentTime = this.currentTime
                _.timeDifference = _.timeline.width() / _.duration

                // -------------o Once the Audio is ready and all the information is there, call the rest of the Initialization of the application

                _.initAudioPlayer()

            })
        },

        createAudioPlayerAndWaveForm: function ()
        {


            if (!_.firstInit)
            {
                for (var i = 0; i < _.podcastData.length; i++)
                {

                    if ($(_.$markers).length < _.podcastData.length)
                    {
                        _.timeline.append('<span class="markers" data-timestamp="' + _.podcastData[i].timestamp + '" style="left:' + (_.podcastData[i].timestamp * _.timeDifference) + 'px"></span>');
                    }
                    else
                    {

                    }
                }

                // -------------o Marker is set here because it is not yet ready until Audio is initialized
                _.markers = $('.markers')

                var wavesurfer = Object.create(WaveSurfer);
                console.log(wavesurfer);
                wavesurfer.init(
                {
                    container: '#wave-timeline',
                    height: 100,
                    progressColor: 'rgba(0,0,0,0)',
                    waveColor: '#E1E1E1',
                    cursorColor: 'rgba(0,0,0,0)'
                });

                // wavesurfer.load(_.audioMp3File);

                _.firstInit = true;
            }
        },

        watchAudioEvents: function ()
        {
            _.audioInstance.addEventListener('timeupdate', function ()
            {

                // -------------o Timeline width based on the current time of audio
                _.timelineInner.css(
                {
                    width: (this.currentTime) * _.timeDifference + 'px'
                })

                var currentImageNow = {
                    image: _.podcastData[0].image
                };

                var arrayContainer = [0];

                for (var i = 0; i < $(_.markers).length; i++)
                {

                    if (this.currentTime > _.podcastData[i].timestamp)
                    {
                        if (currentImageNow.image == _.podcastData[i].image)
                        {

                        }
                        else
                        {
                            if (arrayContainer.length <= i)
                            {
                                arrayContainer.push(i);

                                _.coverImage.attr('src', _.podcastData[i].image);
                                _.theTitle.text(_.podcastData[i].name)
                            }
                            else
                            {

                            }
                            currentImageNow.image = _.podcastData[i].image;
                        }

                    }
                }

            }, false)

        },

        callAPI: function ()
        {

            _.initAPI()

        },

        init: function ()
        {

            _.initElements()
            _.initDomElements()
            _.initClickEvents()
            _.initAudio()
            _.waitForAudioToBeReady()

        },

        initAudioPlayer: function ()
        {

            _.createAudioPlayerAndWaveForm()
            _.watchAudioEvents()

        }
    }

    return _;

})(jQuery);

// Launch!
Loreal.callAPI();

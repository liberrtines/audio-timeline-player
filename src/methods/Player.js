// Import Plugins
import $ from 'jquery'
import WaveSurfer from 'wavesurfer.js/dist/wavesurfer.cjs.js'


class Player
{
    constructor(options)
    {
        this.options = options
    }

    // PROTOTYPES

    createTimeline()
    {

        // First set Default Volume on Audio & Slider 
        this.options.audioObject.volume = this.options.defaultVolume
        this.options.volumeSlider.val(this.options.defaultVolume)

        // Start Timeline Creation
        if (!this.options.firstInit)
        {
            for (let i = 0; i < this.options.podcastData.length; i++)
            {

                if ($(this.options.$markers).length < this.options.podcastData.length)
                {
                    this.options.timeline.append('<span class="markers" data-timestamp="' + this.options.podcastData[i].timestamp + '" style="left:' + (this.options.podcastData[i].timestamp * this.options.timeDifference) + 'px"></span>');
                }
                else
                {

                }
            }

            this.options.markers = $('.markers')

            let wavesurfer = Object.create(WaveSurfer);

            wavesurfer.init(
            {
                container: '#wave-timeline',
                height: 100,
                progressColor: 'rgba(0,0,0,0)',
                waveColor: '#E1E1E1',
                cursorColor: 'rgba(0,0,0,0)'
            });

            wavesurfer.load(this.options.audioMp3File);

            this.options.firstInit = true;
        }
    }

    EventListener()
    {


        // Voluem Slider Event Listener
        this.options.volumeSlider.on('input change', (e) =>
        {
            this.options.audioObject.volume = e.target.value
        })


        this.options.audioObject.addEventListener('timeupdate', () =>
        {
            // -------o Timeline width based on the current time of audio
            this.options.timelineInner.css(
            {
                width: (this.options.audioObject.currentTime) * this.options.timeDifference + 'px'
            })

            let currentImageNow = {
                image: this.options.podcastData[0].image
            };

            let arrayContainer = [0];

            for (let i = 0; i < $(this.options.markers).length; i++)
            {

                if (this.options.audioObject.currentTime > this.options.podcastData[i].timestamp)
                {
                    if (currentImageNow.image == this.options.podcastData[i].image)
                    {

                    }
                    else
                    {
                        if (arrayContainer.length <= i)
                        {
                            arrayContainer.push(i);

                            this.options.coverImage.attr('src', this.options.podcastData[i].image);
                            this.options.theTitle.text(this.options.podcastData[i].name)
                        }
                        else
                        {

                        }
                        currentImageNow.image = this.options.podcastData[i].image;
                    }

                }
            }

        }, false)

        this.options.audioObject.addEventListener('ended', () =>
        {
            // Audio has Finished
            this.options.estatActions.notifyPlayer('stop')
            this.options.audioObject.currentTime = 0
        })
    }

    clickEvents()
    {
        this.options.timeline.on('click', (e) =>
        {
            let now = this.options.duration * (e.offsetX / 1000) * 2;
            playAt(now);

            for (let i = 0; i < this.options.markers.length; i++)
            {
                if (now > this.options.podcastData[i].timestamp)
                {
                    this.options.coverImage.attr('src', this.options.podcastData[i].image);
                    this.options.theTitle.text(this.options.podcastData[i].name)
                }
            }

        })

        let playAt = (time) =>
        {
            this.options.audioObject.currentTime = time;
        }

        // Set the Click Events Here
        this.options.playButton.on('click', () =>
        {
            this.options.audioObject.play()
                // ESTAT ACTIONS
            this.options.estatActions.notifyPlayer('play')
        })

        this.options.pauseButton.on('click', () =>
        {
            this.options.audioObject.pause()
                // ESTAT ACTIONS
            this.options.estatActions.notifyPlayer('pause')

        })
    }
}

export default Player

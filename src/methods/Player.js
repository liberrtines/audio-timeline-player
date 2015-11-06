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
        console.log(this.options.podcastData)
            // Start Timeline Creation
        if (!this.options.firstInit)
        {
            for (let i = 0; i < this.options.podcastData.length; i++)
            {
                /* beautify preserve:start */
                if ($(this.options.$markers).length < this.options.podcastData.length)
                {
                    this.options.timeline.append(
                        '<span class="markers" data-timestamp="'
                        + this.options.podcastData[i].timestamp
                        + '" style="left:'
                        + (this.options.podcastData[i].timestamp * this.options.timeDifference)
                        + 'px"></span>');
                }
                else
                {

                }
                /* beautify preserve:end */
            }

            this.options.markers = $('.markers')

            let wavesurfer = Object.create(WaveSurfer);

            wavesurfer.init(
            {
                container: '#wave-timeline',
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

        // Volume Slider Event Listener
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

            for (let i = $(this.options.markers).length - 1; i >= 0; i--)
            {
                if (this.options.audioObject.currentTime > this.options.podcastData[i].timestamp)
                {
                    if (!this.options.podcastData[i].seen)
                    {
                        this.options.coverImage.attr('src', this.options.podcastData[i].image);
                        this.options.theTitle.text(this.options.podcastData[i].name)
                        this.options.podcastData[i].seen = true
                    }

                    break
                }
            }
        }, false)

        this.options.audioObject.addEventListener('ended', () =>
        {
            // Audio has Finished

            this.options.estatActions.notifyPlayer('stop')
            this.options.audioObject.currentTime = 0.1

            this.options.playButton.show();
            this.options.pauseButton.hide();

        })
    }

    clickEvents()
    {
        this.options.timeline.on('click', (e) =>
        {
            /**
             * Timeline Calculation
             * @type {[type]}
             *
             *  When a user clicks on the timeline, we need to make sure 
             *  it goes to the right spot, and updates the audio at that current time
             *
             *  Example Calculation
             *  duration : 148.8239 seconds
             *  timeline (clicked) offset : 120px
             *  timeline total width : 300px
             *
             *  148.8239 x ( 120 / ( 300 x 2 ) x 2)
             *  
             */

            for (let i = 0; i < this.options.podcastData.length; i++)
            {
                this.options.podcastData[i].seen = false;
            }

            let now = this.options.duration * (e.offsetX / (this.options.timeline.outerWidth() * 2)) * 2;

            playAt(now);

            for (let i = 0; i < this.options.markers.length; i++)
            {
                if (now > this.options.podcastData[i].timestamp)
                {
                    this.options.coverImage.attr('src', this.options.podcastData[i].image);
                    this.options.theTitle.text(this.options.podcastData[i].name)
                }
                else if (now < this.options.podcastData[0].timestamp)
                {
                    console.log('Bottom')
                    this.options.coverImage.attr('src', this.options.podcastCategoryImage)
                    this.options.theTitle.text('Something Bitches')
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
                // HIDE PLAY 
            this.options.playButton.hide();
            this.options.pauseButton.show();
        })

        this.options.pauseButton.on('click', () =>
        {
            this.options.audioObject.pause()
                // ESTAT ACTIONS
            this.options.estatActions.notifyPlayer('pause')
                // HIDE PAUSE
            this.options.playButton.show();
            this.options.pauseButton.hide();


        })
    }
}

export default Player

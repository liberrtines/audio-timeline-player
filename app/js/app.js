var fakeJson = [
{
    name: 'First Chapter',
    timestamp: 0,
    image: 'images/0.jpg'
},
{
    name: 'Second Chapter',
    timestamp: 3,
    image: 'images/1.jpg'
},
{
    name: 'Third Chapter',
    timestamp: 15,
    image: 'images/2.jpg'
},
{
    name: 'Fourth Chapter',
    timestamp: 28,
    image: 'images/3.jpg'
}];

$('#image').attr('src', fakeJson[0].image);
$('#title').text(fakeJson[0].name)


var currentTime, durationTime, theDifference;
var widthOfTimeline = $('#timeline').width();

var myaudio = new Audio('http://goommarketing.com/top10/songs/6.mp3');

myaudio.addEventListener('canplay', function ()
{

    currentTime = myaudio.currentTime;
    durationTime = myaudio.duration;
    theDifference = widthOfTimeline / durationTime

    myaudio.addEventListener('timeupdate', function ()
    {

        $('#timeline_inner').css(
        {
            // The inner timeline will need to change based on the currentTime
            // To make this work, you must get the currentTime number, multiply it by the difference
            // ex. timeline width = 500px
            // currentTime * 500 = pixels
            width: (this.currentTime) * theDifference + 'px'
        })

        // var now = durationTime * (e.offsetX / 1000) * 2;
        var currentImageNow = {
            image: fakeJson[0].image
        };
        var lastTimer = fakeJson[0].timestamp;
        var fakeArray = [0];

        for (var i = 0; i < $('.markers').length; i++)
        {
            if (this.currentTime > fakeJson[i].timestamp)
            {
                if (currentImageNow.image == fakeJson[i].image)
                {

                }
                else
                {

                    if (fakeArray.length <= i)
                    {
                        fakeArray.push(i);
                        $('#image').attr('src', fakeJson[i].image);
                        $('#title').text(fakeJson[i].name)
                    }
                    else
                    {

                    }
                    currentImageNow.image = fakeJson[i].image;




                    // console.log('fake json image now is', fakeJson[i].image)
                    // console.log('i is', i)
                }




            }
        }




    }, false)



    for (var i = 0; i < fakeJson.length; i++)
    {

        if ($('.markers').length < fakeJson.length)
        {
            $('#timeline').append('<span class="markers" data-timestamp="' + fakeJson[i].timestamp + '" style="left:' + (fakeJson[i].timestamp * theDifference) + 'px"></span>');
        }
        else
        {

        }

        // the timestamp is in seconds of the duration of the audio file
        // to make this work, you'll need to get the timestamp number, and multiply it by the difference, 15.274437, so 32 seconds equals
        // the width of the timeline 
    }
    // Find the number of markers that exists on the timeline
    // Once you find the length of the markers, change the image after each marker, and do the 
    // same once you click before the marker also
    // var lengthOfMakers = $('.markers').length;
    // console.log(lengthOfMakers);

    // $('.markers').each(function(data){
    // 	console.log(this);

    // })

})


$('#timeline').on('click', function (e)
{

    var now = durationTime * (e.offsetX / 1000) * 2;

    playAt(now);

    for (var i = 0; i < $('.markers').length; i++)
    {
        if (now > fakeJson[i].timestamp)
        {
            $('#image').attr('src', fakeJson[i].image);
            $('#title').text(fakeJson[i].name)
        }
    }

})

function playAt(time)
{
    myaudio.currentTime = time;
}



$('#play').click(function ()
{
    myaudio.play();
})
$('#pause').click(function ()
{
    myaudio.pause();
})

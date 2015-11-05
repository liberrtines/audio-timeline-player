
import Variables from '../variables/variables'

class Player
{
    play()
    {
    	Variables.audioObject.play()
    }
    pause () 
    {
    	Variables.audioObject.pause()
    }
}


export default Player
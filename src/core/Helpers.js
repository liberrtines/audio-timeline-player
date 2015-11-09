export function secondsToHms(d)
{
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    if (s.toString().length == 1)
    {
        s = "0" + s;
    }
    return m + ':' + s
}


export function timetoSeconds(str)
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


export function putLocalStorage(options)
{

    localStorage.setItem('loreal-client-player', JSON.stringify(options));
}

export function getLocalStorage()
{
    return JSON.parse(localStorage.getItem('loreal-client-player'))

}

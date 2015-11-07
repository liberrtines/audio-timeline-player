let contentStreamTag;

class Estat
{
    constructor(options)
    {
        this.options = options
    }

    loadEstat()
    {
        return new Promise((resolve, reject) =>
        {

            let eS = document.createElement('script');
            eS.type = 'text/javascript';
            eS.async = true;
            eS.src = ('https:' === document.location.protocol ? 'https://' : 'http://') + 'prof.estat.com/js/mu-5.1.js';
            let s = document.getElementsByTagName('script')[0];
            s.parentNode.insertBefore(eS, s);
            // 4. Envoi de la mesure
            if (eS.addEventListener)
            { // for all browsers except old IEs ( < 9)
                eS.addEventListener('load', function ()
                {
                    resolve('done')
                }, false)
            }
            else
            { // for old IEs only
                eS.onreadystatechange = function ()
                {
                    if (eS.readyState in
                        {
                            complete: 1,
                            loaded: 1
                        })
                    {
                        resolve('done')
                    }
                };
            }
        })
    }

    loadEstatSuccess()
    {

        console.log('Estat is loaded successfully')

        let moreActions = {

            getPosition: () =>
            {
                return Math.round(this.options.audioObject.currentTime);
            },
            currentUrl: () =>
            {
                return (window.location != window.parent.location) ? document.referrer : document.location.href;
            },
            parseHostName: () =>
            {
                return this.getDomainName(moreActions.currentUrl())
            },
            domName: () =>
            {
                if (moreActions.parseHostName().domain === undefined)
                {
                    return 'Unknown'
                }
                else
                {
                    return moreActions.parseHostName().domain
                }

            }
        }


        let getPosition = (player) =>
        {
            // TODO : retourner la position à partir du player
            return Math.round(this.options.audioObject.currentTime);
        };


        /* beautify preserve:start */
        let confStreamingAnalytics = {
            serial					: this.options.estatId,
            measure					: 'streaming',
            domainkey				: moreActions.domName(),
            streaming :
            {
                diffusion			: 'replay',
                callbackPosition	: moreActions.getPosition,
                playerObj			: this.options.audioObject,
                playerName			: 'Podcast Player',
                streamName			: this.options.audioMp3File,
                streamGenre			: 'Podcast',
                streamDuration		: this.options.audioObject.duration
            },
            levels:
            {
                level_1				: 'Podcast Player',
                level_2				: this.options.podcastDataCategory.category_name
            }
        }
        /* beautify preserve:end */

        contentStreamTag = new eStatTag(confStreamingAnalytics);
        return contentStreamTag

    }

    getDomainName(url)
    {
        let parsed_url = {}

        if (url == null || url.length == 0)
            return parsed_url;

        let protocol_i = url.indexOf('://');
        parsed_url.protocol = url.substr(0, protocol_i);

        let remaining_url = url.substr(protocol_i + 3, url.length);
        let domain_i = remaining_url.indexOf('/');
        domain_i = domain_i == -1 ? remaining_url.length - 1 : domain_i;
        parsed_url.domain = remaining_url.substr(0, domain_i);
        parsed_url.path = domain_i == -1 || domain_i + 1 == remaining_url.length ? null : remaining_url.substr(domain_i + 1, remaining_url.length);

        let domain_parts = parsed_url.domain.split('.');
        switch (domain_parts.length)
        {
            case 2:
                parsed_url.subdomain = null;
                parsed_url.host = domain_parts[0];
                parsed_url.tld = domain_parts[1];
                break;
            case 3:
                parsed_url.subdomain = domain_parts[0];
                parsed_url.host = domain_parts[1];
                parsed_url.tld = domain_parts[2];
                break;
            case 4:
                parsed_url.subdomain = domain_parts[0];
                parsed_url.host = domain_parts[1];
                parsed_url.tld = domain_parts[2] + '.' + domain_parts[3];
                break;
        }

        parsed_url.parent_domain = parsed_url.host + '.' + parsed_url.tld;

        return parsed_url;
    }
}

export default Estat

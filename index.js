const fetch = require("node-fetch");
const { Ads } = require('./repository')

const getList = (start = 0) => {
    console.log('Fetching deals with start ', start)

    const body = {
        section: 'cars',
        adType: 'forsale',
        sort: 'relevance desc',
        priceType: 'Euro',
        mileageType: 'Kilometres',
        max: 30,
        start,
        viewType: 'list'
    }

    const response = fetch('https://www.donedeal.ie/search/api/v4/find/', {
        'credentials': 'include',
        'headers':
        {
            'accept': 'application/json, text/plain, */*',
            'accept-language': 'en,pt-BR;q=0.9,pt;q=0.8,en-US;q=0.7',
            'cache-control': 'no-cache',
            'content-type': 'application/json;charset=UTF-8',
            'platform': 'web',
            'pragma': 'no-cache',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin'
        },
        'referrer': 'https://www.donedeal.ie/cars/Ford/?price_from=0&price_to=10000',
        'referrerPolicy': 'no-referrer-when-downgrade',
        'body': JSON.stringify(body),
        'method': 'POST',
        'mode': 'cors'
    })

    return response
        .then(res => res.json())
        .then(response => ({
            nextStart: response.pagingCounts.nextStart,
            ads: response.ads
        }))
}

const log = (msg) => console.log(new Date, msg)

const main = async () => {
    log('Starging main')

    let next;
    do {
        const { nextStart, ads } = await getList()
        next = nextStart;
        console.log('Numbe of ads ', ads.length, ' next start ', next)

        const data = ads.map(ad => ({
            ...ad,
            ...ad.section,
            section: null,
            ...ad.oldPriceView,
            oldPriceView: null,
            ...ad.seller,
            seller: null
            // photos?
        }))

        await Ads.bulkCreate(data, {
            updateOnDuplicate: ["id"] 
        })

        await sleep(1000*60) // 1 min
    } while (next !== 0)
}

function sleep(ms){
    return new Promise(resolve=>{
        setTimeout(resolve,ms)
    })
}

main()
const list = document.querySelector('#user-list');

const data = responseData;

const cards = data.map((data)=> {
    createSocialList(data)
    return createElement(
        'li', 
        {classes: ['card', 'card-test']},
        createElement(
            'section',
            {classes: ['card-user']},
            createImg(data),
            createElement(
                'h3',
                {classes: ['card-user__title']},
                document.createTextNode(data.lastName+' '+data.firstName),
            ),
            createElement(
                'p',
                {classes: ['card-user__text']},
                document.createTextNode('lorem 1 lorem 2 lorem 3 lorem 4 lorem 5'),
            ),
            createSocialList(data),
        )
    )
});

list.append(...cards);

function createElement(type, options, ...children) {
    const el = document.createElement(type);

    el.classList.add(...options.classes);
    el.append(...children);

    if (options.attributes) {
        for (const item of Object.entries(options.attributes)) {
            console.log(Object.entries(options.attributes))
            el.setAttribute(item[0], item[1])
        }
    }
   
    return el;
}

function createImg(data) {
    const img = createElement(
        'img', 
            {
                classes: ['card-user__img-wrap'], 
                attributes: {
                    'src': data.profilePicture
                }
            },
    );

    const imgSect = createElement('div', {classes: ['card-user__img-wrap']}, img);

    return imgSect;
}

function createSocialList(data) {
    const map = new Map();

    const sosialArr = data.contacts.forEach(el => {
        const mapVal =  new URL(el).hostname.split('.').filter(item => {
            if (item !== 'www' && item !== 'com') {
                return item;
            }
        });

        map.set(el, mapVal);
    });

    const hrefs = data.contacts.map(items => {
        return createElement(
            'a',
            {
                classes: ['card-user__sosial'], 
                attributes: {
                    'href': items,
                },
            },
            createElement(
                'img',
                {
                    classes: ['card-user__icon'], 
                    attributes: {
                        title: map.get(items),
                        src: `./img/${map.get(items)}.png`
                    },
                },
            )
        )
    });

    return createElement(
        'div',
        {
            classes: ['card-user__social-list'], 
        },
        ...hrefs,
    )
}

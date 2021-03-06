const list = document.querySelector('#user-list');
const listNames = document.querySelector('#user-list-names');
const idUSers = [];

// document.addEventListener('click', toggleActive);

// function toggleActive(e) {
//     const el = e.target.closest('.card');
//     const els = [...list.children];
    
   
//     if (el) {
//         el.classList.add('active');
//     } else {
//         els.forEach((item) => {
//             if (item !== el) {
//                 item.classList.remove('active');
//             }
//         });
//     }

//     els.forEach((item) => {
//         if (item !== el) {
//             item.classList.remove('active');
//         }
//     });
// }


function checkedUser(e, data) {
    const el = e.target.closest('.card');
    const id = el.id;

    if (!idUSers.includes(id)) {
        idUSers.push(id);
    }

    if (el.classList.contains('active')) {
        el.classList.remove('active');
        idUSers.splice(idUSers.indexOf(id), 1);
    } else {
        el.classList.add('active');
    }

    
    renderNames(data);
}


fetchData().then((data)=> {
    renderCard(data);

    list.addEventListener('click', (e)=> {
        checkedUser(e, data)
    });
});

function renderNames(data) {
    const elems = [];

    data.map((el)=> {
        idUSers.forEach((item)=> {
            if (el.id == item) {
                elems.push(
                    createElement(
                        'li',
                        {classes: ['li']},
                        document.createTextNode(el.lastName+' '+el.firstName),
                    )
                )
            }
        })
    });

    const children = [...listNames.childNodes];

    for (let i = 0; i < children.length; i++) {
        children[i].remove();
    }

    listNames.append(...elems);
}

function renderCard(data) {
    const cards = data.map((data)=> {
        return createElement(
            'li', 
            {
                classes: ['card', 'card-test'],
                attributes: {
                    'id': data.id
                }

            },
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
}

function createElement(type, options, ...children) {
    const el = document.createElement(type);

    el.classList.add(...options.classes);
    el.append(...children);

    if (options.attributes) {
        for (const item of Object.entries(options.attributes)) {
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
                        alt: map.get(items),
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

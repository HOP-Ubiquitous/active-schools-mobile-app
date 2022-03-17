export const CHALLENGES = [
    {
        id: 1,
        icon: 'assets/icon/challenges/challenge-sprint-icon.svg',
        name: 'Squats',
        target: 'x50',
        instructions: [
            'assets/icon/challenge-squats-1.svg',
            'assets/icon/challenge-squats-2.svg',
            'assets/icon/challenge-squats-1.svg',
            'assets/icon/challenge-squats-2.svg',
            'assets/icon/challenge-squats-1.svg',
            'assets/icon/challenge-squats-2.svg'
        ],
        video: {
            type: 'local',
            url: 'assets/icon/challenges/videos/squats.mp4'
        },
        reward: '1000',
        gallery: [
            {
                like: false,
                image: 'assets/images/upload-gallery-1.jpg'
            },
            {
                like: true,
                image: 'assets/images/upload-gallery-2.jpg'
            },
            {
                like: true,
                image: 'assets/images/upload-gallery-3.jpg'
            },
            {
                like: false,
                image: 'assets/images/upload-gallery-4.jpg'
            },
            {
                like: false,
                image: 'assets/images/upload-gallery-5.jpg'
            },
        ]
    },
    {
        id: 2,
        icon: 'assets/icon/challenges/challenge-heart-icon.svg',
        name: 'Jumping Jacks',
        target: 'x20',
        instructions: [
            'assets/icon/challenge-jumping-jack-1.svg',
            'assets/icon/challenge-jumping-jack-2.svg',
            'assets/icon/challenge-jumping-jack-3.svg',
            'assets/icon/challenge-jumping-jack-4.svg',
        ],
        video: {
            type: 'local',
            url: 'assets/icon/challenges/videos/jumping-jacks.mp4'
        },
        reward: '1000',
        gallery: [
            {
                like: false,
                image: 'assets/images/upload-gallery-1.jpg'
            },
            {
                like: false,
                image: 'assets/images/upload-gallery-4.jpg'
            },
            {
                like: true,
                image: 'assets/images/upload-gallery-5.jpg'
            },
        ]
    },
    {
        id: 3,
        icon: 'assets/icon/challenges/challenge-weight-icon.svg',
        name: 'Push ups',
        target: 'x50',
        instructions: [
            'assets/icon/challenge-push-up-1.svg',
        ],
        video: {
            type: 'local',
            url: 'assets/icon/challenges/videos/push-ups.mp4'
        },
        reward: '1000',
        gallery: [
            {
                like: false,
                image: 'assets/images/upload-gallery-1.jpg'
            },
            {
                like: false,
                image: 'assets/images/upload-gallery-2.jpg'
            },
            {
                like: false,
                image: 'assets/images/upload-gallery-3.jpg'
            },
            {
                like: false,
                image: 'assets/images/upload-gallery-4.jpg'
            },
            {
                like: false,
                image: 'assets/images/upload-gallery-5.jpg'
            },
        ]
    },
    {
        id: 4,
        icon: 'assets/icon/challenges/challenge-agility-icon.svg',
        name: 'Running',
        target: '5min',
        instructions: [],
        video: {
            type: 'local',
            url: 'assets/icon/challenges/videos/running.mp4'
        },
        reward: '1000',
        gallery: [
            {
                like: false,
                image: 'assets/images/upload-gallery-1.jpg'
            },
            {
                like: false,
                image: 'assets/images/upload-gallery-2.jpg'
            },
            {
                like: false,
                image: 'assets/images/upload-gallery-3.jpg'
            },
            {
                like: false,
                image: 'assets/images/upload-gallery-4.jpg'
            },
            {
                like: false,
                image: 'assets/images/upload-gallery-5.jpg'
            },
        ]
    },
    {
        id: 5,
        icon: 'assets/icon/challenges/challenge-steps-icon.svg',
        name: 'Stretching',
        target: 'x50',
        instructions: [
            'assets/icon/challenge-stretching-1.svg',
            'assets/icon/challenge-stretching-2.svg',
            'assets/icon/challenge-stretching-3.svg',
        ],
        video: {
            type: 'local',
            url: 'assets/icon/challenges/videos/stretching.mp4'
        },
        reward: '1000',
        gallery: [
            {
                like: false,
                image: 'assets/images/upload-gallery-1.jpg'
            },
            {
                like: false,
                image: 'assets/images/upload-gallery-2.jpg'
            },
            {
                like: false,
                image: 'assets/images/upload-gallery-3.jpg'
            },
            {
                like: false,
                image: 'assets/images/upload-gallery-4.jpg'
            },
            {
                like: false,
                image: 'assets/images/upload-gallery-5.jpg'
            },
        ]
    }
];

export const ROUTES = [
    {
        id: 1,
        start: 'Ceutí - Parque de la Constitución',
        waypoints: [
            [38.07833776046008, -1.2782011257096102],
            [38.08171354237633, -1.2833035145883598],
            [38.088459364651904, -1.2769197868792332],
            [38.086417374602476, -1.2709396780006035],
            [38.08227368168584, -1.2712659130872415],
            [38.07919843189496, -1.2701216804138833],
            [38.07658388484494, -1.2697375558519983],
            [38.07455003374342, -1.2721681087511438]
        ]
    },
    {
        id: 2,
        start: 'Archena - Plaza 1º de Mayo',
        waypoints: [
            [38.11766064472027, -1.298496341659277],
            [38.11554778581432, -1.2949958119630134],
            [38.119291441969565, -1.2939453718977034],
            [38.12284145786075, -1.2949187643557576],
            [38.122903054840265, -1.298501049067671],
            [38.121039825397176, -1.2985643755469607],
            [38.11995034226251, -1.3009190757637485],
            [38.12047814081621, -1.304673360763743],
            [38.11972706529283, -1.3061877313205368],
            [38.11861540670551, -1.3085384060204863]
        ]
    },
    {
        id: 3,
        start: 'Cardiff - Castle Green',
        waypoints: [
            [51.48153195865888, -3.1795002472461937],
            [51.489516782410824, -3.1870140529587307],
            [51.49624290864972, -3.191656949626028],
            [51.50070125420784, -3.199091653742098],
            [51.499890700770926, -3.207019855188749],
            [51.49619926972571, -3.2102699417009326],
            [51.4924407449993, -3.215681457281057],
            [51.48841302900077, -3.2070565030978258]
        ]
    },
    {
        id: 4,
        start: 'Cardiff - Heath Park',
        waypoints: [
            [51.51497977530992, -3.1908449785430126],
            [51.51855832556692, -3.181274856784727],
            [51.52622188658732, -3.1669840472778077],
            [51.532190462417624, -3.1584261016280295],
            [51.537413400307074, -3.146391857429037],
            [51.539856245983025, -3.1666717188216063],
            [51.537191709186864, -3.1708542076249424],
            [51.53311908668998, -3.1788524987199187],
            [51.52883302819518, -3.1851553500167435]
        ]
    },
    {
        id: 5,
        start: 'Lebadea - Administration Office',
        waypoints: [
            [38.44155335165847, 22.876931991999985],
            [38.442003270248485, 22.873876422211094],
            [38.44034272039953, 22.868504850215764],
            [38.44353641200105, 22.86168761397483],
            [38.444973200219806, 22.855779474371165],
            [38.448210785289355, 22.851747690961204],
            [38.4515081763051, 22.850242151636277],
            [38.4544457250195, 22.84784349576267]
        ]
    },
    {
        id: 6,
        start: 'Lebadea - Hotel',
        waypoints: [
            [38.43862391689638, 22.88006975631008],
            [38.43785848777012, 22.87625929053684],
            [38.435867899089494, 22.874512303124618],
            [38.43403849115607, 22.874791744541646],
            [38.43354553696152, 22.8727459035797],
            [38.43270473573859, 22.869869130352104],
            [38.43168705796633, 22.868597050905098],
            [38.43043614271752, 22.86904814288941],
            [38.42893784284027, 22.868849662411066]
        ]
    },

]
// constants.ts

import { FoodTruck } from "./types";

export const CATEGORIES: { name: string; url: string }[] = [
    {
        name: "American",
        url: "https://cdn-icons-png.flaticon.com/128/206/206626.png",
    },
    {
        name: "Burgers",
        url: "https://cdn-icons-png.flaticon.com/128/878/878052.png",
    },
    {
        name: "Mexican",
        url: "https://cdn-icons-png.flaticon.com/128/12360/12360219.png",
    },
    {
        name: "Tacos",
        url: "https://cdn-icons-png.flaticon.com/128/537/537386.png",
    },
    {
        name: "BBQ",
        url: "https://cdn-icons-png.flaticon.com/128/3808/3808804.png",
    },
    {
        name: "Ribs",
        url: "https://cdn-icons-png.flaticon.com/128/6332/6332512.png",
    },
    {
        name: "Italian",
        url: "https://cdn-icons-png.flaticon.com/128/330/330672.png",
    },
    {
        name: "Pizza",
        url: "https://cdn-icons-png.flaticon.com/128/3595/3595455.png",
    },
    {
        name: "Vegan",
        url: "https://cdn-icons-png.flaticon.com/128/16206/16206765.png",
    },
    {
        name: "Healthy",
        url: "https://cdn-icons-png.flaticon.com/128/706/706164.png",
    },
    {
        name: "Japanese",
        url: "https://cdn-icons-png.flaticon.com/128/14007/14007506.png",
    },
    {
        name: "Sushi",
        url: "https://cdn-icons-png.flaticon.com/128/2674/2674064.png",
    },
    {
        name: "Seafood",
        url: "https://cdn-icons-png.flaticon.com/128/3082/3082055.png",
    },
    {
        name: "French",
        url: "https://cdn-icons-png.flaticon.com/128/330/330490.png",
    },
    {
        name: "Desserts",
        url: "https://cdn-icons-png.flaticon.com/128/3081/3081903.png",
    },
    {
        name: "Crepes",
        url: "https://cdn-icons-png.flaticon.com/128/168/168351.png",
    },
    {
        name: "Mediterranean",
        url: "https://cdn-icons-png.flaticon.com/128/5861/5861566.png",
    },
    {
        name: "Kebabs",
        url: "https://cdn-icons-png.flaticon.com/128/4711/4711382.png",
    },
    {
        name: "Middle Eastern",
        url: "https://cdn-icons-png.flaticon.com/128/706/706893.png",
    },
    {
        name: "Chinese",
        url: "https://cdn-icons-png.flaticon.com/128/13482/13482170.png",
    },
    {
        name: "Dim Sum",
        url: "https://cdn-icons-png.flaticon.com/128/7499/7499405.png",
    },
    {
        name: "Dumplings",
        url: "https://cdn-icons-png.flaticon.com/128/673/673530.png",
    },
    {
        name: "Fast Food",
        url: "https://cdn-icons-png.flaticon.com/128/737/737967.png",
    },
    {
        name: "Pasta",
        url: "https://cdn-icons-png.flaticon.com/128/3480/3480618.png",
    },
];

export const FOOD_TRUCKS: FoodTruck[] = [
    {
        id: "1",
        name: "Whataburger",
        categories: ["American", "Burgers"],
        location: "123 Sesame St. NY, NY",
        type: "Stationary",
        coordinates: {
            latitude: 40.769842169115456,
            longitude: -73.98803807961161,
        },
        hours: {
            sunday: "09:00 AM - 09:00 PM",
            monday: "09:00 AM - 09:00 PM",
            tuesday: "09:00 AM - 09:00 PM",
            wednesday: "09:00 AM - 09:00 PM",
            thursday: "09:00 AM - 09:00 PM",
            friday: "09:00 AM - 09:00 PM",
            saturday: "09:00 AM - 09:00 PM",
        },
        rating: 4.0,
        reviewCount: 443,
        contact: {
            email: "foodtruck@whataburger.com",
            social: {
                instagram: "@whataburgerinsta",
                facebook: "@whataburgerfacebook",
                twitter: "@whataburgerX",
            },
        },
        isOpen: true,
        imageUrl:
            "https://s.hdnux.com/photos/01/13/34/22/19776684/3/1200x0.jpg",
        images: [
            "https://th.bing.com/th/id/OIP.EUSnARUOq1Ed8z9WWLRb7AHaE8?w=257&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
            "https://th.bing.com/th/id/OIP.oHVCdsNYJjLKFop5A_X-7AHaE8?w=268&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
            "https://th.bing.com/th/id/OIP.avyUpTdLZLZFC2gbyAE51gHaFj?w=207&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
        ],
    },
    {
        id: "2",
        name: "Taco Fiesta",
        categories: ["Mexican", "Tacos"],
        location: "456 Taco Ln, NY, NY",
        type: "Stationary",
        coordinates: {
            latitude: 40.76603584958277,
            longitude: -73.98339407734088,
        },
        hours: {
            sunday: "08:00 AM - 08:00 PM",
            monday: "08:00 AM - 08:00 PM",
            tuesday: "08:00 AM - 08:00 PM",
            wednesday: "08:00 AM - 08:00 PM",
            thursday: "08:00 AM - 08:00 PM",
            friday: "08:00 AM - 08:00 PM",
            saturday: "08:00 AM - 08:00 PM",
        },
        rating: 4.5,
        reviewCount: 123,
        contact: {
            email: "tacofiesta@foodtruck.com",
            social: {
                instagram: "@tacofiesta",
                facebook: "@tacofiesta",
                twitter: "@tacofiesta",
            },
        },
        isOpen: false,
        imageUrl:
            "https://www.ctfoodtrucks.com/wp-content/uploads/2020/02/fiesta-taco-truck-e1562690144706.jpg",
        images: [
            "https://th.bing.com/th/id/OIP.O6iZ5H18dNPmWot1X7uqMwAAAA?w=254&h=190&c=7&r=0&o=5&dpr=1.3&pid=1.7",
            "https://th.bing.com/th/id/OIP.em5-7XmFYToVpnuIyf5YnQHaFj?w=238&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
            "https://th.bing.com/th/id/OIP.3mqB4hQyCFcWbIMgn4Xc-gAAAA?w=225&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
        ],
    },
    {
        id: "3",
        name: "Rolling BBQ",
        categories: ["BBQ", "Ribs"],
        location: "789 BBQ Blvd, Dallas, TX",
        type: "Stationary",
        coordinates: {
            latitude: 40.7648366742179,
            longitude: -73.97842882891602,
        },
        hours: {
            sunday: "11:00 AM - 10:00 PM",
            monday: "11:00 AM - 10:00 PM",
            tuesday: "11:00 AM - 10:00 PM",
            wednesday: "11:00 AM - 10:00 PM",
            thursday: "11:00 AM - 10:00 PM",
            friday: "11:00 AM - 11:00 PM",
            saturday: "11:00 AM - 11:00 PM",
        },
        rating: 4.8,
        reviewCount: 350,
        contact: {
            email: "rollingbbq@foodtruck.com",
            social: {
                instagram: "@rollingbbq",
                facebook: "@rollingbbq",
                twitter: "@rollingbbq",
            },
        },
        isOpen: true,
        imageUrl:
            "https://www.ctfoodtrucks.com/wp-content/uploads/2016/04/pig-rig-bbq-food-truck-1.jpg",
        images: [
            "https://th.bing.com/th/id/OIP.F_MD1ZwYccaJbEc4OdN05AHaFj?rs=1&pid=ImgDetMain",
            "https://th.bing.com/th/id/OIP.Z7FioLpsCk60OfuoevvjawHaJ4?pid=ImgDet&w=474&h=632&rs=1",
            "https://th.bing.com/th/id/OIP.1Y6VTuruKYqwA5c7n-xGLAHaFj?pid=ImgDet&w=474&h=355&rs=1",
        ],
    },
    {
        id: "4",
        name: "Pizza Paradise",
        categories: ["Italian", "Pizza"],
        location: "321 Pizza Ln, San Francisco, CA",
        type: "Mobile",
        coordinates: {
            latitude: 40.77183296465364,
            longitude: -73.97941631600894,
        },
        hours: {
            sunday: "10:00 AM - 09:00 PM",
            monday: "10:00 AM - 09:00 PM",
            tuesday: "10:00 AM - 09:00 PM",
            wednesday: "10:00 AM - 09:00 PM",
            thursday: "10:00 AM - 09:00 PM",
            friday: "10:00 AM - 10:00 PM",
            saturday: "10:00 AM - 10:00 PM",
        },
        rating: 4.6,
        reviewCount: 290,
        contact: {
            email: "pizzaparadise@foodtruck.com",
            social: {
                instagram: "@pizzaparadise",
                facebook: "@pizzaparadise",
                twitter: "@pizzaparadise",
            },
        },
        isOpen: false,
        imageUrl:
            "https://th.bing.com/th/id/OIP.7PVZoRvuBGKzOqga_FtoUQHaE9?rs=1&pid=ImgDetMain",
        images: [
            "https://cruisingkitchens.com/wp-content/uploads/2022/06/stouts-pizza-custom-food-truck-pizza-oven-mobile-truck-8-1024x683.jpg",
            "https://th.bing.com/th/id/OIP.pGKTM5_vyfCfPEZTDVQ9MQHaE8?pid=ImgDet&w=474&h=316&rs=1",
            "https://th.bing.com/th/id/OIP.X68S1k8TOEp_UnPFwGvbZQAAAA?pid=ImgDet&w=474&h=316&rs=1",
        ],
    },
    {
        id: "5",
        name: "Vegan Bites",
        categories: ["Vegan", "Healthy"],
        location: "654 Greenway St, Boulder, CO",
        type: "Stationary",
        coordinates: {
            latitude: 40.772749665368515,
            longitude: -73.9891319148263,
        },
        hours: {
            sunday: "08:00 AM - 06:00 PM",
            monday: "08:00 AM - 06:00 PM",
            tuesday: "08:00 AM - 06:00 PM",
            wednesday: "08:00 AM - 06:00 PM",
            thursday: "08:00 AM - 06:00 PM",
            friday: "08:00 AM - 06:00 PM",
            saturday: "08:00 AM - 06:00 PM",
        },
        rating: 4.3,
        reviewCount: 210,
        contact: {
            email: "veganbites@foodtruck.com",
            social: {
                instagram: "@veganbites",
                facebook: "@veganbites",
                twitter: "@veganbites",
            },
        },
        isOpen: true,
        imageUrl:
            "https://i.pinimg.com/originals/48/20/2b/48202bcd744a4d309014413bcbd0370a.jpg",
        images: [
            "https://images.happycow.net/venues/1024/97/58/hcmp97588_291119.jpeg",
            "https://th.bing.com/th/id/OIP.-FNJqmddnSgvOmxncUh0BwHaHa?pid=ImgDet&w=474&h=474&rs=1",
            "https://th.bing.com/th/id/OIP.Nfe9RvR9v1dVR5OtNwA1ugHaHa?pid=ImgDet&w=474&h=474&rs=1",
        ],
    },
    {
        id: "6",
        name: "Sushi on Wheels",
        categories: ["Japanese", "Sushi", "Seafood"],
        location: "123 Sushi Blvd, Seattle, WA",
        type: "Mobile",
        coordinates: {
            latitude: 40.76686326170899,
            longitude: -73.98941860462746,
        },
        hours: {
            sunday: "12:00 PM - 08:00 PM",
            monday: "12:00 PM - 08:00 PM",
            tuesday: "12:00 PM - 08:00 PM",
            wednesday: "12:00 PM - 08:00 PM",
            thursday: "12:00 PM - 08:00 PM",
            friday: "12:00 PM - 09:00 PM",
            saturday: "12:00 PM - 09:00 PM",
        },
        rating: 4.9,
        reviewCount: 510,
        contact: {
            email: "sushiwheels@foodtruck.com",
            social: {
                instagram: "@sushiwheels",
                facebook: "@sushiwheels",
                twitter: "@sushiwheels",
            },
        },
        isOpen: true,
        imageUrl:
            "https://th.bing.com/th/id/OIP.SlU9VsRqRftxqDNn97pl0wAAAA?rs=1&pid=ImgDetMain",
        images: [
            "https://th.bing.com/th/id/OIP.SqE8Pzm9_lqoClmh5030dwHaJ4?rs=1&pid=ImgDetMain",
            "https://th.bing.com/th/id/OIP.4M8qC-ilA4lc-55vhE8chAHaJ4?pid=ImgDet&w=474&h=632&rs=1",
            "https://th.bing.com/th/id/OIP.COHUmm0ZKLswp-u9TDQDgwHaJQ?pid=ImgDet&w=474&h=592&rs=1",
        ],
    },
    {
        id: "7",
        name: "Crepe Delight",
        categories: ["French", "Desserts", "Crepes"],
        location: "456 Sweet St, New Orleans, LA",
        type: "Mobile",
        coordinates: {
            latitude: 40.77156760155993,
            longitude: -73.98253804939942,
        },
        hours: {
            sunday: "09:00 AM - 05:00 PM",
            monday: "09:00 AM - 05:00 PM",
            tuesday: "09:00 AM - 05:00 PM",
            wednesday: "09:00 AM - 05:00 PM",
            thursday: "09:00 AM - 05:00 PM",
            friday: "09:00 AM - 05:00 PM",
            saturday: "09:00 AM - 05:00 PM",
        },
        rating: 4.7,
        reviewCount: 230,
        contact: {
            email: "crepedelight@foodtruck.com",
            social: {
                instagram: "@crepedelight",
                facebook: "@crepedelight",
                twitter: "@crepedelight",
            },
        },
        isOpen: true,
        imageUrl:
            "https://i.pinimg.com/originals/ba/c3/34/bac334508bbade6a4196cd2523c933bc.jpg",
        images: [
            "https://foodtruckya.eu-central-1.linodeobjects.com/service/103/image/964/7e4f5208-edd1-4a72-8d5f-53a8aa486314.jpeg",
            "https://th.bing.com/th/id/OIP.lY3lnT68HzxLHKhEVfzbpAHaJR?pid=ImgDet&w=474&h=593&rs=1",
            "https://th.bing.com/th/id/OIP.WZWWEGSETiaj5dOob2PmSQHaHa?pid=ImgDet&w=474&h=474&rs=1",
        ],
    },
    {
        id: "8",
        name: "Kebab Junction",
        categories: ["Mediterranean", "Kebabs", "Middle Eastern"],
        location: "789 Kebab Ln, Chicago, IL",
        type: "Stationary",
        coordinates: {
            latitude: 40.76498143251705,
            longitude: -73.97464688424562,
        },
        hours: {
            sunday: "10:00 AM - 08:00 PM",
            monday: "10:00 AM - 08:00 PM",
            tuesday: "10:00 AM - 08:00 PM",
            wednesday: "10:00 AM - 08:00 PM",
            thursday: "10:00 AM - 08:00 PM",
            friday: "10:00 AM - 09:00 PM",
            saturday: "10:00 AM - 09:00 PM",
        },
        rating: 4.5,
        reviewCount: 320,
        contact: {
            email: "kebabjunction@foodtruck.com",
            social: {
                instagram: "@kebabjunction",
                facebook: "@kebabjunction",
                twitter: "@kebabjunction",
            },
        },
        isOpen: true,
        imageUrl:
            "https://i.pinimg.com/474x/4b/ef/28/4bef285a21155f431926326643b5af88--food-carts-for-sale-electric-foods.jpg",
        images: [
            "https://th.bing.com/th/id/R.09917c20e7b3d4e4295aca38721ad17a?rik=3id8Gtf7WeDVeg&riu=http%3a%2f%2fbookmylot.com%2fwp-content%2fgallery%2fdoner-kebob%2fdoner-kabob-food-truck-los-angeles-food-trucks-la-01.jpg&ehk=UJfyevcxc6HvexqTvoOCRmkIM3afVd3jJoRHh2zeRvA%3d&risl=&pid=ImgRaw&r=0",
            "https://th.bing.com/th/id/OIP.JL9_xxFwQcPq5zKZQWUMmgHaE6?pid=ImgDet&w=474&h=314&rs=1",
            "https://th.bing.com/th/id/OIP.sOhec202eKG4czeRM9qCJgHaEJ?pid=ImgDet&w=474&h=265&rs=1",
        ],
    },
    {
        id: "9",
        name: "Dim Sum Cart",
        categories: ["Chinese", "Dim Sum", "Dumplings"],
        location: "123 Chinatown Rd, San Francisco, CA",
        type: "Mobile",
        coordinates: {
            latitude: 40.761115713616185,
            longitude: -73.97546478711149,
        },
        hours: {
            sunday: "10:00 AM - 09:00 PM",
            monday: "10:00 AM - 09:00 PM",
            tuesday: "10:00 AM - 09:00 PM",
            wednesday: "10:00 AM - 09:00 PM",
            thursday: "10:00 AM - 09:00 PM",
            friday: "10:00 AM - 10:00 PM",
            saturday: "10:00 AM - 10:00 PM",
        },
        rating: 4.6,
        reviewCount: 290,
        contact: {
            email: "dimsumcart@foodtruck.com",
            social: {
                instagram: "@dimsumcart",
                facebook: "@dimsumcart",
                twitter: "@dimsumcart",
            },
        },
        isOpen: true,
        imageUrl:
            "https://live.staticflickr.com/701/20961727134_062f7cbd6d_b.jpg",
        images: [
            "https://i.pinimg.com/originals/96/a6/f2/96a6f2d72e7348cdafda1d21bdde2043.jpg",
            "https://th.bing.com/th/id/R.bb6f128a603b39d2b6c4e3cd7e0c9e70?rik=n0utIsUyRGC5aQ&riu=http%3a%2f%2ffarm5.static.flickr.com%2f4066%2f4383457958_1ebcb5abda.jpg&ehk=fOKi6u1a%2fhwsA%2bgbav3NGjk6%2brwrae72m53U9ggXc3w%3d&risl=&pid=ImgRaw&r=0",
            "https://dailytrojan.com/wp-content/uploads/2010/03/Dim-sum-truck-1.jpg",
        ],
    },
    {
        id: "10",
        name: "Pasta on the Go",
        categories: ["Italian", "Pasta"],
        location: "321 Spaghetti Ln, Los Angeles, CA",
        type: "Mobile",
        coordinates: {
            latitude: 40.76638746545183,
            longitude: -73.99599636395169,
        },
        hours: {
            sunday: "11:00 AM - 08:00 PM",
            monday: "11:00 AM - 08:00 PM",
            tuesday: "11:00 AM - 08:00 PM",
            wednesday: "11:00 AM - 08:00 PM",
            thursday: "11:00 AM - 08:00 PM",
            friday: "11:00 AM - 09:00 PM",
            saturday: "11:00 AM - 09:00 PM",
        },
        rating: 4.8,
        reviewCount: 370,
        contact: {
            email: "pastaonthego@foodtruck.com",
            social: {
                instagram: "@pastaonthego",
                facebook: "@pastaonthego",
                twitter: "@pastaonthego",
            },
        },
        isOpen: true,
        imageUrl:
            "https://bestfoodtrucks.mo.cloudinary.net/https://bft-production.storage.googleapis.com/resources/trucks/2810/images/original/pasta-on-the-go-2810.jpg?1630070856&tx=f_auto,c_limit,g_center,w_3840,q_auto&resource_type=image",
        images: [
            "https://www.arizonafoodtrucks.com/wp-content/uploads/2022/01/174087927_1912739438896327_6914361191601118463_n.jpg",
            "https://th.bing.com/th/id/OIP.MiAGrYafshORM2n_HLu4swHaHa?rs=1&pid=ImgDetMain",
            "https://photos.roaminghunger.com/1200x/c6e30f1f-dab3-4a13-9de8-24dc27b0f8dd.jpg",
        ],
    },
];

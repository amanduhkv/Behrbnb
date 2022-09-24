'use strict';

const { User, Spot } = require('../models');

const validSpots = [
  {
    ownerId: 1,
    address: "123 Polar Bear Way",
    city: "Arctic",
    state: "Circle",
    country: "United States of America",
    lat: 37.7331,
    lng: 122.5052,
    name: "Ursus maritimus",
    description: "Place where presents are created. The polar bear is a hypercarnivorous bear whose native range lies largely within the Arctic Circle, encompassing the Arctic Ocean, its surrounding seas and surrounding land masses.",
    price: 123,
  },
  {
    ownerId: 2,
    address: "456 Brown Bear Row",
    city: "Big Sur",
    state: "California",
    country: "United States of America",
    lat: 37.7331,
    lng: 122.5052,
    name: "Ursus arctos",
    description: "The brown bear is a large bear species found across Eurasia and North America. In North America, the populations of brown bears are called grizzly bears, while the subspecies that inhabits the Kodiak Islands of Alaska is known as the Kodiak bear.",
    price: 456,
  },
  {
    ownerId: 3,
    address: "567 Panda Place",
    city: "Chengdu",
    state: "Sichuan",
    country: "China",
    lat: 37.7331,
    lng: 122.5052,
    name: "Ailuropoda melanoleuca",
    description: "The giant panda, also known as the panda bear, is a bear species endemic to China. It is characterised by its bold black-and-white coat and rotund body. 'Giant panda' is sometimes used to distinguish it from the red panda, a neighboring musteloid.",
    price: 567,
  },
  {
    ownerId: 1,
    address: "789 Sloth Bear Street",
    city: "Caracas",
    state: "California",
    country: "Venezuela",
    lat: 37.7331,
    lng: 122.5052,
    name: "Bradypus tridactylus",
    description: "Sloths? Here? Possibly. Noted for their slowness of movement, they spend most of their lives hanging upside down in the trees of the tropical rainforests of South America and Central America.",
    price: 789,
  },
  {
    ownerId: 2,
    address: "42 Wallaby Way",
    city: "Sydney",
    state: "New South Wales",
    country: "Australia",
    lat: 37.7331,
    lng: 122.5052,
    name: "SF Zoo",
    description: "Place where Nemo is. It tells the story of an overprotective clownfish named Marlin who, along with a regal blue tang named Dory, searches for his missing son Nemo.",
    price: 1010,
  },
  {
    ownerId: 3,
    address: "1111 Salmon Row",
    city: "Maui",
    state: "Hawaii",
    country: "United States of America",
    lat: 37.7331,
    lng: 122.5052,
    name: "Salmonidae",
    description: "Yum. Salmon is the common name for several species of ray-finned fish in the family Salmonidae, native to tributaries of the North Atlantic and Pacific Ocean.",
    price: 1212,
  },
  {
    ownerId: 4,
    address: "777 Disney Row",
    city: "Anaheim",
    state: "California",
    country: "United States of America",
    lat: 37.7331,
    lng: 122.5052,
    name: "DeveloperLand",
    description: "Place where web developers have fun. Developerland is a theme park in Anaheim, California, which opened in 1955.",
    price: 777,
  },
  {
    ownerId: 5,
    address: "8888 Koala Creek",
    city: "Eucalyptus",
    state: "Woodland",
    country: "United States of America",
    lat: 37.7331,
    lng: 122.5052,
    name: "Phascolarctos cinereus",
    description: "Koalty kare. Living in trees and being wedged between rough branches requires a lot of support! Koalas survive on a diet of eucalyptus leaves and can eat up to a kilogram a day!",
    price: 8888,
  },
  {
    ownerId: 1,
    address: "987 Red Panda Place",
    city: "San Francisco",
    state: "California",
    country: "United States of America",
    lat: 37.7331,
    lng: 122.5052,
    name: "Ailurus fulgens",
    description: "Place where traditions are kept. I've never met nobody like you. Had friends and I've had buddies, it's true. But they don't turn my tummy the way you do. I've never met nobody like you.",
    price: 987,
  },
  {
    ownerId: 2,
    address: "2432 Quokka Way",
    city: "Rotto",
    state: "Island",
    country: "Australia",
    lat: 37.7331,
    lng: 122.5052,
    name: "Setonix brachyurus",
    description: "Place where smiles stay. The quokka, also known as the short-tailed scrub wallaby, is a small macropod about the size of a domestic cat. Like other marsupials in the macropod family, the quokka is herbivorous and mainly nocturnal.",
    price: 2250,
  },
  {
    ownerId: 3,
    address: "2200 Cabybara Court",
    city: "Guayana City",
    state: "Bolivar",
    country: "Venezuela",
    lat: 37.7331,
    lng: 122.5052,
    name: "Hydrochoerus hydrochaeris",
    description: "Place where ducks hang. Like beavers, capybaras are strong swimmers. Their pig-shaped bodies are adapted for life in bodies of water. Their faces remain exposed and alert when most of their body is submerged underwater.",
    price: 2200,
  },
  {
    ownerId: 4,
    address: "3450 Prairie Dog Park",
    city: "San Francisco",
    state: "California",
    country: "United States of America",
    lat: 37.7331,
    lng: 122.5052,
    name: "Cynomys socialis",
    description: "Prairie dogs are highly social, living in large groups called 'towns'. They co-operate to share food, protect their burrow and often groom each other. When group members meet each other they give them a prairie dog kiss, or nuzzle.",
    price: 200,
  },
  {
    ownerId: 1,
    address: "1234 Under the Sea",
    city: "Who",
    state: "Lives",
    country: "In a Pineapple",
    lat: 37.7645358,
    lng: -122.4730327,
    name: "Patrick's Rock",
    description: "We should take Bikini Bottom, and push it somewhere else! Is mayonnaise an instrument? I wumbo, you wumbo, he she we wumbo.",
    price: 10,
  },
  {
    ownerId: 2,
    address: "123 Eeyore Lane",
    city: "Hundred",
    state: "Acre",
    country: "Woods",
    lat: 37.7645358,
    lng: -122.4730327,
    name: "Eeyore's Hut",
    description: "The nicest thing about the rain is that it always stops. Eventually. They're funny things, Accidents. You never have them till you're having them. It's not much of a tail, but I'm sort of attached to it. Days. Weeks. Months. Who knows?",
    price: 789,
  },
  {
    ownerId: 5,
    address: "100 Aker Wood West",
    city: "Hundred",
    state: "Acre",
    country: "Woods",
    lat: 37.7331,
    lng: 122.5052,
    name: "Oh, bother",
    description: "Got a hankering for some honey. It is more fun to talk with someone who doesn't use long, difficult words but rather short, easy words like 'What about lunch?'. When all else fails, take a nap.",
    price: 75,
  },
  // {
  //   ownerId: 1,
  //   address: "7800 Kanga Court",
  //   city: "Wallaby",
  //   state: "California",
  //   country: "Australia",
  //   lat: 37.7331,
  //   lng: 122.5052,
  //   name: "SF Zoo",
  //   description: "Said a hip-hop, a hippity-hop. Kangaroos are large marsupials that are found only in Australia. They are identified by their muscular tails, strong back legs, large feet, short fur and long, pointed ears. Like all marsupials, a sub-type of mammal, females have pouches that contain mammary glands, where their young live until they are old enough to emerge.",
  //   price: 745,
  // },
  // {
  //   ownerId: 5,
  //   address: "7243 Lemur Lane",
  //   city: "Antananarivo",
  //   state: "Island",
  //   country: "Madagascar",
  //   lat: 37.7331,
  //   lng: 122.5052,
  //   name: "Lemuroidea",
  //   description: "Lemurs are wet-nosed mammals of the superfamily Lemuroidea, divided into 8 families and consisting of 15 genera and around 100 existing species. They are endemic to the island of Madagascar. Most existing lemurs are small, have a pointed snout, large eyes, and a long tail.",
  //   price: 745,
  // },
  // {
  //   ownerId: 2,
  //   address: "234 Yoohoo Street",
  //   city: "Hundred",
  //   state: "Acre",
  //   country: "Woods",
  //   lat: 37.7645358,
  //   lng: -122.4730327,
  //   name: "Tigger's Tree",
  //   description: "The wonderful thing about Tiggers Is Tiggers are wonderful things Their tops are made out of rubber Their bottoms are made out of springs They're bouncy, trouncy, flouncy, pouncy fun, fun, fun, fun, fun But the most wonderful thing about Tiggers is I'm the only one Tiggers are cuddly fellas Tiggers are awfully sweet Everyone else is jealous That's why I repeat and repeat The wonderful thing about Tiggers Is Tiggers are marvelous chaps They're loaded with vim and with vigor They love to leap in your laps They're jumpy, bumpy, clumpy, pumpy fun, fun, fun, fun, fun But the most wonderful thing about Tiggers is I'm the only one I'm the only… one.",
  //   price: 888,
  // },
]

module.exports = {
  async up (queryInterface, Sequelize) {
      await Spot.bulkCreate(validSpots, {
        validate: true
      });
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    for (let spotInfo of validSpots) {
      await Spot.destroy({
        where: spotInfo
      });
    }
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};

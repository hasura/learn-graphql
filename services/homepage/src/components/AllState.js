const githubBrands = 'https://graphql-engine-cdn.hasura.io/learn-hasura/assets/homepage/github-brands-white.svg';
const twitterBrands = 'https://graphql-engine-cdn.hasura.io/learn-hasura/assets/homepage/twitter-brands-white.svg';
const discordBrands = 'https://graphql-engine-cdn.hasura.io/learn-hasura/assets/homepage/discord-brands-white.svg';
const facebookBrands = 'https://graphql-engine-cdn.hasura.io/learn-hasura/assets/homepage/facebook-brands-white.svg';
const instagramBrands = 'https://graphql-engine-cdn.hasura.io/learn-hasura/assets/homepage/instagram-brands-white.svg';
const youtubeBrands = 'https://graphql-engine-cdn.hasura.io/learn-hasura/assets/homepage/youtube-brands-white.svg';
const linkedinBrands = 'https://graphql-engine-cdn.hasura.io/learn-hasura/assets/homepage/linkedin-brands-white.svg';

const reactGreen = require('../images/react-green.svg');
const reactWhite = require('../images/react-white.svg');
const vueGreen = require('../images/vue-green.svg');
const vueWhite = require('../images/vue-white.svg');
const angularGreen = require('../images/angular-green.svg');
const angularWhite = require('../images/angular-white.svg');
const typescriptGreen = require('../images/typescript-green.svg');
const typescriptWhite = require('../images/typescript-white.svg');
const elmGreen = require('../images/elm-green.svg');
const elmWhite = require('../images/elm-white.svg');
const reasonmlGreen = require('../images/reasonml-green.svg');
const reasonmlWhite = require('../images/reasonml-white.svg');
const hasuraGreen = require('../images/hasura-green.svg');
const hasuraWhite = require('../images/hasura-white.svg');
const postgresGreen = require('../images/postgres-green.svg');
const postgresWhite = require('../images/postgres-white.svg');
const flutterGreen = require('../images/flutter-green.svg');
const flutterWhite = require('../images/flutter-white.svg');
const iosGreen = require('../images/ios-green.svg');
const iosWhite = require('../images/ios-white.svg');
const androidGreen = require('../images/android-green.svg');
const androidWhite = require('../images/android-white.svg');
const frontendTutorial = [
  {
    name: 'React',
    url: 'https://hasura.io/learn/graphql/react',
    comingSoon: false,
    baseImgSrc: reactWhite,
    hoverImgSrc: reactGreen,
  },
  {
    name: 'Vue',
    url: 'https://hasura.io/learn/graphql/vue',
    comingSoon: false,
    baseImgSrc: vueWhite,
    hoverImgSrc: vueGreen,
  },
  {
    name: 'Angular',
    url: 'https://hasura.io/learn/graphql/angular-apollo',
    comingSoon: false,
    baseImgSrc: angularWhite,
    hoverImgSrc: angularGreen,
  },
  {
    name: 'Typescript',
    url: 'https://hasura.io/learn/graphql/typescript-react-apollo',
    comingSoon: false,
    baseImgSrc: typescriptWhite,
    hoverImgSrc: typescriptGreen,
  },
  {
    name: 'Elm',
    url: 'https://hasura.io/learn/graphql/elm-graphql',
    comingSoon: false,
    baseImgSrc: elmWhite,
    hoverImgSrc: elmGreen,
  },
  {
    name: 'ReasonML',
    url: 'https://hasura.io/learn/graphql/reason-react-apollo',
    comingSoon: false,
    baseImgSrc: reasonmlWhite,
    hoverImgSrc: reasonmlGreen,
  },
]
const backendTutorial = [
  {
    name: 'Hasura',
    url: 'https://hasura.io/learn/graphql/hasura',
    comingSoon: false,
    baseImgSrc: hasuraWhite,
    hoverImgSrc: hasuraGreen,
  },
  {
    name: 'Postgres',
    url: '',
    comingSoon: true,
    baseImgSrc: postgresWhite,
    hoverImgSrc: postgresGreen,
  },
]
const mobileTutorial = [
  {
    name: 'React Native',
    url: 'https://hasura.io/learn/graphql/react-native',
    comingSoon: false,
    baseImgSrc: reactWhite,
    hoverImgSrc: reactGreen,
  },
  {
    name: 'iOS',
    url: 'https://hasura.io/learn/graphql/ios',
    comingSoon: false,
    baseImgSrc: iosWhite,
    hoverImgSrc: iosGreen,
  },
  {
    name: 'Android',
    url: 'https://hasura.io/learn/graphql/android',
    comingSoon: false,
    baseImgSrc: androidWhite,
    hoverImgSrc: androidGreen,
  },
  {
    name: 'Flutter',
    url: 'https://hasura.io/learn/graphql/flutter-graphql',
    comingSoon: false,
    baseImgSrc: flutterWhite,
    hoverImgSrc: flutterGreen,
  },
]
const learnFrontend = [
  {
    list: 'GraphQL vs REST',
  },
  {
    list: 'GraphQL Queries, Mutations, Subscriptions',
  },
  {
    list: 'Setting up a GraphQL Client with Apollo',
  },
  {
    list: 'Integrating GraphQL Queries in the app',
  },
  {
    list: 'Integrating GraphQL Mutations with Query Variables',
  },
  {
    list: 'Integrating Mutations to update, delete and bulk delete',
  },
  {
    list: 'Managing Local Cache after a GraphQL Mutation',
  },
  {
    list: 'Optimistic UI updates for responsive user experience',
  },
  {
    list: 'Using Subscriptions',
  },
  {
    list: 'Realtime feed with notifications',
  },
]
const learnBackend = [
  {
    list: 'Hasura Basics',
  },
  {
    list: 'Postgres Data Modelling',
  },
  {
    list: 'Authorization',
  },
  {
    list: 'Authentication',
  },
  {
    list: 'Custom business logic',
  },
  {
    list: 'Remote Schemas, Event Triggers',
  },
]
const socialItems = [
  {
    socialLink: 'https://github.com/hasura/graphql-engine',
    altText: 'Github',
    imageSrc: githubBrands,
  },
  {
    socialLink: 'https://twitter.com/hasurahq',
    altText: 'Titter',
    imageSrc: twitterBrands,
  },
  {
    socialLink: 'https://discordapp.com/invite/hasura',
    altText: 'Discord',
    imageSrc: discordBrands,
  },
  {
    socialLink: 'https://www.facebook.com/HasuraHQ',
    altText: 'Facebook',
    imageSrc: facebookBrands,
  },
  {
    socialLink: 'https://www.instagram.com/hasurahq/?hl=en',
    altText: 'Instagram',
    imageSrc: instagramBrands,
  },
  {
    socialLink: 'https://www.youtube.com/channel/UCZo1ciR8pZvdD3Wxp9aSNhQ',
    altText: 'Youtube',
    imageSrc: youtubeBrands,
  },
  {
    socialLink: 'https://www.linkedin.com/company/hasura',
    altText: 'Linkedin',
    imageSrc: linkedinBrands,
  },
]
export {frontendTutorial, backendTutorial, mobileTutorial, learnFrontend, learnBackend, socialItems}

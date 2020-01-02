const githubBrands = 'https://graphql-engine-cdn.hasura.io/learn-hasura/assets/homepage/github-brands-white.svg';
const twitterBrands = 'https://graphql-engine-cdn.hasura.io/learn-hasura/assets/homepage/twitter-brands-white.svg';
const discordBrands = 'https://graphql-engine-cdn.hasura.io/learn-hasura/assets/homepage/discord-brands-white.svg';
const facebookBrands = 'https://graphql-engine-cdn.hasura.io/learn-hasura/assets/homepage/facebook-brands-white.svg';
const instagramBrands = 'https://graphql-engine-cdn.hasura.io/learn-hasura/assets/homepage/instagram-brands-white.svg';
const youtubeBrands = 'https://graphql-engine-cdn.hasura.io/learn-hasura/assets/homepage/youtube-brands-white.svg';
const linkedinBrands = 'https://graphql-engine-cdn.hasura.io/learn-hasura/assets/homepage/linkedin-brands-white.svg';

const frontendTutorial = [
  {
    name: 'React',
    url: 'https://learn.hasura.io/graphql/react',
    comingSoon: false,
    bgClassName: 'reactBg',
    disableBgClassName: 'reactDisableBg',
  },
  {
    name: 'Vue',
    url: 'https://learn.hasura.io/graphql/vue',
    comingSoon: false,
    bgClassName: 'vueBg',
    disableBgClassName: 'vueDisableBg',
  },
  {
    name: 'Angular',
    url: 'https://learn.hasura.io/graphql/angular-apollo',
    comingSoon: false,
    bgClassName: 'angularBg',
    disableBgClassName: 'angularDisableBg',
  },
  {
    name: 'Typescript',
    url: 'https://learn.hasura.io/graphql/typescript-react-apollo',
    comingSoon: false,
    bgClassName: 'typescriptBg',
    disableBgClassName: 'typescriptDisableBg',
  },
  {
    name: 'Elm',
    url: 'https://learn.hasura.io/graphql/elm-graphql',
    comingSoon: false,
    bgClassName: 'elmBg',
    disableBgClassName: 'elmDisableBg',
  },
  {
    name: 'ReasonML',
    url: 'https://learn.hasura.io/graphql/reason-react-apollo',
    comingSoon: false,
    bgClassName: 'reBg',
    disableBgClassName: 'reDisableBg',
  },
]
const backendTutorial = [
  {
    name: 'Hasura',
    url: 'https://learn.hasura.io/graphql/hasura',
    comingSoon: false,
    bgClassName: 'hasuraBg',
    disableBgClassName: 'hasuraDisableBg',
  },
  {
    name: 'Postgres',
    url: '',
    comingSoon: true,
    bgClassName: 'postgresBg',
    disableBgClassName: 'postgresDisableBg',
  },
]
const mobileTutorial = [
  {
    name: 'React Native',
    url: 'https://learn.hasura.io/graphql/react-native',
    comingSoon: false,
    bgClassName: 'reactBg',
    disableBgClassName: 'reactDisableBg',
  },
  {
    name: 'iOS',
    url: 'https://learn.hasura.io/graphql/ios',
    comingSoon: false,
    bgClassName: 'iosBg',
    disableBgClassName: 'iosDisableBg',
  },
  {
    name: 'Android',
    url: 'https://learn.hasura.io/graphql/android',
    comingSoon: false,
    bgClassName: 'androidBg',
    disableBgClassName: 'androidDisableBg',
  },
  {
    name: 'Flutter',
    url: 'https://learn.hasura.io/graphql/flutter-graphql',
    comingSoon: false,
    bgClassName: 'flutterBg',
    disableBgClassName: 'flutterDisableBg',
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

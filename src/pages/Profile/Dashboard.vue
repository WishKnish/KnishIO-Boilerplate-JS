<template>
  <section>
    <wk-page-content
      :title="$t( 'pages.profile.dashboard.header.title' )"
      :subtitle="$t( 'pages.profile.dashboard.header.subtitle' )"
      icon="fal fa-tachometer"
    >
      <q-separator />
    </wk-page-content>
    <wk-link-grid
      :links="links"
    />
  </section>
</template>

<style>
</style>

<script>
import WkPageContent from 'components/layout/page/WkPageContent';
import vuex from 'src/mixins/vuex';
import WkLinkGrid from 'components/grids/WkLinkGrid';

export default {
  components: {
    WkLinkGrid,
    WkPageContent,
  },
  mixins: [
    vuex,
  ],
  data () {
    return {
      links: [
        {
          id: '00mynycha',
          title: 'MyNYCHA',
          description: 'Access NYCHA resources at your fingertips via an easy-to-use online portal for residents.',
          cover: 'statics/nycha/mynycha_app_480x480.png',
          url: 'https://www1.nyc.gov/site/nycha/mynycha/mynycha-landing.page',
        },
        {
          id: '01opportunity',
          title: 'OpportunityNYCHA',
          description: 'NYCHA’s Office of Resident Economic Empowerment & Sustainability (REES) supports residents to increase their income and assets.',
          cover: 'statics/nycha/nychalogo.png',
          url: 'http://opportunitynycha.org/',
        },
        {
          id: '02journal',
          title: 'The NYCHA Journal',
          description: 'Stories and information about new programs, resident accomplishments, upcoming events, and career, health, and educational opportunities.',
          cover: 'statics/nycha/featured-in-the-nycha-journal-1-638.jpg',
          url: 'https://nychajournal.nyc/',
        },
        {
          id: '03vote',
          title: 'Register to Vote',
          description: 'Check your voting status or register to vote.',
          cover: 'statics/nycha/civic-toolkit-register-to-vote.jpg',
          url: 'https://vote.nyc/',
        },
        {
          id: '04laws',
          title: 'Laws of the City of New York',
          description: 'Search New York City Charter, Administrative Code and Rules.',
          cover: 'statics/nycha/law_gavel.jpg',
          url: 'https://codelibrary.amlegal.com/codes/newyorkcity/latest/overview',
        },
        {
          id: '05poll',
          title: 'Poll Site Locator',
          description: 'Find your nearest polling center.',
          cover: 'statics/nycha/civic-toolkit-poll-site-locator.png',
          url: 'https://findmypollsite.vote.nyc/',
        },
        {
          id: '06board',
          title: 'Find Your Community Board',
          description: 'Get involved with your local community board and play an active role in shaping your neighborhood.',
          cover: 'statics/nycha/NYC-5boros.png',
          url: 'https://www1.nyc.gov/site/cau/community-boards/community-boards.page',
        },
        {
          id: '07notify',
          title: 'Notify NYC',
          description: 'Sign up to receive alerts from the City\'s official source for information about emergencies.',
          cover: 'statics/nycha/civic-toolkit-notify-nyc.png',
          url: 'https://a858-nycnotify.nyc.gov/notifynyc',
        },
        {
          id: '08ready',
          title: 'Ready New York',
          description: 'Develop a disaster plan for you and your family.',
          cover: 'statics/nycha/OEM_ReadyNY_2.PNG',
          url: 'https://www1.nyc.gov/site/em/ready/ready-new-york.page',
        },
        {
          id: '09police',
          title: 'Locate Police Precincts',
          description: 'Find your nearest police precinct based on your borough and home address.',
          cover: 'statics/nycha/MobileApp_NYPD.jpg',
          url: 'https://www1.nyc.gov/site/nypd/bureaus/patrol/find-your-precinct.page',
        },
        {
          id: '10fire',
          title: 'Locate Fire Houses',
          description: 'Learn more about the FDNY and find the nearest fire house in your neighborhood.',
          cover: 'statics/nycha/FDNY_FireSafetyEducation.jpg',
          url: 'https://www1.nyc.gov/site/fdny/index.page',
        },
        {
          id: '11subways',
          title: 'Subways, Buses, Trains',
          description: 'Get the latest on MTA subway, bus and train schedules and changes.',
          cover: 'statics/nycha/civic-toolkit-mta_white.png',
          url: 'https://new.mta.info/',
        },
        {
          id: '12electricity',
          title: 'Your Electricity',
          description: 'Report an electric service problem or check restoration status.',
          cover: 'statics/nycha/civic-toolkit-coned.jpg',
          url: 'https://www.coned.com/en',
        },
        {
          id: '13school',
          title: 'School Registration',
          description: 'Find your nearest public school though the Department of Education’s website.',
          cover: 'statics/nycha/DOE_prek1.png',
          url: 'https://www.schools.nyc.gov/enrollment/enrollment-help',
        },
        {
          id: '14health',
          title: 'Locate Health Facilities',
          description: 'Find the nearest hospitals and medical centers.',
          cover: 'statics/nycha/HHC_AffordableHealthcare.jpg',
          url: 'https://www.nychealthandhospitals.org/',
        },
        {
          id: '15garbage',
          title: 'Garbage and Recycling Collection',
          description: 'Look up your garbage collection schedule and learn about recycling in NYC.',
          cover: 'statics/nycha/DSNY_SanitaionLogo_460.png',
          url: 'https://www1.nyc.gov/assets/dsny/site/collectionSchedule',
        },
        {
          id: '16parks',
          title: 'Locate Public Parks',
          description: 'Discover parks near you by location, open facilities, and recreational interests.',
          cover: 'statics/nycha/DPR_ParksAfterschool.jpg',
          url: 'https://www.nycgovparks.org/parks',
        },
        {
          id: '17311',
          title: '311 Mobile App',
          description: 'Download the 311 mobile app to get government information and services on-the-go.',
          cover: 'statics/nycha/civic-toolkit-311-app.png',
          url: 'https://www1.nyc.gov/connect/mobile-applications.page',
        },
      ],
    };
  },
  computed: {},
  methods: {},
};
</script>

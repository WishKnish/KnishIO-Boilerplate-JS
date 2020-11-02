import bigInt from 'big-integer';
import { chunkSubstr, } from '@wishknish/knishio-client-js/src/libraries/strings';

if ( !String.prototype.trim ) {
  String.prototype.trim = function () {
    return this.replace( /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '' );
  };
}

/**
 * Truncates the middle of a string, replacing it with a separator
 *
 * @param content
 * @param limit
 * @param separator
 * @returns {string}
 */
export function truncateMiddle ( content, limit = 6, separator = '…' ) {
  if ( !content )
    return '';

  content = content.trim();
  const chunks = chunkSubstr( content, Math.ceil( content.length / 2 ) );
  return String( chunks[ 0 ] ).substring( 0, Math.ceil( limit / 2 ) )
    + separator
    + String( chunks[ 1 ] ).substring( String( chunks[ 1 ] ).length - Math.ceil( limit / 2 ) );
}

/**
 * Formats a number for human readability
 *
 * @param x
 * @returns {string}
 */
export function numberWithCommas ( x ) {
  return x.toString().replace( /\B(?=(\d{3})+(?!\d))/g, ',' );
}

/**
 * Formats an amount for human readability
 *
 * @param number
 * @param threshold
 * @returns {string}
 */
export function humanNumber ( number, threshold = 1000 ) {
  const units = [ '', 'K', 'M', 'B', 'T', 'e15', 'e18', 'e21', 'e24', 'e27', 'e30', 'e33', 'e36', 'e39', 'e42', 'e45', ];

  let u = 0;
  number = bigInt( number );

  if ( threshold > number ) {
    return numberWithCommas( number.toString( 10 ) );
  }

  while ( number >= threshold && u < units.length - 1 ) {
    number = number.divide( 1000 );
    ++u;
  }

  return `${ numberWithCommas( number.toString( 10 ) ) } ${ units[ u ] }`;
}

export function decycle ( obj, stack = [] ) {
  if ( !obj || typeof obj !== 'object' )
    return obj;

  if ( stack.includes( obj ) )
    return null;

  let s = stack.concat( [ obj, ] );

  return Array.isArray( obj )
    ? obj.map( x => decycle( x, s ) )
    : Object.fromEntries(
      Object.entries( obj )
        .map( ( [ k, v, ] ) => [ k, decycle( v, s ), ] ) );
}

/**
 * Generates a random name
 *
 * @returns {string}
 */
export function randomName () {
  const name1 = [
    'Abandoned',
    'Able',
    'Absolute',
    'Adorable',
    'Adventurous',
    'Academic',
    'Acceptable',
    'Acclaimed',
    'Accomplished',
    'Accurate',
    'Aching',
    'Acidic',
    'Acrobatic',
    'Active',
    'Actual',
    'Adept',
    'Admirable',
    'Admired',
    'Adolescent',
    'Adorable',
    'Adored',
    'Advanced',
    'Afraid',
    'Affectionate',
    'Aged',
    'Aggravating',
    'Aggressive',
    'Agile',
    'Agitated',
    'Agonizing',
    'Agreeable',
    'Ajar',
    'Alarmed',
    'Alarming',
    'Alert',
    'Alienated',
    'Alive',
    'Altruistic',
    'Amazing',
    'Ambitious',
    'Ample',
    'Amused',
    'Amusing',
    'Anchored',
    'Ancient',
    'Angelic',
    'Angry',
    'Anguished',
    'Animated',
    'Annual',
    'Another',
    'Antique',
    'Anxious',
    'Apprehensive',
    'Appropriate',
    'Apt',
    'Arctic',
    'Arid',
    'Aromatic',
    'Artistic',
    'Ashamed',
    'Assured',
    'Astonishing',
    'Athletic',
    'Attached',
    'Attentive',
    'Attractive',
    'Austere',
    'Authentic',
    'Authorized',
    'Automatic',
    'Avaricious',
    'Average',
    'Aware',
    'Awesome',
    'Awful',
    'Awkward',
    'Babyish',
    'Bad',
    'Baggy',
    'Bare',
    'Barren',
    'Basic',
    'Beautiful',
    'Belated',
    'Beloved',
    'Beneficial',
    'Better',
    'Best',
    'Bewitched',
    'Big',
    'Big-Hearted',
    'Biodegradable',
    'Bite-Sized',
    'Bitter',
    'Black',
    'Black-And-White',
    'Bland',
    'Blank',
    'Blaring',
    'Bleak',
    'Blind',
    'Blissful',
    'Blond',
    'Blue',
    'Blushing',
    'Bogus',
    'Boiling',
    'Bold',
    'Bony',
    'Boring',
    'Bossy',
    'Bouncy',
    'Bountiful',
    'Bowed',
    'Brave',
    'Breakable',
    'Brief',
    'Bright',
    'Brilliant',
    'Brisk',
    'Broken',
    'Bronze',
    'Brown',
    'Bruised',
    'Bubbly',
    'Bulky',
    'Bumpy',
    'Buoyant',
    'Burdensome',
    'Burly',
    'Bustling',
    'Busy',
    'Buttery',
    'Buzzing',
    'Calculating',
    'Calm',
    'Candid',
    'Canine',
    'Capital',
    'Carefree',
    'Careful',
    'Careless',
    'Caring',
    'Cautious',
    'Cavernous',
    'Celebrated',
    'Charming',
    'Cheap',
    'Cheerful',
    'Cheery',
    'Chief',
    'Chilly',
    'Chubby',
    'Circular',
    'Classic',
    'Clean',
    'Clear',
    'Clear-Cut',
    'Clever',
    'Close',
    'Closed',
    'Cloudy',
    'Clueless',
    'Clumsy',
    'Cluttered',
    'Coarse',
    'Cold',
    'Colorful',
    'Colorless',
    'Colossal',
    'Comfortable',
    'Common',
    'Compassionate',
    'Competent',
    'Complete',
    'Complex',
    'Complicated',
    'Composed',
    'Concerned',
    'Concrete',
    'Confused',
    'Conscious',
    'Considerate',
    'Constant',
    'Content',
    'Conventional',
    'Cooked',
    'Cool',
    'Cooperative',
    'Coordinated',
    'Corny',
    'Corrupt',
    'Costly',
    'Courageous',
    'Courteous',
    'Crafty',
    'Crazy',
    'Creamy',
    'Creative',
    'Creepy',
    'Criminal',
    'Crisp',
    'Critical',
    'Crooked',
    'Crowded',
    'Cruel',
    'Crushing',
    'Cuddly',
    'Cultivated',
    'Cultured',
    'Cumbersome',
    'Curly',
    'Curvy',
    'Cute',
    'Cylindrical',
    'Damaged',
    'Damp',
    'Dangerous',
    'Dapper',
    'Daring',
    'Darling',
    'Dark',
    'Dazzling',
    'Dead',
    'Deadly',
    'Deafening',
    'Dear',
    'Dearest',
    'Decent',
    'Decimal',
    'Decisive',
    'Deep',
    'Defenseless',
    'Defensive',
    'Defiant',
    'Deficient',
    'Definite',
    'Definitive',
    'Delayed',
    'Delectable',
    'Delicious',
    'Delightful',
    'Delirious',
    'Demanding',
    'Dense',
    'Dependable',
    'Dependent',
    'Descriptive',
    'Deserted',
    'Detailed',
    'Determined',
    'Devoted',
    'Different',
    'Difficult',
    'Digital',
    'Diligent',
    'Dim',
    'Dimpled',
    'Dimwitted',
    'Direct',
    'Disastrous',
    'Discrete',
    'Disfigured',
    'Disgusting',
    'Disloyal',
    'Dismal',
    'Distant',
    'Downright',
    'Dreary',
    'Dirty',
    'Disguised',
    'Dishonest',
    'Dismal',
    'Distant',
    'Distinct',
    'Distorted',
    'Dizzy',
    'Dopey',
    'Doting',
    'Downright',
    'Drab',
    'Drafty',
    'Dramatic',
    'Dreary',
    'Droopy',
    'Dry',
    'Dull',
    'Dutiful',
    'Eager',
    'Earnest',
    'Early',
    'Easy',
    'Easy-Going',
    'Ecstatic',
    'Edible',
    'Educated',
    'Elaborate',
    'Elastic',
    'Elated',
    'Elderly',
    'Electric',
    'Elegant',
    'Elementary',
    'Elliptical',
    'Embarrassed',
    'Embellished',
    'Eminent',
    'Emotional',
    'Empty',
    'Enchanted',
    'Enchanting',
    'Energetic',
    'Enlightened',
    'Enormous',
    'Enraged',
    'Envious',
    'Equatorial',
    'Essential',
    'Esteemed',
    'Ethical',
    'Euphoric',
    'Even',
    'Evergreen',
    'Everlasting',
    'Evil',
    'Exalted',
    'Excellent',
    'Exemplary',
    'Exhausted',
    'Excitable',
    'Excited',
    'Exciting',
    'Exotic',
    'Expensive',
    'Experienced',
    'Expert',
    'Extraneous',
    'Extroverted',
    'Extra-Large',
    'Extra-Small',
    'Fabulous',
    'Failing',
    'Faint',
    'Fair',
    'Faithful',
    'Fake',
    'False',
    'Familiar',
    'Famous',
    'Fancy',
    'Fantastic',
    'Faraway',
    'Far-Flung',
    'Far-Off',
    'Fast',
    'Fat',
    'Fatal',
    'Fatherly',
    'Favorable',
    'Favorite',
    'Fearful',
    'Fearless',
    'Feisty',
    'Feline',
    'Female',
    'Feminine',
    'Fickle',
    'Filthy',
    'Fine',
    'Finished',
    'Firm',
    'First',
    'Firsthand',
    'Fitting',
    'Fixed',
    'Flaky',
    'Flamboyant',
    'Flashy',
    'Flat',
    'Flawed',
    'Flawless',
    'Flickering',
    'Flimsy',
    'Flippant',
    'Flowery',
    'Fluffy',
    'Fluid',
    'Flustered',
    'Focused',
    'Fond',
    'Foolhardy',
    'Foolish',
    'Forceful',
    'Forked',
    'Formal',
    'Forsaken',
    'Forthright',
    'Fortunate',
    'Fragrant',
    'Frail',
    'Frank',
    'Frayed',
    'Free',
    'French',
    'Fresh',
    'Frequent',
    'Friendly',
    'Frightened',
    'Frightening',
    'Frigid',
    'Frilly',
    'Frizzy',
    'Frivolous',
    'Front',
    'Frosty',
    'Frozen',
    'Frugal',
    'Fruitful',
    'Full',
    'Fumbling',
    'Functional',
    'Funny',
    'Fussy',
    'Fuzzy',
    'Gargantuan',
    'Gaseous',
    'Generous',
    'Gentle',
    'Genuine',
    'Giant',
    'Giddy',
    'Gigantic',
    'Gifted',
    'Giving',
    'Glamorous',
    'Glaring',
    'Glass',
    'Gleaming',
    'Gleeful',
    'Glistening',
    'Glittering',
    'Gloomy',
    'Glorious',
    'Glossy',
    'Glum',
    'Golden',
    'Good',
    'Good-Natured',
    'Gorgeous',
    'Graceful',
    'Gracious',
    'Grand',
    'Grandiose',
    'Granular',
    'Grateful',
    'Grave',
    'Gray',
    'Great',
    'Greedy',
    'Green',
    'Gregarious',
    'Grim',
    'Grimy',
    'Gripping',
    'Grizzled',
    'Gross',
    'Grotesque',
    'Grouchy',
    'Grounded',
    'Growing',
    'Growling',
    'Grown',
    'Grubby',
    'Gruesome',
    'Grumpy',
    'Guilty',
    'Gullible',
    'Gummy',
    'Hairy',
    'Handmade',
    'Handsome',
    'Handy',
    'Happy',
    'Happy-Go-Lucky',
    'Hard',
    'Hard-To-Find',
    'Harmful',
    'Harmless',
    'Harmonious',
    'Harsh',
    'Hasty',
    'Hateful',
    'Haunting',
    'Healthy',
    'Heartfelt',
    'Hearty',
    'Heavenly',
    'Heavy',
    'Hefty',
    'Helpful',
    'Helpless',
    'Hidden',
    'Hideous',
    'High',
    'High-Level',
    'Hilarious',
    'Hoarse',
    'Hollow',
    'Homely',
    'Honest',
    'Honorable',
    'Honored',
    'Hopeful',
    'Horrible',
    'Hospitable',
    'Hot',
    'Huge',
    'Humble',
    'Humiliating',
    'Humming',
    'Humongous',
    'Hungry',
    'Hurtful',
    'Husky',
    'Icky',
    'Icy',
    'Ideal',
    'Idealistic',
    'Idle',
    'Idiotic',
    'Idolized',
    'Ignorant',
    'Ill',
    'Illegal',
    'Ill-Fated',
    'Ill-Informed',
    'Illiterate',
    'Illustrious',
    'Imaginary',
    'Imaginative',
    'Immaculate',
    'Immaterial',
    'Immediate',
    'Immense',
    'Impassioned',
    'Impeccable',
    'Impartial',
    'Imperfect',
    'Imperturbable',
    'Impish',
    'Impolite',
    'Important',
    'Impossible',
    'Impractical',
    'Impressionable',
    'Impressive',
    'Improbable',
    'Impure',
    'Inborn',
    'Incomparable',
    'Incompatible',
    'Incomplete',
    'Inconsequential',
    'Incredible',
    'Indelible',
    'Inexperienced',
    'Indolent',
    'Infamous',
    'Infantile',
    'Infatuated',
    'Inferior',
    'Infinite',
    'Informal',
    'Innocent',
    'Insecure',
    'Insidious',
    'Insignificant',
    'Insistent',
    'Instructive',
    'Insubstantial',
    'Intelligent',
    'Intentional',
    'Interesting',
    'Internal',
    'International',
    'Intrepid',
    'Ironclad',
    'Irresponsible',
    'Irritating',
    'Itchy',
    'Jaded',
    'Jagged',
    'Jam-Packed',
    'Jaunty',
    'Jealous',
    'Jittery',
    'Joint',
    'Jolly',
    'Jovial',
    'Joyful',
    'Joyous',
    'Jubilant',
    'Judicious',
    'Juicy',
    'Jumbo',
    'Junior',
    'Jumpy',
    'Juvenile',
    'Kaleidoscopic',
    'Keen',
    'Key',
    'Kind',
    'Kindhearted',
    'Kindly',
    'Klutzy',
    'Knobby',
    'Knotty',
    'Knowledgeable',
    'Knowing',
    'Known',
    'Kooky',
    'Kosher',
    'Lame',
    'Lanky',
    'Large',
    'Last',
    'Lasting',
    'Late',
    'Lavish',
    'Lawful',
    'Lazy',
    'Leading',
    'Lean',
    'Leafy',
    'Legal',
    'Legitimate',
    'Light',
    'Lighthearted',
    'Likable',
    'Likely',
    'Limited',
    'Limp',
    'Limping',
    'Linear',
    'Lined',
    'Liquid',
    'Little',
    'Live',
    'Lively',
    'Livid',
    'Loathsome',
    'Lone',
    'Lonely',
    'Long',
    'Loose',
    'Lopsided',
    'Lost',
    'Loud',
    'Lovable',
    'Lovely',
    'Loving',
    'Low',
    'Loyal',
    'Lucky',
    'Lumbering',
    'Luminous',
    'Lumpy',
    'Lustrous',
    'Luxurious',
    'Mad',
    'Made-Up',
    'Magnificent',
    'Majestic',
    'Major',
    'Male',
    'Mammoth',
    'Married',
    'Marvelous',
    'Masculine',
    'Massive',
    'Mature',
    'Meager',
    'Mealy',
    'Mean',
    'Measly',
    'Meaty',
    'Medical',
    'Mediocre',
    'Medium',
    'Meek',
    'Mellow',
    'Melodic',
    'Memorable',
    'Menacing',
    'Merry',
    'Messy',
    'Metallic',
    'Mild',
    'Milky',
    'Mindless',
    'Miniature',
    'Minor',
    'Minty',
    'Miserable',
    'Miserly',
    'Misguided',
    'Misty',
    'Mixed',
    'Modern',
    'Modest',
    'Moist',
    'Monstrous',
    'Monumental',
    'Moral',
    'Mortified',
    'Motherly',
    'Motionless',
    'Mountainous',
    'Muddy',
    'Muffled',
    'Multicolored',
    'Mundane',
    'Murky',
    'Mushy',
    'Musty',
    'Muted',
    'Mysterious',
    'Naive',
    'Narrow',
    'Nasty',
    'Natural',
    'Naughty',
    'Nautical',
    'Near',
    'Neat',
    'Necessary',
    'Needy',
    'Negative',
    'Neglected',
    'Negligible',
    'Neighboring',
    'Nervous',
    'New',
    'Nice',
    'Nifty',
    'Nimble',
    'Nippy',
    'Nocturnal',
    'Noisy',
    'Nonstop',
    'Normal',
    'Notable',
    'Noted',
    'Noteworthy',
    'Novel',
    'Noxious',
    'Numb',
    'Nutritious',
    'Nutty',
    'Obedient',
    'Obese',
    'Oblong',
    'Oily',
    'Oblong',
    'Obvious',
    'Occasional',
    'Odd',
    'Oddball',
    'Offbeat',
    'Offensive',
    'Official',
    'Old',
    'Old-Fashioned',
    'Optimal',
    'Optimistic',
    'Opulent',
    'Orange',
    'Orderly',
    'Organic',
    'Ornate',
    'Ornery',
    'Ordinary',
    'Original',
    'Outlying',
    'Outgoing',
    'Outlandish',
    'Outrageous',
    'Outstanding',
    'Oval',
    'Overcooked',
    'Overdue',
    'Overjoyed',
    'Overlooked',
    'Palatable',
    'Pale',
    'Paltry',
    'Parallel',
    'Parched',
    'Partial',
    'Passionate',
    'Past',
    'Pastel',
    'Peaceful',
    'Peppery',
    'Perfect',
    'Perfumed',
    'Periodic',
    'Perky',
    'Personal',
    'Pertinent',
    'Pesky',
    'Pessimistic',
    'Petty',
    'Phony',
    'Physical',
    'Piercing',
    'Pink',
    'Pitiful',
    'Plain',
    'Plaintive',
    'Plastic',
    'Playful',
    'Pleasant',
    'Pleased',
    'Pleasing',
    'Plump',
    'Plush',
    'Polished',
    'Polite',
    'Political',
    'Pointed',
    'Pointless',
    'Poised',
    'Poor',
    'Popular',
    'Portly',
    'Posh',
    'Positive',
    'Possible',
    'Potable',
    'Powerful',
    'Powerless',
    'Practical',
    'Precious',
    'Prestigious',
    'Pretty',
    'Precious',
    'Previous',
    'Pricey',
    'Prickly',
    'Primary',
    'Prime',
    'Pristine',
    'Private',
    'Prize',
    'Probable',
    'Productive',
    'Profitable',
    'Profuse',
    'Proper',
    'Proud',
    'Prudent',
    'Punctual',
    'Pungent',
    'Puny',
    'Pure',
    'Purple',
    'Pushy',
    'Putrid',
    'Puzzled',
    'Puzzling',
    'Quaint',
    'Qualified',
    'Quarrelsome',
    'Quarterly',
    'Queasy',
    'Querulous',
    'Questionable',
    'Quick',
    'Quick-Witted',
    'Quiet',
    'Quintessential',
    'Quirky',
    'Quixotic',
    'Quizzical',
    'Radiant',
    'Ragged',
    'Rapid',
    'Rare',
    'Rash',
    'Raw',
    'Recent',
    'Reckless',
    'Rectangular',
    'Ready',
    'Real',
    'Realistic',
    'Reasonable',
    'Red',
    'Reflecting',
    'Regal',
    'Regular',
    'Reliable',
    'Relieved',
    'Remarkable',
    'Remorseful',
    'Remote',
    'Repentant',
    'Required',
    'Respectful',
    'Responsible',
    'Repulsive',
    'Revolving',
    'Rewarding',
    'Rich',
    'Rigid',
    'Right',
    'Ringed',
    'Ripe',
    'Roasted',
    'Robust',
    'Rosy',
    'Rotating',
    'Rotten',
    'Rough',
    'Round',
    'Rowdy',
    'Royal',
    'Rubbery',
    'Rundown',
    'Ruddy',
    'Rude',
    'Runny',
    'Rural',
    'Rusty',
    'Sad',
    'Safe',
    'Salty',
    'Same',
    'Sandy',
    'Sane',
    'Sarcastic',
    'Sardonic',
    'Satisfied',
    'Scaly',
    'Scarce',
    'Scared',
    'Scary',
    'Scented',
    'Scholarly',
    'Scientific',
    'Scornful',
    'Scratchy',
    'Scrawny',
    'Second',
    'Secondary',
    'Second-Hand',
    'Secret',
    'Self-Assured',
    'Self-Reliant',
    'Selfish',
    'Sentimental',
    'Separate',
    'Serene',
    'Serious',
    'Serpentine',
    'Several',
    'Severe',
    'Shabby',
    'Shadowy',
    'Shady',
    'Shallow',
    'Shameful',
    'Shameless',
    'Sharp',
    'Shimmering',
    'Shiny',
    'Shocked',
    'Shocking',
    'Shoddy',
    'Short',
    'Short-Term',
    'Showy',
    'Shrill',
    'Shy',
    'Sick',
    'Silent',
    'Silky',
    'Silly',
    'Silver',
    'Similar',
    'Simple',
    'Simplistic',
    'Sinful',
    'Single',
    'Sizzling',
    'Skeletal',
    'Skinny',
    'Sleepy',
    'Slight',
    'Slim',
    'Slimy',
    'Slippery',
    'Slow',
    'Slushy',
    'Small',
    'Smart',
    'Smoggy',
    'Smooth',
    'Smug',
    'Snappy',
    'Snarling',
    'Sneaky',
    'Sniveling',
    'Snoopy',
    'Sociable',
    'Soft',
    'Soggy',
    'Solid',
    'Somber',
    'Some',
    'Spherical',
    'Sophisticated',
    'Sore',
    'Sorrowful',
    'Soulful',
    'Soupy',
    'Sour',
    'Spanish',
    'Sparkling',
    'Sparse',
    'Specific',
    'Spectacular',
    'Speedy',
    'Spicy',
    'Spiffy',
    'Spirited',
    'Spiteful',
    'Splendid',
    'Spotless',
    'Spotted',
    'Spry',
    'Square',
    'Squeaky',
    'Squiggly',
    'Stable',
    'Staid',
    'Stained',
    'Stale',
    'Standard',
    'Starchy',
    'Stark',
    'Starry',
    'Steep',
    'Sticky',
    'Stiff',
    'Stimulating',
    'Stingy',
    'Stormy',
    'Straight',
    'Strange',
    'Steel',
    'Strict',
    'Strident',
    'Striking',
    'Striped',
    'Strong',
    'Studious',
    'Stunning',
    'Stupendous',
    'Stupid',
    'Sturdy',
    'Stylish',
    'Subdued',
    'Submissive',
    'Substantial',
    'Subtle',
    'Suburban',
    'Sudden',
    'Sugary',
    'Sunny',
    'Super',
    'Superb',
    'Superficial',
    'Superior',
    'Supportive',
    'Sure-Footed',
    'Surprised',
    'Suspicious',
    'Svelte',
    'Sweaty',
    'Sweet',
    'Sweltering',
    'Swift',
    'Sympathetic',
    'Tall',
    'Talkative',
    'Tame',
    'Tan',
    'Tangible',
    'Tart',
    'Tasty',
    'Tattered',
    'Taut',
    'Tedious',
    'Teeming',
    'Tempting',
    'Tender',
    'Tense',
    'Tepid',
    'Terrible',
    'Terrific',
    'Testy',
    'Thankful',
    'That',
    'Thick',
    'Thin',
    'Third',
    'Thirsty',
    'This',
    'Thorough',
    'Thorny',
    'Thoughtful',
    'Threadbare',
    'Thrifty',
    'Thunderous',
    'Tidy',
    'Tight',
    'Timely',
    'Tinted',
    'Tiny',
    'Tired',
    'Torn',
    'Total',
    'Tough',
    'Traumatic',
    'Treasured',
    'Tremendous',
    'Tragic',
    'Trained',
    'Tremendous',
    'Triangular',
    'Tricky',
    'Trifling',
    'Trim',
    'Trivial',
    'Troubled',
    'True',
    'Trusting',
    'Trustworthy',
    'Trusty',
    'Truthful',
    'Tubby',
    'Turbulent',
    'Twin',
    'Ugly',
    'Ultimate',
    'Unacceptable',
    'Unaware',
    'Uncomfortable',
    'Uncommon',
    'Unconscious',
    'Understated',
    'Unequaled',
    'Uneven',
    'Unfinished',
    'Unfit',
    'Unfolded',
    'Unfortunate',
    'Unhappy',
    'Unhealthy',
    'Uniform',
    'Unimportant',
    'Unique',
    'United',
    'Unkempt',
    'Unknown',
    'Unlawful',
    'Unlined',
    'Unlucky',
    'Unnatural',
    'Unpleasant',
    'Unrealistic',
    'Unripe',
    'Unruly',
    'Unselfish',
    'Unsightly',
    'Unsteady',
    'Unsung',
    'Untidy',
    'Untimely',
    'Untried',
    'Untrue',
    'Unused',
    'Unusual',
    'Unwelcome',
    'Unwieldy',
    'Unwilling',
    'Unwitting',
    'Unwritten',
    'Upbeat',
    'Upright',
    'Upset',
    'Urban',
    'Usable',
    'Used',
    'Useful',
    'Useless',
    'Utilized',
    'Utter',
    'Vacant',
    'Vague',
    'Vain',
    'Valid',
    'Valuable',
    'Vapid',
    'Variable',
    'Vast',
    'Velvety',
    'Venerated',
    'Vengeful',
    'Verifiable',
    'Vibrant',
    'Vicious',
    'Victorious',
    'Vigilant',
    'Vigorous',
    'Villainous',
    'Violet',
    'Violent',
    'Virtual',
    'Virtuous',
    'Visible',
    'Vital',
    'Vivacious',
    'Vivid',
    'Voluminous',
    'Wan',
    'Warlike',
    'Warm',
    'Warmhearted',
    'Warped',
    'Wary',
    'Wasteful',
    'Watchful',
    'Waterlogged',
    'Watery',
    'Wavy',
    'Wealthy',
    'Weak',
    'Weary',
    'Webbed',
    'Wee',
    'Weekly',
    'Weepy',
    'Weighty',
    'Weird',
    'Welcome',
    'Well-Documented',
    'Well-Groomed',
    'Well-Informed',
    'Well-Lit',
    'Well-Made',
    'Well-Off',
    'Well-To-Do',
    'Well-Worn',
    'Wet',
    'Which',
    'Whimsical',
    'Whirlwind',
    'Whispered',
    'White',
    'Whole',
    'Whopping',
    'Wicked',
    'Wide',
    'Wide-Eyed',
    'Wiggly',
    'Wild',
    'Willing',
    'Wilted',
    'Winding',
    'Windy',
    'Winged',
    'Wiry',
    'Wise',
    'Witty',
    'Wobbly',
    'Woeful',
    'Wonderful',
    'Wooden',
    'Woozy',
    'Wordy',
    'Worldly',
    'Worn',
    'Worried',
    'Worrisome',
    'Worse',
    'Worst',
    'Worthless',
    'Worthwhile',
    'Worthy',
    'Wrathful',
    'Wretched',
    'Writhing',
    'Wrong',
    'Wry',
    'Yawning',
    'Yearly',
    'Yellow',
    'Yellowish',
    'Young',
    'Youthful',
    'Yummy',
    'Zany',
    'Zealous',
    'Zesty',
    'Zigzag',
    'Rocky',
  ];
  const name2 = [
    'Aardvark',
    'Albatross',
    'Alligator',
    'Alpaca',
    'Ant',
    'Anteater',
    'Antelope',
    'Ape',
    'Armadillo',
    'Baboon',
    'Badger',
    'Barracuda',
    'Bat',
    'Bear',
    'Beaver',
    'Bee',
    'Bison',
    'Boar',
    'Buffalo',
    'Butterfly',
    'Camel',
    'Capybara',
    'Caribou',
    'Cassowary',
    'Cat',
    'Caterpillar',
    'Cattle',
    'Chamois',
    'Cheetah',
    'Chicken',
    'Chimpanzee',
    'Chinchilla',
    'Chough',
    'Clam',
    'Cobra',
    'Cockroach',
    'Cod',
    'Cormorant',
    'Coyote',
    'Crab',
    'Crane',
    'Crocodile',
    'Crow',
    'Curlew',
    'Deer',
    'Dinosaur',
    'Dog',
    'Dogfish',
    'Dolphin',
    'Donkey',
    'Dotterel',
    'Dove',
    'Dragonfly',
    'Duck',
    'Dugong',
    'Dunlin',
    'Eagle',
    'Echidna',
    'Eel',
    'Eland',
    'Elephant',
    'Elephant-Seal',
    'Elk',
    'Emu',
    'Falcon',
    'Ferret',
    'Finch',
    'Fish',
    'Flamingo',
    'Fly',
    'Fox',
    'Frog',
    'Gaur',
    'Gazelle',
    'Gerbil',
    'Giant-Panda',
    'Giraffe',
    'Gnat',
    'Gnu',
    'Goat',
    'Goose',
    'Goldfinch',
    'Goldfish',
    'Gorilla',
    'Goshawk',
    'Grasshopper',
    'Grouse',
    'Guanaco',
    'Guinea-Fowl',
    'Guinea-Pig',
    'Gull',
    'Hamster',
    'Hare',
    'Hawk',
    'Hedgehog',
    'Heron',
    'Herring',
    'Hippopotamus',
    'Hornet',
    'Horse',
    'Human',
    'Hummingbird',
    'Hyena',
    'Ibex',
    'Ibis',
    'Jackal',
    'Jaguar',
    'Jay',
    'Jellyfish',
    'Kangaroo',
    'Kingfisher',
    'Koala',
    'Komodo-Dragon',
    'Kookabura',
    'Kouprey',
    'Kudu',
    'Lapwing',
    'Lark',
    'Lemur',
    'Leopard',
    'Lion',
    'Llama',
    'Lobster',
    'Locust',
    'Loris',
    'Louse',
    'Lyrebird',
    'Magpie',
    'Mallard',
    'Manatee',
    'Mandrill',
    'Mantis',
    'Marten',
    'Meerkat',
    'Mink',
    'Mole',
    'Mongoose',
    'Monkey',
    'Moose',
    'Mouse',
    'Mosquito',
    'Mule',
    'Narwhal',
    'Newt',
    'Nightingale',
    'Octopus',
    'Okapi',
    'Opossum',
    'Oryx',
    'Ostrich',
    'Otter',
    'Owl',
    'Ox',
    'Oyster',
    'Panther',
    'Parrot',
    'Partridge',
    'Peafowl',
    'Pelican',
    'Penguin',
    'Pheasant',
    'Pig',
    'Pigeon',
    'Polar-Bear',
    'Pony',
    'Porcupine',
    'Porpoise',
    'Prairie-Dog',
    'Quail',
    'Quelea',
    'Quetzal',
    'Rabbit',
    'Raccoon',
    'Rail',
    'Ram',
    'Rat',
    'Raven',
    'Red-Deer',
    'Red-Panda',
    'Reindeer',
    'Rhinoceros',
    'Rook',
    'Salamander',
    'Salmon',
    'Sand-Dollar',
    'Sandpiper',
    'Sardine',
    'Scorpion',
    'Sea-Lion',
    'Sea-Urchin',
    'Seahorse',
    'Seal',
    'Shark',
    'Sheep',
    'Shrew',
    'Skunk',
    'Snail',
    'Snake',
    'Sparrow',
    'Spider',
    'Spoonbill',
    'Squid',
    'Squirrel',
    'Starling',
    'Stingray',
    'Stinkbug',
    'Stork',
    'Swallow',
    'Swan',
    'Tapir',
    'Tarsier',
    'Termite',
    'Tiger',
    'Toad',
    'Trout',
    'Turkey',
    'Turtle',
    'Vicuña',
    'Viper',
    'Vulture',
    'Wallaby',
    'Walrus',
    'Wasp',
    'Water-Buffalo',
    'Weasel',
    'Whale',
    'Wolf',
    'Wolverine',
    'Wombat',
    'Woodcock',
    'Woodpecker',
    'Worm',
    'Wren',
    'Yak',
    'Zebra',
  ];

  const selectedName1 = name1[ Math.floor( Math.random() * name1.length ) ];
  const selectedName2 = name2[ Math.floor( Math.random() * name2.length ) ];
  const number = Math.floor( Math.random() * 1000 );

  return `${ selectedName1 } ${ selectedName2 } ${ number }`;
}

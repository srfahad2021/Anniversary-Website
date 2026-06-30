/**
 * ============================================================
 *  ANNIVERSARY WEBSITE — EDITABLE CONFIGURATION
 *  Change everything here without touching core logic.
 * ============================================================
 */

export const CONFIG = {
  // Couple names
  names: {
    him: 'Fahad',
    her: 'Tasnim',
  },

  // When the site unlocks (local time). Before this → lock screen.
  // Format: YYYY-MM-DD — unlocks at midnight (00:00:00) on this date.
  unlockDate: '2026-06-01',

  // Set to true to skip lock screen during development/preview
  devBypassLock: false,

  // Relationship start date (for "Time Together" counter)
  relationshipStart: '2022-07-01T00:00:00',

  // Background music — place your file at assets/audio/romantic-piano.mp3
  music: {
    src: 'assets/audio/romantic-piano.mp3',
    defaultVolume: 0.7,
    fadeInDuration: 3,
    letterVolume: 0.35,
  },

  // Welcome page typing message (lines shown sequentially)
  welcomeMessage: [
    { type: 'highlight', text: 'Happy Anniversary ❤️' },
    { type: 'line', text: 'Every heartbeat of mine carries your name.' },
    { type: 'line', text: '' },
    { type: 'line', text: 'You are my happiest coincidence,' },
    { type: 'line', text: 'my safest place,' },
    { type: 'line', text: 'and the most beautiful chapter of my life.' },
    { type: 'line', text: '' },
    { type: 'line', text: 'Thank you for choosing me,' },
    { type: 'line', text: 'loving me,' },
    { type: 'line', text: 'and making every ordinary day extraordinary.' },
    { type: 'line', text: '' },
    { type: 'line', text: "Today isn't just another anniversary." },
    { type: 'line', text: '' },
    { type: 'line', text: 'It is another reminder that' },
    { type: 'line', text: 'I would choose you' },
    { type: 'line', text: 'again and again' },
    { type: 'line', text: 'for the rest of my life.' },
  ],

  journey: {
    subtitle: 'Every moment with you is a treasure I hold close to my heart.',
  },

  // Photo gallery — add unlimited images
  // Replace src with your own photos in assets/images/
  photos: [
    {
      src: 'https://images.unsplash.com/photo-1518199266791-5375a57590ae?w=600&q=80',
      date: 'May 19, 2022',
      title: 'The Day We Met',
      memory: 'The moment my world quietly changed forever.',
    },
    {
      src: 'https://images.unsplash.com/photo-1529333166437-7750a6dd4a70?w=600&q=80',
      date: 'August 14, 2022',
      title: 'Our First Adventure',
      memory: 'Laughing until sunset — my favorite kind of day.',
    },
    {
      src: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=600&q=80',
      date: 'December 25, 2022',
      title: 'Holiday Magic',
      memory: 'Wrapped in warmth, wrapped in you.',
    },
    {
      src: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600&q=80',
      date: 'February 14, 2023',
      title: 'Valentine\'s Day',
      memory: 'Every day with you feels like Valentine\'s.',
    },
    {
      src: 'https://images.unsplash.com/photo-1469371670808-013ccf25f16a?w=600&q=80',
      date: 'June 30, 2024',
      title: 'Anniversary Eve',
      memory: 'Another year of choosing each other.',
    },
  ],

  // Love meter percentage steps
  loveMeterSteps: [0, 5, 10, 20, 35, 50, 75, 90, 100, 200, 500],

  // Love letter (typed out on Page 6)
  loveLetter: `My Dearest Tasnim,

From the very first moment you walked into my life, everything became brighter, softer, and infinitely more beautiful.

You are the calm in my chaos, the smile behind every good day, and the reason I believe in forever.

I love the way you laugh, the way you care, the way you make ordinary moments feel like magic. I love who I become when I'm with you.

Thank you for every hug, every tear we've wiped away together, every dream we've shared, and every quiet morning where just your presence is enough.

This anniversary is not just a celebration of time — it is a celebration of us. Of every choice we made to stay, to grow, to love harder.

I promise to keep choosing you, in every season, in every chapter, for all the days we are given.

Forever yours,
Fahad ❤️`,

  // Final message (Page 9)
  finalMessage: {
    title: 'Happy Anniversary ❤️',
    lines: [
      'Thank you',
      'for making my life beautiful.',
      '',
      'I love you',
      'today,',
      'tomorrow,',
      'and forever.',
    ],
  },
};

// Generate 100 reasons — edit individual entries below
CONFIG.reasons = generateReasons();

function generateReasons() {
  const titles = [
    // 1-10 (Your Personal Superstars)
    'Your Electric Smile', 'Your Melodic Laughter', 'Your Soulful Eyes', 'Your Sacred Heart', 'Your Boundless Kindness',
    'Your Unbreakable Strength', 'Your Healing Gentleness', 'Your Wildest Dreams', 'Your Comforting Voice', 'Our Beautiful Horizon',
    // 11-20
    'Your Electric Energy', 'Your Brilliant Intellect', 'Your Golden Compassion', 'Your Tender Touch', 'Your Quiet Patience',
    'Your Fierce Resilience', 'Your Creative Soul', 'Your Passionate Heart', 'Your Comforting Silence', 'Your Vulnerable Honesty',
    // 21-30
    'Your Playful Sense of Humor', 'Your Reassuring Warmth', 'Your Steady Support', 'Your Magnetic Presence', 'Your Healing Energy',
    'Your Limitless Kindness', 'Your Softest Embraces', 'Your Protective Nature', 'Your Radiant Inner Light', 'Your Unshakable Loyalty',
    // 31-40
    'Your Grace Under Pressure', 'Your Bold Ambition', 'Your Deep Sensitivity', 'Your Brilliant Intuition', 'Your Generous Spirit',
    'Your Pure Authenticity', 'Your Elegant Mind', 'Your Wild Imagination', 'Your Deep Empathy', 'Your Unshakable Faith',
    // 41-50
    'Your Restless Curiosity', 'Your Quiet Majesty', 'Your Soft Devotion', 'Your Magnetic Charm', 'Your Deep Wisdom',
    'Your Inspiring Courage', 'Your Inner Peace', 'Your Hidden Depths', 'Your Wholehearted Love', 'Your Nurturing Nature',
    // 51-60
    'Your Free-Spirited Joy', 'Your Gentle Reassurance', 'Your Timeless Beauty', 'Your Compassionate Soul', 'Your Bright Optimism',
    'Your Forgiving Heart', 'Your Beautiful Imperfections', 'The Safety of Your Arms', 'Your Playful Spark', 'Your Calm Anchor',
    // 61-70
    'Your Magical Essence', 'Your Deep Authenticity', 'Your Sweet Vulnerability', 'Your Relentless Grace', 'Your Infinite Warmth',
    'Your Soft Sincerity', 'Your Enduring Devotion', 'Your Uplifting Spirit', 'Your Enchanting Smile', 'Your Loving Guidance',
    // 71-80
    'Your Quiet Confidence', 'Your Pure Intentions', 'Your Vibrant Energy', 'Your Warm Reassurance', 'Your Comforting Warmth',
    'Your Radiant Goodness', 'Your Beautiful Mind', 'Your Rare Elegance', 'Your Tender Compassion', 'Your Peaceful Presence',
    // 81-90
    'Your Selfless Heart', 'Your Boundless Grace', 'Your Bold Spirit', 'Your Sweet Sensitivity', 'Your Genuine Kindness',
    'Your Inspiring Mind', 'Your Healing Presence', 'Your Pure Light', 'Your Soft Resilience', 'Your Captivating Wit',
    // 91-100
    'Your Unwavering Trust', 'Your Playful Heart', 'Your Deep Understanding', 'Your Comforting Touch', 'Your Beautiful Soul',
    'Your Inspiring Vision', 'Your Patient Heart', 'Your Pure Magic', 'The Home In Your Eyes', 'Our Eternal Promise'
  ];

  const templates = [
    'Every single day, your {trait} is the anchor that keeps my soul steady and secure.',
    'I fall in love with your {trait} all over again, finding new depth in you with every passing moment.',
    'Your {trait} is, without a doubt, the most profoundly beautiful thing I have ever witnessed in this lifetime.',
    'No one else in this entire universe possesses a {trait} that can move my heart the way yours does.',
    'Whenever my mind searches for the true meaning of home, it instantly rests upon your {trait}.',
    'Your {trait} serves as a constant, breathtaking reminder of why choosing you was the best decision of my life.',
    'I could spend an eternity writing poetry about your {trait}, and still never fully capture its magic.',
    'This chaotic world feels so much softer, kinder, and safer simply because of your {trait}.',
    'Your {trait} is my absolute favorite thing to witness, a true masterpiece in human form.',
    'I am endlessly, irrevocably grateful to the universe for blessing my life with your {trait}.',
  ];

  const traits = [
    'unconditional love', 'infectious laughter', 'warm, expressive eyes', 'boundless compassion', 'tender touch',
    'comforting voice', 'fierce resilience', 'gentle patience', 'brilliant intellect', 'wild, beautiful dreams',
    'grace under pressure', 'unwavering loyalty', 'creative soul', 'passionate heart', 'comforting silence',
    'vulnerable honesty', 'playful sense of humor', 'reassuring warmth', 'steady emotional support', 'magnetic presence',
    'healing energy', 'limitless kindness', 'soft, comforting hugs', 'sweet morning check-ins', 'protective embrace',
    'the way you say my name', 'the way you look into my eyes', 'the way you fiercely believe in us',
    'the way you lift my spirits', 'the way you hold my hand', 'the way you inspire me to be better',
    'your silly, late-night dancing', 'your comforting, warm presence', 'your beautiful, quiet singing', 'your grand vision for our future',
    'your untamed optimism', 'your raw, unfiltered vulnerability', 'your relentless ambition', 'your deep sensitivity for others',
    'your creative way of thinking', 'your brilliant intuition', 'your limitless capacity for forgiveness', 'your open-handed generosity',
    'your unapologetic authenticity', 'your radiant, glowing inner light', 'the unforgettable memories we share', 'the beautiful future we are building',
    'the love you give without conditions', 'how completely safe I feel in your arms', 'how deeply you understand my unspoken thoughts',
    'how you continuously challenge me to grow', 'how you loudly celebrate my smallest victories', 'how you tenderly hold me during my darkest days',
    'our secret inside jokes', 'our peaceful, quiet mornings together', 'our spontaneous, chaotic adventures',
    'the life we are mindfully creating', 'every changing version of who you are', 'the beautiful "us" we protect',
    'the way you consciously choose me every day', 'the way you turn ordinary days into extraordinary milestones',
    'your fierce, unwavering devotion', 'the physical emotional home you are to my heart',
    'how you make me strive for greatness', 'the cute way you finish my sentences',
    'how you effortlessly remember the smallest details', 'the sweet ways you surprise me',
    'your messy, beautiful morning face', 'your raspy, sleepy morning voice', 'your high-pitched, excited voice',
    'the deeply moving way you care for strangers', 'the selfless way you look after my heart',
    'your incredibly breathtaking heart', 'your brilliant, intricate mind', 'your pure, timeless soul',
  ];

  const reasons = [];
  for (let i = 0; i < 100; i++) {
    const title = titles[i];
    const trait = traits[i % traits.length];
    const template = templates[i % templates.length];
    reasons.push({
      number: i + 1,
      title: title,
      text: template.replace('{trait}', trait),
    });
  }

  // Override first 10 with more personal messages
  const personal = [
    { title: 'Your Electric Smile', text: 'Your smile is a masterpiece that completely rewrites my worst days into beautiful ones the second I see it.' },
    { title: 'Your Melodic Laughter', text: 'Your laugh is my absolute favorite symphony in the universe; it is a sound I want to soundtrack the rest of my life.' },
    { title: 'Your Soulful Eyes', text: 'When I look deep into your eyes, I don’t just see the present—I see a lifetime of adventures, peace, and our future family.' },
    { title: 'Your Sacred Heart', text: 'Your heart is the safest, most fiercely loving sanctuary I have ever known, and I promise to always protect it.' },
    { title: 'Your Boundless Kindness', text: 'The gentle, selfless way you care for the world around you inspires me daily and makes me so proud to be yours.' },
    { title: 'Your Unbreakable Strength', text: 'You possess a quiet, unbreakable resilience that blows me away; you are my greatest hero and my biggest inspiration.' },
    { title: 'Your Healing Gentleness', text: 'In a world that can be so incredibly harsh, your tender gentleness is the soft place my soul always runs to for safety.' },
    { title: 'Your Wildest Dreams', text: 'I am completely in love with the future we are mapping out; every single dream of yours is a dream I want to build with you.' },
    { title: 'Your Comforting Voice', text: 'The sound of your voice saying my name is instant peace; it can calm my racing mind faster than anything else on Earth.' },
    { title: 'Our Beautiful Horizon', text: 'I love who you are, who I am when I am with you, and the magical, unbreakable bond we continue to grow every single day.' },
  ];
  personal.forEach((p, i) => {
    reasons[i] = { number: i + 1, ...p };
  });

  return reasons;
}

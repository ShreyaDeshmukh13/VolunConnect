/**
 * Volunteer Opportunities Data
 * 
 * Centralized dataset representing various volunteering events and community drives.
 * Each opportunity contains comprehensive details regarding requirements, location, slots, and timings.
 */

export const volunteerOpportunities = [
  {
    id: 1,
    title: "Green Earth: Urban Tree Plantation Drive",
    description: "Join us in planting over 500 native saplings across urban parks and riverbanks to restore local green cover, combat urban heat islands, and improve air quality.",
    date: "Saturday, Sept 12, 2026",
    time: "07:30 AM - 11:30 AM",
    location: "City Central Eco-Park, Sector 4",
    category: "Environment",
    duration: "4 Hours",
    slots: 40,
    registeredCount: 28,
    requirement: "No prior gardening experience required. Gardening gloves and saplings will be provided.",
    organizer: "Green Horizons Foundation",
    icon: "bi-tree-fill",
    categoryBadge: "bg-success"
  },
  {
    id: 2,
    title: "Mission Clean Coast & Riverbank Cleanup",
    description: "Help remove plastic waste, debris, and non-biodegradable trash from community waterfronts. Promotes river conservation and marine ecosystem health.",
    date: "Sunday, Sept 20, 2026",
    time: "08:00 AM - 12:00 PM",
    location: "Riverside Promenade, North Ghats",
    category: "Sanitation & Hygiene",
    duration: "4 Hours",
    slots: 50,
    registeredCount: 36,
    requirement: "Wear sturdy shoes and comfortable attire. Protective gear, trash grabbers, and bags provided.",
    organizer: "Clean Waters Coalition",
    icon: "bi-water",
    categoryBadge: "bg-info text-dark"
  },
  {
    id: 3,
    title: "Red Ribbon Blood Donation & Health Screening Camp",
    description: "Support medical staff in organizing donor registrations, managing waiting areas, providing refreshments to donors, and raising vital health awareness.",
    date: "Saturday, Oct 03, 2026",
    time: "09:00 AM - 03:00 PM",
    location: "Community Health Center, Civic Center",
    category: "Healthcare",
    duration: "6 Hours",
    slots: 25,
    registeredCount: 19,
    requirement: "Volunteers must be 18+ years old. Basic empathy and good communication skills preferred.",
    organizer: "Red Cross Community Chapter",
    icon: "bi-heart-pulse-fill",
    categoryBadge: "bg-danger"
  },
  {
    id: 4,
    title: "Bright Minds: Weekend Remedial Education Program",
    description: "Tutor and mentor underprivileged school children in basic Mathematics, Science, and English reading skills through fun interactive learning sessions.",
    date: "Sunday, Oct 11, 2026",
    time: "10:00 AM - 01:00 PM",
    location: "Pragati Community Learning Center",
    category: "Education",
    duration: "3 Hours",
    slots: 30,
    registeredCount: 21,
    requirement: "Patience and passion for teaching. Basic high school subject proficiency.",
    organizer: "Vidya Jyoti NGO",
    icon: "bi-book-half",
    categoryBadge: "bg-primary"
  },
  {
    id: 5,
    title: "Nourish All: Community Food Distribution Drive",
    description: "Assist in packaging and distributing nutritious meal boxes and dry ration kits to daily wage workers, shelters, and families facing food insecurity.",
    date: "Saturday, Oct 17, 2026",
    time: "11:00 AM - 03:30 PM",
    location: "Hope Community Center, West Block",
    category: "Community Welfare",
    duration: "4.5 Hours",
    slots: 35,
    registeredCount: 29,
    requirement: "Ability to lift moderate loads and assist in food packing lines.",
    organizer: "Share A Meal Initiative",
    icon: "bi-basket2-fill",
    categoryBadge: "bg-warning text-dark"
  },
  {
    id: 6,
    title: "Silver Smiles: Senior Citizen Companion & Care Program",
    description: "Spend quality time with residents at local elderly care homes through storytelling, board games, digital smartphone tutoring, and musical recreational sessions.",
    date: "Sunday, Oct 25, 2026",
    time: "02:00 PM - 05:30 PM",
    location: "Aastha Elder Care Home, Green Valley",
    category: "Elder Care",
    duration: "3.5 Hours",
    slots: 20,
    registeredCount: 14,
    requirement: "Compassionate, patient, and respectful communication. Storytellers & musicians warmly welcomed.",
    organizer: "Golden Years Social Guild",
    icon: "bi-people-fill",
    categoryBadge: "bg-secondary"
  }
];

export const volunteerStats = [
  {
    id: 1,
    number: "1,450+",
    label: "Active Volunteers",
    description: "Passionate changemakers registered across diverse community programs.",
    icon: "bi-people",
    colorClass: "stat-emerald"
  },
  {
    id: 2,
    number: "128+",
    label: "Upcoming & Past Drives",
    description: "High-impact events successfully organized in urban & rural regions.",
    icon: "bi-calendar2-check",
    colorClass: "stat-indigo"
  },
  {
    id: 3,
    number: "48+",
    label: "Communities Served",
    description: "Local neighborhoods, shelters, and schools actively supported.",
    icon: "bi-geo-alt",
    colorClass: "stat-amber"
  },
  {
    id: 4,
    number: "9,850+",
    label: "Volunteer Hours Logged",
    description: "Dedicated hours contributed toward sustainable societal growth.",
    icon: "bi-clock-history",
    colorClass: "stat-rose"
  }
];

export const volunteerCategories = [
  "All",
  "Environment",
  "Sanitation & Hygiene",
  "Healthcare",
  "Education",
  "Community Welfare",
  "Elder Care"
];

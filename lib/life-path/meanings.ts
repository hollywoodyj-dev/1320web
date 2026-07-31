/** Static Life Path meanings — crawlable HTML content for Page 03 */

export type LifePathMeaning = {
  number: number;
  title: string;
  body: string;
  strengths: string;
  growthEdge: string;
  reflection: string;
  isMaster?: boolean;
};

export const LIFE_PATH_MEANINGS: LifePathMeaning[] = [
  {
    number: 1,
    title: "The Initiator",
    body: "Life Path 1 is commonly associated with independence, initiative, originality and the willingness to begin. Its constructive expression may involve leadership, courage and self-direction. Its growth edge may involve isolation, impatience or feeling that everything must be carried alone.",
    strengths: "Independence · Initiative · Originality · Courage",
    growthEdge: "Allowing support without losing self-direction",
    reflection: "Where am I being invited to begin—and where could independence include support?",
  },
  {
    number: 2,
    title: "The Harmoniser",
    body: "Life Path 2 is commonly associated with cooperation, sensitivity, patience and relational awareness. Its constructive expression may involve listening, mediation and recognising subtle dynamics. Its growth edge may involve self-silencing, indecision or over-adapting to preserve harmony.",
    strengths: "Cooperation · Sensitivity · Patience · Relational awareness",
    growthEdge: "Remaining connected without disappearing inside others’ needs",
    reflection: "How can I remain connected without disappearing inside the needs of others?",
  },
  {
    number: 3,
    title: "The Communicator",
    body: "Life Path 3 is commonly associated with expression, imagination, creativity and communication. Its constructive expression may involve bringing ideas, feeling or beauty into visible form. Its growth edge may involve scattered focus, avoidance through performance or difficulty staying with uncomfortable emotions.",
    strengths: "Expression · Imagination · Creativity · Communication",
    growthEdge: "Giving ideas enough commitment to become real",
    reflection: "What wants to be expressed—and what deserves enough commitment to become real?",
  },
  {
    number: 4,
    title: "The Builder",
    body: "Life Path 4 is commonly associated with structure, reliability, discipline and practical foundations. Its constructive expression may involve planning, stewardship and creating what can endure. Its growth edge may involve rigidity, overwork or using control to manage uncertainty.",
    strengths: "Reliability · Discipline · Organisation · Persistence",
    growthEdge: "Allowing flexibility without losing stability",
    reflection: "Where does structure support my life—and where has it become too tight?",
  },
  {
    number: 5,
    title: "The Explorer",
    body: "Life Path 5 is commonly associated with freedom, movement, adaptability and experience. Its constructive expression may involve curiosity, versatility and openness to change. Its growth edge may involve restlessness, impulsivity or leaving before an experience has had time to deepen.",
    strengths: "Freedom · Adaptability · Curiosity · Versatility",
    growthEdge: "Staying long enough for experience to deepen",
    reflection: "What kind of freedom helps me become more present rather than more scattered?",
  },
  {
    number: 6,
    title: "The Nurturer",
    body: "Life Path 6 is commonly associated with care, responsibility, harmony and devotion. Its constructive expression may involve supporting people, families or communities. Its growth edge may involve over-responsibility, perfectionism or giving in ways that quietly erase personal needs.",
    strengths: "Care · Responsibility · Harmony · Devotion",
    growthEdge: "Keeping care sustainable for self and others",
    reflection: "How can care become sustainable for both myself and the people around me?",
  },
  {
    number: 7,
    title: "The Seeker",
    body: "Life Path 7 is commonly associated with inquiry, analysis, inner depth and the search for understanding. Its constructive expression may involve discernment, contemplation and independent thinking. Its growth edge may involve withdrawal, mistrust or remaining in analysis when direct experience is needed.",
    strengths: "Inquiry · Discernment · Contemplation · Independent thinking",
    growthEdge: "Moving from analysis into lived experience when needed",
    reflection: "What am I trying to understand—and what may need to be lived rather than solved?",
  },
  {
    number: 8,
    title: "The Steward",
    body: "Life Path 8 is commonly associated with power, responsibility, resources, achievement and material organisation. Its constructive expression may involve leadership, resilience and responsible stewardship. Its growth edge may involve control, over-identification with success or measuring worth through external outcomes.",
    strengths: "Leadership · Resilience · Stewardship · Organisation",
    growthEdge: "Holding resources without letting them define worth",
    reflection: "How can I hold power and resources without allowing them to define my value?",
  },
  {
    number: 9,
    title: "The Humanitarian",
    body: "Life Path 9 is commonly associated with compassion, completion, service and a wider view of human experience. Its constructive expression may involve generosity, perspective and meaningful contribution. Its growth edge may involve rescuing, difficulty letting go or carrying more suffering than one person can responsibly hold.",
    strengths: "Compassion · Perspective · Generosity · Contribution",
    growthEdge: "Serving without carrying more than is responsible",
    reflection: "What am I ready to serve—and what am I ready to release?",
  },
  {
    number: 11,
    title: "The Inspired Messenger",
    body: "Life Path 11 is commonly treated as a Master Number associated with intuition, inspiration, sensitivity and the communication of subtle insight. Its constructive expression may involve creativity, vision and helping language emerge for what others can feel but cannot yet name. Its growth edge may involve overwhelm, nervous intensity or pressure to become exceptional.",
    strengths: "Intuition · Inspiration · Sensitivity · Vision",
    growthEdge: "Grounding inspiration without turning sensitivity into a burden",
    reflection: "How can inspiration become grounded without turning sensitivity into a burden?",
    isMaster: true,
  },
  {
    number: 22,
    title: "The Master Builder",
    body: "Life Path 22 is commonly treated as a Master Number associated with large-scale vision, organisation and the capacity to bring ideas into durable form. Its constructive expression may unite imagination with practical execution. Its growth edge may involve impossible expectations, control or identifying personal worth with the size of what is built.",
    strengths: "Vision · Organisation · Execution · Durable form",
    growthEdge: "Translating large vision into one grounded next step",
    reflection: "What meaningful vision can be translated into one grounded next step?",
    isMaster: true,
  },
  {
    number: 33,
    title: "The Compassionate Teacher",
    body: "Life Path 33 is commonly treated as a Master Number associated with compassion, guidance, responsibility and service. Its constructive expression may involve nurturing, teaching or helping others grow. Its growth edge may involve martyrdom, self-sacrifice or believing love requires constant availability.",
    strengths: "Compassion · Guidance · Nurturing · Service",
    growthEdge: "Including truth, limits and self-care in compassion",
    reflection: "How can compassion include truth, limits and care for my own life?",
    isMaster: true,
  },
];

export function getLifePathMeaning(number: number): LifePathMeaning | undefined {
  return LIFE_PATH_MEANINGS.find((item) => item.number === number);
}

export function lifePathSectionId(number: number): string {
  return `life-path-${number}`;
}

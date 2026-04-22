export interface QuizQuestion {
  id: number
  question: string
  options: string[]
  correctIndex: number
  explanation: string
  difficulty: 'beginner' | 'intermediate' | 'expert'
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'How many Electoral College votes are needed to win the presidency?',
    options: ['218', '270', '300', '538'],
    correctIndex: 1,
    explanation: 'A candidate needs 270 out of 538 total electoral votes to win the presidency. This is a simple majority of the Electoral College.',
    difficulty: 'beginner',
  },
  {
    id: 2,
    question: 'How many U.S. Senators does each state have?',
    options: ['1', '2', 'Varies by population', '4'],
    correctIndex: 1,
    explanation: 'Every state has exactly 2 U.S. Senators, regardless of population. This gives equal representation in the Senate.',
    difficulty: 'beginner',
  },
  {
    id: 3,
    question: 'On what day are U.S. presidential elections held?',
    options: ['First Monday in November', 'First Tuesday after the first Monday in November', 'Last Tuesday in October', 'November 1st'],
    correctIndex: 1,
    explanation: 'Presidential elections are held on the first Tuesday after the first Monday in November. This was established by Congress in 1845.',
    difficulty: 'beginner',
  },
  {
    id: 4,
    question: 'What is the minimum age to vote in U.S. federal elections?',
    options: ['16', '17', '18', '21'],
    correctIndex: 2,
    explanation: 'The 26th Amendment, ratified in 1971, set the minimum voting age at 18 for all federal and state elections.',
    difficulty: 'beginner',
  },
  {
    id: 5,
    question: 'What is the total number of Electoral College votes?',
    options: ['435', '535', '538', '540'],
    correctIndex: 2,
    explanation: '538 electors = 435 House Representatives + 100 Senators + 3 for Washington D.C. (from the 23rd Amendment).',
    difficulty: 'beginner',
  },
  {
    id: 6,
    question: 'What is a caucus?',
    options: ['A type of ballot', 'A meeting where party members select candidates', 'A congressional committee', 'A type of primary election'],
    correctIndex: 1,
    explanation: 'A caucus is a gathering of party members who discuss and vote for candidates through a public process, rather than casting private ballots as in primaries.',
    difficulty: 'intermediate',
  },
  {
    id: 7,
    question: 'Which amendment gave women the right to vote?',
    options: ['15th Amendment', '19th Amendment', '21st Amendment', '26th Amendment'],
    correctIndex: 1,
    explanation: 'The 19th Amendment, ratified in 1920, prohibited denying the right to vote based on sex, giving women the constitutional right to vote.',
    difficulty: 'intermediate',
  },
  {
    id: 8,
    question: 'Which amendment gave 18-year-olds the right to vote?',
    options: ['24th Amendment', '25th Amendment', '26th Amendment', '27th Amendment'],
    correctIndex: 2,
    explanation: 'The 26th Amendment, ratified in 1971, lowered the voting age from 21 to 18. It was largely driven by the Vietnam War and the argument that those old enough to fight should be able to vote.',
    difficulty: 'intermediate',
  },
  {
    id: 9,
    question: 'What is gerrymandering?',
    options: ['A type of voting machine', 'Drawing district boundaries to favor one party', 'A method of counting ballots', 'A type of campaign advertising'],
    correctIndex: 1,
    explanation: 'Gerrymandering is the manipulation of electoral district boundaries to create an advantage for a particular party. Named after Governor Elbridge Gerry in 1812.',
    difficulty: 'intermediate',
  },
  {
    id: 10,
    question: 'Which two states split their electoral votes by congressional district?',
    options: ['California and Texas', 'Maine and Nebraska', 'New York and Florida', 'Ohio and Pennsylvania'],
    correctIndex: 1,
    explanation: 'Maine and Nebraska use a district-based method where each congressional district awards one electoral vote, with two additional votes going to the statewide winner.',
    difficulty: 'intermediate',
  },
  {
    id: 11,
    question: 'What happens if no presidential candidate receives 270 electoral votes?',
    options: ['A runoff election is held', 'The House of Representatives chooses the President', 'The Supreme Court decides', 'The incumbent stays in office'],
    correctIndex: 1,
    explanation: 'Per the 12th Amendment, if no candidate reaches 270 electoral votes, the House of Representatives votes to elect the President, with each state delegation casting one vote.',
    difficulty: 'expert',
  },
  {
    id: 12,
    question: 'What is the "safe harbor" deadline in a presidential election?',
    options: ['Deadline for voter registration', 'Deadline for states to resolve election disputes', 'Deadline for campaign contributions', 'Deadline for mail-in ballots'],
    correctIndex: 1,
    explanation: 'The safe harbor deadline (6 days before the Electoral College meets) is the date by which states must resolve any disputes over their election results to ensure Congress accepts their electoral votes.',
    difficulty: 'expert',
  },
  {
    id: 13,
    question: 'What role does the Vice President play in the Electoral College vote count?',
    options: ['They do not have a role', 'They preside over the joint session of Congress that counts electoral votes', 'They cast tie-breaking votes', 'They certify the results'],
    correctIndex: 1,
    explanation: 'The Vice President, as President of the Senate, presides over the joint session of Congress where electoral votes are officially counted and certified.',
    difficulty: 'expert',
  },
  {
    id: 14,
    question: 'What is a "faithless elector"?',
    options: ['A voter who does not vote', 'An elector who votes contrary to their state\'s popular vote', 'A candidate who drops out of the race', 'A poll worker who makes errors'],
    correctIndex: 1,
    explanation: 'A faithless elector is a member of the Electoral College who casts a vote for someone other than the candidate they pledged to support. Some states have laws penalizing or replacing faithless electors.',
    difficulty: 'expert',
  },
  {
    id: 15,
    question: 'How many times has a presidential candidate won the Electoral College but lost the popular vote?',
    options: ['2 times', '3 times', '5 times', '7 times'],
    correctIndex: 2,
    explanation: 'It has happened 5 times: in 1824 (John Quincy Adams), 1876 (Rutherford B. Hayes), 1888 (Benjamin Harrison), 2000 (George W. Bush), and 2016 (Donald Trump).',
    difficulty: 'expert',
  },
]

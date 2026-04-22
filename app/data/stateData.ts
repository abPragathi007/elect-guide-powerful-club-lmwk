export interface StateData {
  name: string
  abbr: string
  electoralVotes: number
  governor: string
  governorParty: 'D' | 'R' | 'I'
  votingLaws: {
    idRequired: string
    earlyVoting: string
    registrationDeadline: string
  }
  history: { year: number; party: 'D' | 'R' }[]
  lean: 'D' | 'R' | 'S'
  gridRow: number
  gridCol: number
}

export const STATES: StateData[] = [
  { name: 'Alaska', abbr: 'AK', electoralVotes: 3, governor: 'Mike Dunleavy', governorParty: 'R', votingLaws: { idRequired: 'ID requested', earlyVoting: 'Yes - 15 days', registrationDeadline: '30 days before' }, history: [{ year: 2024, party: 'R' }, { year: 2020, party: 'R' }, { year: 2016, party: 'R' }], lean: 'R', gridRow: 0, gridCol: 0 },
  { name: 'Hawaii', abbr: 'HI', electoralVotes: 4, governor: 'Josh Green', governorParty: 'D', votingLaws: { idRequired: 'No strict ID', earlyVoting: 'Yes - all mail', registrationDeadline: 'Same-day' }, history: [{ year: 2024, party: 'D' }, { year: 2020, party: 'D' }, { year: 2016, party: 'D' }], lean: 'D', gridRow: 7, gridCol: 0 },
  { name: 'Washington', abbr: 'WA', electoralVotes: 12, governor: 'Bob Ferguson', governorParty: 'D', votingLaws: { idRequired: 'No strict ID', earlyVoting: 'Yes - all mail', registrationDeadline: '8 days before' }, history: [{ year: 2024, party: 'D' }, { year: 2020, party: 'D' }, { year: 2016, party: 'D' }], lean: 'D', gridRow: 1, gridCol: 0 },
  { name: 'Oregon', abbr: 'OR', electoralVotes: 8, governor: 'Tina Kotek', governorParty: 'D', votingLaws: { idRequired: 'No strict ID', earlyVoting: 'Yes - all mail', registrationDeadline: '21 days before' }, history: [{ year: 2024, party: 'D' }, { year: 2020, party: 'D' }, { year: 2016, party: 'D' }], lean: 'D', gridRow: 2, gridCol: 0 },
  { name: 'California', abbr: 'CA', electoralVotes: 54, governor: 'Gavin Newsom', governorParty: 'D', votingLaws: { idRequired: 'No strict ID', earlyVoting: 'Yes - 29 days', registrationDeadline: '15 days before' }, history: [{ year: 2024, party: 'D' }, { year: 2020, party: 'D' }, { year: 2016, party: 'D' }], lean: 'D', gridRow: 3, gridCol: 0 },
  { name: 'Nevada', abbr: 'NV', electoralVotes: 6, governor: 'Joe Lombardo', governorParty: 'R', votingLaws: { idRequired: 'ID requested', earlyVoting: 'Yes - 14 days', registrationDeadline: 'Same-day' }, history: [{ year: 2024, party: 'D' }, { year: 2020, party: 'D' }, { year: 2016, party: 'D' }], lean: 'S', gridRow: 3, gridCol: 1 },
  { name: 'Idaho', abbr: 'ID', electoralVotes: 4, governor: 'Brad Little', governorParty: 'R', votingLaws: { idRequired: 'Photo ID required', earlyVoting: 'Yes - 18 days', registrationDeadline: 'Same-day' }, history: [{ year: 2024, party: 'R' }, { year: 2020, party: 'R' }, { year: 2016, party: 'R' }], lean: 'R', gridRow: 2, gridCol: 1 },
  { name: 'Utah', abbr: 'UT', electoralVotes: 6, governor: 'Spencer Cox', governorParty: 'R', votingLaws: { idRequired: 'ID requested', earlyVoting: 'Yes - all mail', registrationDeadline: 'Same-day' }, history: [{ year: 2024, party: 'R' }, { year: 2020, party: 'R' }, { year: 2016, party: 'R' }], lean: 'R', gridRow: 3, gridCol: 2 },
  { name: 'Arizona', abbr: 'AZ', electoralVotes: 11, governor: 'Katie Hobbs', governorParty: 'D', votingLaws: { idRequired: 'Photo ID required', earlyVoting: 'Yes - 27 days', registrationDeadline: '29 days before' }, history: [{ year: 2024, party: 'R' }, { year: 2020, party: 'D' }, { year: 2016, party: 'R' }], lean: 'S', gridRow: 4, gridCol: 1 },
  { name: 'Montana', abbr: 'MT', electoralVotes: 4, governor: 'Greg Gianforte', governorParty: 'R', votingLaws: { idRequired: 'Photo ID required', earlyVoting: 'Yes', registrationDeadline: 'Same-day' }, history: [{ year: 2024, party: 'R' }, { year: 2020, party: 'R' }, { year: 2016, party: 'R' }], lean: 'R', gridRow: 1, gridCol: 1 },
  { name: 'Wyoming', abbr: 'WY', electoralVotes: 3, governor: 'Mark Gordon', governorParty: 'R', votingLaws: { idRequired: 'ID requested', earlyVoting: 'Yes - 40 days', registrationDeadline: 'Same-day' }, history: [{ year: 2024, party: 'R' }, { year: 2020, party: 'R' }, { year: 2016, party: 'R' }], lean: 'R', gridRow: 2, gridCol: 2 },
  { name: 'Colorado', abbr: 'CO', electoralVotes: 10, governor: 'Jared Polis', governorParty: 'D', votingLaws: { idRequired: 'ID requested', earlyVoting: 'Yes - all mail', registrationDeadline: 'Same-day' }, history: [{ year: 2024, party: 'D' }, { year: 2020, party: 'D' }, { year: 2016, party: 'D' }], lean: 'D', gridRow: 3, gridCol: 3 },
  { name: 'New Mexico', abbr: 'NM', electoralVotes: 5, governor: 'Michelle Lujan Grisham', governorParty: 'D', votingLaws: { idRequired: 'No strict ID', earlyVoting: 'Yes - 28 days', registrationDeadline: 'Same-day' }, history: [{ year: 2024, party: 'D' }, { year: 2020, party: 'D' }, { year: 2016, party: 'D' }], lean: 'D', gridRow: 4, gridCol: 2 },
  { name: 'North Dakota', abbr: 'ND', electoralVotes: 3, governor: 'Kelly Armstrong', governorParty: 'R', votingLaws: { idRequired: 'Photo ID required', earlyVoting: 'Yes - 15 days', registrationDeadline: 'No registration needed' }, history: [{ year: 2024, party: 'R' }, { year: 2020, party: 'R' }, { year: 2016, party: 'R' }], lean: 'R', gridRow: 1, gridCol: 2 },
  { name: 'South Dakota', abbr: 'SD', electoralVotes: 3, governor: 'Kristi Noem', governorParty: 'R', votingLaws: { idRequired: 'Photo ID required', earlyVoting: 'Yes - 46 days', registrationDeadline: '15 days before' }, history: [{ year: 2024, party: 'R' }, { year: 2020, party: 'R' }, { year: 2016, party: 'R' }], lean: 'R', gridRow: 2, gridCol: 3 },
  { name: 'Nebraska', abbr: 'NE', electoralVotes: 5, governor: 'Jim Pillen', governorParty: 'R', votingLaws: { idRequired: 'Photo ID required', earlyVoting: 'Yes - 30 days', registrationDeadline: '11 days before' }, history: [{ year: 2024, party: 'R' }, { year: 2020, party: 'R' }, { year: 2016, party: 'R' }], lean: 'R', gridRow: 2, gridCol: 4 },
  { name: 'Kansas', abbr: 'KS', electoralVotes: 6, governor: 'Laura Kelly', governorParty: 'D', votingLaws: { idRequired: 'Photo ID required', earlyVoting: 'Yes - 20 days', registrationDeadline: '21 days before' }, history: [{ year: 2024, party: 'R' }, { year: 2020, party: 'R' }, { year: 2016, party: 'R' }], lean: 'R', gridRow: 3, gridCol: 4 },
  { name: 'Oklahoma', abbr: 'OK', electoralVotes: 7, governor: 'Kevin Stitt', governorParty: 'R', votingLaws: { idRequired: 'Photo ID required', earlyVoting: 'Yes - 3 days', registrationDeadline: '25 days before' }, history: [{ year: 2024, party: 'R' }, { year: 2020, party: 'R' }, { year: 2016, party: 'R' }], lean: 'R', gridRow: 4, gridCol: 3 },
  { name: 'Texas', abbr: 'TX', electoralVotes: 40, governor: 'Greg Abbott', governorParty: 'R', votingLaws: { idRequired: 'Photo ID required', earlyVoting: 'Yes - 17 days', registrationDeadline: '30 days before' }, history: [{ year: 2024, party: 'R' }, { year: 2020, party: 'R' }, { year: 2016, party: 'R' }], lean: 'R', gridRow: 5, gridCol: 3 },
  { name: 'Minnesota', abbr: 'MN', electoralVotes: 10, governor: 'Tim Walz', governorParty: 'D', votingLaws: { idRequired: 'No strict ID', earlyVoting: 'Yes - 46 days', registrationDeadline: 'Same-day' }, history: [{ year: 2024, party: 'D' }, { year: 2020, party: 'D' }, { year: 2016, party: 'D' }], lean: 'D', gridRow: 1, gridCol: 3 },
  { name: 'Iowa', abbr: 'IA', electoralVotes: 6, governor: 'Kim Reynolds', governorParty: 'R', votingLaws: { idRequired: 'Photo ID required', earlyVoting: 'Yes - 20 days', registrationDeadline: 'Same-day' }, history: [{ year: 2024, party: 'R' }, { year: 2020, party: 'R' }, { year: 2016, party: 'R' }], lean: 'R', gridRow: 2, gridCol: 5 },
  { name: 'Missouri', abbr: 'MO', electoralVotes: 10, governor: 'Mike Kehoe', governorParty: 'R', votingLaws: { idRequired: 'Photo ID required', earlyVoting: 'No', registrationDeadline: '27 days before' }, history: [{ year: 2024, party: 'R' }, { year: 2020, party: 'R' }, { year: 2016, party: 'R' }], lean: 'R', gridRow: 3, gridCol: 5 },
  { name: 'Arkansas', abbr: 'AR', electoralVotes: 6, governor: 'Sarah Huckabee Sanders', governorParty: 'R', votingLaws: { idRequired: 'Photo ID required', earlyVoting: 'Yes - 15 days', registrationDeadline: '30 days before' }, history: [{ year: 2024, party: 'R' }, { year: 2020, party: 'R' }, { year: 2016, party: 'R' }], lean: 'R', gridRow: 4, gridCol: 4 },
  { name: 'Louisiana', abbr: 'LA', electoralVotes: 8, governor: 'Jeff Landry', governorParty: 'R', votingLaws: { idRequired: 'Photo ID required', earlyVoting: 'Yes - 14 days', registrationDeadline: '30 days before' }, history: [{ year: 2024, party: 'R' }, { year: 2020, party: 'R' }, { year: 2016, party: 'R' }], lean: 'R', gridRow: 5, gridCol: 4 },
  { name: 'Wisconsin', abbr: 'WI', electoralVotes: 10, governor: 'Tony Evers', governorParty: 'D', votingLaws: { idRequired: 'Photo ID required', earlyVoting: 'Yes - 14 days', registrationDeadline: 'Same-day' }, history: [{ year: 2024, party: 'D' }, { year: 2020, party: 'D' }, { year: 2016, party: 'R' }], lean: 'S', gridRow: 1, gridCol: 4 },
  { name: 'Illinois', abbr: 'IL', electoralVotes: 19, governor: 'JB Pritzker', governorParty: 'D', votingLaws: { idRequired: 'No strict ID', earlyVoting: 'Yes - 40 days', registrationDeadline: 'Same-day' }, history: [{ year: 2024, party: 'D' }, { year: 2020, party: 'D' }, { year: 2016, party: 'D' }], lean: 'D', gridRow: 2, gridCol: 6 },
  { name: 'Mississippi', abbr: 'MS', electoralVotes: 6, governor: 'Tate Reeves', governorParty: 'R', votingLaws: { idRequired: 'Photo ID required', earlyVoting: 'No', registrationDeadline: '30 days before' }, history: [{ year: 2024, party: 'R' }, { year: 2020, party: 'R' }, { year: 2016, party: 'R' }], lean: 'R', gridRow: 5, gridCol: 5 },
  { name: 'Michigan', abbr: 'MI', electoralVotes: 15, governor: 'Gretchen Whitmer', governorParty: 'D', votingLaws: { idRequired: 'Photo ID required', earlyVoting: 'Yes - 9 days', registrationDeadline: 'Same-day' }, history: [{ year: 2024, party: 'D' }, { year: 2020, party: 'D' }, { year: 2016, party: 'R' }], lean: 'S', gridRow: 1, gridCol: 5 },
  { name: 'Indiana', abbr: 'IN', electoralVotes: 11, governor: 'Mike Braun', governorParty: 'R', votingLaws: { idRequired: 'Photo ID required', earlyVoting: 'Yes - 28 days', registrationDeadline: '29 days before' }, history: [{ year: 2024, party: 'R' }, { year: 2020, party: 'R' }, { year: 2016, party: 'R' }], lean: 'R', gridRow: 2, gridCol: 7 },
  { name: 'Kentucky', abbr: 'KY', electoralVotes: 8, governor: 'Andy Beshear', governorParty: 'D', votingLaws: { idRequired: 'Photo ID required', earlyVoting: 'Yes - 3 days', registrationDeadline: '29 days before' }, history: [{ year: 2024, party: 'R' }, { year: 2020, party: 'R' }, { year: 2016, party: 'R' }], lean: 'R', gridRow: 3, gridCol: 6 },
  { name: 'Tennessee', abbr: 'TN', electoralVotes: 11, governor: 'Bill Lee', governorParty: 'R', votingLaws: { idRequired: 'Photo ID required', earlyVoting: 'Yes - 20 days', registrationDeadline: '30 days before' }, history: [{ year: 2024, party: 'R' }, { year: 2020, party: 'R' }, { year: 2016, party: 'R' }], lean: 'R', gridRow: 4, gridCol: 5 },
  { name: 'Alabama', abbr: 'AL', electoralVotes: 9, governor: 'Kay Ivey', governorParty: 'R', votingLaws: { idRequired: 'Photo ID required', earlyVoting: 'No', registrationDeadline: '15 days before' }, history: [{ year: 2024, party: 'R' }, { year: 2020, party: 'R' }, { year: 2016, party: 'R' }], lean: 'R', gridRow: 5, gridCol: 6 },
  { name: 'Ohio', abbr: 'OH', electoralVotes: 17, governor: 'Mike DeWine', governorParty: 'R', votingLaws: { idRequired: 'Photo ID required', earlyVoting: 'Yes - 28 days', registrationDeadline: '30 days before' }, history: [{ year: 2024, party: 'R' }, { year: 2020, party: 'R' }, { year: 2016, party: 'R' }], lean: 'R', gridRow: 2, gridCol: 8 },
  { name: 'West Virginia', abbr: 'WV', electoralVotes: 4, governor: 'Patrick Morrisey', governorParty: 'R', votingLaws: { idRequired: 'ID requested', earlyVoting: 'Yes - 10 days', registrationDeadline: '21 days before' }, history: [{ year: 2024, party: 'R' }, { year: 2020, party: 'R' }, { year: 2016, party: 'R' }], lean: 'R', gridRow: 3, gridCol: 7 },
  { name: 'Virginia', abbr: 'VA', electoralVotes: 13, governor: 'Glenn Youngkin', governorParty: 'R', votingLaws: { idRequired: 'Photo ID required', earlyVoting: 'Yes - 45 days', registrationDeadline: '22 days before' }, history: [{ year: 2024, party: 'D' }, { year: 2020, party: 'D' }, { year: 2016, party: 'D' }], lean: 'D', gridRow: 4, gridCol: 6 },
  { name: 'North Carolina', abbr: 'NC', electoralVotes: 16, governor: 'Josh Stein', governorParty: 'D', votingLaws: { idRequired: 'Photo ID required', earlyVoting: 'Yes - 17 days', registrationDeadline: '25 days before' }, history: [{ year: 2024, party: 'R' }, { year: 2020, party: 'R' }, { year: 2016, party: 'R' }], lean: 'S', gridRow: 4, gridCol: 7 },
  { name: 'South Carolina', abbr: 'SC', electoralVotes: 9, governor: 'Henry McMaster', governorParty: 'R', votingLaws: { idRequired: 'Photo ID required', earlyVoting: 'Yes - 15 days', registrationDeadline: '30 days before' }, history: [{ year: 2024, party: 'R' }, { year: 2020, party: 'R' }, { year: 2016, party: 'R' }], lean: 'R', gridRow: 5, gridCol: 7 },
  { name: 'Georgia', abbr: 'GA', electoralVotes: 16, governor: 'Brian Kemp', governorParty: 'R', votingLaws: { idRequired: 'Photo ID required', earlyVoting: 'Yes - 17 days', registrationDeadline: '29 days before' }, history: [{ year: 2024, party: 'R' }, { year: 2020, party: 'D' }, { year: 2016, party: 'R' }], lean: 'S', gridRow: 5, gridCol: 8 },
  { name: 'Florida', abbr: 'FL', electoralVotes: 30, governor: 'Ron DeSantis', governorParty: 'R', votingLaws: { idRequired: 'Photo ID required', earlyVoting: 'Yes - 10 days', registrationDeadline: '29 days before' }, history: [{ year: 2024, party: 'R' }, { year: 2020, party: 'R' }, { year: 2016, party: 'R' }], lean: 'R', gridRow: 6, gridCol: 8 },
  { name: 'Pennsylvania', abbr: 'PA', electoralVotes: 19, governor: 'Josh Shapiro', governorParty: 'D', votingLaws: { idRequired: 'ID for first-time', earlyVoting: 'Yes - mail only', registrationDeadline: '15 days before' }, history: [{ year: 2024, party: 'D' }, { year: 2020, party: 'D' }, { year: 2016, party: 'R' }], lean: 'S', gridRow: 2, gridCol: 9 },
  { name: 'New York', abbr: 'NY', electoralVotes: 28, governor: 'Kathy Hochul', governorParty: 'D', votingLaws: { idRequired: 'No strict ID', earlyVoting: 'Yes - 10 days', registrationDeadline: '10 days before' }, history: [{ year: 2024, party: 'D' }, { year: 2020, party: 'D' }, { year: 2016, party: 'D' }], lean: 'D', gridRow: 1, gridCol: 9 },
  { name: 'New Jersey', abbr: 'NJ', electoralVotes: 14, governor: 'Phil Murphy', governorParty: 'D', votingLaws: { idRequired: 'No strict ID', earlyVoting: 'Yes - mail only', registrationDeadline: '21 days before' }, history: [{ year: 2024, party: 'D' }, { year: 2020, party: 'D' }, { year: 2016, party: 'D' }], lean: 'D', gridRow: 3, gridCol: 9 },
  { name: 'Delaware', abbr: 'DE', electoralVotes: 3, governor: 'Matt Meyer', governorParty: 'D', votingLaws: { idRequired: 'ID requested', earlyVoting: 'Yes - 10 days', registrationDeadline: 'Same-day' }, history: [{ year: 2024, party: 'D' }, { year: 2020, party: 'D' }, { year: 2016, party: 'D' }], lean: 'D', gridRow: 3, gridCol: 10 },
  { name: 'Maryland', abbr: 'MD', electoralVotes: 10, governor: 'Wes Moore', governorParty: 'D', votingLaws: { idRequired: 'No strict ID', earlyVoting: 'Yes - 8 days', registrationDeadline: 'Same-day' }, history: [{ year: 2024, party: 'D' }, { year: 2020, party: 'D' }, { year: 2016, party: 'D' }], lean: 'D', gridRow: 4, gridCol: 8 },
  { name: 'DC', abbr: 'DC', electoralVotes: 3, governor: 'Muriel Bowser (Mayor)', governorParty: 'D', votingLaws: { idRequired: 'No strict ID', earlyVoting: 'Yes - 15 days', registrationDeadline: 'Same-day' }, history: [{ year: 2024, party: 'D' }, { year: 2020, party: 'D' }, { year: 2016, party: 'D' }], lean: 'D', gridRow: 4, gridCol: 9 },
  { name: 'Connecticut', abbr: 'CT', electoralVotes: 7, governor: 'Ned Lamont', governorParty: 'D', votingLaws: { idRequired: 'ID requested', earlyVoting: 'Yes - 14 days', registrationDeadline: 'Same-day' }, history: [{ year: 2024, party: 'D' }, { year: 2020, party: 'D' }, { year: 2016, party: 'D' }], lean: 'D', gridRow: 2, gridCol: 10 },
  { name: 'Rhode Island', abbr: 'RI', electoralVotes: 4, governor: 'Dan McKee', governorParty: 'D', votingLaws: { idRequired: 'Photo ID required', earlyVoting: 'Yes - 20 days', registrationDeadline: '30 days before' }, history: [{ year: 2024, party: 'D' }, { year: 2020, party: 'D' }, { year: 2016, party: 'D' }], lean: 'D', gridRow: 2, gridCol: 11 },
  { name: 'Massachusetts', abbr: 'MA', electoralVotes: 11, governor: 'Maura Healey', governorParty: 'D', votingLaws: { idRequired: 'No strict ID', earlyVoting: 'Yes - 17 days', registrationDeadline: '10 days before' }, history: [{ year: 2024, party: 'D' }, { year: 2020, party: 'D' }, { year: 2016, party: 'D' }], lean: 'D', gridRow: 1, gridCol: 10 },
  { name: 'Vermont', abbr: 'VT', electoralVotes: 3, governor: 'Phil Scott', governorParty: 'R', votingLaws: { idRequired: 'No strict ID', earlyVoting: 'Yes - 45 days', registrationDeadline: 'Same-day' }, history: [{ year: 2024, party: 'D' }, { year: 2020, party: 'D' }, { year: 2016, party: 'D' }], lean: 'D', gridRow: 0, gridCol: 10 },
  { name: 'New Hampshire', abbr: 'NH', electoralVotes: 4, governor: 'Kelly Ayotte', governorParty: 'R', votingLaws: { idRequired: 'Photo ID required', earlyVoting: 'No', registrationDeadline: 'Same-day' }, history: [{ year: 2024, party: 'D' }, { year: 2020, party: 'D' }, { year: 2016, party: 'D' }], lean: 'S', gridRow: 0, gridCol: 11 },
  { name: 'Maine', abbr: 'ME', electoralVotes: 4, governor: 'Janet Mills', governorParty: 'D', votingLaws: { idRequired: 'No strict ID', earlyVoting: 'Yes - 30 days', registrationDeadline: 'Same-day' }, history: [{ year: 2024, party: 'D' }, { year: 2020, party: 'D' }, { year: 2016, party: 'D' }], lean: 'D', gridRow: 0, gridCol: 12 },
]

export const VOTER_TURNOUT: { year: number; turnout: number }[] = [
  { year: 1980, turnout: 52.6 },
  { year: 1984, turnout: 53.1 },
  { year: 1988, turnout: 50.1 },
  { year: 1992, turnout: 55.2 },
  { year: 1996, turnout: 49.0 },
  { year: 2000, turnout: 50.3 },
  { year: 2004, turnout: 55.7 },
  { year: 2008, turnout: 57.1 },
  { year: 2012, turnout: 54.9 },
  { year: 2016, turnout: 55.7 },
  { year: 2020, turnout: 66.8 },
  { year: 2024, turnout: 65.6 },
]

export const VOTER_JOURNEY_STEPS = [
  {
    id: 'register',
    title: 'Check Your Registration',
    description: 'Verify your voter registration status or register for the first time.',
    link: 'https://www.vote.org/am-i-registered-to-vote/',
    linkText: 'Check at Vote.org',
  },
  {
    id: 'polling',
    title: 'Find Your Polling Place',
    description: 'Locate your designated voting location for election day.',
    link: 'https://www.vote.org/polling-place-locator/',
    linkText: 'Find your location',
  },
  {
    id: 'id',
    title: 'Know What ID to Bring',
    description: 'Voter ID requirements vary by state. Check what you need.',
    link: 'https://www.vote.org/voter-id-laws/',
    linkText: 'Check ID requirements',
  },
  {
    id: 'reminder',
    title: 'Set Election Day Reminder',
    description: 'Never miss an election. Set reminders for all upcoming election dates.',
    link: '',
    linkText: '',
  },
  {
    id: 'candidates',
    title: 'Research Your Ballot',
    description: 'Learn about the candidates and measures on your specific ballot.',
    link: 'https://www.vote.org/ballot-information/',
    linkText: 'View ballot info',
  },
]

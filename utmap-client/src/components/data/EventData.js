import locationData from './LocationData'
//example events REMOVE once the backend is connected
const exampleEvents = [
	{ startDate: '2021-01-03T09:45', 
	endDate: '2021-01-03T10:00', 
	title: 'Cry and Code',  
	description: `Ever feel so overwhelmed that you wanna break down. Well in this event, 
	you can do that and more. We rent our couches so you can cry on a comfortable surface. 
	It's okay if you just want to chill and cry with friends or use this time to improve
	your CS skills. As a pro-coder and crier, I use this event everyday. Sometimes we allow
	students to book their own room in advanced so if you wanted to blast Comfortably
	Numb, we got you! Maybe your dog died or your partner broke up with you but you got an
	Assignment due in 12 hours. Don't worry we got professional yellers to motivate you!
	They will come into your private room and yell at you while you cry.`,
	location: locationData[0],
	sublocation: 'Spiegal Hall',
	organizer: 'Qianqian Feng'
	},
	{
		organizer : "MCSS",
		title : "Game Night",
		description : "Come join us for Cards Against Humanity and Super Smash Bros.",
		startDate : "2021-03-20T17:00:00Z",
		endDate : "2021-03-20T21:00:00Z",
		location : locationData[1],
		sublocation : "DH2000"
	  }
];

export default exampleEvents;
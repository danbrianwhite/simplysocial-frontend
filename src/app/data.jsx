/* begin: state and data variables */

/*
   some variables to hold data for the frontend views
*/

/* App State data for setting active view */
var appState = {
	page: (window.location.hash).toLowerCase() === '#settings' ? 'settings' : 'home',
};


/* 
   State data for homepage to allow users to specify
   if posts should be displayed in a list or tiled
*/
var homeData = {
	list: true
};


var settingsData = {

	avatar: './assets/avatars_85/0.jpg',
	name: 'Jessica Tuan',
	email: 'jessica@mail.com',
	password: '',
	passwordRetype: '',

	notificationSettings:
	{
		0: true,
		1: true,
		2: true,
		3: true
	},

	privacySettings:
	{
		0: true,
		1: false,
		2: false,
		3: true,
		4: true,
		5: true
	}
	
	
};

var modalPostIDImage = null;


var postData = [

	{
		post: {
				name: 'Sam Soffes',
				avatar: './assets/avatars_40/1.jpg',
				content: [
					{type: 'text', data: 'How to Get Inspired: the Right Way - Designmodo '},
					{type: 'link', data: 'bit.ly/1lE4uJc'},
					{type: 'text', data: ' Good stuff from '},
					{type: 'shoutout', data: '@designmodo!'}
				],
				timeSincePost: '3m'
			},

		replies: [
					{
						name: 'Jed Bridges',
						avatar: './assets/avatars_40/2.jpg',
						content: [
							{type: 'text', data: 'Great way to start the week. Thanks for sharing!'}
						],
						timeSincePost: '1h'
					},
					{
						name: 'Ren Walker',
						avatar: './assets/avatars_40/3.jpg',
						content: [
							{type: 'text', data: 'Feeling inspired now... thanks for great article '},
							{type: 'shoutout', data: '@designmodo!'}
						],
						timeSincePost: '1h'
					}

			]
	},

	{
		post: {
				name: 'Meg Robichau',
				avatar: './assets/avatars_40/4.jpg',
				content: [
					{type: 'text', data: 'My view this morning is simply beautiful... '},
					{type: 'link', data: 'instagram.com/p/mV0PUrHRwQ/'}
				],
				timeSincePost: '25m',
				imageAsset: {
					post: './assets/posts/images/0.jpg',
					large: './assets/posts/images-large/0.jpg'
				}
			}
	},

	{
		post: {
				name: 'Kerem Suer',
				avatar: './assets/avatars_40/5.jpg',
				content: [
					{type: 'text', data: 'Apps to Turn Your Pipe Dreams Into Prototypes '},
					{type: 'link', data: 'on.mash.to/1oubyu8'}
				],
				timeSincePost: '50m'
			}
	},

	{
		post: {
				name: 'Liang Shi',
				avatar: './assets/avatars_40/6.jpg',
				content: [
					{type: 'text', data: 'How to get animations out of your head. '},
					{type: 'link', data: 'http://bit.ly/1q7BngO'},
					{type: 'text', data: ' Funny and useful.'}
				],
				timeSincePost: '1h'
			}
	},

	{
		post: {
				name: 'Vitor Leal',
				avatar: './assets/avatars_40/7.jpg',
				content: [
					{type: 'text', data: 'You have to see this bike. It will make your daily commute a absolute joy ride! '},
					{type: 'link', data: 'vimeo.com/p/mV0PUrHRwQ/'}
				],
				timeSincePost: '25min',
				videoAsset: {poster: './assets/posts/video-posters/0.jpg'}
			}
	},



	

	{
		post: {
				name: 'Pallavi Gupta',
				avatar: './assets/avatars_40/8.jpg',
				content: [
					{type: 'text', data: 'Need some reading? 11 free ebooks for designers | Creative Bloq '},
					{type: 'link', data: 'bit.ly/1lE5QDM'},
					{type: 'text', data: ' via '},
					{type: 'shoutout', data: '@netmag'}
				],
				timeSincePost: '3m'
			},

		replies: [
					{
						name: 'Anthony Sukow',
						avatar: './assets/avatars_40/9.jpg',
						content: [
							{type: 'text', data: 'Thanks for sharing! These are great'}
						],
						timeSincePost: '1h'
					},
					{
						name: 'Matthew Spiel',
						avatar: './assets/avatars_40/10.jpg',
						content: [
							{type: 'text', data: 'These are awesome! Here is another list of free resources for designers to check out '},
							{type: 'text', data: ' via '},
							{type: 'shoutout', data: '@smashingmag'}
						],
						timeSincePost: '1h'
					}

			]
	}


];


/* end: state and data variables */


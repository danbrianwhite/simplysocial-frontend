/* starting partials for the views */


/* begin: Page component */

/* this component renders the page and it's sub components */

var Page = React.createClass({
	getInitialState: function() {
	    return {
	    	page: this.props.state.page
	    };
	},
    render: function() {

    	var body;
    	switch(this.props.state.page)
    	{
    		case 'home': 
    			body = <Home data={this.props.homeData}/>;
    			break;
    		case 'settings': 
    			body = <Settings data={this.props.settingsData}/>;
    			break;
    	}

        return (
        	<div className="">
	        	<div className="page">
	        		<PageLoader/>
	        		<Header/>
	        		{body}
	        		<Footer/>
	        	</div>
				<MessageNewModal/>
	    		<ImageDetailModal/>
        	</div>
    	);
    }
});

/* end: Page component */



/* begin: page loader */

var PageLoader = React.createClass({
    render: function() {
        return (<div className="page-loader"></div>);
    }
});

/* end: page loader */



/* begin: Header */

/* this is the header component */

var Header = React.createClass({
	getInitialState: function() {
	    return {
	    	logo: {link: 'home'}
	    };
	},
    render: function() {
        return (
        	<div className="header-wrapper header-wrapper-relative">
				<div className="header center box-sizing-border-box clear-float">

					<Logo data={this.state.logo}/>

					<div className="block float-right">
						<MessageNewButton/>

						<div className="search float-left box-sizing-border-box">
							<input className="input search-box float-left"/>
							<button className="button float-left" tabIndex="1"><i className="icon icon-search"></i></button>
						</div>

						<UserDropDown/>
					</div>


				</div>
			</div>
        );
    }
});

/* end: header */



/* begin: Message New Button */

var MessageNewButton = React.createClass({

    render: function() {
        return (
        	<div className="message-new float-left">
				<button className="button" tabIndex="1"><i className="icon icon-newmessage"></i></button>
			</div>
        );
    }
});

/* end: Message New Button */



/* begin: Logo */

var Logo = React.createClass({
	handleClick: function(e) {
		e.preventDefault();
		setView(this.props.data.link);
	},
    render: function() {
        return (
        	<div className="logo float-left">
				<button onClick={this.handleClick} className="button header-logo" tabIndex="1"><i className="icon icon-logo"></i> <span className="text simply">simply</span><span className="text social">social</span></button>
			</div>
        );
    }
});

/* end: Logo */



/* begin: DropDown Link and DropDown Menu */

/* this is the user dropdown menu */

var DropDownLink = React.createClass({
	handleClick: function(e) {
		e.preventDefault();
		setView(this.props.data.link);
	},
    render: function() {
        return (
        	<a onClick={this.handleClick} href={this.props.data.link} className="option">{this.props.data.link}</a>
        );
    }
});

var UserDropDown = React.createClass({
	getInitialState: function() {
	    return {data: [
	        {tag: 'settings', text: 'Settings'},
	        {tag: 'followers', text: 'Followers'},
	        {tag: 'following', text: 'Following'},
	        {tag: 'settings', text: 'Settings', link:'settings'}
	    ]};
	},
	handleClick: function(e) {
		e.preventDefault();
		setView(e.target.href);
	},
    render: function() {

        var options = this.state.data.map(function (option, index) {
        
        	if(typeof option.link !== 'undefined')
        	{
        		return (
		    		<DropDownLink data={option} key={index}/>
		    	);
        	}
        	else
        	{
        		return (
		    		<div className="option" key={index}>{option.text}</div>
		    	);
        	}
	      
	    },this);

        return (
        	<div className="user float-left">
				<button className="button" tabIndex="1">
					<div className="avatar-user float-left"><img src="./assets/avatars_30/0.jpg"/></div>
					<i className="icon icon-arrow-down float-left"></i>
				</button>
				<div className="dropdown hidden">
					<i className="icon icon-arrow-up"></i>
					<div className="dropdown-inner">
						{options}
					</div>
				</div>
			</div>
        );
    }
});

/* end: DropDown Link and DropDown Menu */



/* begin: Home view  container */

var Home = React.createClass({
	componentDidMount: function() {
		$(window).resize();
	},
    render: function() {
        return (
			<div className="body">

				<HeroWithLinks/>

				<Posts/>

			</div>
        );
    }
});

/* end: Home view  container */



/* begin: Post Replies */

var PostReplies = React.createClass({
    render: function() {

    	var replies;

    	if(typeof this.props.data !== 'undefined')
    	{
    		replies = this.props.data.map(function(reply, index){

    			var postOptions;

	    		if(homeData.list)
	    		{
	    			postOptions = (
	    			<div className="post-options float-right">
						<button className="reply button button-clear" tabIndex="1"><i className="icon icon-reply"></i></button>
						<button className="like button button-clear" tabIndex="1"><i className="icon icon-like"></i></button>
						<span className="time">{reply.timeSincePost}</span>

					</div>
					);
	    		}
	    		else
	    		{
	    			postOptions = null;
	    		}

	    		return (
	    			<div className="reply-box" key={index}>
						<div className="avatar-thumb float-left"><img src={reply.avatar}/></div>
						<div className="post-contents">
							<div className="clear-float">
								<div className="name float-left">{reply.name}</div>
								{postOptions}
							</div>
							<div>
								<PostComment data={reply.content}/>
							</div>
						</div>
					</div>
				);

	    	});

    	}
    	else
    	{
    		replies = null;
    	}

    	if(replies !== null)
    	{
    		 return (
				<div className="replies hidden">
					{replies}
					<div className="reply-box">
						<input className="message-reply box-sizing-border-box" placeholder="Reply..."/>
					</div>
				</div>
	        );
    	}
    	else
    	{
    		return null;
    	} 
    }
});


/* end: Post Replies */



/* begin: Post Comment */

/* this is used for both post comment and reply comment */

var PostComment = React.createClass({
    render: function() {


		var postContents = this.props.data.map(function (content, index) {
    			
			if (content.type === 'link')
			{
				return (
					<a className="webaddress" href={content.data} key={index}>{content.data}</a>
				);
			}
			else if(content.type === 'shoutout')
			{
				return (
					<a className="shoutout" href={content.data} key={index}>{content.data}</a>
				);
			}
			else
			{
				return (
					<span key={index}>{content.data}</span>
				);
			}


		},this);




        return (
        	<div className="comment">
        	{postContents}
    		</div>
        	);
    }
});

/* end: Post Comment */



/* begin Post Image component */

var PostImage = React.createClass({
	handleClick: function()
	{
		/* publis message that the user clicked the post message */
		$.publish('modalimage', [this.props.postid]);
	},
    render: function() {

    	if(typeof this.props.data !== 'undefined')
    	{
    		return (
	    		<div className="post-asset">
					<img src={this.props.data.post} className="post-image" onClick={this.handleClick} />
				</div>
			);
    	}
    	else
    	{
    		return null;
    	}
        
    }
});

/* end: Post Image component */



/* begin: Post Video component */

var PostVideo = React.createClass({
    render: function() {

    	if(typeof this.props.data !== 'undefined')
    	{
    		return (
				<div className="post-asset">
					<img src={this.props.data.poster} className="post-video-poster"/>
					<button className="play button button-clear" tabIndex="1"><i className="icon icon-play"></i></button>
				</div>
			);
    	}
    	else
    	{
    		return null;
    	}
        
    }
});

/* end: Post Video component */



/* begin: Posts component */

var Posts = React.createClass({

    render: function() {

    	var posts = postData.map(function (post, index) {


    		var expand = (typeof post.replies) === 'undefined' ? null : (
				<div className="float-left">
					<button className="button expand" tabIndex="1">
						<span>Expand</span><i className="icon icon-arrow-down"></i>
					</button>
					<button className="button collapse hidden" tabIndex="1">
						<span>Collapse</span><i className="icon icon-arrow-up"></i>
					</button>
				</div>
			);

    		var postType;

			if(typeof post.post.imageAsset !== 'undefined')
			{
				postType = 'photo';
			}
			else if(typeof post.post.videoAsset !== 'undefined')
			{
				postType = 'video';
			}
			else
			{
				postType = 'text';
			}

			var postClass = "post rounded-corners box-sizing-border-box type-"+postType;
    		
    		var postOptions = (
    			<div className="post-options float-right">
					<button className="reply button button-clear" tabIndex="1"><i className="icon icon-reply"></i></button>
					<button className="like button button-clear" tabIndex="1"><i className="icon icon-like"></i></button>
					<span className="time">{post.post.timeSincePost}</span>

				</div>
    		);

    		var postBoxBottom = ((expand !== null) || !homeData.list) ? (
    				<div className="post-box post-box-bottom clear-float">
						{expand}
						{(homeData.list ? null : postOptions)}
					</div>
				) : null;
        
	        return(
	        	<div className={postClass} key={index}>
					<div className="post-box">
						<div className="avatar-thumb float-left"><img src={post.post.avatar}/></div>
						<div className="post-contents">
							<div className="clear-float">
								<div className="name float-left">{post.post.name}</div>
								{(homeData.list ? postOptions : null)}
							</div>
							<div>
							
							<PostComment data={post.post.content} />

								
							</div>
							
						</div>
					</div>
					<PostImage data={post.post.imageAsset} postid={index}/>
					<PostVideo data={post.post.videoAsset}/>
					
					{postBoxBottom}

					<PostReplies data={post.replies}/>
					
				</div>
		      );
	    },this);


        return (
			<div className="posts-list column box-sizing-border-box">
				{posts}
			</div>
        );
    }
});

/* end: Posts component */



/* end: Hero with Links and corresponding components */

var HeroWithLinks = React.createClass({
	getInitialState: function() {
	    return {
	    	image: './assets/hero/0.jpg'
	    };
	},
    render: function() {
        return (
    		<div className="hero">
				<img src={this.state.image} className="img-hero"/>
				<div className="hero-inner">
					<div className="hero-message-new vertical-middle box-sizing-border-box">
						<div className="hero-message-new-bg rounded-corners"></div>
						<textarea className="hero-message-new-input box-sizing-border-box" placeholder="What's on your mind?" autofocus></textarea>

						<div className="hero-message-new-footer clear-float">

			
							<button className="button button-clear" tabIndex="1"><i className="icon icon-photo"></i> <span className="text">Add Photo</span></button>
							<button className="button button-clear" tabIndex="1"><i className="icon icon-video"></i> <span className="text">Add Video</span></button>

						</div>
					</div>
				</div>
				<HeroLinks/>
			</div>
		);
    }
});

var HeroLinks = React.createClass({
	getInitialState: function() {
	    return {
	    	data: [
		        {tag: 'allposts', text: 'All Posts', show: 'all', filter: ['text', 'photo', 'video'], active: true},
		        {tag: 'photos', text: 'Photos', show: 'photos', filter: ['photo'], active: false},
		        {tag: 'videos', text: 'Videos', show: 'videos', filter: ['video'], active: false}
	    	],
		};

	},
	handleListClick: function()
	{
		homeData.list = true;
		uncolumnize();
		renderApp();

	},
	handleTileClick: function()
	{
		homeData.list = false;

		columnizer();
		columnizerUpdate();

		renderApp();

	},
	componentWillUnmount: function()
	{
		uncolumnize();
	},
    render: function() {

    	var links = this.state.data.map(function (link, index) {
    		return (
	    		<HeroLink data={link} key={index}/>
	    	);
	    }, this);

	    var listButtonClass;
	    var tileButtonClass;

    	if(homeData.list === true)
    	{
    		listButtonClass = "button active";
    		tileButtonClass = "button";
    	}
    	else
    	{
    		listButtonClass = "button";
    		tileButtonClass = "button active";
    	}


        return (
			<div className="hero-links column">
				<div className="hero-links-inner column-whole">
					
					{links}

					<div className="sort float-right">
						<button onClick={this.handleListClick} className={listButtonClass} tabIndex="1">
							<i className="icon icon-list float-left"></i>
						</button>
						<button onClick={this.handleTileClick} className={tileButtonClass} tabIndex="1">
							<i className="icon icon-tile float-left"></i>
						</button>
					</div>
				</div>
			</div>
		);
    }
});

var HeroLink = React.createClass({
	getInitialState: function() {
	    return {
	    	
	    };
	},
	handleClick: function(e)
	{
		e.preventDefault();
		columnizerUpdate();
	},
    render: function() {
    	var classname = "hero-link posts-show-"+this.props.data.show;
    	if(this.props.data.active)
    	{
    		classname+= '  active';
    	}
        return (
			<a href="#" onClick={this.handleClick} className={classname}><div className="text">{this.props.data.text}</div></a>
		);
    }
});

/* end: Hero with Links and corresponding components */



/* Begin: settings view component */

var Settings = React.createClass({
	getInitialState: function() {
	    return {
	    	name: settingsData.name,
	    	email: settingsData.email
	    };
	},

	componentDidMount: function() {
		$(window).resize();
	},
	handleChange: function(event) {
		var object = {};
		object[event.target.id] = event.target.checked;
    	//\this.setState(object);
  	},
  	handleInputName: function(event)
  	{
  		this.setState({
		  name: event.target.value
		});
  	},
  	handleInputEmail: function(event)
  	{
  		this.setState({
		  email: event.target.value
		});
  	},
    render: function() {
        return (
			<div className="body">
				<form className="settings column">
					<div className="title">
						Settings
					</div>
					<div className="block">

						<div className="subtitle">
							Account
						</div>

						<div className="settings-account clear-float">
							<div className="avatar-wrapper float-left">
								<div className="avatar-thumb"><img src="./assets/avatars_85/0.jpg"/></div>
								<button className="button avatar-change" tabIndex="1">change</button>
							</div>
							<div className="settings-account-info">
								
								<div className="user icon-input box-sizing-border-box">
									<i className="icon icon-user"></i>
									<input className="input name-box box-sizing-border-box" type="text" value={this.state.name} onChange={this.handleInputName} placeholder="Full Name"/>
								</div>

								<div className="email icon-input box-sizing-border-box">
									<i className="icon icon-email"></i>
									<input className="input email-box box-sizing-border-box" type="email" value={this.state.email} onChange={this.handleInputEmail} placeholder="Email"/>
									
								</div>

								<div className="password icon-input box-sizing-border-box">
									<i className="icon icon-password"></i>
									<input className="input password-box box-sizing-border-box" type="password" placeholder="Password"/>
									<button className="button password-change change-btn" tabIndex="1">change</button>
									<button className="button password-change cancel-btn hidden" tabIndex="1">cancel</button>
								</div>

								<div className="password-retype icon-input box-sizing-border-box hidden">
									<i className="icon icon-password"></i>
									<input className="input password-box box-sizing-border-box" type="password" placeholder="Retype Password"/>
									<button className="button password-change submit-btn" tabIndex="1">submit</button>
								</div>
								
								
							</div>
						</div>


					</div>
					<div className="block">
						<div className="subtitle">
							Notifications
						</div>

						<div className="settings-privacy clear-float">
							<div className="settings-privacy-option">
								<div className="option toggle" tabIndex="1">
								    <input type="checkbox" name="check" id="toggle_1" value="toggle_1" defaultChecked={this.props.data.notificationSettings['0'] } onChange={this.onChange}/>
								    <label htmlFor="toggle_1"><span>email me when my posts are marked as favorites</span></label>
								</div>
								<div className="option toggle" tabIndex="1">
								    <input type="checkbox" name="check" id="toggle_2" value="toggle_2" defaultChecked={this.props.data.notificationSettings['1'] } onChange={this.onChange}/>
								    <label htmlFor="toggle_2"><span>email me when I'm mentioned</span></label>
								</div>
								<div className="option toggle" tabIndex="1">
								    <input type="checkbox" name="check" id="toggle_3" value="toggle_3" defaultChecked={this.props.data.notificationSettings['2'] } onChange={this.onChange}/>
								    <label htmlFor="toggle_3"><span>email me when I get a reply</span></label>
								</div>
								<div className="option toggle" tabIndex="1">
								    <input type="checkbox" name="check" id="toggle_4" value="toggle_4" defaultChecked={this.props.data.notificationSettings['3'] } onChange={this.onChange}/>
								    <label htmlFor="toggle_4"><span>email me when someone follows me</span></label>
								</div>
							</div>
						</div>
					</div>
					<div className="block">

						<div className="subtitle">
							Privacy
						</div>

						<div className="settings-privacy clear-float">
							<div className="settings-privacy-option">
								<div className="option radio" tabIndex="1">
								    <input type="radio" name="whocantagme" id="check_1" value="check_1" defaultChecked={this.props.data.privacySettings['0']} onChange={this.onChange}/>
								    <label htmlFor="check_1"><span>allow anyone to tag me</span></label>
								</div>
								<div className="option radio" tabIndex="1">
								    <input type="radio" name="whocantagme" id="check_2" value="check_2" defaultChecked={this.props.data.privacySettings['1']} onChange={this.onChange}/>
								    <label htmlFor="check_2"><span>only allow people I follow to tag me</span></label>
								</div>
								<div className="option radio" tabIndex="1">
								    <input type="radio" name="whocantagme" id="check_3" value="check_3" defaultChecked={this.props.data.privacySettings['2']} onChange={this.onChange}/>
								    <label htmlFor="check_3"><span>don't allow anyone to tag me</span></label>
								</div>
								<div className="option checkbox" tabIndex="1">
								    <input type="checkbox" name="check" id="check_4" value="check_4" defaultChecked={this.props.data.privacySettings['3']} onChange={this.onChange}/>
								    <label htmlFor="check_4"><span>add location to my posts</span></label>
								</div>
								<div className="option checkbox" tabIndex="1">
								    <input type="checkbox" name="check" id="check_5" value="check_5" defaultChecked={this.props.data.privacySettings['4']} onChange={this.onChange}/>
								    <label htmlFor="check_5"><span>let others find me by my email address</span></label>
								</div>
								<div className="option checkbox" tabIndex="1">
								    <input type="checkbox" name="check" id="check_6" value="check_6" defaultChecked={this.props.data.privacySettings['5']} onChange={this.onChange}/>
								    <label htmlFor="check_6"><span>tailor ads based on my information</span></label>
								</div>
							</div>
						</div>

					</div>

					<div className="block clear-float">

						<button className="submit button button-green float-left" type="submit" tabIndex="1">Save Changes</button>

					</div>
				</form>
			</div>
        );
    }
});

/* end: settings view component */



/* begin: footer component */

var Footer = React.createClass({
	getInitialState: function() {
	    return {
	    	copyright: String.fromCharCode(169) + ' 2014 simplysocial'
	    };
	},
    render: function() {
        return (
    		<div className="footer">
				<a href="#" className="footer-link">About Us</a>
				<a href="#" className="footer-link">Support</a>
				<a href="#" className="footer-link">Privacy</a>
				<a href="#" className="footer-link">Terms</a>

				<div className="footer-copyright">{this.state.copyright}</div>
			</div>
		);
    }
});

/* end: footer component */



/* begin: Message New - Modal Window component */

var MessageNewModal = React.createClass({
    render: function() {
        return (
			<div className="message-new-modal modalwrapper center hidden">

				<div className="modal rounded-corners gray padding padding-extra-lr color vertical-middle horizontal-center box-sizing-border-box">
					<div>
						<div className="modal-title">
							<h1>
								Create new message
							</h1>
						</div>
						<div className="modal-body">
							<textarea className="textarea clear-pmb margin-top margin-bottom input-rounded input-padding box-sizing-border-box" tabIndex="1"></textarea>
						</div>
						
						<div className="modal-footer clear-float">
							<button className="modal-button button-clear" tabIndex="1"><i className="icon icon-photo"></i> <span className="text">Add Photo</span></button>
							<button className="modal-button button-clear" tabIndex="1"><i className="icon icon-video"></i> <span className="text">Add Video</span></button>
							<button className="modal-button post-comment button-green float-right" tabIndex="1">Post</button>
						</div>
					</div>
					<div className="modal-close">
						<button className="icon-close"></button> 

					</div>

				</div>



				<div className="modal-blackout"></div>


			</div>
		);
    }
});

/* end: Message New - Modal Window component */



/* begin: Image Detail - Modal Window component */

var ImageDetailModal = React.createClass({
	getInitialState: function() {
	    return {
	    	modalPostIDImage: null,
	    	showModal: false
	    };
	},
	componentDidMount: function()
	{
		var _this = this;
		$.subscribe('modalimage', function(e, postid){
			_this.setState({modalPostIDImage: postid, showModal: true});
		});
	},
	componentWillUnmount: function()
	{
		$.unsubscribe('modalimage');
	},
	componentDidUpdate: function()
	{
		if(this.state.showModal)
		{
			this.setState({showModal: false});
			//wait for ReactJS to update the dom before showing modal
			$('.page').blur({from: 0, to: 10});
			var _idmmw = $('.image-detail-modal.modalwrapper');
				_idmmw.fadeIn(350);
				_idmmw.find('.modal').scrollTop(0);
		}

	},
    render: function() {

    	if(this.state.modalPostIDImage === null)
    	{
    		return null;
    	}
    	else
    	{
    		return (
    		
				<div className="image-detail-modal modalwrapper center hidden">

					<div className="modal padding padding-extra-lr color vertical-middle horizontal-center box-sizing-border-box">
						<div>

							<div className="post rounded-corners box-sizing-border-box type-photo">
								<div className="post-asset">
									<img src={postData[this.state.modalPostIDImage].post.imageAsset.large} className="post-image"/>
								</div>

								<div className="post-box">
									<div className="avatar-thumb float-left"><img src={postData[this.state.modalPostIDImage].post.avatar}/></div>
									<div className="post-contents">
										<div className="clear-float">
											<div className="name float-left">{postData[this.state.modalPostIDImage].post.name}</div>
											<div className="post-options float-right">
												<button className="reply button button-clear" tabIndex="1"><i className="icon icon-reply"></i></button>
												<button className="like button button-clear" tabIndex="1"><i className="icon icon-like"></i></button>
												<span className="time">{postData[this.state.modalPostIDImage].post.timeSincePost}</span>

											</div>
										</div>
										<div>
											<PostComment data={postData[this.state.modalPostIDImage].post.content} />
										</div>
									</div>
								</div>
								<div className="reply-box">
										<input className="message-reply box-sizing-border-box" placeholder="Reply..."/>
								</div>
							</div>

						</div>
						<div className="modal-close">
							<button className="icon-close"></button> 

						</div>

					</div>



					<div className="modal-blackout"></div>


				</div>
			);
    	}

        
    }
});

/* end: Image Detail - Modal Window component */



/* begin: rendering functions */


/* change view functionality */
var setView = function(view)
{
	appState.page = view;
	window.location.hash = view;
	$('body').scrollTop(0);

	renderApp();
};


/* checking hash for view */
var hashChanged = function() {

	var _view;

    if ((window.location.hash).toLowerCase() === '#settings') 
    {
        _view = 'settings';
    }
    else
    {
 		_view = 'home';
    }

    setView(_view);
};

window.onhashchange = hashChanged;


/* render the app */
var renderApp = function()
{
	React.render(<Page state={appState} homeData={homeData} settingsData={settingsData}/>, document.getElementById('container'));	
};

renderApp();



/* end: rendering functions */




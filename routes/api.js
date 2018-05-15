// Full Documentation - https://www.turbo360.co/docs
const turbo = require('turbo360')({site_id: process.env.TURBO_APP_ID})
const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})
const router = vertex.router()

/*  This is a sample API route. */

router.get("/:resource", function(req, res){
	const { resource } = req.params
	const { query } = req

    turbo.fetch(resource, query)
	    .then(data=>{
	    	res.json({
				confirmation: 'success',
				data: data,
				query: req.query  //from the url query string
			})
	    })
	    .catch(err=>{
	    	res.json({
				confirmation: 'fail',
				message: "Sorry, something went wrong",
			})
			return
	    })	
})

router.post('/signup', function(req, res){	
	turbo.createUser(req.body)
	.then(data => {
		res.json({
			confirmation: 'success',
			data: data
		})
	})
	.catch(err => {
		res.json({
			confirmation: 'fail',
			message: err.message
		})
	})
})

router.post('/login', function(req, res){	
	turbo
	  .login(req.body)
	  .then((user) => {
		return turbo.fetch('photo', {user: user.id})
	})	
	  .then(data => {
		res.json({
			confirmation: 'success',
			data: data
		})
	  })
	  .catch(err => {
		res.json({
			confirmation: 'fail',
			message: err.message
		})
	  })
})

router.post("/users/:id/photo", function(req, res){	
	// const userId = req.params.id;
	// console.log("A")
	const userId = req.params.id;
	// console.log(req.params);
	// console.log(userId);
	console.log(req.params);
	// console.log(req)
	// console.log(req.body)
	const myPhoto = {
		url: req.body.imageUrl,
		user: req.params.id,
	};
	turbo
		.create("photo", myPhoto)
		.then(data => {
		    res.json({
					confirmation: 'success',
					data: data,
			})
			return
	    })
	    .catch(err=>{
	    	res.json({
				confirmation: 'fail',
				message: "Sorry, something went wrong",
			})
			return
	    })	
})

router.get('/:resource/:id', function(req, res){
	res.json({
		confirmation: 'success',
		resource: req.params.resource,
		id: req.params.id,
		query: req.query // from the url query string
	})
})



module.exports = router

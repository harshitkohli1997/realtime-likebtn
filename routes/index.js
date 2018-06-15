let router = require('express').Router();

let Post = require('./../models/post');

router.get('/', (req, res, next) => {
    Post.find().exec((err, posts) => {
        res.render('index', { posts: posts });
    });
});

router.post('/posts/:id/act', (req, res, next) => {
    const action = req.body.action;
    const counter = action === 'Like' ? 1 : -1;
    Post.update({_id: req.params.id}, {$inc: {likes_count: counter}}, {}, (err, numberAffected) => {
        let Pusher = require('pusher');

        let pusher = new Pusher({
            appId: '544122',
            key: '0dc58ad07a8423c9cba7',
            secret: '786ee0011370367e4210',
            cluster: 'ap2',
            encrypted: true
          });
        let payload = { action: action, postId: req.params.id };
        pusher.trigger('post-events', 'postAction', payload, req.body.socketId);
        res.send('');
    });
});


module.exports = router;

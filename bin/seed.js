#!/usr/bin/env node

require('mongoose').connect('mongodb://harshit:scooby1234@ds257077.mlab.com:57077/social-dev')
.then(() => {
    console.log('we are in seed');
})
let faker = require('faker');

let Post = require('../models/post');

// remove all data from the collection first
Post.remove({})
    .then(() => {
        let posts = [];
        for (let i = 0; i < 30; i++) {
            posts.push({
                text: faker.lorem.sentence(),
                posted_at: faker.date.past(),
                likes_count: Math.round(Math.random() * 20),
                author: faker.name.findName()
            });
        }
        return Post.create(posts);
    })
    .then(() => {
        process.exit();
    })
    .catch((e) => {
        console.log(e);
        process.exit(1);
    });
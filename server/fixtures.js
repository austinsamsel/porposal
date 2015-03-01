if (Posts.find().count() === 0) {
  var now = new Date().getTime();

  // create two users
  var austoId = Meteor.users.insert({
    profile: { name: 'Austin Samsel' }
  });
  var austo = Meteor.users.findOne(austoId);
  var parisId = Meteor.users.insert({
    profile: { name: 'Paris Pan' }
  });
  var paris = Meteor.users.findOne(parisId);

  var porposalId = Posts.insert({
    title: 'Klast',
    userId: paris._id,
    author: paris.profile.name,
    content: 'a contract here.',
    submitted: new Date(now - 7 * 3600 * 1000),
    commentsCount: 2,
    clients: [],
    accept: 0
  });

  Comments.insert({
    postId: porposalId,
    userId: austo._id,
    author: austo.profile.name,
    submitted: new Date(now - 5 * 3600 * 1000),
    body: 'Interesting. Gonna check this over w my team.'
  });

  Comments.insert({
    postId: porposalId,
    userId: paris._id,
    author: paris.profile.name,
    submitted: new Date(now - 3 * 3600 * 1000),
    body: 'Wow looks great. Awesome.'
  });

  Posts.insert({
    title: 'BKFP',
    userId: austo._id,
    author: austo.profile.name,
    content: 'anotehr contract',
    submitted: new Date(now - 10 * 3600 * 1000),
    commentsCount: 0,
    clients: [],
    accept: 0
  });

  Posts.insert({
    title: 'Klast',
    userId: austo._id,
    author: austo.profile.name,
    content: 'sup. a proposal and a contract',
    submitted: new Date(now - 12 * 3600 * 1000),
    CommentsCount: 0,
    clients: [],
    accept: 0
  });

  for (var i = 0; i < 10; i++) {
    Posts.insert({
      title: 'Test post #' + i,
      author: paris.profile.name,
      userId: paris._id,
      content: 'sample proposal and contract' + i,
      submitted: new Date(now - i * 3600 * 1000),
      commentsCount: 0,
clients: [],
      accept: 0
    });
  }
}
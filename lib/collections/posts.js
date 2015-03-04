Posts = new Mongo.Collection('posts');

Posts.allow({
  update: function(userId, post) { return ownsDocument(userId, post); },
  remove: function(userId, post) { return ownsDocument(userId, post); }
});

Posts.deny({
  update: function(userId, post, fieldNames, modifier) {
    var errors = validatePost(modifier.$set);
    return errors.title || errors.url;
  }
});

validatePost = function (post) {
  var errors = {};
  if (!post.title)
    errors.title = "Please fill in a headline";
  if (!post.content)
    errors.content =  "Please fill in some content";
  if (!post.expiration)
    errors.expiration =  "Please add an expiration date";
  return errors;
}

Meteor.methods({
  postInsert: function(postAttributes) {
    check(Meteor.userId(), String);
    check(postAttributes, {
      title: String,
      content: String,
      expiration: String
    });

    var errors = validatePost(postAttributes);

    if (errors.title || errors.content || errors.expiration)
      throw new Meteor.Error('invalid-post', "You must submit a title, expiration date, and content for your post");

    var user = Meteor.user();
    var post = _.extend(postAttributes, {
      userId: user._id, 
      author: user.username, 
      submitted: new Date(),
      commentsCount: 0,
      signatureStatus: "pending"
    });
    var postId = Posts.insert(post);
    return {
      _id: postId
    };
  }
});
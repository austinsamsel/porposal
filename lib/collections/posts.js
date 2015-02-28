Posts = new Mongo.Collection('posts');

Posts.allow({
  update: function(userId, post) { return ownsDocument(userId, post); },
  remove: function(userId, post) { return ownsDocument(userId, post); }
});

Posts.deny({
  update: function(userId, post, fieldNames) {
    //may only edit the following two fields:
    return (_.without(fieldNames, 'content', 'title').length > 0);
  }
})

validatePost = function (post) {
  var errors = {};
  if (!post.title)
    errors.title = "Please fill in a headline";
  if (!post.content)
    errors.content =  "Please fill in some content";
  return errors;
}

Meteor.methods({
  postInsert: function(postAttributes) {
    check(Meteor.userId(), String);
    check(postAttributes, {
      title: String,
      content: String
    });

    var errors = validatePost(postAttributes);

    if (errors.title || errors.content)
      throw new Meteor.Error('invalid-post', "You must submit a title and content for your post");

    var user = Meteor.user();
    var post = _.extend(postAttributes, {
      userId: user._id, 
      author: user.username, 
      submitted: new Date()
    });
    var postId = Posts.insert(post);
    return {
      _id: postId
    };
  }
});
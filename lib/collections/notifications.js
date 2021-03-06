Notifications = new Mongo.Collection('notifications');

Notifications.allow({
  update: function(userId, doc, fieldNames) {
    return ownsDocument(userId, doc) && 
      fieldNames.length === 1 && fieldNames[0] === 'read';
  }
});

createCommentNotification = function(comment) {
  var post = Posts.findOne(comment.postId);
  if (comment.userId !== post.userId) {
    Notifications.insert({
      userId: post.userId,
      postId: post._id,
      submitted: new Date(),
      commentId: comment._id,
      commenterName: comment.author,
      read: false
    });
  }
};

createSignatureNotification = function(signature) {
  var post = Posts.findOne(signature.postId);
  if (signature.userId !== post.userId) {
    Notifications.insert({
      userId: post.userId,
      postId: post._id,
      submitted: new Date(),
      signatureId: signature._id,
      signerName: signature.author,
      read: false
    });
  }
};
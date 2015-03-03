Signatures = new Mongo.Collection('signatures');

Meteor.methods({
  signatureInsert: function(signatureAttributes) {
    check(this.userId, String);
    check(signatureAttributes, {
      postId: String,
      body: String
    });
    var user = Meteor.user();
    var post = Posts.findOne(signatureAttributes.postId);
    if (!post)
      throw new Meteor.Error('invalid-signature', 'You must signature on a post');
    signature = _.extend(commentAttributes, {
      userId: user._id,
      author: user.username,
      submitted: new Date()
    });
    return Signatures.insert(signature);
  }
});
Signatures = new Mongo.Collection('signatures');

Meteor.methods({
  signatureInsert: function(signatureAttributes) {
    check(this.userId, String);
    check(signatureAttributes, {
      postId: String,
      signage: String
    });
    var user = Meteor.user();
    var post = Posts.findOne(signatureAttributes.postId);
    if (!post)
      throw new Meteor.Error('invalid-signature', 'You must signature on a post');
    signature = _.extend(signatureAttributes, {
      userId: user._id,
      author: user.username,
      authorIP: this.connection.clientAddress,
      submitted: new Date()
    });

    Posts.update(signature.postId, {$set: {signatureStatus: "approved"}});

    //create the signature, save the id
    signature._id = Signatures.insert(signature);
    //now create a notification, informing he user that there's been a comment
    createSignatureNotification(signature);
    return signature._id;

    //return Signatures.insert(signature);
  }
});
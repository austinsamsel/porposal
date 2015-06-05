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
    var ip = "0.0.0.0";
    if(Meteor.isServer) {
        if(!this.connection.clientAddress)
           throw new Meteor.Error(403, "Server Error: You must be connected.");
        else
           ip = this.connection.clientAddress;
    }
    if (!post)
      throw new Meteor.Error('invalid-signature', 'You must signature on a post');
    signature = _.extend(signatureAttributes, {
      userId: user._id,
      author: user.emails[0].address,
      authorIP: ip,
      submitted: new Date()
    });

    Posts.update(signature.postId, {$inc: {signatureStatus: 1}});

    //create the signature, save the id
    signature._id = Signatures.insert(signature);
    //now create a notification, informing he user that there's been a comment
    createSignatureNotification(signature);
    return signature._id;

    //return Signatures.insert(signature);
  }
});
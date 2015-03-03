Template.postItem.helpers({
  ownPost: function() {
    return this.userId === Meteor.userId();
  },
  signatureStatus: function() {
    var pending = Signatures.find({postId: this._id}).count();

    if (pending === 0) {
      return "pending"
    } else {
      "approved"
    }
  }
});
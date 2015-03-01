Template.postPage.helpers({
  comments: function() {
    return Comments.find({postId: this._id});
  },
  signatures: function() {
    return Signatures.find({postId: this._id});
  }
});
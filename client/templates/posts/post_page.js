Template.postPage.helpers({
  comments: function() {
    return Comments.find({postId: this._id});
  }
});

Template.postPage.events({
  'click .upvote': function(e){
    e.preventDefault();
    Meteor.call('accept', this._id)
  }
})
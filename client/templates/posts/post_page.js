Template.postPage.helpers({
  comments: function() {
    return Comments.find({postId: this._id});
  },
  signatures: function() {
    return Signatures.find({postId: this._id});
  },
  isFresh: function() {
    a = Posts.findOne();
    ends = a.expiration;
    today = Date.now();
    if ((new Date(ends).getTime()) >= (new Date(today).getTime())) {
      return true;
    }
  }
});


  // isExpired: function(){
  //   if (signatureStatus === 'pending' && Date.now() > expiration){
  //     return 'isExpired'
  //   };
  // }
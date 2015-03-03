Template.signatureSubmit.created = function() {
  Session.set('signatureSubmitErrors', {});
}

Template.signatureSubmit.helpers({
  errorMessage: function(field) {
    return Session.get('signatureSubmitErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('signatureSubmitErrors')[field] ? 'has-error' : '';
  }
});

Template.signatureSubmit.events({
  'submit form': function(e, template) {
    e.preventDefault();

    var $signage = $(e.target).find('[name=signage]');
    var signature = {
      signage: $signage.val(),
      postId: template.data._id
    };

    var errors = {};
    if (! signature.signage) {
      errors.signage = "Please write some content";
      return Session.set('signatureSubmitErrors', errors);
    }

    Meteor.call('signatureInsert', signature, function(error, signatureId) {
      if (error){
        throwError(error.reason);
      } else {
        $signage.val('');
      }
    });
  }
});
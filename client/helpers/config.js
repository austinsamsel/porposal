Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY'
});

Template.registerHelper('formatDate', function(date) {
  return moment(date).format('MM-DD-YYYY');
});

Template.postSubmit.rendered = function() {
  this.$('.datepicker').datepicker();
}
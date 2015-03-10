Accounts.ui.config({
  //passwordSignupFields: 'USERNAME_ONLY'
});

Template.registerHelper('formatDate', function(date) {
  return moment(date).format('dddd, MMMM Do, YYYY');
});
Template.registerHelper('formatDateTime', function(date) {
  return moment(date).format('dddd, MMMM Do, YYYY, h:mm a');
});

Template.postSubmit.rendered = function() {
  this.$('.datepicker').datepicker();
};
Template.postEdit.rendered = function() {
  this.$('.datepicker').datepicker();
};
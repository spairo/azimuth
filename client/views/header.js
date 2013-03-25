// Accompanying JS file for the header template.
// Describes the page's metadata and actions.

Template.header.pages = function () {
  return Pages.find({});
};

Template.header.helpers({
  displayName: function(){
    var user = Meteor.user();
    return (user.profile && user.profile.name) || user.username || (user.emails && user.emails[0] && user.emails[0].address);
  },
  loading : function() {
    return Session.get('loading');
  }
});

Template.header.events = {
  'click #newPage': function () {
    $('#addNewPageModal').modal('show');
  },
  'click .logout' : function() {
    Meteor.logout();
    Router.navigate('');
    return false;
  },
  'click .submit-new-page': function () {
    var raw_title = $('.page-title-textfield').val();
    var raw_slug = $('.page-slug-textfield').val();

    $('#addNewPageModal').modal('hide');

    // Validate input
    if (raw_title == '' || raw_slug == '') {
      // TODO display this purty-like
      alert('Please enter values for all fields');
      return false;
    }

    Pages.insert({
      title: raw_title,
      slug: raw_slug,
      contents: "<p>This page is empty.</p>",
      template: "page_default"
    });

    Router.navigate(raw_slug + '/edit', {trigger: true});
  },
  'keyup .page-title-textfield': function () {
    var raw_title = $('.page-title-textfield').val();
    raw_title = _.slugify(raw_title);
    $('.page-slug-textfield').val(raw_title);
  }
};
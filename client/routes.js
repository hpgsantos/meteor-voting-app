Router.configure({
  layoutTemplate: 'mainLayout',
  notFoundTemplate: 'notFound',
  yieldTemplates: {
    header: {
      to: 'header'
    },
    footer: {
      to: 'footer'
    }
  }
});

const BaseController = RouteController.extend({
  waitOn: function() {
    const subscriptions = [];
    _.each(CollectionUtils.getAll(), function(collection) {
      if (!Collections.isTemporary(collection)) {
        subscriptions.push(Meteor.subscribe(Collections.getName(collection)));
      }
    });
    return subscriptions;
  }
});

Routes.config({
  BaseController: BaseController
});

Meteor.startup(function() {
  Router.route('/', function() {
    Router.go('/polls');
  });
});

Meteor.startup(function() {
  Routes.crudRoute(Polls, {
  });
});

Router.route('poll', {
  path: '/poll/:_id',
  template: 'poll',
  controller: BaseController,
  data: function() {
    return {
      doc: Polls.findOne({_id: this.params._id})
    };
  }
});

/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  // HTML Views
  '/': '/dashboard',
  'get /login': {
    view: 'login/login'
  },
  'get /login/admin': {
    view: 'login/admin'
  },
  'get /login/guest': {
    view: 'login/guest'
  },
  'get /login/help': {
    view: 'login/help'
  },
  'get /signup': {
    view: 'signup'
  },
  'get /dashboard': 'DashboardController.view',
  '/person/': {
    controller: 'person',
    action: 'viewAll'
  },
  '/person/create/': {
    controller: 'person',
    action: 'create'
  },
  '/dummydata': 'DummyController.loadAll',
  '/dummydata/delete': 'DummyController.deleteAll',

  // Endpoints
  'post /login': 'PersonController.login',
  'post /signup': 'PersonController.signup',
  '/logout': 'PersonController.logout',
  'post /User': 'UserController.create',

  // endpoints for meetingserien controller
  'GET /meetingseries/listen': 'MeetingController.listen',
  'POST /meetingseries/create': 'MeetingSeriesController.create',
  'POST /meetingseries/createPerson': 'MeetingSeriesController.createPerson',
  'POST /meetingseries/update': 'MeetingSeriesController.update',
  'POST /meetingseries/updateDescription': 'MeetingSeriesController.updateDescription',
  'POST /meetingseries/updateTimer': 'MeetingSeriesController.updateTimer',
  'POST /meetingseries/updateTopicOrder': 'MeetingSeriesController.updateTopicOrder',
  'GET /meetingseries/view/:id': 'MeetingSeriesController.view',
  'POST /meetingseries/delete': 'MeetingSeriesController.delete',

  // endpoints for meeting controller
  'GET /meeting/id/:url': 'MeetingController.view',
  'GET /meeting/listen': 'MeetingController.listen',
  'POST /meeting/create': 'MeetingController.create',
  'POST /meeting/create/:meetingseries': 'MeetingController.createFromSeries',
  'POST /meeting/createAttendee': 'MeetingController.createAttendee',
  'POST /meeting/update': 'MeetingController.update',
  'POST /meeting/delete': 'MeetingController.delete',
  'GET /meeting/get': 'MeetingController.get',
  'GET /meeting/end': 'MeetingController.endMeeting',
  'GET /meeting/start/:id': 'MeetingController.startMeeting',
  'GET /meeting/summary/:id': 'MeetingController.downloadSummary',

  // endpoints for meeting controller
  'GET /person/listen': 'PersonController.listen',
  'POST /person/create': 'PersonController.create',
  'POST /person/update': 'PersonController.update',
  'POST /person/delete': 'PersonController.delete',
  'GET /person/current': 'PersonController.getCurrent',
  'POST /person/:id/assignTodo': 'PersonController.assignTodo',

  // endpoints for agendaitem controller
  'GET /topic/listen': 'AgendaItemController.listen',
  'POST /topic/create': 'AgendaItemController.create',
  'POST /topic/bulkcreate': 'AgendaItemController.bulkcreate',
  'POST /topic/update': 'AgendaItemController.update',
  'POST /topic/delete': 'AgendaItemController.delete',
  'POST /topic/:id/createNote': 'AgendaItemController.createNote',

  // endpoints for todoitem
  'GET /todos': 'TodoItemController.view',
  'GET /todoitem/listen': 'TodoItemController.listen',
  'POST /todoitem/create': 'TodoItemController.create',
  'POST /todoitem/update': 'TodoItemController.update',
  'POST /todoitem/delete': 'TodoItemController.delete',

  '/forbidden': {
    response: 'forbidden'
  }
};

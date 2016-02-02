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

  /***************************************************************************
   *                                                                          *
   * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
   * etc. depending on your default view engine) your home page.              *
   *                                                                          *
   * (Alternatively, remove this and add an `index.html` file in your         *
   * `assets` directory)                                                      *
   *                                                                          *
   ***************************************************************************/

  // HTML Views
  '/': {
    view: 'homepage'
  },
  'get /login': {
    view: 'login/login'
  },
  'get /login/admin/:email': {
    view: 'login/admin'
  },
  'get /login/guest/:email': {
    view: 'login/guest'
  },
  'get /signup': {
    view: 'signup'
  },
  'get /meeting': {
    view: 'meeting'
  },
  'get /meeting/view': {
    controller: 'meeting',
    action: 'view'
  },
  '/user': {
    controller: 'user',
    action: 'viewAll'
  },
  '/user/create': {
    controller: 'user',
    action: 'create'
  },
  '/user/viewAll': {
    controller: 'user',
    action: 'viewAll',
  },
  '/meetingseries/insert-examples/': {
    controller: 'meetingseries',
    action: 'insertExampleData'
  },
  '/person/': {
    controller: 'person',
    action: 'viewAll',
  },
  '/person/create/': {
    controller: 'person',
    action: 'create',
  },
  // 'get /person/update': {
  //   view: 'edit_person'
  // },
  '/person/exampledata': {
    controller: 'person',
    action: 'exampledata',
  },
  '/dummydata': 'DummyController.loadAll',
  '/dummydata/delete': 'DummyController.deleteAll',

  // Endpoints
  'post /login': 'PersonController.login',
  'post /signup': 'PersonController.signup',
  '/logout': 'PersonController.logout',
  'post /User': 'UserController.create',

  // endpoints for meetingserien controller
  'POST /meetingseries/create': 'MeetingSeriesController.create',
  'POST /meetingseries/update': 'MeetingSeriesController.update',
  'POST /meetingseries/view': 'MeetingSeriesController.view',
  'POST /meetingseries/delete': 'MeetingSeriesController.delete',

 // endpoints for meeting controller
  'POST /meeting/create': 'MeetingController.create',
  'POST /meeting/createAttendee' : 'PersonService.createAttendee',
  'POST /meeting/update': 'MeetingController.update',
  'POST /meeting/view': 'MeetingController.view',
  'POST /meeting/delete': 'MeetingController.delete',
  'GET /meeting/get': 'MeetingController.get',

  // endpoints for meeting controller
  'GET /person/subscribe': 'PersonController.subscribe',
  'POST /person/create': 'PersonController.create',
  'POST /person/update': 'PersonController.update',
  'POST /person/delete': 'PersonController.delete',

  // endpoints for agendaitem controller
  'POST /topic/create': 'AgendaItemController.create',
  'POST /topic/bulkcreate': 'AgendaItemController.bulkcreate',
  'POST /topic/delete': 'AgendaItemController.delete',

  // endpoints for todoitem
  'GET /todoitem/subscribe': 'TodoItemController.subscribe',
  'POST /todoitem/create': 'TodoItemController.create',
  'POST /todoitem/update': 'TodoItemController.update',
  'POST /todoitem/delete': 'TodoItemController.delete',


  /***************************************************************************
   *                                                                          *
   * Custom routes here...                                                    *
   *                                                                          *
   * If a request to a URL doesn't match any of the custom routes above, it   *
   * is matched against Sails route blueprints. See `config/blueprints.js`    *
   * for configuration options and examples.                                  *
   *                                                                          *
   ***************************************************************************/

};

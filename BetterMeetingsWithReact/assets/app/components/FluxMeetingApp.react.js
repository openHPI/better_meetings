var React = require('react');
var MeetingStore = require('../stores/MeetingStore');

/* eslint-disable */
var FluxMeetingApp;

var FluxTopicList = require('./FluxTopicList.react');
var FluxTopicDetails = require('./FluxTopicDetails.react');

var FluxAttendeeList = require('./FluxAttendeeList.react');

var FluxMeetingTimer = require('./FluxMeetingTimer.react');
var FluxMeetingProgress = require('./FluxMeetingProgress.react');

var FluxQrViewer = require('./FluxQrViewer.react');

var FluxTodoList = require('./FluxTodoList.react');
var FluxTodoItemCreateForm = require('./FluxTodoItemCreateForm.react');
/* eslint-enable */

function getMeetingState() {
  return {
    isMeetingDataLoaded: MeetingStore.getIsMeetingDataLoaded(),
    isMeetingDone: MeetingStore.getIsMeetingDone(),

    user: MeetingStore.getUser(),
    canEdit: MeetingStore.canEdit(),

    meeting: MeetingStore.getMeetingData(),
    qrcode: MeetingStore.getQrCode(),
    assingeeOptions: MeetingStore.getAssigneeOptions(),
    selectedTopic: MeetingStore.getSelectedTopic(),
    allTodoItems: MeetingStore.getAllTodoItems(),
    editingTodoItem: MeetingStore.getEditingTodoItem()
  };
}

/**
 * Main component
 *
 * @module FluxMeetingApp
 * @require React
 * @require MeetingStore
 * @require FluxTopicList
 * @require FluxTopicDetails
 * @require FluxAttendeeList
 * @require FluxAttendeeFrom
 * @require FluxMeetingTimer
 * @require FluxMeetingProgress
 * @require FluxTodoList
 *
 */
FluxMeetingApp = React.createClass({

  // Get initial state from stores
  getInitialState: function () {
    return getMeetingState();
  },

  // Add change listeners to stores
  componentDidMount: function () {
    MeetingStore.addChangeListener(this._onChange);
  },

  // Remove change listener from stores
  componentWillUnmount: function () {
    MeetingStore.removeChangeListener(this._onChange);
  },

  // Render our child components, passing state via props
  render: function () {
    if (this.state.isMeetingDataLoaded) {
      return (
        <div id="container" className="effect aside-in">
          <div className="boxed">
            <div id="content-container">
              <div id="page-content">
                <div className="row">
                  <FluxMeetingProgress
                    total={ this.state.meeting.topics.length }
                    index={ this.state.isMeetingDone ?
                      this.state.meeting.topics.length :
                      this.state.selectedTopic}/>
                </div>

                <div className="row">
                  <div className="col-md-9 col-lg-9">
                    <h2>{this.state.meeting.title}</h2>
                  </div>
                  <div className="col-md-3 col-lg-3">
                    <FluxMeetingTimer startTime={this.state.meeting.startTime} timer={this.state.meeting.timer}
                                      isMeetingDone={this.state.isMeetingDone}/>
                  </div>
                </div>

                <div
                  className={ 'row' + ((this.state.isMeetingDone || this.state.meeting.topics.length === 0)
                    ? ' hidden' : '') }>
                  <div className="col-md-4 col-lg-4">
                    <div className="row">
                      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <FluxTopicList items={this.state.meeting.topics} selected={this.state.selectedTopic}/>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-8 col-lg-8">
                    <div className="row">
                      <div className="col-md-12 col-lg-12">
                        <FluxTopicDetails selected={this.state.meeting.topics[this.state.selectedTopic]}/>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12 col-lg-12">
                        <div className="flux-todolist">
                          <FluxTodoList
                            allItems={this.state.allTodoItems}
                            items={this.state.meeting.topics[this.state.selectedTopic].todos}
                            canEdit={this.state.canEdit}
                            editingTodoItem={this.state.editingTodoItem} 
                            options={this.state.assingeeOptions} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={ 'row ' + (this.state.meeting.topics.length !== 0 ? ' hidden' : '')}>
                  <div className="col-md-12">
                    <center><h2>Sorry, aber dieses Meeting enthält keine Topics.</h2></center>
                    <p>Du kannst im Meetingseries View neue Topics anlegen und sie einem neuen Meeting hinzufügen.</p>
                  </div>
                </div>

                <div
                  className={ 'row' + ((!this.state.isMeetingDone || this.state.meeting.topics.length === 0)
                    ? ' hidden' : '') }>
                  <div className="col-md-12">
                    <center><h2>Meeting Ende</h2></center>
                  </div>
                </div>

                <div
                  className={ 'row' + ((this.state.isMeetingDone || this.state.meeting.topics.length === 0)
                    ? ' hidden' : '') }>
                  <div className="col-xs-12">
                    <FluxQrViewer qrcode={this.state.qrcode}/>
                  </div>
                </div>

              </div>
            </div>

            <aside id="aside-container">
              <div id="aside">
                <div className="nano">
                  <FluxAttendeeList admins={this.state.meeting.admins} attendees={this.state.meeting.attendees} user={this.state.user} canEdit={this.state.canEdit}/>
                </div>
              </div>
            </aside>

            <FluxTodoItemCreateForm options={this.state.assingeeOptions} />

          </div>
        </div>
      );
    }

    return <div>Lädt Meeting Informationen... </div>;
  },

  // Methode to setState based upon Store changes
  _onChange: function () {
    this.setState(getMeetingState());
  }

});

module.exports = FluxMeetingApp;

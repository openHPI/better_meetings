var React = require('react');
var FluxAttendeeItem = require('./FluxAttendeeItem.react');

/**
 * FluxAttendeeList
 * 
 * @module FluxAttendeeList
 * @require React
 * @require FluxAttendeeItem
 *
 */
var FluxAttendeeList = React.createClass({

    render: function(){
        var attendees = this.props.attendees;
        var canEdit = this.props.canEdit;
        
        return(
         
               <div className="panel panel-secondary panel-colorful" id="attendeeList">
                <div className="panel-heading">
                    <h3 className="panel-title">ATTENDEES</h3>
                </div>
                <div className="panel-body">

                      <div className="list-group bg-trans">
                        {attendees.map(function(attendee, index){
                          return (
                            <FluxAttendeeItem key={index} attendee={attendee} index={index} />
                          );
                        })}
                      </div>
                      <button type="button" id="flux-attendeelist-button" className={ (canEdit) ? "btn btn-info btn-labeled fa fa-plus" : "hidden-container" } data-toggle="modal" data-target="#newAttendeeModal">Add Guest</button> 

                </div>
               </div>
          
        );
    }
});

module.exports = FluxAttendeeList;
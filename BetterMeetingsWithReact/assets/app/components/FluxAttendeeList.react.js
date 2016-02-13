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

        var editStyle = {
            display: (this.props.canEdit) ? 'inline-block' : 'none'
        };
        
        return(
            <aside id="aside-container">
               <div id="aside">
                  <div className="nano">
                     <div className="nano-content">
                        <div className="list-group bg-trans">
                            {Object.keys(attendees).map(function(index){
                                return (
                                    <FluxAttendeeItem attendee={attendees[index]} index={index} />
                                );
                            })}
                        </div>
                        <button type="button" id="flux-attendeelist-button" className={ (canEdit) ? "btn btn-info btn-labeled fa fa-plus" : "hidden-container" } data-toggle="modal" data-target="#newAttendeeModal">Add Guest</button> 
                     </div>
                  </div>
               </div>
            </aside>
        );
    }
});

module.exports = FluxAttendeeList;
var React = require('react');
var FluxMemberTableData = require('./FluxMemberTableData.react');

// Flux todolist view
var FluxMemberTable = React.createClass({

    render: function(){
        var member = this.props.member;

        return(
            <div className="flux-memberlist-list">
                <h3>Attendees</h3>
                <table>
                    <tr>
                        <th>Name</th>
                        <th>Present</th>
                        <th>Absent</th>
                    </tr>
                    {Object.keys(member).map(function(index){
                        return (
                            <FluxMemberTableData attendee={member[index]} index={index} />
                        )
                    })}
                </table>
            </div>
        );
    }
});

module.exports = FluxMemberTable;
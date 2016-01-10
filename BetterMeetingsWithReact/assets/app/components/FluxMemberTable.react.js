var React = require('react');

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
                    {member.map(function(attendee){
                            return (
                                <tr>
                                    <td>{attendee.name}</td>
                                    <td><button>present</button></td>
                                    <td><button>absent</button></td>
                                </tr>
                            )
                    })}
                </table>
            </div>
        );
    }
});

module.exports = FluxMemberTable;
var React = require('react');
var MeetingseriesItem = require('./MeetingseriesItem.react');

var MeetingseriesList = React.createClass({

    render: function(){
        var items = this.props.items;
        
        return(
                <div className="flux-meetingseriesList">
                    <h4>Verwaltete Meetingserien</h4>
                    <ul>
                        {Object.keys(items).map(function(index){
                            return (
                                <MeetingseriesItem item={items[index]} index={index}/>
                            )
                        })}
                    </ul>
                </div>
        );
    }
});

module.exports = MeetingseriesList;
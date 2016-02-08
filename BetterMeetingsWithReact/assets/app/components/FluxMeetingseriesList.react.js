var React = require('react');
var MeetingseriesItem = require('./MeetingseriesItem.react');

var MeetingseriesList = React.createClass({

    render: function(){
        var items = this.props.items;
        
        return(
                <div className="flux-meetingseriesList panel">
                    <div className="panel-header">
                        <h3 className="panel-title">Verwaltete Meetingserien</h3>
                    </div>
                    <div className="panel-body">
                        <div className="row">
                            <div className="col-lg-12">
                                <ul>
                                    {Object.keys(items).map(function(index){
                                        return (
                                            <MeetingseriesItem item={items[index]} index={index}/>
                                        )
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
        );
    }
});

module.exports = MeetingseriesList;
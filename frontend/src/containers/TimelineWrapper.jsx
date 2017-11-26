import React, { Component } from 'react';
import Timeline from 'react-calendar-timeline/lib';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import { getUserData, resizeItem, moveItem } from '../actions/userData';
import Viewer from '../components/Viewer';

class TimelineWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTask: undefined,
    };

    this.onItemSelect = this.onItemSelect.bind(this);
  }

  componentDidMount() {
    this.props.getUserData(1);
  }

  onItemSelect(itemId, e) {
    this.setState({
      selectedTask: '',
    });
    setTimeout(() => {
      this.setState({
        selectedTask: this.props.userData.items[itemId],
      });
    }, 10);
  }

  render() {
    const { userData } = this.props;
    const { selectedTask } = this.state;
    return (
      <div>
        {Object.keys(userData.items).length > 0 &&
          <div>
            {selectedTask && <Viewer image={selectedTask.image} />}
            <div className="timeline">
              <Timeline
                groups={userData.groups}
                items={_.values(userData.items)}
                defaultTimeStart={moment().add(-15, 'days')}
                defaultTimeEnd={moment().add(15, 'days')}
                onItemResize={this.props.resizeItem}
                onItemMove={this.props.moveItem}
                onItemSelect={this.onItemSelect}
              />
            </div>
          </div>

        }
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getUserData, resizeItem, moveItem }, dispatch);
}

function mapStateToProps({ userData }) {
  return { userData };
}

export default connect(mapStateToProps, mapDispatchToProps)(TimelineWrapper);

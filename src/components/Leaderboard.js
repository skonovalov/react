import React from 'react';

export default class Leaderboard extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: ''
        };

        this.getData        = this.getData.bind(this);
        this.sortMonth      = this.sortMonth.bind(this);
        this.sortAll        = this.sortAll.bind(this);
        this.setActiveClass = this.setActiveClass.bind(this);
    }

    render() {
        let users = this.state.data ? this.state.data : [];

        return (
            <div>
                <h4>Leaderboard</h4>
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Camper Name</th>
                            <th>
                                <a href="#"
                                    onClick={this.sortMonth} className="active">Points in past 30 days</a>
                            </th>
                            <th>
                                <a href="#"
                                 onClick={this.sortAll}>All time points</a>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{user.username}</td>
                                        <td>{user.recent}</td>
                                        <td>{user.alltime}</td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </div>
        );
    }

    componentDidMount() {
        console.log('did mount');
        this.getData(this.props.url);
    }

    getData(url) {
        fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            this.setState({
                data: data
            });
        })
        .catch((err) => {
            console.log(`error: ${err}`);
        });
    }

    sortMonth(event) {
        this.setActiveClass(event);

        let sorted = this.state.data.sort((a, b) => {
            return b.recent - a.recent;
        });

        this.setState({
            data: sorted
        });
    }

    sortAll(event) {
        this.setActiveClass(event);

        let sorted = this.state.data.sort((a, b) => {
            return b.alltime - a.alltime;
        });

        this.setState({
            data: sorted
        });
    }

    setActiveClass(elem) {
        let cls = 'active';
        let active;

        if (! elem.target.classList.contains(cls)) {
            active = document.querySelector(`.${cls}`);
            active.classList.remove(cls);

            elem.target.classList.add(cls);
        }
    }
}

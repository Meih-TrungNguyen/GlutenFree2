import React, { Component } from 'react';
import { CSVLink } from "react-csv";

class Report extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        }

        this.csvLinktEl = React.createRef();

        this.headers = [
            { label: 'Name', key: 'name' },
            { label: 'Username', key: 'username' },
            { label: 'Email', key: 'email' },
            { label: 'Phone', key: 'phone' },
            { label: 'Website', key: 'website' }
        ]
    }
    getUserList = () => {
        return fetch('https://jsonplaceholder.typicode.com/users').then(res => res.json());
    }

    downloadReport = async () => {
        const data = await this.getUserList();
        this.setState({ data: data }, () => {
            setTimeout(() => {
                this.csvLinktEl.current.link.click();
            });
        });
    }


    render() {
        const { data } = this.state;
        return (
            <div>
                <input
                    type="button"
                    value="Export to CSV"
                    onClick={this.downloadReport}>
                </input>
                <input
                    type="button"
                    value="Export to Excel"
                >
                </input>
                <CSVLink
                    headers={this.headers}
                    data={data}
                    filename="Report_test.csv"
                    ref={this.csvLinktEl}>
                </CSVLink>
            </div>
        )
    }
}

export default Report;